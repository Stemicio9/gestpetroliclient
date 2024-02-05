import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Puntovendita} from '../entities/puntovendita';
import {GestioneclientiService} from '../services/gestioneclienti.service';

@Component({
  selector: 'app-aggiungipuntovenditadialog',
  templateUrl: './aggiungipuntovenditadialog.component.html',
  styleUrls: ['./aggiungipuntovenditadialog.component.css']
})
export class AggiungipuntovenditadialogComponent{

  valore: Puntovendita;
  listavalori: Puntovendita[] = [];

  constructor(
      private gestioneclientiservice: GestioneclientiService,
      public dialogRef: MatDialogRef<AggiungipuntovenditadialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Puntovendita) {
    this.gestioneclientiservice.tuttipuntivenditasenzacliente().subscribe(result => {
      this.listavalori = result;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  cambiavalore(valorericevuto) {
    this.valore = valorericevuto;
    this.data = valorericevuto;
  }

}
