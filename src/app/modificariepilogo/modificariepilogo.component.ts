import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {RiepilogoService} from '../services/riepilogo.service';
import {Router} from '@angular/router';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {Fornitore} from '../entities/fornitore';
import LanguageSettings = DataTables.LanguageSettings;
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {AggiungibasedicaricodialogComponent} from '../aggiungibasedicaricodialog/aggiungibasedicaricodialog.component';
import {Basedicarico} from '../entities/basedicarico';
import {AggiungibonificodialogComponent} from '../aggiungibonificodialog/aggiungibonificodialog.component';
import {Bonifico} from '../entities/bonifico';
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
  selector: 'app-modificariepilogo',
  templateUrl: './modificariepilogo.component.html',
  styleUrls: ['./modificariepilogo.component.css']
})
export class ModificariepilogoComponent implements  AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  riepilogo = this.riepilogoservice.riepilogoselezionato;

  constructor(private toastr: ToastrService,
              private dialog: MatDialog,
              private riepilogoservice: RiepilogoService,
              private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: LINGUA,
      paging: false,
      search: false,
    };
    console.log('INIZIO A STAMPARE I FILE');
    console.log(this.riepilogo.files);
  }

  aggiornadatabonifico(event) {
    this.riepilogo.databonifico = new Date(event);
  }

  salvariepilogo() {
    var confirmDialog;
    if (!this.riepilogo.das) {
       confirmDialog = this.dialog.open(ConfermadialogComponent, {
        data: {
          title: 'Vuoi salvare il riepilogo?',
          message: 'Non verrà ancora eliminato il fabbisogno (non è stato inserito il DAS)'
        }
      });
    } else {
       confirmDialog = this.dialog.open(ConfermadialogComponent, {
        data: {
          title: 'Vuoi salvare il riepilogo?',
          message: 'Verrà eliminato il fabbisogno dalle altre liste (il DAS è stato inserito)'
        }
      });
    }

    confirmDialog.afterClosed().subscribe(res => {
      if (res === true) {

          this.riepilogoservice.salvariepilogo(this.riepilogo).subscribe(result => {
            if (result) {
              this.toastr.success("Riepilogo modificato!", "Modificato!");
              this.tornaindietro();
            } else {
              this.toastr.error("C'è stato un errore nella modifica!", "Errore!");
            }
          });

        }
    });
  }

  aggiungibonifico() {
    const dialogRef = this.dialog.open(AggiungibonificodialogComponent, {
      width: '450px',
      data: new Bonifico(),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.riepilogoservice.aggiungibonifico(result, this.riepilogo.id).subscribe(res => {
        this.riepilogo = res;
        this.riepilogoservice.riepilogoselezionato = res;
        this.rerender();
      });
    });
  }


  rimuovibonifico(selezionato) {

    const confirmDialog = this.dialog.open(ConfermadialogComponent, {
      data: {
        title: 'Vuoi rimuovere il bonifico selezionato?',
        message: 'Conferma rimozione'
      }
    });

    confirmDialog.afterClosed().subscribe(res => {
      if (res === true) {
          this.riepilogoservice.rimuovibonifico(selezionato, this.riepilogo.id).subscribe(result => {
            this.riepilogo = result;
            this.riepilogoservice.riepilogoselezionato = result;
            this.rerender();
          });
      }
    });
  }


  prezzogasoliodioggi(fornitore: Fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.confrontadate(quot.data, this.riepilogo.fabbisogno.data)) {
        return quot.prezzogasolio;
      }
    }
  }

  prezzobenzinadioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.confrontadate(quot.data, this.riepilogo.fabbisogno.data)) {
        return quot.prezzobenzina;
      }
    }
  }

  prezzosupremedioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.confrontadate(quot.data, this.riepilogo.fabbisogno.data)) {
        return quot.prezzosupreme;
      }
    }
  }

  prezzogpldioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.confrontadate(quot.data, this.riepilogo.fabbisogno.data)) {
        return quot.prezzogpl
      }
    }
  }

  isToday(data: Date) {
    const today = new Date().toDateString();
    const dataricercata = new Date(data);
    const time = dataricercata.toDateString();
    return today === time;
  }

  confrontadate(data1: Date, data2: Date) {
    const dataricercata1 = new Date(data1);
    const dataricercata2 = new Date(data2);
    return dataricercata1.toDateString() === dataricercata2.toDateString();
  }

  tornaindietro() {
    this.riepilogoservice.riepilogoselezionato = undefined;
    this.router.navigate(['/admin/riepilogo']);
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



  fileselezionato: any;

  caricafile() {
    if(this.fileselezionato === undefined) return;
    console.log('Il file selezionato è : ');
    console.log(this.fileselezionato);
    this.riepilogoservice.aggiungifile(this.fileselezionato,this.riepilogo.id).subscribe(result => {
      if(result === true) {
        this.riepilogo.files.push(this.fileselezionato);
      }
    });
  }

  eliminafile(idfile){
    this.riepilogoservice.rimuovifile(idfile,this.riepilogo.id).subscribe(result => {
      if(result === true) {
        const ind = this.riepilogo.files.indexOf(this.fileselezionato);
        this.riepilogo.files.splice(ind, 1);
      }
    });
  }

  prendituttifile() {
    this.riepilogoservice.prendituttifile(this.riepilogo.id).subscribe(result => {

    })
  }

  aprisingolofile(file) {
    this.riepilogoservice.prendisingolofile(file.id).subscribe(result => {
       saveAs(result, file.name);
    });
  }


}
