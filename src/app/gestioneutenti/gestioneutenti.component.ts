import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import LanguageSettings = DataTables.LanguageSettings;
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Fornitore} from '../entities/fornitore';
import {LoginService} from '../services/login.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {Utente} from '../entities/utente';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {AggiungibasedicaricodialogComponent} from '../aggiungibasedicaricodialog/aggiungibasedicaricodialog.component';
import {Basedicarico} from '../entities/basedicarico';
import {AggiungiutentedialogComponent} from '../aggiungiutentedialog/aggiungiutentedialog.component';


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
  selector: 'app-gestioneutenti',
  templateUrl: './gestioneutenti.component.html',
  styleUrls: ['./gestioneutenti.component.css']
})
export class GestioneutentiComponent implements  AfterViewInit, OnDestroy, OnInit  {


  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  tablerows: Utente[] = [];

  constructor(private loginservice: LoginService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.dtOptions = {
      language: LINGUA
    };


    this.loginservice.getallutenti().subscribe(result => {
      this.tablerows = result;
      this.rerender();
    });
  }


  aggiungiutente() {
    const dialogRef = this.dialog.open(AggiungiutentedialogComponent, {
      width: '450px',
      data: new Utente(),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loginservice.creautente(result).subscribe(utenti => {
        if (result.length === this.tablerows.length){
          this.toastr.error("C'è stato un errore nell'aggiunta dell'utente" , "Errore");
        } else {
          this.toastr.success("Utente aggiunto!" , "Aggiunto");
        }
        this.tablerows = utenti;
        this.rerender();
      });
    });
  }

  rimuoviutente(utente: Utente) {

    const confirmDialog = this.dialog.open(ConfermadialogComponent, {
      data: {
        title: 'Rimuovere',
        message: 'Rimuovere utente ' + utente.username + ' ?'
      }
    });

    confirmDialog.afterClosed().subscribe(res => {


      if (res === true) {


        this.loginservice.rimuoviutente(utente).subscribe(result => {
          if (result.length === this.tablerows.length){
            this.toastr.error("C'è stato un errore nella rimozione" , "Errore");
          } else {
            this.toastr.success("Utente rimossa" , "Rimosso");
          }
          this.tablerows = result;
          this.rerender();
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  prendiruolo(utente: Utente) {
    if (utente.ruolo === 0) {return 'AMMINISTRATORE'};
    if (utente.ruolo === 1) {return 'VISUALIZZAZIONE'};
    if (utente.ruolo === 2) {return 'CLIENTE'};
  }

}
