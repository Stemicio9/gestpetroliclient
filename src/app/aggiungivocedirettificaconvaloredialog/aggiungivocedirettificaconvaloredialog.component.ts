import {Component, Inject, OnInit} from '@angular/core';
import {Vocedirettifica} from '../entities/vocedirettifica';
import {Vocedirettificaconvalore} from '../entities/vocedirettificaconvalore';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Puntovendita} from '../entities/puntovendita';
import {GestionevocidirettificaService} from '../services/gestionevocidirettifica.service';

@Component({
  selector: 'app-aggiungivocedirettificaconvaloredialog',
  templateUrl: './aggiungivocedirettificaconvaloredialog.component.html',
  styleUrls: ['./aggiungivocedirettificaconvaloredialog.component.css']
})
export class AggiungivocedirettificaconvaloredialogComponent {

  valore: Vocedirettificaconvalore = new Vocedirettificaconvalore();
  listavalori: Vocedirettifica[] = [];

  constructor(
      private vocidirettifica: GestionevocidirettificaService,
      public dialogRef: MatDialogRef<AggiungivocedirettificaconvaloredialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Vocedirettificaconvalore) {
    this.vocidirettifica.getvocidirettifica().subscribe(result => {
      this.listavalori = result;
    });
  }



  onNoClick(): void {
    this.dialogRef.close();
  }



  cambiavalore(valorericevuto) {
    this.valore.vocedirettifica = valorericevuto.nomevoce;
    this.valore.segno = valorericevuto.aggiuntasottratta;
    this.data = this.valore;
  }

}
