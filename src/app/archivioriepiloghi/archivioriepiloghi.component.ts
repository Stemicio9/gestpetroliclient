import {Component, OnInit, ViewChild, OnDestroy, AfterViewInit} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Riepilogoperfrontend} from '../entities/riepilogoperfrontend';
import {Router} from '@angular/router';
import {RiepilogoService} from '../services/riepilogo.service';
import {FileserviceService} from '../services/fileservice.service';
import {ToastrService} from 'ngx-toastr';
import {Daterange} from '../entities/daterange';
import {formatDate} from '@angular/common';
import LanguageSettings = DataTables.LanguageSettings;
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
  selector: 'app-archivioriepiloghi',
  templateUrl: './archivioriepiloghi.component.html',
  styleUrls: ['./archivioriepiloghi.component.css']
})
export class ArchivioriepiloghiComponent implements  AfterViewInit, OnDestroy,OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};


  primadata: Date;
  secondadata: Date;

  listariepiloghi: Riepilogoperfrontend[] = [];


  showDateRange = false;

  totalegasolio = 0;
  totalebenzina = 0;
  totalesupreme = 0;
  totalegpl = 0;
  totaleresiduo = 0;

  caricamento = false;

  constructor(private router: Router,
              private riepilogoservice: RiepilogoService,
              private fileservice: FileserviceService,
              private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.primadata = this.riepilogoservice.data1;
    this.secondadata = this.riepilogoservice.data2;

    const range = new Daterange();
    range.data1 = this.riepilogoservice.data1;
    range.data2 = this.riepilogoservice.data2;

    this.dtOptions = {
      language: LINGUA,
      infoCallback: (oSettings, start, end, iMax, iTotal, sPre) => this.callbackperriepilogo(start, end, iMax, iTotal, sPre),
      paging:true,
    };



    this.toastr.info("Inizio ricerca!" , "Ricerca");

    this.caricamento = true;

    this.riepilogoservice.getallriepiloghiinrange(range).subscribe(result => {
          this.listariepiloghi = result;
          //   this.dtTrigger.next();
          this.caricamento = false;
          this.rerender();
        }, (error => {
          this.caricamento = false;
          this.toastr.error("C'è stato un errore!", "Errore");
        })



    );


  }





  callbackperriepilogo(start, end, imax, iTotal, sPre) {
    console.log("INIZIO : " + start);
    console.log("FINE : " + end);
    console.log("IMAX" + imax);
    console.log("ITOTAL : " + iTotal);
    console.log("SPRE" + sPre);

    this.totalegasolio = 0;
    this.totalebenzina = 0;
    this.totalesupreme = 0;
    this.totalegpl = 0;
    this.totaleresiduo = 0;

    for ( let i = start - 1; i < end; i++) {


      this.dtElement.dtInstance.then(val => {

        console.log("Le righe sono");
        console.log(val.rows({ search: 'applied' }).data());

        if(val.rows({ search: 'applied' }).data().count() !== iTotal){
          this.totalegasolio = this.totalegasolio + this.toNumber(val.rows({ search: 'applied' }).data().toArray()[i][2]);
          this.totalebenzina = this.totalebenzina + this.toNumber(val.rows({ search: 'applied' }).data().toArray()[i][3]);
          this.totalesupreme = this.totalesupreme + this.toNumber(val.rows({ search: 'applied' }).data().toArray()[i][4]);
          this.totalegpl = this.totalegpl + this.toNumber(val.rows({ search: 'applied' }).data().toArray()[i][5]);
          this.totaleresiduo = this.totaleresiduo + this.currencytonumber(val.rows({ search: 'applied' }).data().toArray()[i][7]);
        } else {
          this.totalegasolio = this.totalegasolio + this.toNumber(val.data().toArray()[i][2]);
          this.totalebenzina = this.totalebenzina + this.toNumber(val.data().toArray()[i][3]);
          this.totalesupreme = this.totalesupreme + this.toNumber(val.data().toArray()[i][4]);
          this.totalegpl = this.totalegpl + this.toNumber(val.data().toArray()[i][5]);
          this.totaleresiduo = this.totaleresiduo + this.currencytonumber(val.data().toArray()[i][7]);
        }

      });
    }

  }

  toNumber (v) {
    return Number(v);
  }

  currencytonumber(v) {
    return Number(v.replace(/[^0-9.-]+/g,""));
  }


  cercainrange() {
    const range = new Daterange();
    range.data1 = this.riepilogoservice.data1;
    range.data2 = this.riepilogoservice.data2;
    this.toastr.info("Inizio ricerca!" , "Ricerca");
    this.caricamento = true;
    this.riepilogoservice.getallriepiloghiinrange(range).subscribe(result => {
          this.listariepiloghi = result;
          //   this.dtTrigger.next();
          this.caricamento = false;
          this.rerender();
        }
        , (error => {
          this.caricamento = false;
          this.toastr.error("C'è stato un errore!", "Errore");
        })
    );
  }

  modificariepilogo(riepilogo) {
    this.riepilogoservice.riepilogoselezionato = riepilogo;
    this.router.navigate(['/admin/modificariepilogo']);
  }

  aggiornadata1(event) {
    this.riepilogoservice.data1 = new Date(event);
  }

  aggiornadata2(event) {
    this.riepilogoservice.data2 = new Date(event);
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
    range.data1 = this.riepilogoservice.data1;
    range.data2 = this.riepilogoservice.data2;
    this.fileservice.getexcelfile(range).subscribe(result => {
      const blob = new Blob([result], {type: 'application/octet-stream'});
      let nomefile = 'recap';
      nomefile = nomefile + formatDate(this.riepilogoservice.data1, 'dd-MM-yyyy', 'en_US');
      nomefile = nomefile + '_';
      nomefile = nomefile + formatDate(this.riepilogoservice.data2, 'dd-MM-yyyy', 'en_US');
      nomefile = nomefile + '.xlsx';
      saveAs(blob, nomefile);
    });
  }


  optionSelected(event){

    //   <option value="1">Ultimi 7 giorni</option>
    //   <option value="2">Ultimi 30 giorni</option>
    //   <option value="3">Ultimo mese</option>
    //   <option value="4">Ultimo anno</option>
    //   <option value="5">Seleziona range</option>


    switch(event.target.value){
      case '1':
        this.primadata = this.getXDaysAgo(new Date(), 7);
        this.secondadata = new Date();
        this.showDateRange = false;
        break;
      case '2':
        this.primadata = this.getXDaysAgo(new Date(), 30);
        this.secondadata = new Date();
        this.showDateRange = false;
        break;
      case '3':
        this.primadata = this.getFirstDayOfCurrentMonth();
        this.secondadata = new Date();
        this.showDateRange = false;
        break;
      case '4':
        this.primadata = this.getFirstDayOfCurrentYear();
        this.secondadata = new Date();
        this.showDateRange = false;
        break;
      case '5':
        this.showDateRange = true;
        break;
    }
  }


  getXDaysAgo(currentDate: Date, daysAgo: number){
    currentDate.setDate(currentDate.getDate() - daysAgo);
    return currentDate;
  }


  getFirstDayOfCurrentMonth(){
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  }

  getFirstDayOfCurrentYear(){
    return new Date(new Date().getFullYear(), 0, 1);
  }


}
