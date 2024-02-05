import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import LanguageSettings = DataTables.LanguageSettings;
import {Basedicarico} from '../entities/basedicarico';
import {GestionebasidicaricoService} from '../services/gestionebasidicarico.service';
import {AggiungibasedicaricodialogComponent} from '../aggiungibasedicaricodialog/aggiungibasedicaricodialog.component';
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
  selector: 'app-gestionebasidicarico',
  templateUrl: './gestionebasidicarico.component.html',
  styleUrls: ['./gestionebasidicarico.component.css']
})
export class GestionebasidicaricoComponent implements  AfterViewInit, OnDestroy, OnInit  {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  listabasidicarico: Basedicarico[] = [];

  constructor(private basidicaricoservice: GestionebasidicaricoService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.dtOptions = {
      language: LINGUA
    };

    this.basidicaricoservice.getbasidicarico().subscribe(result => {
      this.listabasidicarico = result;
      this.rerender();
    });
  }

  eliminabase(base: Basedicarico) {

    const confirmDialog = this.dialog.open(ConfermadialogComponent, {
      data: {
        title: 'Rimuovere',
        message: 'Rimuovere la base di carico ' + base.nomebasedicarico + ' ?'
      }
    });


    confirmDialog.afterClosed().subscribe(res => {


      if (res === true) {

        this.basidicaricoservice.rimuovibasedicarico(base.idbasedicarico).subscribe(result => {
          if (result.length === this.listabasidicarico.length){
            this.toastr.error("C'è stato un errore nella rimozione" , "Errore");
          } else {
            this.toastr.success("Base di carico rimossa" , "Rimosso");
          }
          this.listabasidicarico = result;
          this.rerender();
        });

      }
    });

  }


  aggiungibasedicarico() {
    const dialogRef = this.dialog.open(AggiungibasedicaricodialogComponent, {
      width: '450px',
      data: new Basedicarico(),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.basidicaricoservice.aggiungibasedicarico(result).subscribe(listabasi => {
        if (result.length === this.listabasidicarico.length){
          this.toastr.error("C'è stato un errore nell'aggiunta della base di carico" , "Errore");
        } else {
          this.toastr.success("Base di carico aggiunta!" , "Aggiunta");
        }
        this.listabasidicarico = listabasi;
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
