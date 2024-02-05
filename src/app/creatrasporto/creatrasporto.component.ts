import {AfterViewInit, Component, OnChanges, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewRef} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {TrasportoService} from '../services/trasporto.service';
import {Cliente} from '../entities/cliente';
import {Trasportatore} from '../entities/trasportatore';
import {GestionetrasportiService} from '../services/gestionetrasporti.service';
import {Atk} from '../entities/atk';
import {Rimorchio} from '../entities/rimorchio';
import {Autista} from '../entities/autista';
import {MatOption} from '@angular/material/core';
import {Trasporto} from '../entities/trasporto';
import {ToastrService} from 'ngx-toastr';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Basedicarico} from '../entities/basedicarico';
import {Puntovenditaconcliente} from '../entities/puntovenditaconcliente';

@Component({
  selector: 'app-creatrasporto',
  templateUrl: './creatrasporto.component.html',
  styleUrls: ['./creatrasporto.component.css']
})
export class CreatrasportoComponent implements OnInit {

  trasportoselezionato = this.trasportoservice.trasportoselezionato;
  fabbisognoselezionato = this.trasportoservice.fabbisognoselezionato;
  proprietario: Cliente;


  trasportatoreselezionato: Trasportatore;
  atkselezionato: Atk;
  rimorchioselezionato: Rimorchio;
  autistaselezionato: Autista;

  listatrasportatori: Trasportatore[] = [];
  filteredtrasportatori: Observable<Trasportatore[]>;
  trasportatorecontrol = new FormControl();

  atkcontrol = new FormControl();
  filteredatk: Observable<Atk[]>;

  rimorchiocontrol = new FormControl();
  filteredrimorchi: Observable<Rimorchio[]>;

  autistacontrol = new FormControl();
  filteredautisti: Observable<Autista[]>;

  identificativotrasporto: string;



  constructor(private router: Router, public dialog: MatDialog,
              private trasportoservice: TrasportoService, private gestioneclienti: GestioneclientiService,
              private trasportatoriservice: GestionetrasportiService, private toastr: ToastrService) {
    this.gestioneclienti.getproprietario(this.fabbisognoselezionato.puntoVendita).subscribe(result => {
      this.proprietario = result
    });




  }

