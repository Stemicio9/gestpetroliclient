import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl, LoginService} from './login.service';
import {Observable} from 'rxjs';
import {Fornitore} from '../entities/fornitore';
import {Cliente} from '../entities/cliente';

@Injectable({
  providedIn: 'root'
})
export class GestionefornitoriService {

  fornitoreselezionato: Fornitore;

  constructor(private http: HttpClient, private loginservice: LoginService) { }

  getfornitori(): Observable<Fornitore[]> {
    return this.http.get<Fornitore[]>(baseUrl + 'fornitori/getall' + '?access_token=' + this.loginservice.gettoken());
  }

  getfornitore(nomefornitore): Observable<Fornitore> {
    return this.http.get<Fornitore>(baseUrl + 'fornitori/getfornitore/' + nomefornitore + '?access_token=' + this.loginservice.gettoken());
  }

  aggiungifornitore(fornitore): Observable<Fornitore[]> {
    return this.http.post<Fornitore[]>(baseUrl + 'fornitori/aggiungi' + '?access_token=' + this.loginservice.gettoken(), fornitore);
  }

  rimuovifornitore(idfornitore): Observable<Fornitore[]> {
    return this.http.get<Fornitore[]>(baseUrl + 'fornitori/delete/' + idfornitore + '?access_token=' + this.loginservice.gettoken());
  }

  rimuoviquotazione(quotazione): Observable<boolean> {
    return this.http.post<boolean>(baseUrl + 'fornitori/eliminaquotazione' + '?access_token=' + this.loginservice.gettoken(), quotazione);
  }

  generaexcelfornitore(idfornitore) {
    return this.http.get(baseUrl + 'fornitori/generaexcel/' + idfornitore + '?access_token=' + this.loginservice.gettoken(), { responseType: 'blob' });
  }
}
