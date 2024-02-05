import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GestioneprezziService} from '../services/gestioneprezzi.service';
import {Router} from '@angular/router';
import {Quotazionegiornalierapuntovendita} from '../entities/quotazionegiornalierapuntovendita';
import {Cliente} from '../entities/cliente';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {GestionefornitoriService} from '../services/gestionefornitori.service';
import {Fornitore} from '../entities/fornitore';
import {Quotazionegiornaliera} from '../entities/quotazionegiornaliera';
import {Observable, Subject} from 'rxjs';
import {Basedicarico} from '../entities/basedicarico';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Prezzoconcorrente} from '../entities/prezzoconcorrente';
import {PrezziconcorrenteService} from '../services/prezziconcorrente.service';
import {DataTableDirective} from 'angular-datatables';
import LanguageSettings = DataTables.LanguageSettings;
import {AggiungiquotazionepuntovenditasoloservitodialogComponent} from '../aggiungiquotazionepuntovenditasoloservitodialog/aggiungiquotazionepuntovenditasoloservitodialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AggiungiprezzoconcorrenzadialogComponent} from '../aggiungiprezzoconcorrenzadialog/aggiungiprezzoconcorrenzadialog.component';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Concorrente} from '../entities/concorrente';


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
  selector: 'app-aggiungimodificaquotazionecondati',
  templateUrl: './aggiungimodificaquotazionecondati.component.html',
  styleUrls: ['./aggiungimodificaquotazionecondati.component.css']
})
export class AggiungimodificaquotazionecondatiComponent implements AfterViewInit, OnDestroy, OnInit {

  quotazioneselezionata: Quotazionegiornalierapuntovendita;
  proprietario: Cliente;
  listafornitori: Fornitore[] = [];
  filteredfornitori: Observable<Fornitore[]>;
  fornitorecontrol = new FormControl();
  fornitoreselezionatodalform: Fornitore;



  fornitoreselezionato: Fornitore;
  quotazionefornitore: Quotazionegiornaliera;


  prezziconcorrenti: Prezzoconcorrente[];

  dataform: FormGroup;



  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  constructor(public gestioneprezzi: GestioneprezziService,
              private router: Router,
              private clienteservice: GestioneclientiService,
              private fornitoriservice: GestionefornitoriService,
              private prezziconcorrenteservice: PrezziconcorrenteService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private toastr: ToastrService) {
    this.quotazioneselezionata = this.gestioneprezzi.quotazioneprezziselezionata;
    this.clienteservice.getproprietario(this.gestioneprezzi.puntovenditaselezionato.puntovendita).subscribe(result => {
      this.proprietario = result;
    });
    this.fornitoriservice.getfornitori().subscribe(
        result => {
          this.listafornitori = result;
        }
    );
    if (this.quotazioneselezionata !== undefined && this.quotazioneselezionata.data !== undefined) {
  //    this.dataselezionata = new Date(this.quotazioneselezionata.data);


      // qui per i prezzi dei concorrenti
      this.clienteservice.getprezziconcorrentidipuntovendita(this.gestioneprezzi.puntovenditaselezionato.puntovendita, this.quotazioneselezionata.data).subscribe(result => {
        console.log("I PREZZI DEI CONCORRENTI");
        console.log(result);
        this.prezziconcorrenti = result;
        this.rerender();
      });
    } else {
    //  this.dataselezionata = new Date(Date.now());
    }
    if (this.quotazioneselezionata === undefined) {
      this.quotazioneselezionata = this.getprezzodipuntovenditapergiornopreventivo();
      this.quotazioneselezionata.id = undefined;
      this.quotazioneselezionata.data = new Date(Date.now());
    }
  }

