import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import LanguageSettings = DataTables.LanguageSettings;
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Trasportatore} from '../entities/trasportatore';
import {Router} from '@angular/router';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {GestionetrasportiService} from '../services/gestionetrasporti.service';
import {Cliente} from '../entities/cliente';


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
  selector: 'app-gestionetrasportatori',
  templateUrl: './gestionetrasportatori.component.html',
  styleUrls: ['./gestionetrasportatori.component.css']
})
export class GestionetrasportatoriComponent implements  AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};
  listatrasportatori: Trasportatore[] = [];

  constructor(private router: Router, private gestionetrasportatori: GestionetrasportiService) { }

  ngOnInit(): void {

    this.dtOptions = {
      paging: true,
      searching: true,
      info: true,
      ordering: true,
      language: LINGUA
    };
    this.gestionetrasportatori.getalltrasportatori().subscribe(result => {
      this.listatrasportatori = result;
      this.rerender();
    });

  }


  vaiapaginatrasportatore(info): void {
    this.gestionetrasportatori.trasportatoreselezionato = info;
    this.router.navigate(['/admin/aggiungimodificatrasportatore']);
  }

  aggiungitrasportatore() {
    this.router.navigate(['/admin/aggiungimodificatrasportatore']);
  }



  eliminatrasportatore(trasportatore: Trasportatore) {
    this.gestionetrasportatori.rimuovitrasportatore(trasportatore.nometrasportatore).subscribe(result => {
      this.listatrasportatori = result;
      this.rerender();
    });
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  contalista(lista: any[]) {
    return lista.length;
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
