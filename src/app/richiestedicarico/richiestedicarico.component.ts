import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Trasportofilter} from '../entities/trasportofilter';
import {Atk} from '../entities/atk';
import {GestionetrasportiService} from '../services/gestionetrasporti.service';
import {TrasportoService} from '../services/trasporto.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {Viaggio} from '../entities/viaggio';
import LanguageSettings = DataTables.LanguageSettings;
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {formatDate} from '@angular/common';
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
  selector: 'app-richiestedicarico',
  templateUrl: './richiestedicarico.component.html',
  styleUrls: ['./richiestedicarico.component.css']
})
export class RichiestedicaricoComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};


  filter: Trasportofilter = new Trasportofilter();
  listaatk: Atk[] = [];
  listaviaggi: Viaggio[] = [];

  constructor(private router: Router,
              private trasportatoriservice: GestionetrasportiService,
              private trasportoservice: TrasportoService,
              private toastr: ToastrService,
              private dialog: MatDialog) { }



  ngOnInit(): void {
    const dataieri = new Date();
    dataieri.setDate(dataieri.getDate() - 1);
    const fraseigiorni = new Date();
    fraseigiorni.setDate(fraseigiorni.getDate() + 6);
    this.filter.data = dataieri;
    this.filter.datafine = fraseigiorni;
    this.avviaricerca();
    this.trasportatoriservice.getallatk().subscribe(result => {
      this.listaatk = result;
    })
    this.dtOptions = {
      language: LINGUA,
    };
  }

  atkselezionato(atk) {
    this.filter.atk = atk;
  }


  avviaricerca() {
    this.toastr.info('Potrebbe richiedere qualche secondo!', 'Ricerca avviata!');
    console.log("AVVIO RICERCA");
    if (this.sameDay(this.filter.data , this.filter.datafine)) {
      console.log("STESSO GIORNO");
      this.filter.datafine = undefined;
    }

    this.trasportoservice.findviaggio(this.filter).subscribe(result => {
      console.log("LISTA VIAGGI");
      console.log(result);
 //     this.toastr.info('Trovati ' + result.length + ' risultati', 'Ricerca terminata!');
      this.listaviaggi = result;
      this.rerender();
    }, error => {
      this.toastr.error('Errore nella ricerca', 'Ricerca terminata!');
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

  cancellafiltri() {
    this.filter.data = new Date();
    this.filter.datafine = undefined;
    this.filter.atk = undefined;
  }


  aggiornadata(event) {
    this.filter.data = new Date(event);
  }

  aggiornadatafine(event) {
    this.filter.datafine = new Date(event);
  }

  recaptrasporto(viaggio) {
    this.trasportoservice.viaggioselezionato = viaggio;
    this.router.navigate(['/admin/recaptrasporto']);
  }

   sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
  }



  tabcambiata(event){

  }

}
