import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl, LoginService} from './login.service';
import {Observable} from 'rxjs';
import {Vocedirettifica} from '../entities/vocedirettifica';
import {Basedicarico} from '../entities/basedicarico';

@Injectable({
  providedIn: 'root'
})
export class GestionebasidicaricoService {

  constructor(private http: HttpClient, private loginservice: LoginService) { }

  getbasidicarico(): Observable<Basedicarico[]> {
    return this.http.get<Basedicarico[]>(baseUrl + 'basidicarico/getall' + '?access_token=' + this.loginservice.gettoken());
  }

  getbasedicarico(nomebase): Observable<Basedicarico> {
    return this.http.get<Basedicarico>(baseUrl + 'basidicarico/getbasedicarico/' + nomebase + '?access_token=' + this.loginservice.gettoken());
  }

  aggiungibasedicarico(basedicarico): Observable<Basedicarico[]> {
    return this.http.post<Basedicarico[]>(baseUrl + 'basidicarico/aggiungi' + '?access_token=' + this.loginservice.gettoken(), basedicarico);
  }

  rimuovibasedicarico(idbase): Observable<Basedicarico[]> {
    return this.http.get<Basedicarico[]>(baseUrl + 'basidicarico/delete/' + idbase + '?access_token=' + this.loginservice.gettoken());
  }

}
