import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Cliente} from '../entities/cliente';
import {Fabbisogno} from '../entities/fabbisogno';
import LanguageSettings = DataTables.LanguageSettings;
import {FabbisognoService} from '../services/fabbisogno.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {MatDialog} from '@angular/material/dialog';



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
  selector: 'app-fabbisogno',
  templateUrl: './fabbisogno.component.html',
  styleUrls: ['./fabbisogno.component.css']
})
export class FabbisognoComponent implements  AfterViewInit, OnDestroy, OnInit {

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

  aggiungifabbisogno() {
    this.router.navigate(['/admin/aggiungimodificafabbisogno']);
  }

  vaiapaginafabbisogno(info): void {
       this.fabbisognoservice.fabbisognoselezionato = info;
       this.router.navigate(['/admin/aggiungimodificafabbisogno']);
  }

  eliminafabbisogno(fabbisogno: Fabbisogno) {

    const confirmDialog = this.dialog.open(ConfermadialogComponent, {
      data: {
        title: 'Vuoi rimuovere il fabbisogno selezionato?',
        message: 'Punto vendita: ' + fabbisogno.puntoVendita.nome
      }
    });


    confirmDialog.afterClosed().subscribe(res => {

      if (res === true) {
        this.fabbisognoservice.eliminafabbisogno(fabbisogno).subscribe(result => {

          if (this.listafabbisogni.length === result.length) {
            this.toastr.error("Errore nell'eliminazione del fabbisogno", "Errore");
          } else {
            this.toastr.success("Fabbisogno eliminato!", "Eliminato!")
          }

          this.listafabbisogni = result;
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
