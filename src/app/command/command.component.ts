import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandModel} from '../shared/model/command.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {
  commandFormGroup: FormGroup;
  newCommand: CommandModel;
  moduleId = -1;


  constructor(public dialogRef: MatDialogRef<CommandComponent>, @Inject(MAT_DIALOG_DATA) public data: CommandModel) { }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.commandFormGroup = new FormGroup({
      commandCtrl: new FormControl('', Validators.required),
      commandOrderCtrl: new FormControl('', Validators.required)
    });
  }

  onAdd() {
    this.data = {
      id: null,
      moduleId: this.data.moduleId,
      command: this.commandFormGroup.get('commandCtrl').value,
      commandOrder: this.commandFormGroup.get('commandOrderCtrl').value
    };
    this.dialogRef.close(this.data);
  }
}
