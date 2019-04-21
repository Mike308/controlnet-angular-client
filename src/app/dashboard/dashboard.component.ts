import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  title: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log('Module Id: ' + params.moduleId);
        this.title = params.moduleId;
      }
    );
  }

}
