import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import LanguageSettings = DataTables.LanguageSettings;
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Puntovenditaconcliente} from '../entities/puntovenditaconcliente';
import {Router} from '@angular/router';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {GestioneprezziService} from '../services/gestioneprezzi.service';

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
  selector: 'app-gestioneprezzi',
  templateUrl: './gestioneprezzi.component.html',
  styleUrls: ['./gestioneprezzi.component.css']
})
export class GestioneprezziComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  listapuntivendita: Puntovenditaconcliente[];

  constructor(private router: Router, private gestioneclientiservice: GestioneclientiService,
              private gestioneprezziservice: GestioneprezziService) { }

  ngOnInit(): void {


    this.dtOptions = {
      paging: true,
      searching: true,
      info: true,
      ordering: true,
      language: LINGUA
      /*   rowCallback: (row: Node, data: any[] | Object, index: number) => {
           const self = this;
           // Unbind first in order to avoid any duplicate handler
           // (see https://github.com/l-lin/angular-datatables/issues/87)
           $('td', row).unbind('click');
           $('td', row).bind('click', () => {
             self.vaiapaginacliente(data);
           });
           return row;
         } */
    };

    this.gestioneclientiservice.tuttipuntivenditaconcliente().subscribe(result => {
      this.listapuntivendita = result;
      //   this.dtTrigger.next();
      this.rerender();
    });
  }


  vaiapaginapuntovendita(info): void {
    this.gestioneprezziservice.puntovenditaselezionato = info;
    this.router.navigate(['/admin/gestioneprezzisingolocliente']);
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
