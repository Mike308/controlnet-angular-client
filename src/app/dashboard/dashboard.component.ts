import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DashboardService} from './service/dashboard.service';
import {HubModel} from './model/hub.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title: string;
  hubSensor: HubModel;

  constructor(private activatedRoute: ActivatedRoute, private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log('Module Id: ' + params.moduleId);
        this.dashboardService.getSensorHub(params.moduleId).subscribe(
          (result) => this.hubSensor = result,
          error1 => {
            console.log(error1);
          }
        );
      }
    );
  }

}
