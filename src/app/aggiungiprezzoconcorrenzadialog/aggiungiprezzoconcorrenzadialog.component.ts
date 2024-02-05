import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Prezzoconcorrente} from '../entities/prezzoconcorrente';
import {Observable} from 'rxjs';
import {Concorrente} from '../entities/concorrente';
import {FormControl} from '@angular/forms';
import {GestioneprezziService} from '../services/gestioneprezzi.service';
import {Basedicarico} from '../entities/basedicarico';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-aggiungiprezzoconcorrenzadialog',
  templateUrl: './aggiungiprezzoconcorrenzadialog.component.html',
  styleUrls: ['./aggiungiprezzoconcorrenzadialog.component.css']
})
export class AggiungiprezzoconcorrenzadialogComponent {

  listaconcorrenti;
  filteredconcorrenti: Observable<Concorrente[]>;
  concorrentecontrol = new FormControl();
  concorrenteselezionato;

  constructor(
      public gestioneprezzi: GestioneprezziService,
      public dialogRef: MatDialogRef<AggiungiprezzoconcorrenzadialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Prezzoconcorrente) {
    this.listaconcorrenti = this.clonaarray(this.gestioneprezzi.puntovenditaselezionato.puntovendita.listaconcorrenti);

    this.filteredconcorrenti = this.concorrentecontrol.valueChanges
        .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.nomeconcorrente),
            map(name => name ? this._filterconcorrenti(name) : this.listaconcorrenti.slice())
        );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dataselezionatadalpicker(event) {
    this.data.data = event;
  }

  displayconcorrente(concorrente: Concorrente) {
    return concorrente && concorrente.nomeconcorrente ? concorrente.nomeconcorrente : '';
  }

  private _filterconcorrenti(name: string): Basedicarico[] {
    const filterValue = name.toLowerCase();
    return this.listaconcorrenti.filter(option => option.nomeconcorrente.toLowerCase().indexOf(filterValue) === 0);
  }

  selected(concorrente) {
    this.data.concorrente = concorrente.option.value;
    this.concorrenteselezionato = concorrente.option.value;
  }

  cambiatoconcorrente(){
    this.data.concorrente.nomeconcorrente = this.concorrenteselezionato;
  }


  clonaarray(array) {
    var result = [];
    array.forEach(val => result.push(Object.assign({}, val)));
    return result;
  }

}
