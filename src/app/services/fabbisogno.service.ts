import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {baseUrl, LoginService} from './login.service';
import {Observable} from 'rxjs';
import {Fabbisogno} from '../entities/fabbisogno';

@Injectable({
  providedIn: 'root'
})
export class FabbisognoService {

  fabbisognoselezionato: Fabbisogno;

  constructor(private http: HttpClient, private cookieService: CookieService, private loginservice: LoginService) { }

  getfabbisogno(id): Observable<Fabbisogno> {
    return this.http.get<Fabbisogno>(baseUrl + 'fabbisogno/getfabbisogno/' + id + '?access_token=' + this.loginservice.gettoken());
  }

  getallfabbisogni(): Observable<Fabbisogno[]> {
    return this.http.get<Fabbisogno[]>(baseUrl + 'fabbisogno/getall' + '?access_token=' + this.loginservice.gettoken());
  }

  getmieifabbisogni(cliente): Observable<Fabbisogno[]> {
    return this.http.post<Fabbisogno[]>(baseUrl + 'fabbisogno/getmieifabbisogni' + '?access_token=' + this.loginservice.gettoken(), cliente);
  }

  aggiungifabbisogno(fabbisogno): Observable<Fabbisogno[]> {
    return this.http.post<Fabbisogno[]>(baseUrl + 'fabbisogno/aggiungi' + '?access_token=' + this.loginservice.gettoken(), fabbisogno);
  }

  aggiungifabbisognolatocliente(fabbisogno): Observable<Fabbisogno[]> {
    return this.http.post<Fabbisogno[]>(baseUrl + 'fabbisogno/aggiungilatocliente' + '?access_token=' + this.loginservice.gettoken(), fabbisogno);
  }

  eliminafabbisogno(fabbisogno): Observable<Fabbisogno[]> {
    return this.http.post<Fabbisogno[]>(baseUrl + 'fabbisogno/elimina' + '?access_token=' + this.loginservice.gettoken(), fabbisogno);
  }


  getallindaterange(range): Observable<Fabbisogno[]> {
    return this.http.post<Fabbisogno[]>(baseUrl + 'fabbisogno/getallindaterange' + '?access_token=' + this.loginservice.gettoken(), range);
  }

}
