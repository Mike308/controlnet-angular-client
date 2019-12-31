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
  moduleId = -1;


  constructor(public dialogRef: MatDialogRef<CommandComponent>, @Inject(MAT_DIALOG_DATA) public data: CommandModel) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.commandFormGroup = new FormGroup({
      commandCtrl: new FormControl(this.data.command, Validators.required),
      commandOrderCtrl: new FormControl(this.data.commandOrder, Validators.compose([Validators.pattern(/^[0-9]\d*$/), Validators.required]))
    });
  }

  onAdd() {
    this.data = {
      id: this.data.id,
      moduleId: this.data.moduleId,
      command: this.commandFormGroup.get('commandCtrl').value,
      commandOrder: this.commandFormGroup.get('commandOrderCtrl').value
    };
    this.dialogRef.close(this.data);
  }
}
