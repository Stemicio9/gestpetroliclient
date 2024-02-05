import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {Puntovendita} from '../entities/puntovendita';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import LanguageSettings = DataTables.LanguageSettings;
import {Vocedirettificaconvalore} from '../entities/vocedirettificaconvalore';
import {AggiungipuntovenditadialogComponent} from '../aggiungipuntovenditadialog/aggiungipuntovenditadialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AggiungivocedirettificaconvaloredialogComponent} from '../aggiungivocedirettificaconvaloredialog/aggiungivocedirettificaconvaloredialog.component';
import {Quotazionegiornaliera} from '../entities/quotazionegiornaliera';
import {AggiungiquotazionedialogComponent} from '../aggiungiquotazionedialog/aggiungiquotazionedialog.component';
import {AggiungiquotazionepuntovenditadialogComponent} from '../aggiungiquotazionepuntovenditadialog/aggiungiquotazionepuntovenditadialog.component';
import {Quotazionegiornalierapuntovendita} from '../entities/quotazionegiornalierapuntovendita';
import {ToastrService} from 'ngx-toastr';
import {AggiungiquotazionepuntovenditasoloservitodialogComponent} from '../aggiungiquotazionepuntovenditasoloservitodialog/aggiungiquotazionepuntovenditasoloservitodialog.component';


const LANGUAGE_SETTINGS: LanguageSettings = {
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
  selector: 'app-aggiungimodificapuntovendita',
  templateUrl: './aggiungimodificapuntovendita.component.html',
  styleUrls: ['./aggiungimodificapuntovendita.component.css']
})
export class AggiungimodificapuntovenditaComponent implements AfterViewInit, OnDestroy, OnInit {


  @ViewChildren(DataTableDirective)
  dtElements: QueryList<any>;

  dtTrigger = new Subject();

  dtOptions: DataTables.Settings = {};

  tableRows: Vocedirettificaconvalore[] = [];



  dtTriggerquotazioni = new Subject();

  dtOptionsquotazioni: DataTables.Settings = {};

  tableRowsquotazioni: Quotazionegiornalierapuntovendita[] = [];


  aggiungipuntovenditaform: FormGroup;

  puntovendita = this.gestioneclienteservice.puntovenditaselezionato;

