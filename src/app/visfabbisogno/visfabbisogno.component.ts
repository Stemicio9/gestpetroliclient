import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Fabbisogno} from '../entities/fabbisogno';
import {Router} from '@angular/router';
import {FabbisognoService} from '../services/fabbisogno.service';
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
  selector: 'app-visfabbisogno',
  templateUrl: './visfabbisogno.component.html',
  styleUrls: ['./visfabbisogno.component.css']
})
export class VisfabbisognoComponent implements  AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  listafabbisogni: Fabbisogno[] = [];

  constructor(private router: Router, private fabbisognoservice: FabbisognoService,
              private toastr: ToastrService, private dialog: MatDialog) { }



  ngOnInit(): void {


    this.dtOptions = {
      language: LINGUA,
    };

    this.fabbisognoservice.getallfabbisogni().subscribe(result => {
      this.listafabbisogni = result;
      //   this.dtTrigger.next();
      this.rerender();
    });

  }


  vaiapaginafabbisogno(info): void {
    this.fabbisognoservice.fabbisognoselezionato = info;
    this.router.navigate(['/admin/visaggiungimodificafabbisogno']);
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
