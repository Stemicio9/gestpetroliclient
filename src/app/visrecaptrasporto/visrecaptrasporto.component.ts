import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import LanguageSettings = DataTables.LanguageSettings;
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {TrasportoService} from '../services/trasporto.service';
import {FileserviceService} from '../services/fileservice.service';



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
  selector: 'app-visrecaptrasporto',
  templateUrl: './visrecaptrasporto.component.html',
  styleUrls: ['./visrecaptrasporto.component.css']
})
export class VisrecaptrasportoComponent implements  AfterViewInit, OnDestroy, OnInit  {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  viaggio = this.trasportoservice.viaggioselezionato;

  basedicarico = this.viaggio.listaviaggi[0]?.fabbisogno?.basedicarico.nomebasedicarico;

  data = this.viaggio.listaviaggi[0]?.datadicaricazione;

  trasportatore = this.viaggio.listaviaggi[0]?.nometrasportatore;

  targamotrice = this.viaggio.listaviaggi[0]?.atk.targa;

  targarimorchio = this.viaggio.listaviaggi[0]?.rimorchio.targa;

  autista = this.viaggio.listaviaggi[0]?.autista.nomeautista;

  constructor(private router: Router,
              private trasportoservice: TrasportoService,
              private fileservice: FileserviceService) { }

  ngOnInit(): void {

    this.dtOptions = {
      language: LINGUA,
    };
  }


  tornaindietro() {
    this.trasportoservice.viaggioselezionato = undefined;
    this.router.navigate(['/admin/vistrasporto']);
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

  stampa() {
    this.fileservice.stampatrasporto(this.viaggio).subscribe(result => {
      var blob = new Blob([result], {type: 'application/pdf'});
      var downloadURL = window.URL.createObjectURL(result);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.target = '_blank';
      link.click();
    });
  }

}