  ngOnInit(): void {



    this.trasportatoriservice.getalltrasportatori().subscribe(result => {
      this.listatrasportatori = result;

      if (this.trasportoselezionato !== undefined && this.trasportatoreselezionato !== null) {

        this.trasportatoreselezionato = this.cercatrasportatoredalnome(this.trasportoselezionato.nometrasportatore);


        this.atkselezionato = this.trasportoselezionato.atk;
        this.rimorchioselezionato = this.trasportoselezionato.rimorchio;
        this.autistaselezionato = this.trasportoselezionato.autista;

        console.log(this.trasportatoreselezionato.nometrasportatore);
        console.log(this.atkselezionato.codice);
        console.log(this.rimorchioselezionato.targa);
        console.log(this.autistaselezionato.nomeautista);

        this.trasportatorecontrol.setValue(this.trasportatoreselezionato);
        this.atkcontrol.setValue(this.atkselezionato);
        this.rimorchiocontrol.setValue(this.rimorchioselezionato.targa);
        this.autistacontrol.setValue(this.autistaselezionato);
      }


      this.filteredtrasportatori = this.trasportatorecontrol.valueChanges
          .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.nometrasportatore),
              map(name => name ? this._filtertrasportatore(name) : this.listatrasportatori.slice())
          );

      this.filteredatk = this.atkcontrol.valueChanges
          .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.codice),
              map(name => name ? this._filteredatk(name) : this.trasportatoreselezionato.listaatk.slice())
          );

      this.filteredrimorchi = this.rimorchiocontrol.valueChanges
          .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.targa),
              map(name => name ? this._filteredrimorchio(name) : this.trasportatoreselezionato.listarimorchi.slice())
          );

      this.filteredautisti = this.autistacontrol.valueChanges
          .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.nomeautista),
              map(name => name ? this._filteredautista(name) : this.trasportatoreselezionato.listaautisti.slice())
          );


    });


  }

  displaytrasportatore(trasportatore: Trasportatore) {
    return trasportatore && trasportatore.nometrasportatore ? trasportatore.nometrasportatore : '';
  }

  displayatk(atk: Atk) {
    return atk && atk.codice ? atk.codice : '';
  }

  displayrimorchio(rimorchio: Rimorchio) {
    return rimorchio && rimorchio.targa ? rimorchio.targa : '';
  }

  displayautista(autista: Autista) {
    return autista && autista.nomeautista ? autista.nomeautista : '';
  }

  private _filtertrasportatore(name: string): Trasportatore[] {
    const filterValue = name.toLowerCase();
    return this.listatrasportatori.filter(option => option.nometrasportatore.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filteredatk(name: string): Atk[] {

    const filterValue = name.toLowerCase();
    return this.trasportatoreselezionato.listaatk.filter(option => option.codice.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filteredrimorchio(name: string): Rimorchio[] {

    const filterValue = name.toLowerCase();
    return this.trasportatoreselezionato.listarimorchi.filter(option => option.targa.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filteredautista(name: string): Autista[] {

    const filterValue = name.toLowerCase();
    return this.trasportatoreselezionato.listaautisti.filter(option => option.nomeautista.toLowerCase().indexOf(filterValue) === 0);
  }

  cercatrasportatoredalnome(nometrasportatore) {
    for (const transp of this.listatrasportatori) {
      if (transp.nometrasportatore === nometrasportatore) {
        return transp;
      }
    }
  }


  autsel(event) {
    const idaut = event.option.value.idautista;
    this.autistaselezionato = this.cercaautista(idaut);
  }

  rimsel(event) {
    const idrim = event.option.value.targa;
    this.rimorchioselezionato = this.cercarimorchio(idrim);
  }

  atksel(event) {
    const codiceatk = event.option.value.idatk;
    this.atkselezionato = this.cercaatk(codiceatk);


    console.log("IL RiMORCHIO suggerito è");
    console.log(this.atkselezionato.suggerito);


    console.log("IL trasportatore selezionato è ");
    console.log(this.trasportatoreselezionato);



    const rim = this.cercarimorchio(this.atkselezionato.suggerito);

    console.log("IL RiMORCHIO che ho trovato è");
    console.log(rim);




    this.rimorchioselezionato = rim;
    this.rimorchiocontrol.setValue(this.rimorchioselezionato.targa);


  }

  traspsel(event) {
    const trasportatore = event.option.value;
    console.log("TRASPSEL CHIAMATO CON TRASPORTATORE ");
    console.log(trasportatore);

    this.trasportatoreselezionato = trasportatore;

    this.atkselezionato = new Atk();
    this.rimorchioselezionato = new Rimorchio();
    this.autistaselezionato = new Autista();

    this.atkcontrol.setValue(this.atkselezionato);
    this.rimorchiocontrol.setValue(this.rimorchioselezionato.targa);
    this.autistacontrol.setValue(this.autistaselezionato);
  }


  cercaautista(id) {
    for (let aut of this.trasportatoreselezionato.listaautisti) {
      if (aut.idautista === id) {
        return aut;
      }
    }
  }

  cercarimorchio(id) {
    for (let rimo of this.trasportatoreselezionato.listarimorchi) {
      if (rimo.targa === id) {
        return rimo;
      }
    }
  }

  cercaatk(id) {
    for (let atk of this.trasportatoreselezionato.listaatk) {
      if (atk.idatk === id) {
        return atk;
      }
    }
  }

  cercatrasportatore(id) {
    for (let trasp of this.listatrasportatori) {
      if (trasp.nometrasportatore === id) {
        return trasp;
      }
    }
  }

  tornaindietro() {
    this.trasportoservice.trasportoselezionato = undefined;
    this.router.navigate(['/admin/trasporto']);
  }


  creatrasporto() {


    const confirmDialog = this.dialog.open(ConfermadialogComponent, {
      data: {
        title: 'Continuare?',
        message: 'Confermare le modifiche al dato di trasporto?'
      }
    });


    confirmDialog.afterClosed().subscribe(res => {


      if (res === true) {


        let trasporto = new Trasporto();

        if (this.trasportoselezionato !== undefined) {
          trasporto.id = this.trasportoselezionato.id;
        }

        trasporto.fabbisogno = this.fabbisognoselezionato;
        trasporto.datadicaricazione = this.fabbisognoselezionato.data;
        trasporto.atk = this.atkselezionato;
        trasporto.autista = this.autistaselezionato;
        trasporto.rimorchio = this.rimorchioselezionato;
        trasporto.nometrasportatore = this.trasportatoreselezionato.nometrasportatore;
        trasporto.identificativoviaggio = this.identificativotrasporto;

        this.trasportoservice.aggiungimodifica(trasporto).subscribe(result => {
          if (result) {
            this.toastr.success("Aggiunto con successo!", "Aggiunto");
            this.tornaindietro();
          } else {
            this.toastr.error("Ci sono errori nell'inserimento!", "Errore");
          }
        });
      }

    });

  }


}
