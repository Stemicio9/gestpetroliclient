import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Quotazionegiornaliera} from '../entities/quotazionegiornaliera';

@Component({
  selector: 'app-aggiungiquotazionedialog',
  templateUrl: './aggiungiquotazionedialog.component.html',
  styleUrls: ['./aggiungiquotazionedialog.component.css']
})
export class AggiungiquotazionedialogComponent {

  constructor(
      public dialogRef: MatDialogRef<AggiungiquotazionedialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Quotazionegiornaliera) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
