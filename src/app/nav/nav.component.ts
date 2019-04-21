import { Component, OnInit } from '@angular/core';
import {ModuleModel} from './model/module.model';
import {NavService} from './service/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  modules: ModuleModel[] = [];

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.navService.getModules().subscribe(
      (modules => this.modules = modules),
      error1 => console.log('Error: ' + error1)
    );
  }

}
