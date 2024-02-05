import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Atk} from '../entities/atk';
import {Rimorchio} from '../entities/rimorchio';
import {Autista} from '../entities/autista';
import {Router} from '@angular/router';
import {GestionetrasportiService} from '../services/gestionetrasporti.service';
import LanguageSettings = DataTables.LanguageSettings;
import {MatDialog} from '@angular/material/dialog';
import {AggiungiatkdialogComponent} from '../aggiungiatkdialog/aggiungiatkdialog.component';
import {AggiungirimorchiodialogComponent} from '../aggiungirimorchiodialog/aggiungirimorchiodialog.component';
import {AggiungiautistadialogComponent} from '../aggiungiautistadialog/aggiungiautistadialog.component';
import {Trasportatore} from '../entities/trasportatore';
import {ToastrService} from 'ngx-toastr';


const LANGUAGE_SETTINGS: LanguageSettings = {
  emptyTable: 'Non ci sono dati!',
  search: 'cerca',
  searchPlaceholder: 'cerca nella tabella'
};


@Component({
  selector: 'app-aggiungimodificatrasportatore',
  templateUrl: './aggiungimodificatrasportatore.component.html',
  styleUrls: ['./aggiungimodificatrasportatore.component.css']
})
export class AggiungimodificatrasportatoreComponent implements AfterViewInit, OnDestroy, OnInit {

  aggiungitrasportatoreform: FormGroup;

/*  @ViewChild(DataTableDirective ,{static: false})
  dtElement: DataTableDirective; */

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};


  @ViewChildren(DataTableDirective)
  dtElements: QueryList<any>;

/*  @ViewChild('tabellarimorchi', {static: false, read: HTMLElement})
  dtElementrimorchi: DataTableDirective; */

  dtTriggerrimorchi = new Subject();

  dtOptionsrimorchi: DataTables.Settings = {};

/*  @ViewChild('tabellaautisti', {static: false, read: HTMLElement})
  dtElementautisti: DataTableDirective; */

  dtTriggerautisti = new Subject();

  dtOptionsautisti: DataTables.Settings = {};



  trasportatore = this.gestionetrasportatore.trasportatoreselezionato;

  listaatk: Atk[] = [];
  listarimorchi: Rimorchio[] = [];
  listaautisti: Autista[] = [];

  constructor(private router: Router,  public dialog: MatDialog,
              private gestionetrasportatore: GestionetrasportiService, private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {

    this.aggiungitrasportatoreform = this.formBuilder.group(
        {
          nometrasportatore: ['', Validators.compose([Validators.required])]
        }
    );


    this.dtOptions = {
      paging: false,
      searching: false,
      info: false,
      ordering: false,
      language: LANGUAGE_SETTINGS
    };


    this.dtOptionsrimorchi = {
      paging: false,
      searching: false,
      info: false,
      ordering: false,
      language: LANGUAGE_SETTINGS
    };

    this.dtOptionsautisti = {
      paging: false,
      searching: false,
      info: false,
      ordering: false,
      language: LANGUAGE_SETTINGS
    };


    if(this.trasportatore !== undefined) {
      this.listaatk = this.trasportatore.listaatk;
      this.listarimorchi = this.trasportatore.listarimorchi;
      this.listaautisti = this.trasportatore.listaautisti;
      this.aggiungitrasportatoreform.controls.nometrasportatore.setValue(this.trasportatore.nometrasportatore);
    }
  }

  aggiungitrasportatore() {
    const trasportatoredaaggiungere = new Trasportatore();
    trasportatoredaaggiungere.listaautisti = this.listaautisti;
    trasportatoredaaggiungere.listaatk = this.listaatk;
    trasportatoredaaggiungere.listarimorchi = this.listarimorchi;
    trasportatoredaaggiungere.nometrasportatore = this.aggiungitrasportatoreform.controls.nometrasportatore.value;

    this.gestionetrasportatore.aggiungitrasportatore(trasportatoredaaggiungere).subscribe(result => {
      if(this.trasportatore !== undefined) {
        this.toastr.success("Trasportatore aggiornato!", "Aggiornato")
      } else {
        this.toastr.success("Trasportatore aggiunto!", "Aggiunto")
      }
      this.tornaindietro();
    });

  }


  aggiungiatk() {
    this.gestionetrasportatore.listarimorchiperdialog = this.listarimorchi;

    const dialogRef = this.dialog.open(AggiungiatkdialogComponent, {
      width: '450px',
      height: '600px',
      data: new Atk(),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.listaatk.push(result);
        this.rerender();
        this.gestionetrasportatore.listarimorchiperdialog = undefined;
      }
    });

  }

  aggiungirimorchio() {
    const dialogRef = this.dialog.open(AggiungirimorchiodialogComponent, {
      width: '450px',
      data: new Rimorchio(),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.listarimorchi.push(result);
        this.rerender();

      }
    });

  }

  aggiungiautista() {
    const dialogRef = this.dialog.open(AggiungiautistadialogComponent, {
      width: '450px',
      data: new Autista(),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.listaautisti.push(result);
        this.rerender();

      }
    });

  }


  eliminaatk(atk: Atk) {
    const index = this.listaatk.indexOf(atk);
    if (index !== -1) {
      this.listaatk.splice(index, 1);
      if (atk.idatk !== undefined) {
        this.gestionetrasportatore.rimuoviatk(atk.idatk).subscribe(result => {
          if (result) {
            this.toastr.info("Rimosso Atk dal database" , "Rimosso");
          }
        });
      }
      this.rerender();
    }
  }

  eliminarimorchio(rimorchio: Rimorchio) {
    const index = this.listarimorchi.indexOf(rimorchio);
    console.log(index);
    if (index !== -1) {
      this.listarimorchi.splice(index, 1);
      if (rimorchio.targa !== undefined) {
        this.gestionetrasportatore.rimuovirimorchio(rimorchio.targa).subscribe(result => {
          if (result) {
            this.toastr.info("Rimosso Rimorchio dal database" , "Rimosso");
          }
        });
      }
      this.rerender();
    }
  }

  eliminaautista(autista: Autista) {
    const index = this.listaautisti.indexOf(autista);
    if (index !== -1) {
      this.listaautisti.splice(index, 1);
      if (autista.idautista !== undefined) {
        this.gestionetrasportatore.rimuoviautista(autista.idautista).subscribe(result => {
          if (result) {
            this.toastr.info("Rimosso Autista dal database" , "Rimosso");
          }

        });
      }
      this.rerender();
    }
  }

  tornaindietro() {
    this.gestionetrasportatore.trasportatoreselezionato = undefined;
    this.router.navigate(['/admin/gestionetrasportatori']);
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.dtTriggerautisti.next();
    this.dtTriggerrimorchi.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTriggerautisti.unsubscribe();
    this.dtTriggerrimorchi.unsubscribe();
  }


  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      dtElement.dtInstance.then((dtInstance: any) => {
          dtInstance.destroy();
          if(index == 0){
            this.dtTrigger.next();
          }
          if(index == 1) {
            this.dtTriggerrimorchi.next();
          }
          if(index == 2){
            this.dtTriggerautisti.next();
          }
      });
    });
  }





}
