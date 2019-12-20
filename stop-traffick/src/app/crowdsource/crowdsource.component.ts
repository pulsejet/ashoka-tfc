import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrowdsourcedPhoto } from '../interfaces';

@Component({
  selector: 'app-crowdsource',
  templateUrl: './crowdsource.component.html',
  styleUrls: ['./crowdsource.component.css']
})
export class CrowdsourceComponent implements OnInit {

  preview = "https://insti.app/assets/add_image_placeholder.svg";

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
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

  filechange() {
    const file = (document.querySelector('#file') as any).files[0];
    this.getBase64(file, (res) => {
      this.preview = res;
    });
  }

  go() {
    this.http.post('/api/crowdsource', { picture: this.preview } as CrowdsourcedPhoto).subscribe(() => {
      this.preview = "https://insti.app/assets/add_image_placeholder.svg";
      alert('Upload successful');
    }, (err) => {
      alert(`Upload failed: ${JSON.stringify(err)}`);
    })
  }

}
