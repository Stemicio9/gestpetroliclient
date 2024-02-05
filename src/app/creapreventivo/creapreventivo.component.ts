import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PreventivoService} from '../services/preventivo.service';
import {FormGroup} from '@angular/forms';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {Cliente} from '../entities/cliente';
import {Preventivo} from '../entities/preventivo';
import LanguageSettings = DataTables.LanguageSettings;
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Vocedirettificaconvalore} from '../entities/vocedirettificaconvalore';
import {AggiungivocedirettificaconvaloredialogComponent} from '../aggiungivocedirettificaconvaloredialog/aggiungivocedirettificaconvaloredialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AggiungivocedirettificapreventivodialogComponent} from '../aggiungivocedirettificapreventivodialog/aggiungivocedirettificapreventivodialog.component';
import {ToastrService} from 'ngx-toastr';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {Quotazionegiornalierapuntovendita} from '../entities/quotazionegiornalierapuntovendita';


const LANGUAGE_SETTINGS: LanguageSettings = {
  emptyTable: 'Non ci sono dati!',
  search: 'cerca',
  searchPlaceholder: 'cerca nella tabella'
};


@Component({
  selector: 'app-creapreventivo',
  templateUrl: './creapreventivo.component.html',
  styleUrls: ['./creapreventivo.component.css']
})
export class CreapreventivoComponent implements AfterViewInit, OnDestroy, OnInit {


  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  tableRows: Vocedirettificaconvalore[] = [];



  fabbisognoselezionato = this.preventivoservice.fabbisognoselezionato;
  proprietario: Cliente;
  preventivo;
  creapreventivoform: FormGroup;

  gasolioservito = 0;
  gasolioself = 0;
  benzinaservito = 0;
  benzinaself = 0;
  supremeservito = 0;
  supremeself = 0;
  gplservito = 0;

  marginegasolioservito = 0;
  marginegasolioself = 0;
  marginebenzinaservito = 0;
  marginebenzinaself = 0;
  marginesupremeservito = 0;
  marginesupremeself = 0;
  marginegplservito = 0;


  percentualegasolio = 0;
  percentualebenzina = 0;
  percentualesupreme = 0;
  percentualegpl = 0;

  constructor(private router: Router, public dialog: MatDialog,
              private preventivoservice: PreventivoService, private gestioneclienti: GestioneclientiService,
              private toastr: ToastrService) {
    this.gestioneclienti.getproprietario(this.fabbisognoselezionato.puntoVendita).subscribe(result => {this.proprietario = result});
  }

  ngOnInit(): void {


    this.dtOptions = {
      paging: false,
      searching: false,
      info: false,
      ordering: false,
      language: LANGUAGE_SETTINGS
    };

    this.inserisciprezzidioggiseesistono();

    this.preventivoservice.getpreventivo(this.fabbisognoselezionato).subscribe(result => {
      this.preventivo = result;
    });
  }

  tornaindietro() {
    this.preventivoservice.fabbisognoselezionato = undefined;
    this.router.navigate(['/admin/preventivo']);
  }

  vaialrecap(preventivo: Preventivo) {
    this.preventivoservice.fabbisognoselezionato = preventivo.riferimento;
    this.preventivoservice.preventivoselezionato = preventivo;
    this.router.navigate(['/admin/recappreventivo']);
  }

  issoloservito() {
    if (this.fabbisognoselezionato.puntoVendita.allservito) {
      return true;
    } else {
      return false;
    }
  }

  aggiungipreventivo() {


    const confirmDialog = this.dialog.open(ConfermadialogComponent, {
      data: {
        title: 'Creazione preventivo',
        message: 'Aggiungere il preventivo?'
      }
    });



    confirmDialog.afterClosed().subscribe(res => {


      if (res === true) {

        let preventivo = new Preventivo();
        preventivo.data = new Date();
        preventivo.riferimento = this.fabbisognoselezionato;
        preventivo.nomecliente = this.proprietario.nomecliente;

        preventivo.marginecessionebenzina = this.percentualebenzina;
        preventivo.marginecessionegasolio = this.percentualegasolio;
        preventivo.marginecessionesupreme = this.percentualesupreme;
        preventivo.marginecessionegpl = this.percentualegpl;

        preventivo.prezzoalpubblicobenzinaself = this.benzinaself;
        preventivo.prezzoalpubblicobenzinaservito = this.benzinaservito;
        preventivo.prezzoalpubblicogasolioself = this.gasolioself;
        preventivo.prezzoalpubblicogasolioservito = this.gasolioservito;
        preventivo.prezzoalpubblicosupremeself = this.supremeself;
        preventivo.prezzoalpubblicosupremeservito = this.supremeservito;
        preventivo.prezzoalpubblicogplservito = this.gplservito;

        preventivo.listavocidirettifica = this.tableRows;


        this.preventivoservice.aggiungimodifica(preventivo).subscribe(result => {
          if (!result) {

          } else {
            this.toastr.success("Preventivo aggiunto!", "Aggiunto!");
          }
          this.vaialrecap(preventivo);
        });


      }


    });

  }

