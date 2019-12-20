import { Component, OnInit } from '@angular/core';
import { MissingPerson } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-upload-missing',
  templateUrl: './admin-upload-missing.component.html',
  styleUrls: ['./admin-upload-missing.component.css']
})
export class AdminUploadMissingComponent implements OnInit {

  p: MissingPerson = {} as MissingPerson

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  getBase64(file, cb) {
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
