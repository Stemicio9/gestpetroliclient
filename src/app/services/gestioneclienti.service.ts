import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {Cliente} from '../entities/cliente';
import {baseUrl, LoginService} from './login.service';
import {Puntovendita} from '../entities/puntovendita';
import {Puntovenditaconcliente} from '../entities/puntovenditaconcliente';
import {Vocedirettificaconvalore} from '../entities/vocedirettificaconvalore';
import {Concorrente} from '../entities/concorrente';
import {Prezzoconcorrente} from '../entities/prezzoconcorrente';
import {DateRange} from '@angular/material/datepicker';
import {Daterange} from '../entities/daterange';

@Injectable({
  providedIn: 'root'
})
export class GestioneclientiService {


  clienteselezionato: Cliente;
  puntovenditaselezionato: Puntovenditaconcliente;

  constructor(private http: HttpClient, private cookieService: CookieService, private loginservice: LoginService) { }


  getcliente(idcliente): Observable<Cliente> {
   return this.http.get<Cliente>(baseUrl + 'cliente/getcliente/' + idcliente + '?access_token=' + this.loginservice.gettoken());
  }


  aggiungicliente(cliente: Cliente): Observable<Boolean> {
    return this.http.post<Boolean>(baseUrl + 'cliente/aggiungi?access_token=' + this.loginservice.gettoken(), cliente);
  }

  aggiornacliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(baseUrl + 'cliente/aggiornacliente?access_token=' + this.loginservice.gettoken(), cliente);
  }

  getallclienti(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(baseUrl + 'cliente/getall' + '?access_token=' + this.loginservice.gettoken());
  }

  eliminacliente(idcliente): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(baseUrl + 'cliente/eliminacliente/' + idcliente + '?access_token=' + this.loginservice.gettoken());
  }

  tuttipuntivenditasenzacliente(): Observable<Puntovendita[]> {
    return this.http.get<Puntovendita[]>(baseUrl + 'puntivendita/tuttipuntivenditavuoti' + '?access_token=' + this.loginservice.gettoken());
  }

  tuttipuntivenditaconcliente(): Observable<Puntovenditaconcliente[]> {
    return this.http.get<Puntovenditaconcliente[]>(baseUrl + 'puntivendita/tuttipuntivenditaconcliente' + '?access_token=' + this.loginservice.gettoken());
  }

  tuttiimieipuntivendita(cliente):  Observable<Puntovenditaconcliente[]> {
    return this.http.post<Puntovenditaconcliente[]>(baseUrl + 'puntivendita/tuttiimieipuntivendita' + '?access_token=' + this.loginservice.gettoken(), cliente);
  }

  aggiungipuntovendita(puntovendita) {
    return this.http.post(baseUrl + 'puntivendita/aggiungipuntovendita' + '?access_token=' + this.loginservice.gettoken(), puntovendita);
  }

  eliminapuntovendita(puntovendita: Puntovendita): Observable<Puntovenditaconcliente[]> {
    return this.http.get<Puntovenditaconcliente[]>(baseUrl + 'puntivendita/eliminapuntovendita/' + puntovendita.idpunto + '?access_token=' + this.loginservice.gettoken());
  }

  getpuntovendita(id): Observable<Puntovendita> {
    return this.http.get<Puntovendita>(baseUrl + 'puntivendita/getpuntovendita/' + id + '?access_token=' + this.loginservice.gettoken());
  }

  getproprietario(puntovendita): Observable<Cliente> {
    return this.http.post<Cliente>(baseUrl + 'puntivendita/cercaproprietario' + '?access_token=' + this.loginservice.gettoken(), puntovendita);
  }

  aggiungivocedirettificaapuntovendita(vocedirettifica: Vocedirettificaconvalore, idpuntovendita): Observable<Puntovendita> {
    return this.http.post<Puntovendita>(baseUrl + 'puntivendita/aggiungivocedirettifica/' + idpuntovendita + '?access_token=' + this.loginservice.gettoken(), vocedirettifica);
  }

  cancellavocedirettificaapuntovendita(puntovendita: Puntovendita, idvoce): Observable<Puntovendita> {
    return this.http.post<Puntovendita>(baseUrl + 'puntivendita/cancellavocedirettifica/' + idvoce + '?access_token=' + this.loginservice.gettoken(), puntovendita );
  }

  aggiungiquotazione(quotazione, id): Observable<Puntovendita> {
    return this.http.post<Puntovendita>(baseUrl + 'puntivendita/aggiungiquotazione/' + id + '?access_token=' + this.loginservice.gettoken(), quotazione);
  }

  rimuoviquotazione(quotazione): Observable<Puntovendita> {
    return this.http.post<Puntovendita>(baseUrl + 'puntivendita/eliminaquotazione' + '?access_token=' + this.loginservice.gettoken(), quotazione);
  }

  aggiungiconcorrente(concorrente, id): Observable<Concorrente> {
    return this.http.post<Concorrente>(baseUrl + 'puntivendita/aggiungiconcorrente/' + id + '?access_token=' + this.loginservice.gettoken(), concorrente);
  }
  eliminaconcorrente(concorrente, id): Observable<Concorrente> {
    return this.http.post<Concorrente>(baseUrl + 'puntivendita/eliminaconcorrente/' + id + '?access_token=' + this.loginservice.gettoken(), concorrente);
  }
  getprezziconcorrentidipuntovendita(puntovendita, data): Observable<Prezzoconcorrente[]> {
    const range = new Daterange();
    range.data1 = data;
    return this.http.post<Prezzoconcorrente[]>(baseUrl + 'concorrenti/getprezziconcorrentidipuntovendita/' + puntovendita.idpunto + '?access_token=' + this.loginservice.gettoken(),
        range);
  }

}
