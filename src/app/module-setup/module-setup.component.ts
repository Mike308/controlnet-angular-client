import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DictionaryModel} from '../shared/model/dictionary.model';
import {ModuleSetupService} from './service/module.setup.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {CommandModel} from '../shared/model/command.model';
import {CommandComponent} from '../command/command.component';

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

  constructor(private moduleSetupService: ModuleSetupService, private matSnackBar: MatSnackBar, private addCommandDialog: MatDialog) {
  }

  ngOnInit() {
    this.initForm();
    this.moduleSetupService.getModulesTypes().subscribe(moduleTypes => {
      this.moduleTypes = moduleTypes;
    }, error1 => this.matSnackBar.open('Error while module types are fetching', 'Module types fetching'));

    this.moduleSetupService.getCommands(this.moduleId).subscribe(commands => {
      this.commands = commands;
      this.commandsDataSource.data = commands;
    }, error1 => this.matSnackBar.open('Error while commands are fetching', 'Command fetching'));
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
    this.moduleSetupService.addModule({
      id: null,
      name: this.newModuleFormGroup.get('moduleNameCtrl').value,
      address: this.newModuleFormGroup.get('moduleAddressCtrl').value,
      type: this.newModuleFormGroup.get('moduleTypesCtrl').value
    }).subscribe(moduleId => {
      this.moduleId = moduleId;
    }, error1 => this.matSnackBar.open('Error while saving module', 'Saving module'));
  }


  onSaveCommand() {

  }

  onAddCommand() {
    const dialogRef = this.addCommandDialog.open(CommandComponent, {
      width: '25%',
      data: {id: null, moduleId: this.moduleId, command: null, commandOrder: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.commands.push(result);
      this.commandsDataSource.data = this.commands;
    });
  }
}