  togliiva(valore) {
    return valore / 1.22;
  }

  calcoloconmargineinpercentuale(val1, val2) {
    return val1 * val2 / 100;
  }


  prezzoinfattura(valoreconiva, margine, percentualemargine) {
    return this.togliiva(valoreconiva) - margine * percentualemargine / 100;
  }

  prezzoconvolumesenzaiva(valoreconiva, margine, percentualemargine, volume) {

    const numero = Number((this.prezzoinfattura(valoreconiva, margine, percentualemargine)).toFixed(3));

    return numero * volume;
  }

  calcolasommavocidirettifica() {
    let result = 0;
    for (const valore of this.tableRows) {
      if (valore.segno) {
        result = result + valore.valore;
      } else {
        result = result - valore.valore;
      }
    }
    return result;
  }


  calcolatotaleconiva() {
    let result = 0;
    const prezzogasolio = this.prezzoconvolumesenzaiva(this.gasolioself, this.proprietario.marginegasolioself, this.percentualegasolio, this.fabbisognoselezionato.gasolio)  * 1.22;
    const prezzobenzina = this.prezzoconvolumesenzaiva(this.benzinaself, this.proprietario.marginebenzinaself, this.percentualebenzina, this.fabbisognoselezionato.benzina)  * 1.22;
    const prezzosupreme = this.prezzoconvolumesenzaiva(this.supremeself, this.proprietario.marginesupremeself, this.percentualesupreme, this.fabbisognoselezionato.supreme)  * 1.22;
    const prezzogpl = this.prezzoconvolumesenzaiva(this.gplservito, this.proprietario.marginegplservito, this.percentualegpl, this.fabbisognoselezionato.gpl)  * 1.22;
    result = prezzogasolio + prezzobenzina + prezzosupreme + prezzogpl;
    return result;
  }


  calcolaimportobonifico() {
    return this.calcolatotaleconiva() + this.calcolasommavocidirettifica();
  }




  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }



  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  aggiungivocedirettifica() {



    const dialogRef = this.dialog.open(AggiungivocedirettificapreventivodialogComponent, {
      width: '450px',
      data: this.copiaarray(this.tableRows),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.tableRows = result;
        this.rerender();
      }
    });
  }

  copiaarray(dacopiare) {
    const myClonedArray = [];
    dacopiare.forEach(val => myClonedArray.push(Object.assign({}, val)));
    return myClonedArray;
  }

  eliminavocedirettifica(voce) {
    const index = this.tableRows.indexOf(voce);
    if (index !== -1) {
      this.tableRows.splice(index, 1);
      this.rerender();
    }
  }


  inserisciprezzidioggiseesistono() {

    const quot = this.getprezzodipuntovenditapergiornopreventivo();

    if(quot === undefined){
      return;
    }

    this.benzinaself = quot.prezzobenzinaself;
    this.benzinaservito = quot.prezzobenzina;
    this.gasolioself = quot.prezzogasolioself;
    this.gasolioservito = quot.prezzogasolio;
    this.supremeself = quot.prezzosupremeself;
    this.supremeservito = quot.prezzosupreme;
    this.gplservito = quot.prezzogpl;

    this.percentualegasolio = quot.marginecessionegasolio;
    this.percentualebenzina = quot.marginecessionebenzina;
    this.percentualesupreme = quot.marginecessionesupreme;
    this.percentualegpl = quot.marginecessionegpl;
  }

  getprezzodipuntovenditapergiornopreventivo() {
    for (const quot of this.fabbisognoselezionato.puntoVendita.quotazioni) {
      if (this.sameDay(quot.data,this.fabbisognoselezionato.data)){
        console.log("QUOTAZIONE TROVATA");
        console.log(quot);
        return quot;
      }
    }



    return this.getdatapassatapiuvicina();
  }


  getdatapassatapiuvicina() {
    var differenza = 0;
    var result = undefined;
    for (const quot of this.fabbisognoselezionato.puntoVendita.quotazioni) {
      const differenzaattuale = this.getdifferenzadate(quot.data,this.fabbisognoselezionato.data);
      if(differenza === 0 || differenzaattuale < differenza){
        differenza = differenzaattuale;
        result = quot;
      }
    }
    return result;
  }

  getdifferenzadate(a: Date, b: Date) {
    const d1 = new Date(a);
    const d2 = new Date(b);
    return Math.abs(d1.getTime() - d2.getTime());
  }


  sameDay(a: Date, b: Date) {
    const d1 = new Date(a);
    const d2 = new Date(b);
    return d1.getFullYear() === d2.getFullYear()
        && d1.getDate() === d2.getDate()
        && d1.getMonth() === d2.getMonth();
  }

}
