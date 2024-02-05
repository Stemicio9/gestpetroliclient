import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import LanguageSettings = DataTables.LanguageSettings;
import {Subject} from 'rxjs';
import {Quotazionegiornalierapuntovendita} from '../entities/quotazionegiornalierapuntovendita';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {FormBuilder, Validators} from '@angular/forms';
import {GestioneprezziService} from '../services/gestioneprezzi.service';
import {DataTableDirective} from 'angular-datatables';

const LANGUAGE_SETTINGS: LanguageSettings = {
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
  selector: 'app-gestioneprezzipersingolocliente',
  templateUrl: './gestioneprezzipersingolocliente.component.html',
  styleUrls: ['./gestioneprezzipersingolocliente.component.css']
})
export class GestioneprezzipersingoloclienteComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTriggerquotazioni = new Subject();

  dtOptionsquotazioni: DataTables.Settings = {};

  tableRowsquotazioni: Quotazionegiornalierapuntovendita[] = [];

  puntovendita = this.gestioneprezziservice.puntovenditaselezionato;

  constructor(private router: Router,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private gestioneclienteservice: GestioneclientiService,
              private gestioneprezziservice: GestioneprezziService) { }

  ngOnInit(): void {

    this.tableRowsquotazioni = this.puntovendita.puntovendita.quotazioni;

    this.dtOptionsquotazioni = {
      language: LANGUAGE_SETTINGS
    };
  }

  tornaindietro() {
    this.gestioneprezziservice.puntovenditaselezionato = undefined;
    this.router.navigate(['/admin/gestioneprezzi']);
  }


  aggiungiquotazione() {
    this.router.navigate(['/admin/aggiungimodificaquotazionecondati']);
  }

 modificaquotazione(quotazione) {
    this.gestioneprezziservice.quotazioneprezziselezionata = quotazione;
   this.router.navigate(['/admin/aggiungimodificaquotazionecondati']);
 }

  eliminaquotazione(quotazione) {

    this.gestioneclienteservice.rimuoviquotazione(quotazione).subscribe(res => {
      this.puntovendita.puntovendita = res;
      this.tableRowsquotazioni = res.quotazioni;
      this.rerender();
    });

  }


  ngAfterViewInit(): void {
    this.dtTriggerquotazioni.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTriggerquotazioni.unsubscribe();
  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTriggerquotazioni.next();
    });
  }




}
