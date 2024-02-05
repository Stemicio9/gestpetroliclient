import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Vocedirettifica} from '../entities/vocedirettifica';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-aggiungivocedirettificadialog',
  templateUrl: './aggiungivocedirettificadialog.component.html',
  styleUrls: ['./aggiungivocedirettificadialog.component.css']
})
export class AggiungivocedirettificadialogComponent{



  constructor(
      public dialogRef: MatDialogRef<AggiungivocedirettificadialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Vocedirettifica) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
