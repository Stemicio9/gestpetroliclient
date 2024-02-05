import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Utente} from '../entities/utente';
import {Observable} from 'rxjs';

// URL IN PRODUZIONE
//export const baseUrl = 'http://185.221.172.122:8080/partenupp/';

// URL IN DEVELOPEMENT
export const baseUrl = 'http://localhost:8080/';

//export const baseUrl = 'http://87.27.62.247:8080/';

//export const baseUrl = 'http://87.27.62.247:8081/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  utenteloggato;

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('gestionepetroli:gestionepetroli'),
      'Content-type': 'application/x-www-form-urlencoded'
    };

    return this.http.post(baseUrl + 'oauth/token', loginPayload, {headers});

  }


  salvatoken(token){
     this.cookieService.set('token', token);
  }

  gettoken(){
    return this.cookieService.get('token');
  }

  checktoken(){
    return this.cookieService.check('token');
  }

  logout() {
    this.cookieService.delete('token');
  }

  checkloginstatus(): Observable<Utente> {
/*    if (!this.checktoken()) {
      console.log("NESSUN TOKEN SALVATO SUL BROWSER");
      return;
    } */

    return this.http.get<Utente>(baseUrl +  'amministrazione/checklogin?access_token=' + this.gettoken());
  }

  creautente(utente): Observable<Utente[]> {
    return this.http.post<Utente[]>(baseUrl +  'amministrazione/creautente?access_token=' + this.gettoken(), utente);
  }

  rimuoviutente(utente): Observable<Utente[]> {
    return this.http.post<Utente[]>(baseUrl +  'amministrazione/rimuovi?access_token=' + this.gettoken(), utente);
  }

  getallutenti(): Observable<Utente[]> {
    return this.http.get<Utente[]>(baseUrl +  'amministrazione/getallutenti?access_token=' + this.gettoken());
  }

}
