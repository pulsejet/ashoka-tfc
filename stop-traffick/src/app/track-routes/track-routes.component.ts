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
          const p1 = ol.proj.transform(Markers[i-1].c, 'EPSG:4326', 'EPSG:3857');
          const p2 = ol.proj.transform(item, 'EPSG:4326', 'EPSG:3857');
          const dist = this.getEuclidean(p1, p2);

          const featureLine = new ol.Feature({
            geometry: new ol.geom.LineString([p1, p2])
          });
          featureLine.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({ color: dist > 100000 ? 'red' : 'green', width: 2 })
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

  showAll() {
    this.clearLayers();
    this.addRoutes(this.mapMissing, this.speople);
  }

  showPerson(i: number) {
    const routes = [this.speople[i]];
    this.clearLayers();
    this.addRoutes(this.mapMissing, routes);
  }

}
