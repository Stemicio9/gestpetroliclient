import { Injectable } from '@angular/core';
import {Preventivo} from '../entities/preventivo';
import {HttpClient} from '@angular/common/http';
import {Fabbisogno} from '../entities/fabbisogno';
import {CookieService} from 'ngx-cookie-service';
import {baseUrl, LoginService} from './login.service';
import {Observable} from 'rxjs';
import {FabbisognoService} from './fabbisogno.service';

@Injectable({
  providedIn: 'root'
})
export class PreventivoService {

  fabbisognoselezionato: Fabbisogno;


  preventivoselezionato: Preventivo;

  constructor(private http: HttpClient, private cookieService: CookieService, private loginservice: LoginService, private fabbisognoservice: FabbisognoService) { }

  getpreventivo(fabbisogno): Observable<Preventivo> {
    return this.http.post<Preventivo>(baseUrl + 'preventivo/getpreventivodifabbisogno' + '?access_token=' + this.loginservice.gettoken(), fabbisogno);
  }

  aggiungimodifica(preventivo): Observable<boolean> {
    return this.http.post<boolean>(baseUrl + 'preventivo/aggiungimodifica' + '?access_token=' + this.loginservice.gettoken(), preventivo);
  }

  cancella(preventivo): Observable<boolean> {
    return this.http.post<boolean>(baseUrl + 'preventivo/cancella' + '?access_token=' + this.loginservice.gettoken(), preventivo);
  }

  cancelladafabbisogno(fabbisogno): Observable<boolean> {
    return this.http.post<boolean>(baseUrl + 'preventivo/cancelladafabbisogno' + '?access_token=' + this.loginservice.gettoken(), fabbisogno);
  }


  cancellavocedirettificadapreventivo(idpreventivo, vocedirettifica): Observable<boolean> {
    return this.http.post<boolean>(baseUrl + 'preventivo/cancellavocedirettificadapreventivo/' + idpreventivo + '?access_token=' + this.loginservice.gettoken(), vocedirettifica);
  }



}
