import { Component, OnInit } from '@angular/core';
import {FabbisognoService} from '../services/fabbisogno.service';
import {GestionefornitoriService} from '../services/gestionefornitori.service';
import {GestionebasidicaricoService} from '../services/gestionebasidicarico.service';
import {GestioneclientiService} from '../services/gestioneclienti.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-visaggiungimodificafabbisogno',
  templateUrl: './visaggiungimodificafabbisogno.component.html',
  styleUrls: ['./visaggiungimodificafabbisogno.component.css']
})
export class VisaggiungimodificafabbisognoComponent implements OnInit {





  fabbisogno = this.fabbisognoservice.fabbisognoselezionato;


  constructor(private fabbisognoservice: FabbisognoService,
              private fornitoriservice: GestionefornitoriService,
              private basidicaricoservice: GestionebasidicaricoService,
              private puntivenditaservice: GestioneclientiService,
              private router: Router) {}

  ngOnInit(): void {}


  tornaindietro() {
    this.fabbisognoservice.fabbisognoselezionato = undefined;
    this.router.navigate(['/admin/visfabbisogno']);
  }
}
