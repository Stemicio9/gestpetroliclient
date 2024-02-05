import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FabbisognoService} from '../services/fabbisogno.service';
import {GestionefornitoriService} from '../services/gestionefornitori.service';
import {GestionebasidicaricoService} from '../services/gestionebasidicarico.service';
import {Fornitore} from '../entities/fornitore';
import {Basedicarico} from '../entities/basedicarico';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {Puntovendita} from '../entities/puntovendita';
import {Router} from '@angular/router';
import {Fabbisogno} from '../entities/fabbisogno';

import { formatDate } from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {Observable} from 'rxjs';
import {map, startWith} from "rxjs/operators";
import {Puntovenditaconcliente} from '../entities/puntovenditaconcliente';

@Component({
  selector: 'app-aggiungimodificafabbisogno',
  templateUrl: './aggiungimodificafabbisogno.component.html',
  styleUrls: ['./aggiungimodificafabbisogno.component.css']
})
export class AggiungimodificafabbisognoComponent implements OnInit {

  aggiungifabbisognoform: FormGroup;


  fabbisogno = this.fabbisognoservice.fabbisognoselezionato;

  listafornitori;
  fornitoreselezionato : Fornitore = new Fornitore();

  listabasidicarico = [];
  filteredbasidicarico: Observable<Basedicarico[]>;
  basedicaricocontrol = new FormControl();
  basedicaricoselezionata : Basedicarico = new Basedicarico();

  listapuntivendita = [];
  filteredpuntovendita: Observable<Puntovenditaconcliente[]>;
  puntovenditacontrol = new FormControl();
  puntovenditaselezionato: Puntovendita = new Puntovendita();

  constructor(private fabbisognoservice: FabbisognoService,
              private fornitoriservice: GestionefornitoriService,
              private basidicaricoservice: GestionebasidicaricoService,
              private puntivenditaservice: GestioneclientiService,
              private router: Router,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {

    this.fornitoriservice.getfornitori().subscribe(result => {
      this.listafornitori = result;
      if (result.length > 0 && this.fabbisogno === undefined) {
        this.fornitoreselezionato = result[0];
      }
      if (result.length > 0 && this.fabbisogno !== undefined && (this.fabbisogno.fornitore === null || this.fabbisogno.fornitore === undefined)) {
        this.fornitoreselezionato = result[0];
      }
    });

    this.basidicaricoservice.getbasidicarico().subscribe(result => {
      this.listabasidicarico = result;
    /*  if (result.length > 0 && this.fabbisogno === undefined) {
        this.basedicaricocontrol.setValue(result[0]);
      } */
   /*   if (result.length > 0 && this.fabbisogno !== undefined && (this.fabbisogno.basedicarico === null || this.fabbisogno.basedicarico === undefined)){
        this.basedicaricocontrol.setValue(result[0]);
      } */
    });
    this.puntivenditaservice.tuttipuntivenditaconcliente().subscribe(result => {
      for (const eleme of result) {
        this.listapuntivendita.push(eleme);
      }
 /*     if(result.length > 0 && this.fabbisogno === undefined) {
        this.puntovenditacontrol.setValue(result[0]);
      } */
    });

    if (this.fabbisogno !== undefined) {
      var pp = new Puntovenditaconcliente();
      pp.puntovendita = this.fabbisogno.puntoVendita;
      this.puntovenditacontrol.setValue(pp);
      if (this.fabbisogno.fornitore !== undefined && this.fabbisogno.fornitore !== null) {
        this.fornitoreselezionato = this.fabbisogno.fornitore;
      }
      if (this.fabbisogno.basedicarico !== undefined && this.fabbisogno.basedicarico !== null) {
        this.basedicaricocontrol.setValue(this.fabbisogno.basedicarico);
      }

    }




  }

  ngOnInit(): void {

    var dat = new Date();

    this.aggiungifabbisognoform = this.formBuilder.group(
        {
          fornitore: ['', Validators.compose([Validators.required])],
          data: [dat.toString, Validators.required],

          gasolio: ['', Validators.required],
          benzina: ['', Validators.required],
          supreme: ['', Validators.required],
          gpl: ['', Validators.required],
        }
    );


    this.filteredbasidicarico = this.basedicaricocontrol.valueChanges
        .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.nomebasedicarico),
            map(name => name ? this._filterbase(name) : this.listabasidicarico.slice())
        );

