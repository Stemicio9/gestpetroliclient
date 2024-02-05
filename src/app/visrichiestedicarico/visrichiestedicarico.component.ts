import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Trasportofilter} from '../entities/trasportofilter';
import {Atk} from '../entities/atk';
import {Viaggio} from '../entities/viaggio';
import {Router} from '@angular/router';
import {GestionetrasportiService} from '../services/gestionetrasporti.service';
import {TrasportoService} from '../services/trasporto.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
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
  selector: 'app-visrichiestedicarico',
  templateUrl: './visrichiestedicarico.component.html',
  styleUrls: ['./visrichiestedicarico.component.css']
})
export class VisrichiestedicaricoComponent  implements AfterViewInit, OnDestroy, OnInit {

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
    this.filter.data = new Date();
    this.avviaricercastart();
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

  avviaricercastart() {
    this.trasportoservice.findviaggio(this.filter).subscribe(result => {
      //     this.toastr.info('Trovati ' + result.length + ' risultati', 'Ricerca terminata!');
      this.listaviaggi = result;
      this.rerender();
    }, error => {
      this.toastr.error('Errore nella ricerca', 'Ricerca terminata!');
    });
  }

  avviaricerca() {
    this.toastr.info('Potrebbe richiedere qualche secondo!', 'Ricerca avviata!');
    this.trasportoservice.findviaggio(this.filter).subscribe(result => {
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
    this.filter.atk = undefined;
  }


  aggiornadata(event) {
    this.filter.data = new Date(event);
  }

  recaptrasporto(viaggio) {
    this.trasportoservice.viaggioselezionato = viaggio;
    this.router.navigate(['/admin/visrecaptrasporto']);
  }


}
