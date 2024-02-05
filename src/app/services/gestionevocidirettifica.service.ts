import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl, LoginService} from './login.service';
import {Observable} from 'rxjs';
import {Vocedirettifica} from '../entities/vocedirettifica';

@Injectable({
  providedIn: 'root'
})
export class GestionevocidirettificaService {

  constructor(private http: HttpClient, private loginservice: LoginService) { }

  getvocidirettifica(): Observable<Vocedirettifica[]> {
    return this.http.get<Vocedirettifica[]>(baseUrl + 'vocidirettifica/getall' + '?access_token=' + this.loginservice.gettoken());
  }

  getvocedirettifica(nomevoce): Observable<Vocedirettifica>{
    return this.http.get<Vocedirettifica>(baseUrl + 'vocidirettifica/getvocedirettifica/' + nomevoce + '?access_token=' + this.loginservice.gettoken());
  }

  aggiungivocedirettifica(vocedirettifica): Observable<Vocedirettifica[]> {
    return this.http.post<Vocedirettifica[]>(baseUrl + 'vocidirettifica/aggiungi' + '?access_token=' + this.loginservice.gettoken(), vocedirettifica);
  }

  rimuovivocedirettifica(idvoce): Observable<Vocedirettifica[]> {
    return this.http.get<Vocedirettifica[]>(baseUrl + 'vocidirettifica/delete/' + idvoce + '?access_token=' + this.loginservice.gettoken());
  }


}
