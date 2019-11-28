import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModuleModel} from './model/module.model';
import {NavService} from './service/nav.service';
import {ModuleService} from '../shared/service/module.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  modules: ModuleModel[] = [];
  newModuleSubscription: Subscription;

  constructor(private moduleService: ModuleService) { }

  ngOnInit() {

    this.getModules();
    this.newModuleSubscription  = this.moduleService.newModuleInserted.subscribe(moduleId => {
      this.getModules();
    });
  }

  ngOnDestroy(): void {
    this.newModuleSubscription.unsubscribe();
  }

  getModules() {
    this.moduleService.getModules().subscribe(
      (modules => this.modules = modules),
      error1 => console.log('Error: ' + error1)
    );
  }

}