  ngOnInit(): void {
    this.filteredfornitori = this.fornitorecontrol.valueChanges
        .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.nomebasedicarico),
            map(name => name ? this._filterfornitore(name) : this.listafornitori.slice())
        );
    var dat = new Date();
    this.dataform = this.formBuilder.group(
        {
          data: [dat.toString, Validators.required],
        }
    );
    if (this.quotazioneselezionata.fornitore !== null && this.quotazioneselezionata.fornitore !== undefined) {
      this.fornitorecontrol.setValue(this.quotazioneselezionata.fornitore);
    }
 /*   if (this.quotazioneselezionata?.data !== undefined) {
      this.dataform.controls.data.setValue(formatDate(this.quotazioneselezionata.data, 'yyyy-MM-dd', 'en'));
    } */

    this.dtOptions = {
      language: LINGUA
    };

  }

  dataselezionatadalpicker($event) {
//    this.dataselezionata = new Date($event);
    this.quotazioneselezionata.data = new Date($event);
    this.ricercaprezzofornitore();
  }

  ricercaprezzofornitore() {
    this.quotazionefornitore = this.quotazionedaybased(this.quotazioneselezionata.fornitore);
  }


  tornaindietro() {
    this.gestioneprezzi.quotazioneprezziselezionata = undefined;
    this.router.navigate(['/admin/gestioneprezzisingolocliente']);
  }

  togliiva(valore) {
    return valore / 1.22;
  }

  prezzoinfatturagestore(prezzosivaself, margineself, percentualemargine) {
    return prezzosivaself - (margineself * percentualemargine / 100);
  }
  importodaricooscerealgestoreservito(margineservito, margineself, percentualemargine){
    return margineservito - (margineself * percentualemargine / 100);
  }

  importodaricooscerealgestoreself(margineself, percentualemargine){
    return margineself - (margineself * percentualemargine / 100);
  }

  conguagliodaeffettuare(prezzosiva, margine, prezzoinfattura) {
    return prezzosiva - margine - prezzoinfattura;
  }
  marginefinale(prezzosiva, margine, percentualemargine, quotazione, trasporto, altrocosto) {
    return prezzosiva - margine * percentualemargine / 100 - quotazione - (trasporto / 1000) - (altrocosto / 1000);
  }
  marginemedio(volumeservito, volumeself, marginefinaleserv, marginefinaleself) {
    return ((volumeservito * marginefinaleserv) + (volumeself * marginefinaleself)) / (volumeservito + volumeself);
  }

  displayfornitore(fornitore: Fornitore) {
  //  this.quotazionefornitore = this.quotazionedaybased(fornitore);
  /*  if (fornitore === undefined ) { return ''; }
    for (const quotazione of fornitore?.quotazioni) {
      if (this.sameDay(quotazione?.data, this.quotazioneselezionata?.data)) {
        this.quotazionefornitore = quotazione;
        break;
      }
    } */
    return fornitore && fornitore.nomefornitore ? fornitore.nomefornitore : '';
  }

  fornitoresel(evento) {
    const fornitore = evento.option.value;
    this.quotazioneselezionata.fornitore = fornitore;
    this.quotazionefornitore = this.quotazionedaybased(fornitore);
  }

  quotazionedaybased(fornitore) {
    if (fornitore === undefined || this.quotazioneselezionata === undefined || this.quotazioneselezionata.data === undefined ) {
      return;
    }
    for (const quotazione of fornitore.quotazioni) {
      if (this.sameDay(quotazione.data, new Date(this.quotazioneselezionata.data))) {
        return quotazione;
      }
    }
  }

  sameDay(a: Date, b: Date) {
    const d1 = new Date(a);
    const d2 = new Date(b);
    return d1.getFullYear() === d2.getFullYear()
        && d1.getDate() === d2.getDate()
        && d1.getMonth() === d2.getMonth();
  }




  eliminaprezzoconcorrente(prezzoconcorrente) {
    this.prezziconcorrenteservice.rimuoviprezzoconcorrente(prezzoconcorrente).subscribe(result => {
      this.clienteservice.getprezziconcorrentidipuntovendita(this.gestioneprezzi.puntovenditaselezionato.puntovendita, this.quotazioneselezionata.data).subscribe(res => {
        this.prezziconcorrenti = res;
        this.rerender();
      });
    });
  }

  aggiungiprezzoconcorrente() {
    let dialogRef;
    const prezzo = new Prezzoconcorrente();
    prezzo.data = new Date(this.quotazioneselezionata.data);
    prezzo.id = undefined;
    prezzo.concorrente = new Concorrente();
    dialogRef = this.dialog.open(AggiungiprezzoconcorrenzadialogComponent, {
      width: '450px',
      data: prezzo,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log("STO AGGIUNGENDO IL PREZZO AL CONCORRENTE: ");
        console.log(result);
        this.prezziconcorrenteservice.aggiungiprezzoconcorrente(result, this.gestioneprezzi.puntovenditaselezionato.puntovendita.idpunto).subscribe(ris => {
          this.clienteservice.getprezziconcorrentidipuntovendita(this.gestioneprezzi.puntovenditaselezionato.puntovendita, this.quotazioneselezionata.data).subscribe(res => {
            this.prezziconcorrenti = res;
            this.rerender();
          });
        });
      }
    });

  }


  salvaquotazione() {
    this.clienteservice.aggiungiquotazione(this.quotazioneselezionata, this.gestioneprezzi.puntovenditaselezionato.puntovendita.idpunto).subscribe(
        result => {
          this.tornaindietro();
        }
    );
  }


  private _filterfornitore(name: string): Fornitore[] {
    const filterValue = name.toLowerCase();
    return this.listafornitori.filter(option => option.nomefornitore.toLowerCase().indexOf(filterValue) === 0);
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


  modificatrasportogasolioservito($event) {
    this.quotazioneselezionata.trasportogasolioself = this.quotazioneselezionata.trasportogasolioservito;

    if (this.quotazioneselezionata.prezzobenzina !== undefined && this.quotazioneselezionata.prezzobenzina !== 0) {
      this.quotazioneselezionata.trasportobenzinaservito = this.quotazioneselezionata.trasportogasolioservito;
      this.quotazioneselezionata.trasportobenzinaself = this.quotazioneselezionata.trasportogasolioservito;
    }

    if (this.quotazioneselezionata.prezzosupreme !== undefined && this.quotazioneselezionata.prezzosupreme !== 0) {
      this.quotazioneselezionata.trasportosupremeservito = this.quotazioneselezionata.trasportogasolioservito;
      this.quotazioneselezionata.trasportosupremeself = this.quotazioneselezionata.trasportogasolioservito;
    }

    if (this.quotazioneselezionata.prezzogpl !== undefined && this.quotazioneselezionata.prezzogpl !== 0) {
      this.quotazioneselezionata.trasportogpl = this.quotazioneselezionata.trasportogasolioservito;
    }
  }

  modificaaltrocostogasolioservito($event) {
    this.quotazioneselezionata.altrocostogasolioself = this.quotazioneselezionata.altrocostogasolioservito;

    if (this.quotazioneselezionata.prezzobenzina !== undefined && this.quotazioneselezionata.prezzobenzina !== 0) {
      this.quotazioneselezionata.altrocostobenzinaservito = this.quotazioneselezionata.altrocostogasolioservito;
      this.quotazioneselezionata.altrocostobenzinaself = this.quotazioneselezionata.altrocostogasolioservito;
    }
    if (this.quotazioneselezionata.prezzosupreme !== undefined && this.quotazioneselezionata.prezzosupreme !== 0) {
      this.quotazioneselezionata.altrocostosupremeservito = this.quotazioneselezionata.altrocostogasolioservito;
      this.quotazioneselezionata.altrocostosupremeself = this.quotazioneselezionata.altrocostogasolioservito;
    }
    if (this.quotazioneselezionata.prezzogpl !== undefined && this.quotazioneselezionata.prezzogpl !== 0) {
      this.quotazioneselezionata.altrocostogpl = this.quotazioneselezionata.altrocostogasolioservito;
    }
  }



  getprezzodipuntovenditapergiornopreventivo() {
    for (const quot of this.gestioneprezzi.puntovenditaselezionato.puntovendita.quotazioni) {
      if (this.sameDay(quot.data, new Date())) {
        return quot;
      }
    }
    return this.getdatapassatapiuvicina();
  }


  getdatapassatapiuvicina() {
    var differenza = 0;
    var result = undefined;
    for (const quot of this.gestioneprezzi.puntovenditaselezionato.puntovendita.quotazioni) {
      const differenzaattuale = this.getdifferenzadate(quot.data, new Date());
      if (differenza === 0 || differenzaattuale < differenza) {
        differenza = differenzaattuale;
        result = quot;
      }
    }
    return result;
  }

  getdifferenzadate(a: Date, b: Date) {
    const d1 = new Date(a);
    const d2 = new Date(b);
    return Math.abs(d1.getTime() - d2.getTime());
  }




}
