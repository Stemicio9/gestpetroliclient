import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Bonifico} from '../entities/bonifico';

@Component({
  selector: 'app-aggiungibonificodialog',
  templateUrl: './aggiungibonificodialog.component.html',
  styleUrls: ['./aggiungibonificodialog.component.css']
})
export class AggiungibonificodialogComponent {

  constructor(
      public dialogRef: MatDialogRef<AggiungibonificodialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Bonifico) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
