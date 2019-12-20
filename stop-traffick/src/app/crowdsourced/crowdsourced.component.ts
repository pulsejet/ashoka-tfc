import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrowdsourcedPhoto } from '../interfaces';

@Component({
  selector: 'app-crowdsourced',
  templateUrl: './crowdsourced.component.html',
  styleUrls: ['./crowdsourced.component.css']
})
export class CrowdsourcedComponent implements OnInit {

  photos: CrowdsourcedPhoto[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.http.get<CrowdsourcedPhoto[]>('/api/crowdsourced').subscribe((res) => {
      this.photos = res;
    });
  }

}
