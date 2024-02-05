import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Atk} from '../entities/atk';
import {Autista} from '../entities/autista';

@Component({
  selector: 'app-aggiungiautistadialog',
  templateUrl: './aggiungiautistadialog.component.html',
  styleUrls: ['./aggiungiautistadialog.component.css']
})
export class AggiungiautistadialogComponent {

  constructor(
      public dialogRef: MatDialogRef<AggiungiautistadialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Autista) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
