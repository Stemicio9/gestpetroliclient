import { Injectable } from '@angular/core';
import {Puntovenditaconcliente} from '../entities/puntovenditaconcliente';
import {Quotazionegiornalierapuntovendita} from '../entities/quotazionegiornalierapuntovendita';

@Injectable({
  providedIn: 'root'
})
export class GestioneprezziService {


  puntovenditaselezionato: Puntovenditaconcliente;
  quotazioneprezziselezionata: Quotazionegiornalierapuntovendita;

  constructor() { }


}
