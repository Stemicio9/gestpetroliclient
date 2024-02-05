import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import LanguageSettings = DataTables.LanguageSettings;
import {Cliente} from '../entities/cliente';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
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
  selector: 'app-gestioneclienti',
  templateUrl: './gestioneclienti.component.html',
  styleUrls: ['./gestioneclienti.component.css']
})
export class GestioneclientiComponent implements  AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  listaclienti: Cliente[] = [];

  constructor(private router: Router,
              private gestioneclientiservice: GestioneclientiService,
              private toastr: ToastrService,
              public dialog: MatDialog
              ) { }

  ngOnInit(): void {


    this.dtOptions = {
      language: LINGUA,
   /*   rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.vaiapaginacliente(data);
        });
        return row;
      } */
    };

    this.gestioneclientiservice.getallclienti().subscribe(result => {
      this.listaclienti = result;
   //   this.dtTrigger.next();
      this.rerender();
    });

  }

  vaiapaginacliente(info): void {
    this.gestioneclientiservice.clienteselezionato = info;
    this.router.navigate(['/admin/aggiungimodificacliente']);
  }


  aggiungicliente() {
     this.router.navigate(['/admin/aggiungimodificacliente']);
  }

  eliminacliente(cliente: Cliente) {

    const confirmDialog = this.dialog.open(ConfermadialogComponent, {
      data: {
        title: 'Rimuovere',
        message: 'Rimuovere il cliente ' + cliente.nomecliente + ' ?'
      }
    });


    confirmDialog.afterClosed().subscribe(res => {


      if (res === true) {

        this.gestioneclientiservice.eliminacliente(cliente.idcliente).subscribe(result => {
          if (result.length === this.listaclienti.length){
            this.toastr.error("C'è stato un errore nella rimozione" , "Errore");
          } else {
            this.toastr.success("Cliente rimosso" , "Rimosso");
          }
          this.listaclienti = result;
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


  contalista(lista:any[]) {
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
