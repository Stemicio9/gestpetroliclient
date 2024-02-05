import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Autista} from '../entities/autista';
import {Rimorchio} from '../entities/rimorchio';

@Component({
  selector: 'app-aggiungirimorchiodialog',
  templateUrl: './aggiungirimorchiodialog.component.html',
  styleUrls: ['./aggiungirimorchiodialog.component.css']
})
export class AggiungirimorchiodialogComponent {

  constructor(
      public dialogRef: MatDialogRef<AggiungirimorchiodialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Rimorchio) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
