import { Component, OnInit } from '@angular/core';
import { getMissingPeople, getSightings } from '../data';

declare var ol: any;

@Component({
  selector: 'app-track-routes',
  templateUrl: './track-routes.component.html',
  styleUrls: ['./track-routes.component.css']
})
export class TrackRoutesComponent implements OnInit {

  mapMissing: any;

  layers = [];
  prob = 0;

  coords = [];
  speople = [];

  constructor() {
    this.speople = getSightings();
  }

  getmap(target) {
    return new ol.Map({
      target,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([79.0882, 21.1458]),
        zoom: 5
      })
    });
  }

  getEuclidean(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
  }

  addRoutes(map, People) {
		var features = [];

		for (var p = 0; p < People.length; p++) {
      var Markers = People[p];

      for (var i = 0; i < Markers.length; i++) {
        var item = Markers[i].c;
        var iconFeature = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform(item, 'EPSG:4326', 'EPSG:3857'))
        });

        var iconStyle = new ol.style.Style({
          image: new ol.style.Circle(({
            radius: 3,
            fill: new ol.style.Fill({ color: 'blue' })
          }))
        });

        iconFeature.setStyle(iconStyle);
        features.push(iconFeature);

        if (i > 0 ) {
          const dist = this.getEuclidean(Markers[i-1].c, item);
          const p1 = ol.proj.transform(Markers[i-1].c, 'EPSG:4326', 'EPSG:3857');
          const p2 = ol.proj.transform(item, 'EPSG:4326', 'EPSG:3857');

          const featureLine = new ol.Feature({
            geometry: new ol.geom.LineString([p1, p2])
          });
          featureLine.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({ color: dist > 1 ? 'red' : 'green', width: 2 })
          }));
          features.push(featureLine);
        }
      }
    }

		var vectorSource = new ol.source.Vector({
			features: features
		});

		var vectorLayer = new ol.layer.Vector({
			source: vectorSource
    });

    map.addLayer(vectorLayer);
    this.layers.push(vectorLayer);
  }


  ngOnInit() {
    this.mapMissing = this.getmap('map-missing');

    this.addRoutes(this.mapMissing, this.speople);

    this.mapMissing.on('click', (args) => {
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      this.coords.push(lonlat);
    });
  }

  clearLayers() {
    for (let layer of this.layers) {
      this.mapMissing.removeLayer(layer);
    }
    this.layers = [];
  }

  showAll(e) {
    const probability = e !== null ? e.target.value / 100.0 : 0;
    this.prob = probability;

    this.clearLayers();

    const flags = {};

    const timeMap = {};
    const timeClustered = {};

    for (var p = 0; p < this.speople.length; p++) {
      flags[p] = 0;

      var person = this.speople[p];
      for (var i = 0; i < person.length; i++) {
        const time = person[i].t;
        const coord = person[i].c;

        if (!timeMap.hasOwnProperty(time)) {
          timeMap[time] = [];
        }
        timeMap[time].push({ p: p, c: coord });
      }
    }

    for (const t in Object.keys(timeMap)) {
      const tmap = timeMap[t];
      const tlen = tmap.length;

      if (!timeClustered.hasOwnProperty(t)) {
        timeClustered[t] = [];
      }

      for (var i = 0; i < tlen; i++) {
        let clustered = false;
        for (var j = 0; j < timeClustered[t].length; j++) {
          if (this.getEuclidean(timeClustered[t][j][0].c, tmap[i].c) < 1) {
            clustered = true;
            timeClustered[t][j].push(tmap[i]);
          }
        }

        if (!clustered) {
          timeClustered[t].push([tmap[i]])
        }
      }
    }

    // ==================================================================================================
    const tkeys = Object.keys(timeClustered)
    for (var tk = 0; tk < tkeys.length; tk++) {
      if (tk == 0) continue;
      const t = tkeys[tk]; const tm1 = tkeys[tk - 1];
      for (var i = 0; i < timeClustered[t].length; i++) {
        for (var j = 0; j < timeClustered[t][i].length; j++) {
          const person = timeClustered[t][i][j];
          for (var i1 = 0; i1 < timeClustered[tm1].length; i1++) {
            for (var j1 = 0; j1 < timeClustered[tm1][i1].length; j1++) {
              const person1 = timeClustered[tm1][i1][j1];
              if (person.p == person1.p) {
                let count = 0;
                for (var i2 = 0; i2 < timeClustered[t][i].length; i2++) {
                  for (var i3 = 0; i3 < timeClustered[tm1][i1].length; i3++) {
                    if (timeClustered[t][i][i2].p == timeClustered[tm1][i1][i3].p) {
                      count++;
                    }
                  }
                }
                if (count > 3) { flags[person.p]++; }
              }
            }
          }
        }
      }
    }

    const peopleToShow = [];
    for (let p of Object.keys(flags)) {
      flags[p] /= Object.keys(timeMap).map(s => Number(s)).reduce(function(a, b) {return Math.max(a, b);});

      if (flags[p] >= probability) {
        peopleToShow.push(this.speople[p]);
      }
    }

    //console.log(flags);

    this.addRoutes(this.mapMissing, peopleToShow);
  }

  showPerson(i: number) {
    const routes = [this.speople[i]];
    this.clearLayers();
    this.addRoutes(this.mapMissing, routes);
  }

}
