import { Component, OnInit, Input } from '@angular/core';
import { getMissingPeople, getCrowdsourcedPeople } from '../data';

declare var ol: any;

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class HeatMapComponent implements OnInit {
  mapMissing: any;

  coords = [];

  constructor() { }

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

  addHeat(map, Markers, color) {
		var features = [];

		for (var i = 0; i < Markers.length; i++) {
			var item = Markers[i];
			var iconFeature = new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.transform(item, 'EPSG:4326', 'EPSG:3857'))
			});

			var iconStyle = new ol.style.Style({
				image: new ol.style.Circle(({
          radius: 3,
          fill: new ol.style.Fill({ color })
					//anchor: [0.5, 1],
					//src: "http://cdn.mapmarker.io/api/v1/pin?text=P&size=50&hoffset=1"
				}))
			});

			iconFeature.setStyle(iconStyle);
			features.push(iconFeature);

		}

		var vectorSource = new ol.source.Vector({
			features: features
		});

		var vectorLayer = new ol.layer.Vector({
			source: vectorSource
		});
		map.addLayer(vectorLayer);
  }

  ngOnInit() {
    this.mapMissing = this.getmap('map-missing');

    this.addHeat(this.mapMissing, getMissingPeople(), 'red');
    this.addHeat(this.mapMissing, getCrowdsourcedPeople(), 'blue');

    this.mapMissing.on('click', (args) => {
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      this.coords.push(lonlat);
    });
  }

  prom() {
    prompt("copuy", JSON.stringify(this.coords));
  }

}
