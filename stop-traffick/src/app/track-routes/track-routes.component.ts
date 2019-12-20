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

    this.addRoutes(this.mapMissing, getSightings());

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

  showPerson(i) {
    const routes = [this.speople[i]];
    console.log(routes)
    this.clearLayers();
    this.addRoutes(this.mapMissing, routes);
  }

}
