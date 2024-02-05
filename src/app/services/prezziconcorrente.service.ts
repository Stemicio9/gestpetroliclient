import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {baseUrl, LoginService} from './login.service';
import {Observable} from 'rxjs';
import {Cliente} from '../entities/cliente';
import {Prezzoconcorrente} from '../entities/prezzoconcorrente';

@Injectable({
  providedIn: 'root'
})
export class PrezziconcorrenteService {

  constructor(private http: HttpClient, private cookieService: CookieService, private loginservice: LoginService) { }

  getallbydata(data): Observable<Prezzoconcorrente[]> {
    return this.http.post<Prezzoconcorrente[]>(baseUrl + 'concorrenti/getprezzididata' + '?access_token=' + this.loginservice.gettoken(), data );
  }

  aggiungiprezzoconcorrente(prezzoconcorrente, idpunto): Observable<Boolean> {
    return this.http.post<Boolean>(baseUrl + 'concorrenti/aggiungi/' + idpunto + '?access_token=' + this.loginservice.gettoken(), prezzoconcorrente);
  }

  aggiungilistaprezzoconcorrente(listaprezzoconcorrente): Observable<Boolean> {
    return this.http.post<Boolean>(baseUrl + 'concorrenti/aggiungitutti?access_token=' + this.loginservice.gettoken(), listaprezzoconcorrente);
  }

  rimuoviprezzoconcorrente(prezzoconcorrente): Observable<Boolean> {
    return this.http.post<Boolean>(baseUrl + 'concorrenti/rimuovi?access_token=' + this.loginservice.gettoken(), prezzoconcorrente);
  }

}
