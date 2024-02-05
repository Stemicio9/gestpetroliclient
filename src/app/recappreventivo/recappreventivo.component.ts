import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PreventivoService} from '../services/preventivo.service';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {Cliente} from '../entities/cliente';
import {Router} from '@angular/router';
import {FileserviceService} from '../services/fileservice.service';
import LanguageSettings = DataTables.LanguageSettings;
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Vocedirettificaconvalore} from '../entities/vocedirettificaconvalore';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {Preventivo} from '../entities/preventivo';
import {AggiungivocedirettificapreventivodialogComponent} from '../aggiungivocedirettificapreventivodialog/aggiungivocedirettificapreventivodialog.component';


const LANGUAGE_SETTINGS: LanguageSettings = {
  emptyTable: 'Non ci sono dati!',
  search: 'cerca',
  searchPlaceholder: 'cerca nella tabella'
};



@Component({
  selector: 'app-recappreventivo',
  templateUrl: './recappreventivo.component.html',
  styleUrls: ['./recappreventivo.component.css']
})
export class RecappreventivoComponent implements AfterViewInit, OnDestroy, OnInit {


  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  tableRows: Vocedirettificaconvalore[] = [];



  fabbisognoselezionato = this.preventivoservice.fabbisognoselezionato;
  proprietario: Cliente;
  preventivo: Preventivo;
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
              private puntivenditaservice: GestioneclientiService,
              private toastr: ToastrService,
              private fileservice: FileserviceService) {
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

    this.preventivoservice.getpreventivo(this.fabbisognoselezionato).subscribe(result => {
      this.preventivo = result;

      this.gasolioservito = this.preventivo.prezzoalpubblicogasolioservito;
      this.gasolioself = this.preventivo.prezzoalpubblicogasolioself;
      this.benzinaservito = this.preventivo.prezzoalpubblicobenzinaservito;
      this.benzinaself = this.preventivo.prezzoalpubblicobenzinaself;
      this.supremeservito = this.preventivo.prezzoalpubblicosupremeservito;
      this.supremeself = this.preventivo.prezzoalpubblicosupremeself;
      this.gplservito = this.preventivo.prezzoalpubblicogplservito;

      this.marginegasolioservito = this.proprietario.marginegasolioservito;
      this.marginegasolioself = this.proprietario.marginegasolioself;
      this.marginebenzinaservito = this.proprietario.marginebenzinaservito;
      this.marginebenzinaself = this.proprietario.marginebenzinaself;
      this.marginesupremeservito = this.proprietario.marginesupremeservito;
      this.marginesupremeself = this.proprietario.marginesupremeself;
      this.marginegplservito = this.proprietario.marginegplservito;

      this.percentualegasolio = this.preventivo.marginecessionegasolio;
      this.percentualebenzina = this.preventivo.marginecessionebenzina;
      this.percentualesupreme = this.preventivo.marginecessionesupreme;
      this.percentualegpl = this.preventivo.marginecessionegpl;

      this.tableRows = this.preventivo.listavocidirettifica;


    });
  }

  togliiva(valore) {
    return valore / 1.22;
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

  calcolatotaleconiva(){
    let result = 0;
    const prezzogasolio = this.prezzoconvolumesenzaiva(this.preventivo.prezzoalpubblicogasolioself, this.proprietario.marginegasolioself, this.preventivo.marginecessionegasolio, this.preventivo.riferimento.gasolio)  * 1.22;
    const prezzobenzina = this.prezzoconvolumesenzaiva(this.preventivo.prezzoalpubblicobenzinaself, this.proprietario.marginebenzinaself, this.preventivo.marginecessionebenzina, this.preventivo.riferimento.benzina)  * 1.22;
    const prezzosupreme = this.prezzoconvolumesenzaiva(this.preventivo.prezzoalpubblicosupremeself, this.proprietario.marginesupremeself, this.preventivo.marginecessionesupreme, this.preventivo.riferimento.supreme)  * 1.22;
    const prezzogpl = this.prezzoconvolumesenzaiva(this.preventivo.prezzoalpubblicogplservito, this.proprietario.marginegplself, this.preventivo.marginecessionegpl, this.preventivo.riferimento.gpl)  * 1.22;
    result = prezzogasolio + prezzobenzina + prezzosupreme + prezzogpl;
    return result;
  }

  calcolaimportobonifico() {
    return this.calcolatotaleconiva() + this.calcolasommavocidirettifica();
  }


  stampapreventivo() {
     this.fileservice.stampapreventivo(this.preventivo).subscribe(result => {
       var blob = new Blob([result], {type: 'application/pdf'});
       var downloadURL = window.URL.createObjectURL(result);
       var link = document.createElement('a');
       link.href = downloadURL;
       link.target = '_blank';
       //link.download = "help.pdf";
       link.click();
     });
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



        preventivo.id = this.preventivo.id;



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
            this.toastr.error("Errore nell'aggiornamento del preventivo", "Errore");
          } else {
              this.toastr.success("Preventivo aggiunto!", "Aggiunto!");
          }
        });


      }


    });

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

    if (!this.verificaseinarray(voce, this.fabbisognoselezionato.puntoVendita.listavocidirettifica)) {
      this.fabbisognoselezionato.puntoVendita.listavocidirettifica.push(voce);
    }
        const index = this.tableRows.indexOf(voce);
        if (index !== -1) {
          this.tableRows.splice(index, 1);
          this.rerender();
        }


  }


  verificaseinarray(voce: Vocedirettificaconvalore, array: Vocedirettificaconvalore[]){
    for (const curr of array) {
      if (curr.id === voce.id) {
        return true;
      }
    }
    return false;
  }






  tornaindietro() {
    this.preventivoservice.preventivoselezionato = undefined;
    this.router.navigate(['/admin/preventivo']);
  }

}
