import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {RiepilogoService} from '../services/riepilogo.service';
import {Router} from '@angular/router';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {AggiungibonificodialogComponent} from '../aggiungibonificodialog/aggiungibonificodialog.component';
import {Bonifico} from '../entities/bonifico';
import {Fornitore} from '../entities/fornitore';
import LanguageSettings = DataTables.LanguageSettings;


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
  selector: 'app-riepilogoclientesingola',
  templateUrl: './riepilogoclientesingola.component.html',
  styleUrls: ['./riepilogoclientesingola.component.css']
})
export class RiepilogoclientesingolaComponent implements  AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  riepilogo = this.riepilogoservice.riepilogoselezionato;

  constructor(private toastr: ToastrService,
              private dialog: MatDialog,
              private riepilogoservice: RiepilogoService,
              private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: LINGUA,
      paging: false,
      search: false,

    };
  }

  aggiornadatabonifico(event) {
    this.riepilogo.databonifico = new Date(event);
  }







  prezzogasoliodioggi(fornitore: Fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.confrontadate(quot.data, this.riepilogo.fabbisogno.data)) {
        return quot.prezzogasolio;
      }
    }
  }

  prezzobenzinadioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.confrontadate(quot.data, this.riepilogo.fabbisogno.data)) {
        return quot.prezzobenzina;
      }
    }
  }

  prezzosupremedioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.confrontadate(quot.data, this.riepilogo.fabbisogno.data)) {
        return quot.prezzosupreme;
      }
    }
  }

  prezzogpldioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.confrontadate(quot.data, this.riepilogo.fabbisogno.data)) {
        return quot.prezzogpl
      }
    }
  }

  isToday(data: Date) {
    const today = new Date().toDateString();
    const dataricercata = new Date(data);
    const time = dataricercata.toDateString();
    return today === time;
  }

  confrontadate(data1: Date, data2: Date) {
    const dataricercata1 = new Date(data1);
    const dataricercata2 = new Date(data2);
    return dataricercata1.toDateString() === dataricercata2.toDateString();
  }

  tornaindietro() {
    this.riepilogoservice.riepilogoselezionato = undefined;
    this.router.navigate(['/admin/riepilogocliente']);
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




}
