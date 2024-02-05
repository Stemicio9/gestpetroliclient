import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Basedicarico} from '../entities/basedicarico';

@Component({
  selector: 'app-aggiungibasedicaricodialog',
  templateUrl: './aggiungibasedicaricodialog.component.html',
  styleUrls: ['./aggiungibasedicaricodialog.component.css']
})
export class AggiungibasedicaricodialogComponent {



  constructor(
      public dialogRef: MatDialogRef<AggiungibasedicaricodialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Basedicarico) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
