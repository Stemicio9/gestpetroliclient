import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {baseUrl, LoginService} from './login.service';
import {Observable} from 'rxjs';
import {Riepilogoperfrontend} from '../entities/riepilogoperfrontend';

@Injectable({
  providedIn: 'root'
})
export class RiepilogoService {

  riepilogoselezionato: Riepilogoperfrontend;

  data1: Date;
  data2: Date;

  constructor(private http: HttpClient, private cookieService: CookieService, private loginservice: LoginService) {
    this.data1 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    this.data2 = new Date();
  }

  getallriepiloghiinrange(range): Observable<Riepilogoperfrontend[]> {
    return this.http.post<Riepilogoperfrontend[]>(baseUrl + 'riepilogo/getall' + '?access_token=' + this.loginservice.gettoken(), range);
  }

  getallriepiloghiinrangepaged(range, page, size): Observable<any> {
    return this.http.post<any>(baseUrl + 'riepilogo/getallpaged?page=' + page + '&size=' + size + '&access_token=' + this.loginservice.gettoken(), range);
  }

  getallbycliente(cliente): Observable<Riepilogoperfrontend[]> {
    return this.http.post<Riepilogoperfrontend[]>(baseUrl + 'riepilogo/getallpercliente' + '?access_token=' + this.loginservice.gettoken(), cliente);
  }

  salvariepilogo(riepilogo): Observable<boolean> {
    return this.http.post<boolean>(baseUrl + 'riepilogo/save' + '?access_token=' + this.loginservice.gettoken(), riepilogo);
  }

  rimuovibonifico(bonifico, idriepilogo): Observable<Riepilogoperfrontend> {
    return this.http.post<Riepilogoperfrontend>(baseUrl + 'riepilogo/bonifico/delete/' + idriepilogo + '?access_token=' + this.loginservice.gettoken(), bonifico);
  }

  aggiungibonifico(bonifico, idriepilogo): Observable<Riepilogoperfrontend> {
    return this.http.post<Riepilogoperfrontend>(baseUrl + 'riepilogo/bonifico/save/' + idriepilogo + '?access_token=' + this.loginservice.gettoken(), bonifico);
  }

  aggiungifile(file, idriepilogo): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(baseUrl + 'riepilogo/upload/' + idriepilogo + '?access_token=' + this.loginservice.gettoken(), formData);
  }

  rimuovifile(idfile, idriepilogo): Observable<any> {
    return this.http.post<any>(baseUrl + 'riepilogo/deletefile/' + idriepilogo + '?access_token=' + this.loginservice.gettoken(), idfile);
  }

  prendituttifile(idriepilogo): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'riepilogo/files/' + idriepilogo + '?access_token=' + this.loginservice.gettoken());
  }

  prendisingolofile(idfile) {
    return this.http.get(baseUrl + 'riepilogo/file/' + idfile + '?access_token=' + this.loginservice.gettoken() , {responseType : 'blob'});
  }
}