  constructor(private router: Router,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private gestioneclienteservice: GestioneclientiService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {


    this.aggiungipuntovenditaform = this.formBuilder.group(
        {
          nome: ['', Validators.compose([Validators.required])],
          via: [''],
          citta: [''],
          provincia: [''],
          cap: [''],
          codicedestinazione: [''],
          email: [''],
          allservito: false
        }
    );

    this.dtOptions = {
      paging: false,
      searching: false,
      info: false,
      ordering: false,
      language: LANGUAGE_SETTINGS
    };

    this.dtOptionsquotazioni = {
      language: LANGUAGE_SETTINGS
    };

    if(this.puntovendita !== undefined) {
      this.tableRows = this.puntovendita.puntovendita.listavocidirettifica;
      this.tableRowsquotazioni = this.puntovendita.puntovendita.quotazioni;
      this.aggiungipuntovenditaform.controls.nome.setValue(this.puntovendita.puntovendita.nome);
      this.aggiungipuntovenditaform.controls.via.setValue(this.puntovendita.puntovendita.via);
      this.aggiungipuntovenditaform.controls.citta.setValue(this.puntovendita.puntovendita.citta);
      this.aggiungipuntovenditaform.controls.provincia.setValue(this.puntovendita.puntovendita.provincia);
      this.aggiungipuntovenditaform.controls.cap.setValue(this.puntovendita.puntovendita.cap);
      this.aggiungipuntovenditaform.controls.codicedestinazione.setValue(this.puntovendita.puntovendita.codicedestinazione);
      this.aggiungipuntovenditaform.controls.email.setValue(this.puntovendita.puntovendita.email);
      this.aggiungipuntovenditaform.controls.allservito.setValue(this.puntovendita.puntovendita.allservito);
    }



  }


  tornaindietro() {
    this.gestioneclienteservice.puntovenditaselezionato = undefined;
    this.router.navigate(['/admin/gestionepuntivendita']);
  }

  eliminavocedirettifica(voce: Vocedirettificaconvalore) {
    const index = this.tableRows.indexOf(voce);
    if (index !== -1) {
      this.gestioneclienteservice.cancellavocedirettificaapuntovendita(this.puntovendita.puntovendita, voce.id).subscribe(res => {
        if (res) {
          this.tableRows.splice(index, 1);
          this.rerender();
        }
      });
    }
  }

  aggiungivocedirettifica() {
    const dialogRef = this.dialog.open(AggiungivocedirettificaconvaloredialogComponent, {
      width: '450px',
      data: new Vocedirettificaconvalore(),
//      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.gestioneclienteservice.aggiungivocedirettificaapuntovendita(result, this.puntovendita.puntovendita.idpunto).subscribe(res => {
          if (res) {
            this.tableRows.push(result);
            this.rerender();
          }
        })
      }
    });

  }




  aggiungipuntovendita() {
    const puntovendita = new Puntovendita();
    if(this.puntovendita !== undefined) {
      puntovendita.idpunto = this.puntovendita.puntovendita.idpunto;
    }

    const nome = this.aggiungipuntovenditaform.controls.nome.value;
    const via = this.aggiungipuntovenditaform.controls.via.value;
    const citta = this.aggiungipuntovenditaform.controls.citta.value;
    const provincia = this.aggiungipuntovenditaform.controls.provincia.value;
    const cap = this.aggiungipuntovenditaform.controls.cap.value;
    const codicedestinazione = this.aggiungipuntovenditaform.controls.codicedestinazione.value;
    const email = this.aggiungipuntovenditaform.controls.email.value;
    const allservito = this.aggiungipuntovenditaform.controls.allservito.value;

    puntovendita.nome = nome;
    puntovendita.via = via;
    puntovendita.citta = citta;
    puntovendita.provincia = provincia;
    puntovendita.cap = cap;
    puntovendita.codicedestinazione = codicedestinazione;
    puntovendita.listavocidirettifica = this.tableRows;
    puntovendita.quotazioni = this.tableRowsquotazioni;
    puntovendita.email = email;
    puntovendita.allservito = allservito;


    this.gestioneclienteservice.aggiungipuntovendita(puntovendita).subscribe(result => {
      this.tornaindietro();
    })
  }
  issolovendita() {
    if (this.aggiungipuntovenditaform.controls.allservito.value) {
      return true;
    } else {
      return false;
    }
  }


  aggiungiquotazione() {
    let dialogRef;
    let quot = this.getprezzodipuntovenditapergiornopreventivo();
    if (quot === undefined) {
      quot = new Quotazionegiornaliera();
    }
    quot.data = new Date();
    quot.id = undefined;
    if (this.aggiungipuntovenditaform.controls.allservito.value) {
       dialogRef = this.dialog.open(AggiungiquotazionepuntovenditasoloservitodialogComponent, {
        width: '450px',
        data: quot,
      });
    } else {
       dialogRef = this.dialog.open(AggiungiquotazionepuntovenditadialogComponent, {
        width: '450px',
        data: quot,
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.gestioneclienteservice.aggiungiquotazione(result, this.puntovendita.puntovendita.idpunto).subscribe(res => {
           this.puntovendita.puntovendita = res;
           this.tableRowsquotazioni = res.quotazioni;
           this.tableRows = res.listavocidirettifica;
           this.rerender();
        })
      }
    });


  }

  getprezzodipuntovenditapergiornopreventivo() {
    for (const quot of this.puntovendita.puntovendita.quotazioni) {
      if (this.sameDay(quot.data, new Date())) {
        return quot;
      }
    }
    return this.getdatapassatapiuvicina();
  }


  getdatapassatapiuvicina() {
    var differenza = 0;
    var result = undefined;
    for (const quot of this.puntovendita.puntovendita.quotazioni) {
      const differenzaattuale = this.getdifferenzadate(quot.data, new Date());
      if(differenza === 0 || differenzaattuale < differenza) {
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

  sameDay(a: Date, b: Date) {
    const d1 = new Date(a);
    const d2 = new Date(b);
    return d1.getFullYear() === d2.getFullYear()
        && d1.getDate() === d2.getDate()
        && d1.getMonth() === d2.getMonth();
  }



  eliminaquotazione(quotazione) {

    this.gestioneclienteservice.rimuoviquotazione(quotazione).subscribe(res => {
      this.puntovendita.puntovendita = res;
      this.tableRowsquotazioni = res.quotazioni;
      this.tableRows = res.listavocidirettifica;
      this.rerender();
    });

  }











  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.dtTriggerquotazioni.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTriggerquotazioni.unsubscribe();
  }


  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      dtElement.dtInstance.then((dtInstance: any) => {
        dtInstance.destroy();
        if(index === 0) {
          this.dtTrigger.next();
        }
        if(index === 1) {
          this.dtTriggerquotazioni.next();
        }
      });
    });
  }


}
