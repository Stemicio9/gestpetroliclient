import { Injectable } from '@angular/core';
import {Fabbisogno} from '../entities/fabbisogno';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {baseUrl, LoginService} from './login.service';
import {Observable} from 'rxjs';
import {Trasporto} from '../entities/trasporto';
import {Trasportofilter} from '../entities/trasportofilter';
import {Viaggio} from '../entities/viaggio';

@Injectable({
  providedIn: 'root'
})
export class TrasportoService {

  fabbisognoselezionato: Fabbisogno;

  trasportoselezionato: Trasporto;

  viaggioselezionato: Viaggio;

  constructor(private http: HttpClient, private cookieService: CookieService, private loginservice: LoginService) { }

  gettrasporto(fabbisogno: Fabbisogno): Observable<Trasporto> {
    return this.http.get<Trasporto>(baseUrl + 'trasporto/findbyfabbisognoid/' + fabbisogno.id + '?access_token=' + this.loginservice.gettoken());
  }

  aggiungimodifica(trasporto): Observable<boolean> {
    return this.http.post<boolean>(baseUrl + 'trasporto/salva' + '?access_token=' + this.loginservice.gettoken(), trasporto);
  }

  cancella(trasporto): Observable<boolean> {
    return this.http.post<boolean>(baseUrl + 'trasporto/rimuovi' + '?access_token=' + this.loginservice.gettoken(), trasporto);
  }

  cancelladafabbisogno(fabbisogno): Observable<boolean> {
    return this.http.post<boolean>(baseUrl + 'trasporto/rimuovidafabbisogno' + '?access_token=' + this.loginservice.gettoken(), fabbisogno);
  }

  findviaggio(filter: Trasportofilter): Observable<Viaggio[]> {
    return this.http.post<Viaggio[]>(baseUrl + 'trasporto/findviaggio' + '?access_token=' + this.loginservice.gettoken(), filter);
  }


}
