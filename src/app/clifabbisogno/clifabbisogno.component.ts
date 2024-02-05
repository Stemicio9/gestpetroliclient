import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Fornitore} from '../entities/fornitore';
import {Basedicarico} from '../entities/basedicarico';
import {Puntovendita} from '../entities/puntovendita';
import {FabbisognoService} from '../services/fabbisogno.service';
import {GestionefornitoriService} from '../services/gestionefornitori.service';
import {GestionebasidicaricoService} from '../services/gestionebasidicarico.service';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {formatDate} from '@angular/common';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {Fabbisogno} from '../entities/fabbisogno';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-clifabbisogno',
  templateUrl: './clifabbisogno.component.html',
  styleUrls: ['./clifabbisogno.component.css']
})
export class ClifabbisognoComponent implements OnInit {

  aggiungifabbisognoform: FormGroup;


  fabbisogno = this.fabbisognoservice.fabbisognoselezionato;

  listafornitori;
  fornitoreselezionato : Fornitore = new Fornitore();

  listabasidicarico;
  basedicaricoselezionata : Basedicarico = new Basedicarico();

  listapuntivendita = [];
  puntovenditaselezionato: Puntovendita = new Puntovendita();

  constructor(private fabbisognoservice: FabbisognoService,
              private fornitoriservice: GestionefornitoriService,
              private basidicaricoservice: GestionebasidicaricoService,
              private puntivenditaservice: GestioneclientiService,
              private loginservice: LoginService,
              private router: Router,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {

    this.loginservice.checkloginstatus().subscribe(utente => {
      this.puntivenditaservice.tuttiimieipuntivendita(utente.cliente).subscribe(result => {
        for (const eleme of result) {
          this.listapuntivendita.push(eleme);
        }
        if(result.length > 0 && this.fabbisogno === undefined) {
          this.puntovenditaselezionato = result[0].puntovendita;
        }
      });
    });


    if (this.fabbisogno !== undefined) {
      this.puntovenditaselezionato = this.fabbisogno.puntoVendita;
    }


  }

  ngOnInit(): void {

    var dat = new Date();

    this.aggiungifabbisognoform = this.formBuilder.group(
        {
          data: [dat.toString, Validators.required],
          puntovendita: ['', Validators.required],
          gasolio: ['', Validators.required],
          benzina: ['', Validators.required],
          supreme: ['', Validators.required],
          gpl: ['', Validators.required],
        }
    );




    if (this.fabbisogno !== undefined) {
      this.aggiungifabbisognoform.controls.gpl.setValue(this.fabbisogno.gpl);
      this.aggiungifabbisognoform.controls.benzina.setValue(this.fabbisogno.benzina);
      this.aggiungifabbisognoform.controls.gasolio.setValue(this.fabbisogno.gasolio);
      this.aggiungifabbisognoform.controls.supreme.setValue(this.fabbisogno.supreme);
      this.aggiungifabbisognoform.controls.data.setValue(formatDate(this.fabbisogno.data, 'yyyy-MM-dd', 'en'));
      this.aggiungifabbisognoform.controls.puntovendita.setValue(this.fabbisogno.puntoVendita.nome);


      this.puntovenditaselezionato = this.fabbisogno.puntoVendita;

    }


  }


  aggiungifabbisogno() {


    try {
      var formattata = formatDate(this.aggiungifabbisognoform.controls.data.value, "yyyy-MM-dd", "en");
    }catch (e) {
      this.toastr.error("Inserire una data valida", "Errore!");
      return;
    }

    const confirmDialog = this.dialog.open(ConfermadialogComponent, {
      data: {
        title: this.fabbisogno !== undefined ? 'Modifica' : 'Aggiunta',
        message: this.fabbisogno !== undefined ? 'Vuoi continuare con la modifica?' : 'Vuoi aggiungere il fabbisogno?'
      }
    });


    confirmDialog.afterClosed().subscribe(res => {


      if (res === true) {

        if (this.fabbisogno === undefined) {
          const fabb = new Fabbisogno();
          fabb.gpl = this.aggiungifabbisognoform.controls.gpl.value;
          fabb.supreme = this.aggiungifabbisognoform.controls.supreme.value;
          fabb.benzina = this.aggiungifabbisognoform.controls.benzina.value;
          fabb.gasolio = this.aggiungifabbisognoform.controls.gasolio.value;
          fabb.puntoVendita = this.puntovenditaselezionato;
          fabb.data = this.aggiungifabbisognoform.controls.data.value;
          fabb.smaltito = false;
          this.fabbisognoservice.aggiungifabbisognolatocliente(fabb).subscribe(result => {
            this.toastr.success("Fabbisogno aggiunto!", "Aggiunto!");
            this.tornaindietro();
          }, error => {
            this.toastr.error("Ci sono alcuni errori nei dati inseriti", "Errore!");
          });
        } else {
          const fabb = this.fabbisogno;
          fabb.gpl = this.aggiungifabbisognoform.controls.gpl.value;
          fabb.supreme = this.aggiungifabbisognoform.controls.supreme.value;
          fabb.benzina = this.aggiungifabbisognoform.controls.benzina.value;
          fabb.gasolio = this.aggiungifabbisognoform.controls.gasolio.value;
          fabb.puntoVendita = this.puntovenditaselezionato;
          fabb.data = this.aggiungifabbisognoform.controls.data.value;
          this.fabbisognoservice.aggiungifabbisogno(fabb).subscribe(result => {
            this.toastr.success("Fabbisogno modificato!", "Modificato!");
            this.tornaindietro();
          }, error => {
            this.toastr.error("Ci sono alcuni errori nei dati inseriti", "Errore!");
          });
        }


      }
    });


  }

  cambiapuntovendita(puntovenditasel){
    this.puntovenditaselezionato = puntovenditasel.puntovendita;
  }


  tornaindietro(){
    this.ripulisci();
  }

  ripulisci(){
    this.aggiungifabbisognoform.controls.gpl.setValue("");
    this.aggiungifabbisognoform.controls.supreme.setValue("");
    this.aggiungifabbisognoform.controls.benzina.setValue("");
    this.aggiungifabbisognoform.controls.gasolio.setValue("");
    this.aggiungifabbisognoform.controls.data.setValue(formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en'));
    this.aggiungifabbisognoform.controls.puntovendita.setValue("");
  }



}
