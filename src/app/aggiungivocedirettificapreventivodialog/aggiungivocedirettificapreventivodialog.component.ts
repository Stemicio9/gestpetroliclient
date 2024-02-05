import {Component, Inject, OnInit} from '@angular/core';
import {Vocedirettificaconvalore} from '../entities/vocedirettificaconvalore';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Puntovendita} from '../entities/puntovendita';
import {PreventivoService} from '../services/preventivo.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-aggiungivocedirettificapreventivodialog',
  templateUrl: './aggiungivocedirettificapreventivodialog.component.html',
  styleUrls: ['./aggiungivocedirettificapreventivodialog.component.css']
})
export class AggiungivocedirettificapreventivodialogComponent {

  valore: Vocedirettificaconvalore;
  listavalori: Vocedirettificaconvalore[] = [];


  listavaloriselezionati: Vocedirettificaconvalore[] = [];

  constructor(
      private preventivoservice: PreventivoService,
      public dialogRef: MatDialogRef<AggiungivocedirettificapreventivodialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Vocedirettificaconvalore[]) {
      this.listavalori = preventivoservice.fabbisognoselezionato.puntoVendita.listavocidirettifica;
      this.listavaloriselezionati = data;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  toggleSelection(selezione) {

    const indice = this.prendiindice(selezione);
    if (indice > -1) {
        this.listavaloriselezionati.splice(indice,1);
    } else {
        this.listavaloriselezionati.push(selezione);
    }

  }


  verificapresenza(val: Vocedirettificaconvalore) {
    for (const curr of this.listavaloriselezionati) {
      if (curr.id === val.id) {
        return true;
      }
    }
    return false;
  }

  prendiindice(val: Vocedirettificaconvalore) {
    const indice = -1;
    let currentindex = 0;

    for (const curr of this.listavaloriselezionati) {
      if (curr.id === val.id) {
        return currentindex;
      }
      currentindex = currentindex + 1;
    }

    return indice;
  }



}
