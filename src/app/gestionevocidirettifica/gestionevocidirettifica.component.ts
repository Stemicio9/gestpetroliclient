import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GestionevocidirettificaService} from '../services/gestionevocidirettifica.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import LanguageSettings = DataTables.LanguageSettings;
import {Vocedirettifica} from '../entities/vocedirettifica';
import {AggiungivocedirettificadialogComponent} from '../aggiungivocedirettificadialog/aggiungivocedirettificadialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';

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
  selector: 'app-gestionevocidirettifica',
  templateUrl: './gestionevocidirettifica.component.html',
  styleUrls: ['./gestionevocidirettifica.component.css']
})
export class GestionevocidirettificaComponent implements  AfterViewInit, OnDestroy, OnInit  {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  listavocidirettifica: Vocedirettifica[] = [];

  constructor(private vocedirettificaservice: GestionevocidirettificaService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.dtOptions = {
      language: LINGUA
    };

    this.vocedirettificaservice.getvocidirettifica().subscribe(result => {
      this.listavocidirettifica = result;
      this.rerender();
    });
  }

  eliminavoce(voce: Vocedirettifica) {

    const confirmDialog = this.dialog.open(ConfermadialogComponent, {
      data: {
        title: 'Rimuovere',
        message: 'Rimuovere la voce di rettifica ' + voce.nomevoce + ' ?'
      }
    });


    confirmDialog.afterClosed().subscribe(res => {


      if (res === true) {


        this.vocedirettificaservice.rimuovivocedirettifica(voce.idvocedirettifica).subscribe(result => {

          if (result.length === this.listavocidirettifica.length){
            this.toastr.error("C'è stato un errore nella rimozione" , "Errore");
          } else {
            this.toastr.success("Voce di rettifica rimossa" , "Rimosso");
          }

          this.listavocidirettifica = result;
          this.rerender();
        });


      }
    });
  }


  aggiungivocedirettifica() {
    const dialogRef = this.dialog.open(AggiungivocedirettificadialogComponent, {
      width: '450px',
      data: new Vocedirettifica(),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.vocedirettificaservice.aggiungivocedirettifica(result).subscribe(listavoci => {

        if (result.length === this.listavocidirettifica.length){
          this.toastr.error("C'è stato un errore nell'aggiunta" , "Errore");
        } else {
          this.toastr.success("Voce di rettifica aggiunta!" , "Aggiunto");
        }


        this.listavocidirettifica = listavoci;
        this.rerender();
      });
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


}
