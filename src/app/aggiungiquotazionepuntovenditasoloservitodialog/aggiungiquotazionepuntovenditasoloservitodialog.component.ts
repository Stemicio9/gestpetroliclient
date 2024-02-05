import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Quotazionegiornalierapuntovendita} from '../entities/quotazionegiornalierapuntovendita';

@Component({
  selector: 'app-aggiungiquotazionepuntovenditasoloservitodialog',
  templateUrl: './aggiungiquotazionepuntovenditasoloservitodialog.component.html',
  styleUrls: ['./aggiungiquotazionepuntovenditasoloservitodialog.component.css']
})
export class AggiungiquotazionepuntovenditasoloservitodialogComponent {

  constructor(
      public dialogRef: MatDialogRef<AggiungiquotazionepuntovenditasoloservitodialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Quotazionegiornalierapuntovendita) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
