import { Component, OnInit } from '@angular/core';
import { MissingPerson } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var ol: any;

@Component({
  selector: 'app-admin-upload-missing',
  templateUrl: './admin-upload-missing.component.html',
  styleUrls: ['./admin-upload-missing.component.css']
})
export class AdminUploadMissingComponent implements OnInit {

  p: MissingPerson = {} as MissingPerson

  latitude: number = 18.5204;
  longitude: number = 73.8567;
  map: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([77.8880, 29.8543]),
        zoom: 14
      })
    });
    this.map.on('click', (args) => {
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      this.p.lkl_lng = lonlat[0];
      this.p.lkl_lat = lonlat[1];
    });
  }

  getBase64(file, cb) {
    if (!file) cb('');
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      alert('Error: ' + JSON.stringify(error));
    };
 }

  go() {
    const file = (document.querySelector('#file') as any).files[0];
    this.getBase64(file, (res) => {
      this.p.pictures = res;
      this.http.post('/api/upload-missing', this.p).subscribe(() => {
        alert('Missing person report submitted successfully');
        this.router.navigate(['/home']);
      }, (e) => {
        alert(`Missing person report submission error => ${JSON.stringify(e)}`);
      });
    });
  }

}