    this.filteredpuntovendita = this.puntovenditacontrol.valueChanges
        .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.puntovendita.nome),
            map(name => name ? this._filterpuntovendita(name) : this.listapuntivendita.slice())
        );



    if (this.fabbisogno !== undefined) {
      this.aggiungifabbisognoform.controls.gpl.setValue(this.fabbisogno.gpl);
      this.aggiungifabbisognoform.controls.benzina.setValue(this.fabbisogno.benzina);
      this.aggiungifabbisognoform.controls.gasolio.setValue(this.fabbisogno.gasolio);
      this.aggiungifabbisognoform.controls.supreme.setValue(this.fabbisogno.supreme);
      this.aggiungifabbisognoform.controls.data.setValue(formatDate(this.fabbisogno.data, 'yyyy-MM-dd', 'en'));
      this.aggiungifabbisognoform.controls.puntovendita.setValue(this.fabbisogno.puntoVendita.nome);

      if (this.fabbisogno.basedicarico !== null && this.fabbisogno.basedicarico !== undefined) {
        this.aggiungifabbisognoform.controls.basedicarico.setValue(this.fabbisogno.basedicarico.nomebasedicarico);
      }

      if (this.fabbisogno.fornitore !== null && this.fabbisogno.fornitore !== undefined) {
        this.aggiungifabbisognoform.controls.fornitore.setValue(this.fabbisogno.fornitore.nomefornitore);
      }

      var ppp = new Puntovenditaconcliente();
      ppp.puntovendita = this.fabbisogno.puntoVendita;
      this.puntovenditacontrol.setValue(ppp);

      if (this.fabbisogno.fornitore !== null && this.fabbisogno.fornitore !== undefined) {
        this.fornitoreselezionato = this.fabbisogno.fornitore;
      }

      if (this.fabbisogno.basedicarico !== null && this.fabbisogno.basedicarico !== undefined) {

        this.basedicaricocontrol.setValue(this.fabbisogno.basedicarico);
      }
    }

  }

  displaybasedicarico(base: Basedicarico) {
    return base && base.nomebasedicarico ? base.nomebasedicarico : '';
  }

  displaypuntovendita(punto: Puntovenditaconcliente) {
    return punto && punto.puntovendita.nome ? punto.puntovendita.nome : '';
  }

  private _filterbase(name: string): Basedicarico[] {


    const filterValue = name.toLowerCase();

    return this.listabasidicarico.filter(option => option.nomebasedicarico.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterpuntovendita(name: string): Puntovendita[] {
    const filterValue = name.toLowerCase();

    return this.listapuntivendita.filter(option => {
      return option.puntovendita.nome.toLowerCase().indexOf(filterValue) === 0;
    });
  }


  aggiungifabbisogno() {

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
          fabb.puntoVendita = this.puntovenditacontrol.value.puntovendita;
          fabb.data = this.aggiungifabbisognoform.controls.data.value;

            fabb.basedicarico = this.basedicaricocontrol.value;


          fabb.fornitore = this.fornitoreselezionato;
          fabb.smaltito = false;
          this.fabbisognoservice.aggiungifabbisogno(fabb).subscribe(result => {
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
          fabb.puntoVendita = this.puntovenditacontrol.value.puntovendita;
          fabb.data = this.aggiungifabbisognoform.controls.data.value;
          fabb.basedicarico = this.basedicaricocontrol.value;
          fabb.fornitore = this.fornitoreselezionato;
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

  cambiafornitore(fornitoresel){
    this.fornitoreselezionato = fornitoresel;
  }

  cambiabasedicarico(basesel){
    this.basedicaricoselezionata = basesel;
  }


  tornaindietro() {
    this.fabbisognoservice.fabbisognoselezionato = undefined;
    this.router.navigate(['/admin/fabbisogno']);
  }

}
