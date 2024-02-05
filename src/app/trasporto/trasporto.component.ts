import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import LanguageSettings = DataTables.LanguageSettings;
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Fabbisogno} from '../entities/fabbisogno';
import {Router} from '@angular/router';
import {FabbisognoService} from '../services/fabbisogno.service';
import {TrasportoService} from '../services/trasporto.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {ToastrService} from 'ngx-toastr';


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
  selector: 'app-trasporto',
  templateUrl: './trasporto.component.html',
  styleUrls: ['./trasporto.component.css']
})
export class TrasportoComponent implements  AfterViewInit, OnDestroy, OnInit{

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  listafabbisogni: Fabbisogno[] = [];

  constructor(private router: Router, private fabbisognoservice: FabbisognoService,
              private trasportoservice: TrasportoService,
              public dialog: MatDialog,
              private toastr: ToastrService) { }

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



  creatrasporto(fabbisogno) {
    this.trasportoservice.fabbisognoselezionato = fabbisogno;
      this.router.navigate(['/admin/creatrasporto']);
  }

  visualizzatrasporto(fabbisogno){

    this.trasportoservice.gettrasporto(fabbisogno).subscribe(result => {
      this.trasportoservice.fabbisognoselezionato = fabbisogno;
      this.trasportoservice.trasportoselezionato = result;
      this.router.navigate(['/admin/creatrasporto']);
    });


  }

  rimuovitrasporto(fabbisogno) {


    const confirmDialog = this.dialog.open(ConfermadialogComponent, {
      data: {
        title: 'Sicuro di voler eliminare il trasporto associato?',
        message: 'Conferma per continuare'
      }
    });



    confirmDialog.afterClosed().subscribe(res => {


      if (res === true) {


        this.trasportoservice.cancelladafabbisogno(fabbisogno).subscribe(result => {
          this.fabbisognoservice.getallfabbisogni().subscribe(fabbisogni => {
            this.listafabbisogni = fabbisogni;
            this.toastr.success("Trasporto rimosso" , "Rimosso");
            this.rerender();
          });

        });

      }

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
