import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import LanguageSettings = DataTables.LanguageSettings;
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Riepilogoperfrontend} from '../entities/riepilogoperfrontend';
import {Router} from '@angular/router';
import {RiepilogoService} from '../services/riepilogo.service';
import {Daterange} from '../entities/daterange';
import {formatDate} from '@angular/common';
import { saveAs } from 'file-saver';
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
  selector: 'app-visriepilogo',
  templateUrl: './visriepilogo.component.html',
  styleUrls: ['./visriepilogo.component.css']
})
export class VisriepilogoComponent implements  AfterViewInit, OnDestroy, OnInit {

@ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  data1: Date;
  data2: Date;

  listariepiloghi: Riepilogoperfrontend[] = [];

  constructor(private router: Router,
              private fileservice: FileserviceService,
              private riepilogoservice: RiepilogoService) { }

  ngOnInit(): void {
    this.data1 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  this.data2 = new Date();

  const range = new Daterange();
  range.data1 = this.data1;
  range.data2 = this.data2;

  this.dtOptions = {
    language: LINGUA,
  };

  this.riepilogoservice.getallriepiloghiinrange(range).subscribe(result => {
    this.listariepiloghi = result;
    //   this.dtTrigger.next();
    this.rerender();
  });
}

  cercainrange() {
    const range = new Daterange();
    range.data1 = this.data1;
    range.data2 = this.data2;
    this.riepilogoservice.getallriepiloghiinrange(range).subscribe(result => {
      this.listariepiloghi = result;
      //   this.dtTrigger.next();
      this.rerender();
    });
  }

  modificariepilogo(riepilogo) {
    this.riepilogoservice.riepilogoselezionato = riepilogo;
    this.router.navigate(['/admin/vismodificariepilogo']);
  }

  aggiornadata1(event) {
    this.data1 = new Date(event);
  }

  aggiornadata2(event) {
    this.data2 = new Date(event);
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


  stampaexcel() {
    const range = new Daterange();
    range.data1 = this.data1;
    range.data2 = this.data2;
    this.fileservice.getexcelfile(range).subscribe(result => {
      const blob = new Blob([result], {type: 'application/octet-stream'});
      let nomefile = 'recap';
      nomefile = nomefile + formatDate(this.data1, 'dd-MM-yyyy', 'en_US');
      nomefile = nomefile + '_';
      nomefile = nomefile + formatDate(this.data2, 'dd-MM-yyyy', 'en_US');
      nomefile = nomefile + '.xlsx';
      saveAs(blob, nomefile);
    });
  }


}
