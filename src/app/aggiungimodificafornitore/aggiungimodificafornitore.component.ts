import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Fornitore} from '../entities/fornitore';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {GestionefornitoriService} from '../services/gestionefornitori.service';
import LanguageSettings = DataTables.LanguageSettings;
import {formatDate} from '@angular/common';
import {Quotazionegiornaliera} from '../entities/quotazionegiornaliera';
import {ToastrService} from 'ngx-toastr';
import {AggiungiquotazionedialogComponent} from '../aggiungiquotazionedialog/aggiungiquotazionedialog.component';
import { saveAs } from 'file-saver';



const LINGUA: LanguageSettings = {
  emptyTable: 'Non ci sono dati!',
  search: 'Cerca',
  searchPlaceholder: '',
  info: 'Da _START_ a _END_ di _TOTAL_ elementi',
  infoEmpty: 'Non ci sono elementi!',
  loadingRecords: 'Carico...',
  paginate: {
    first: 'Primo',
    previous: 'Precedente',
    next: 'Successivo',
    last: 'Ultimo'
  },
  aria: {
    sortAscending: ': Ordine crescente',
    sortDescending: ': Ordine decrescente'
  },
  lengthMenu: 'Mostro _MENU_ elementi'
};

@Component({
  selector: 'app-aggiungimodificafornitore',
  templateUrl: './aggiungimodificafornitore.component.html',
  styleUrls: ['./aggiungimodificafornitore.component.css']
})
export class AggiungimodificafornitoreComponent implements AfterViewInit, OnDestroy, OnInit {


  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  tableRows: Quotazionegiornaliera[] = [];

  aggiungifornitoreform: FormGroup;

  // TUTTO IL MATERIALE PER IL DIALOG
  fornitore = this.gestionefornitoreservice.fornitoreselezionato;

  constructor(private router: Router,
              public dialog: MatDialog,
              private gestionefornitoreservice: GestionefornitoriService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {


    this.aggiungifornitoreform = this.formBuilder.group(
        {
          nomefornitore: ['', Validators.compose([Validators.required])],
          datainiziocontratto: [''],
          datafinecontratto: [''],
          prezzobenzina: [''],
          prezzogasolio: [''],
          prezzosupreme: [''],
          prezzogpl: [''],
        }
    );

    this.dtOptions = {
      paging: true,
      searching: true,
      info: true,
      ordering: true,
      language: LINGUA
    };

    if (this.fornitore !== undefined) {

      const inizio = formatDate(this.fornitore.datainiziocontratto, 'yyyy-MM-dd' , 'en-EN');
      const fine = formatDate(this.fornitore.datafinecontratto, 'yyyy-MM-dd' , 'en-EN');
      this.aggiungifornitoreform.controls.nomefornitore.setValue(this.fornitore.nomefornitore);
      this.aggiungifornitoreform.controls.datainiziocontratto.setValue(inizio);
      this.aggiungifornitoreform.controls.datafinecontratto.setValue(fine);
      this.tableRows = this.fornitore.quotazioni;

    }

  }


  tornaindietro() {
    this.gestionefornitoreservice.fornitoreselezionato = undefined;
    this.router.navigate(['/admin/gestionefornitori']);
  }


  aggiungifornitore() {


    const nomefornitore = this.aggiungifornitoreform.controls.nomefornitore.value;
    const datainiziocontratto = this.aggiungifornitoreform.controls.datainiziocontratto.value;
    const datafinecontratto = this.aggiungifornitoreform.controls.datafinecontratto.value;
    const fornitore = new Fornitore();

    if(this.fornitore !== undefined) {
      fornitore.idfornitore = this.fornitore.idfornitore;
    }

    fornitore.nomefornitore = nomefornitore;
    fornitore.datainiziocontratto = datainiziocontratto;
    fornitore.datafinecontratto = datafinecontratto;
    fornitore.quotazioni = this.tableRows;

    this.gestionefornitoreservice.aggiungifornitore(fornitore).subscribe(result => {
      this.toastr.success("Fornitore modificato!" , "Modificato");
      this.tornaindietro();
    });


  }




  aggiungiquotazione() {
    const dialogRef = this.dialog.open(AggiungiquotazionedialogComponent, {
      width: '450px',
      data: new Quotazionegiornaliera(),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.tableRows.push(result);
        this.rerender();
      }
    });
  }


  eliminaquotazione(quotazione) {

    this.gestionefornitoreservice.rimuoviquotazione(quotazione).subscribe(result => {

      const index = this.tableRows.indexOf(quotazione);
      if (index !== -1) {
        this.tableRows.splice(index, 1);
        this.rerender();
      }

      if (!result) {
        this.toastr.error("La quotazione non è presente nel database" , "Errore");
      } else {
        this.toastr.success("Quotazione rimossa dal database!" , "Rimosso");
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


  stampaexcel() {

    if(this.fornitore === undefined){
      this.toastr.error("Il fornitore non è ancora stato salvato. Salvare e poi richiedere l'esportazione!" , "Errore");
      return;
    }


    this.gestionefornitoreservice.generaexcelfornitore(this.fornitore.idfornitore).subscribe(result => {
      const blob = new Blob([result], {type: 'application/octet-stream'});
      let nomefile = 'quotazioni_';
      nomefile = nomefile + this.fornitore.nomefornitore;
      nomefile = nomefile + '.xlsx';
      saveAs(blob, nomefile);
    });
  }


}
