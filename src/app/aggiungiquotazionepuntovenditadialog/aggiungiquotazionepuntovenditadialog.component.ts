import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Quotazionegiornalierapuntovendita} from '../entities/quotazionegiornalierapuntovendita';

@Component({
  selector: 'app-aggiungiquotazionepuntovenditadialog',
  templateUrl: './aggiungiquotazionepuntovenditadialog.component.html',
  styleUrls: ['./aggiungiquotazionepuntovenditadialog.component.css']
})
export class AggiungiquotazionepuntovenditadialogComponent {

  constructor(
      public dialogRef: MatDialogRef<AggiungiquotazionepuntovenditadialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Quotazionegiornalierapuntovendita) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
