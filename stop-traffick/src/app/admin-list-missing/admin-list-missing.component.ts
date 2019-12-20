import { Component, OnInit } from '@angular/core';
import { MissingPerson } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-list-missing',
  templateUrl: './admin-list-missing.component.html',
  styleUrls: ['./admin-list-missing.component.css']
})
export class AdminListMissingComponent implements OnInit {

  people: MissingPerson[];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.http.get<MissingPerson[]>('/api/list-missing').subscribe(data => {
      this.people = data;
      console.log(data)
    });
  }

}
