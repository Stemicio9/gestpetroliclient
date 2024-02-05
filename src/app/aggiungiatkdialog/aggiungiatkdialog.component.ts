import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Atk} from '../entities/atk';
import {Rimorchio} from '../entities/rimorchio';
import {GestionetrasportiService} from '../services/gestionetrasporti.service';


@Component({
  selector: 'app-aggiungiatkdialog',
  templateUrl: './aggiungiatkdialog.component.html',
  styleUrls: ['./aggiungiatkdialog.component.css']
})
export class AggiungiatkdialogComponent {

  valore: Rimorchio;
  listavalori: Rimorchio[] = [];

  constructor(
      public gestionetrasportatori: GestionetrasportiService,
      public dialogRef: MatDialogRef<AggiungiatkdialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Atk) {
    this.listavalori = gestionetrasportatori.listarimorchiperdialog;
    if(this.listavalori.length > 0) {
      this.valore = this.listavalori[0];
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  cambiavalore(valorericevuto) {
    this.valore = valorericevuto;
    this.data.suggerito = valorericevuto.targa;
  }


}
