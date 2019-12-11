import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DictionaryModel} from '../shared/model/dictionary.model';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {CommandModel} from '../shared/model/command.model';
import {CommandComponent} from '../command/command.component';
import {ModuleService} from '../shared/service/module.service';

@Component({
  selector: 'app-module-setup',
  templateUrl: './module-setup.component.html',
  styleUrls: ['./module-setup.component.css']
})
export class ModuleSetupComponent implements OnInit {
  newModuleFormGroup: FormGroup;
  newCommandFormGroup: FormGroup;
  moduleTypes: DictionaryModel[] = [];
  moduleId: number;
  displayedColumns: string[] = ['command', 'order'];
  commands: CommandModel[] = [];
  commandsDataSource = new MatTableDataSource<CommandModel>();


  constructor(private moduleService: ModuleService, private matSnackBar: MatSnackBar, private addCommandDialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.initForm();
    this.moduleService.getModulesTypes().subscribe(moduleTypes => {
      this.moduleTypes = moduleTypes;
    }, error1 => this.matSnackBar.open('Error while module types are fetching', 'Module types fetching'));

    this.activatedRoute.params.subscribe(params => {
      console.log(JSON.stringify(params));
      if (params.moduleId === 'new') {
        return;
      } else {
        this.moduleId = params.moduleId;
        this.getCommands(this.moduleId);
        this.getModule(this.moduleId);
      }
    });


  }

  initForm() {
    this.newModuleFormGroup = new FormGroup({
      moduleNameCtrl: new FormControl('', Validators.required),
      moduleAddressCtrl: new FormControl('', Validators.required),
      moduleTypesCtrl: new FormControl('', Validators.required)
    });
    this.newCommandFormGroup = new FormGroup({});

  }

  onModuleSave() {
    this.moduleService.addModule({
      id: null,
      name: this.newModuleFormGroup.get('moduleNameCtrl').value,
      address: this.newModuleFormGroup.get('moduleAddressCtrl').value,
      type: this.newModuleFormGroup.get('moduleTypesCtrl').value
    }).subscribe(moduleId => {
      this.moduleId = moduleId;
      this.moduleService.newModuleInserted.next(moduleId);
    }, error1 => this.matSnackBar.open('Error while saving module', 'Saving module'));
  }


  onSaveCommand() {
    this.moduleService.addCommands(this.commands);
  }

  onAddCommand() {
    const dialogRef = this.addCommandDialog.open(CommandComponent, {
      width: '25%',
      data: {id: null, moduleId: this.moduleId, command: null, commandOrder: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.command != null) {
          this.commands.push(result);
          this.commandsDataSource.data = this.commands;
        }
      }
    });
  }

  getCommands(moduleId: number) {
    this.moduleService.getCommands(moduleId).subscribe(commands => {
      this.commands = commands;
      this.commandsDataSource.data = commands;
    }, error1 => this.matSnackBar.open('Error while commands are fetching', 'Command fetching'));
  }

  getModule(moduleId: number) {
    this.moduleService.getModule(moduleId).subscribe(module => {
      this.module = module;
      console.log('Module: ' + JSON.stringify(module));
      this.newModuleFormGroup.patchValue({
        moduleNameCtrl: module.name,
        moduleAddressCtrl: module.address,
        moduleTypesCtrl: module.type
      });
    }, error1 => this.matSnackBar.open('Error while module is fetching', 'Module fetching', {
      duration: 2500
    }));
  }
}
