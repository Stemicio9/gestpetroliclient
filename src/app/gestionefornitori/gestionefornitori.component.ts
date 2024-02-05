import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {GestionefornitoriService} from '../services/gestionefornitori.service';
import {Fornitore} from '../entities/fornitore';
import LanguageSettings = DataTables.LanguageSettings;
import {Router} from '@angular/router';


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
  selector: 'app-gestionefornitori',
  templateUrl: './gestionefornitori.component.html',
  styleUrls: ['./gestionefornitori.component.css']
})
export class GestionefornitoriComponent implements  AfterViewInit, OnDestroy, OnInit  {


  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  listafornitori: Fornitore[] = [];

  constructor(private fornitoriservice: GestionefornitoriService,  public router: Router) { }

  ngOnInit(): void {

    this.dtOptions = {
      language: LINGUA
    };

    this.fornitoriservice.getfornitori().subscribe(result => {
      this.listafornitori = result;
      this.rerender();
    });
  }

  eliminafornitore(fornitore: Fornitore) {
    this.fornitoriservice.rimuovifornitore(fornitore.idfornitore).subscribe(result => {
      this.listafornitori = result;
      this.rerender();
    });
  }


  aggiungifornitore() {
    this.router.navigate(['/admin/aggiungimodificafornitore']);
  }

  modificafornitore(fornitore) {
    this.fornitoriservice.fornitoreselezionato = fornitore;
    this.router.navigate(['/admin/aggiungimodificafornitore']);
  }


  prezzogasoliodioggi(fornitore: Fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.isToday(quot.data)) {
        return quot.prezzogasolio;
      }
    }
  }

prezzobenzinadioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.isToday(quot.data)) {
        return quot.prezzobenzina;
      }
    }
  }

  prezzosupremedioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.isToday(quot.data)) {
        return quot.prezzosupreme;
      }
    }
  }

  prezzogpldioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.isToday(quot.data)) {
        return quot.prezzogpl
      }
    }
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

  isToday(data: Date) {
    const today = new Date().toDateString();
    const dataricercata = new Date(data);
    const time = dataricercata.toDateString();
    return today === time;
  }

}

