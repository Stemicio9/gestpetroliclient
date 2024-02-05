import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {RiepilogoService} from '../services/riepilogo.service';
import {Router} from '@angular/router';
import {ConfermadialogComponent} from '../confermadialog/confermadialog.component';
import {Fornitore} from '../entities/fornitore';

@Component({
  selector: 'app-vismodificariepilogo',
  templateUrl: './vismodificariepilogo.component.html',
  styleUrls: ['./vismodificariepilogo.component.css']
})
export class VismodificariepilogoComponent implements OnInit {


  riepilogo = this.riepilogoservice.riepilogoselezionato;

  constructor(private toastr: ToastrService,
              private dialog: MatDialog,
              private riepilogoservice: RiepilogoService,
              private router: Router) { }

  ngOnInit(): void {
  }


  prezzogasoliodioggi(fornitore: Fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.isToday(quot.data)) {
        return quot.prezzogasolio;
      }
    }
  }

  prezzobenzinadioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.isToday(quot.data)) {
        return quot.prezzobenzina;
      }
    }
  }

  prezzosupremedioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.isToday(quot.data)) {
        return quot.prezzosupreme;
      }
    }
  }

  prezzogpldioggi(fornitore) {
    for (const quot of fornitore.quotazioni) {
      if (this.isToday(quot.data)) {
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


  tornaindietro() {
    this.riepilogoservice.riepilogoselezionato = undefined;
    this.router.navigate(['/admin/visriepilogo']);
  }

}
