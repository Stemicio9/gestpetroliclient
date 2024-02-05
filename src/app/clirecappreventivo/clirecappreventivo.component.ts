import { Component, OnInit } from '@angular/core';
import {Cliente} from '../entities/cliente';
import {Router} from '@angular/router';
import {PreventivoService} from '../services/preventivo.service';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {FileserviceService} from '../services/fileservice.service';

@Component({
  selector: 'app-clirecappreventivo',
  templateUrl: './clirecappreventivo.component.html',
  styleUrls: ['./clirecappreventivo.component.css']
})
export class ClirecappreventivoComponent implements OnInit {

  preventivoselezionato = this.preventivoservice.preventivoselezionato;
  proprietario: Cliente;

  constructor(private router: Router, public preventivoservice: PreventivoService,
              private gestioneclienti: GestioneclientiService,
              private fileservice: FileserviceService) {
    this.gestioneclienti.getproprietario(this.preventivoservice.fabbisognoselezionato.puntoVendita).subscribe(result => {this.proprietario = result});
  }

  ngOnInit(): void {
  }

  togliiva(valore) {
    return valore / 1.22;
  }

  prezzoinfattura(valoreconiva, margine, percentualemargine) {
    return this.togliiva(valoreconiva) - margine * percentualemargine / 100;
  }

  prezzoconvolumesenzaiva(valoreconiva, margine, percentualemargine, volume) {

    const numero = Number((this.prezzoinfattura(valoreconiva, margine, percentualemargine)).toFixed(3));
    return numero * volume;
  }

  calcolasommavocidirettifica() {
    let result = 0;
    for (const valore of this.preventivoselezionato.listavocidirettifica) {
      if (valore.segno) {
        result = result + valore.valore;
      } else {
        result = result - valore.valore;
      }
    }
    return result;
  }

  calcolatotaleconiva(){
    let result = 0;
    const prezzogasolio = this.prezzoconvolumesenzaiva(this.preventivoselezionato.prezzoalpubblicogasolioself, this.proprietario.marginegasolioself, this.preventivoselezionato.marginecessionegasolio, this.preventivoselezionato.riferimento.gasolio)  * 1.22;
    const prezzobenzina = this.prezzoconvolumesenzaiva(this.preventivoselezionato.prezzoalpubblicobenzinaself, this.proprietario.marginebenzinaself, this.preventivoselezionato.marginecessionebenzina, this.preventivoselezionato.riferimento.benzina)  * 1.22;
    const prezzosupreme = this.prezzoconvolumesenzaiva(this.preventivoselezionato.prezzoalpubblicosupremeself, this.proprietario.marginesupremeself, this.preventivoselezionato.marginecessionesupreme, this.preventivoselezionato.riferimento.supreme)  * 1.22;
    const prezzogpl = this.prezzoconvolumesenzaiva(this.preventivoselezionato.prezzoalpubblicogplservito, this.proprietario.marginegplself, this.preventivoselezionato.marginecessionegpl, this.preventivoselezionato.riferimento.gpl)  * 1.22;
    result = prezzogasolio + prezzobenzina + prezzosupreme + prezzogpl;
    return result;
  }

  calcolaimportobonifico() {
    return this.calcolatotaleconiva() + this.calcolasommavocidirettifica();
  }


  stampapreventivo() {
    this.fileservice.stampapreventivo(this.preventivoselezionato).subscribe(result => {
      var blob = new Blob([result], {type: 'application/pdf'});
      var downloadURL = window.URL.createObjectURL(result);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.target = '_blank';
      //link.download = "help.pdf";
      link.click();
    });
  }


  tornaindietro() {
    this.preventivoservice.preventivoselezionato = undefined;
    this.router.navigate(['/admin/clipreventivi']);
  }

}
