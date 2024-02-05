import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Utente} from '../entities/utente';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {Cliente} from '../entities/cliente';


@Component({
  selector: 'app-aggiungiutentedialog',
  templateUrl: './aggiungiutentedialog.component.html',
  styleUrls: ['./aggiungiutentedialog.component.css']
})
export class AggiungiutentedialogComponent {

  valore: RuoloUtente;


  clientesel: Cliente;

  listaclienti: Cliente [] = [];

  listavalori: RuoloUtente[] = [{
    valore: 0,
    corrispondente: 'AMMINISTRATORE'
  },
    {
      valore: 1,
      corrispondente: 'VISUALIZZAZIONE'
    },
    {
      valore: 2,
      corrispondente: 'CLIENTE'
    },
  ];

  constructor(
      private gestioneclientiservice: GestioneclientiService,
      public dialogRef: MatDialogRef<AggiungiutentedialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Utente) {
     this.gestioneclientiservice.getallclienti().subscribe(result => {
       this.listaclienti = result;
     });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cambiavalore(valorericevuto: RuoloUtente) {
    this.valore = valorericevuto;
    this.data.ruolo = valorericevuto.valore;
  }


  clienteselezionato(cliente: Cliente){
    this.clientesel = cliente;
    console.log("ID CLIENTE = ");
    console.log(this.clientesel.idcliente);
    this.data.cliente = cliente;
  }

}

class RuoloUtente {
  valore: number;
  corrispondente: string;
}
