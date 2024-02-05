import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {AggiungipuntovenditadialogComponent} from '../aggiungipuntovenditadialog/aggiungipuntovenditadialog.component';
import {Puntovendita} from '../entities/puntovendita';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {Cliente} from '../entities/cliente';
import LanguageSettings = DataTables.LanguageSettings;
import {ToastrService} from 'ngx-toastr';


const LANGUAGE_SETTINGS: LanguageSettings = {
  emptyTable: 'Non ci sono dati!',
  search: 'cerca',
  searchPlaceholder: 'cerca nella tabella'
};


@Component({
  selector: 'app-aggiungimodificacliente',
  templateUrl: './aggiungimodificacliente.component.html',
  styleUrls: ['./aggiungimodificacliente.component.css'],
})
export class AggiungimodificaclienteComponent implements AfterViewInit, OnDestroy, OnInit {


  aggiungiclienteform: FormGroup;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  //tableHeaders = ['Nome', 'Via', 'Città', 'Provincia', 'CAP' , 'Codice destinazione'];
  tableHeaders = ['nome', 'via', 'azioni'];
  tableRows: Puntovendita[] = [];


  // TUTTO IL MATERIALE PER IL DIALOG
  cliente = this.gestioneclienteservice.clienteselezionato;

  constructor(private router: Router,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private gestioneclienteservice: GestioneclientiService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {


    this.aggiungiclienteform = this.formBuilder.group(
        {
      nomecliente: ['', Validators.compose([Validators.required])],
      partitaiva: ['', Validators.required],

          marginegasolioservito: ['', Validators.required],
          marginegasolioself: ['', Validators.required],
          marginebenzinaservito: ['', Validators.required],
          marginebenzinaself: ['', Validators.required],
          marginesupremeservito: ['', Validators.required],
          marginesupremeself: ['', Validators.required],
          marginegplservito: ['', Validators.required],
          marginegplself: ['', Validators.required],
    }
    );

    this.dtOptions = {
      paging: false,
      searching: false,
      info: false,
      ordering: false,
      language: LANGUAGE_SETTINGS
    };

    if(this.cliente != undefined){
      this.tableRows = this.cliente.listapuntivendita;
      this.aggiungiclienteform.controls.nomecliente.setValue(this.cliente.nomecliente);
      this.aggiungiclienteform.controls.partitaiva.setValue(this.cliente.partitaiva);

      this.aggiungiclienteform.controls.marginegasolioservito.setValue(this.cliente.marginegasolioservito);
      this.aggiungiclienteform.controls.marginegasolioself.setValue(this.cliente.marginegasolioself);

      this.aggiungiclienteform.controls.marginebenzinaservito.setValue(this.cliente.marginebenzinaservito);
      this.aggiungiclienteform.controls.marginebenzinaself.setValue(this.cliente.marginebenzinaself);

      this.aggiungiclienteform.controls.marginesupremeservito.setValue(this.cliente.marginesupremeservito);
      this.aggiungiclienteform.controls.marginesupremeself.setValue(this.cliente.marginesupremeself);

      this.aggiungiclienteform.controls.marginegplservito.setValue(this.cliente.marginegplservito);
      this.aggiungiclienteform.controls.marginegplself.setValue(this.cliente.marginegplself);
    }




  }


  tornaindietro() {
    this.gestioneclienteservice.clienteselezionato = undefined;
    this.router.navigate(['/admin/gestioneclienti']);
  }


  eliminapuntovendita(puntovendita){
    console.log("ELIMINO PUNTO VENDITA");
    const index = this.tableRows.indexOf(puntovendita);
    console.log("INDICE = ");
    console.log(index);
    if(index !== -1) {
      this.tableRows.splice(index,1);
      this.rerender();
    }
  }


  aggiungipuntovendita(){
    const dialogRef = this.dialog.open(AggiungipuntovenditadialogComponent, {
      width: '450px',
      data: new Puntovendita(),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("PUNTO VENDITA ASSOCIATO = ");
      console.log(result);
      if(result !== undefined) {
        this.tableRows.push(result);
        this.rerender();
      }
    });

  }


  aggiungicliente() {
    const nomecliente = this.aggiungiclienteform.controls.nomecliente.value;
    const partitaiva = this.aggiungiclienteform.controls.partitaiva.value;

    const marginegasolioservito = this.aggiungiclienteform.controls.marginegasolioservito.value;
    const marginegasolioself = this.aggiungiclienteform.controls.marginegasolioself.value;

    const marginebenzinaservito = this.aggiungiclienteform.controls.marginebenzinaservito.value;
    const marginebenzinaself = this.aggiungiclienteform.controls.marginebenzinaself.value;

    const marginesupremeservito = this.aggiungiclienteform.controls.marginesupremeservito.value;
    const marginesupremeself = this.aggiungiclienteform.controls.marginesupremeself.value;

    const marginegplservito = this.aggiungiclienteform.controls.marginegplservito.value;
    const marginegplself = this.aggiungiclienteform.controls.marginegplself.value;


    const cliente = new Cliente();
    cliente.nomecliente = nomecliente;
    cliente.partitaiva = partitaiva;
    cliente.listapuntivendita = this.tableRows;
    cliente.marginegasolioservito = marginegasolioservito;
    cliente.marginegasolioself = marginegasolioself;
    cliente.marginebenzinaservito = marginebenzinaservito;
    cliente.marginebenzinaself = marginebenzinaself;
    cliente.marginesupremeservito = marginesupremeservito;
    cliente.marginesupremeself = marginesupremeself;
    cliente.marginegplservito = marginegplservito;
    cliente.marginegplself = marginegplself;

    if(this.cliente === undefined) {

      this.gestioneclienteservice.aggiungicliente(cliente).subscribe(result => {
            this.toastr.success("Cliente aggiunto!" , "Aggiunto");
            this.tornaindietro();
          },
          error => {
            this.toastr.error("C'è stato un errore!" , "Errore");
            console.log("C'è stato un errore")
          });
    }else{
      cliente.idcliente = this.cliente.idcliente;
      this.gestioneclienteservice.aggiornacliente(cliente).subscribe(result => {
        this.toastr.success("Cliente modificato!" , "Modificato");
        this.tornaindietro();
      }, error=> {
        this.toastr.error("C'è stato un errore!" , "Errore");
        console.log("C'è stato un errore");
      })
    }
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
