import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl, LoginService} from './login.service';
import {Trasportatore} from '../entities/trasportatore';
import {Observable} from 'rxjs';
import {Cliente} from '../entities/cliente';
import {Rimorchio} from '../entities/rimorchio';
import {Atk} from '../entities/atk';

@Injectable({
  providedIn: 'root'
})
export class GestionetrasportiService {


  trasportatoreselezionato: Trasportatore;

  listarimorchiperdialog: Rimorchio[] = [];

  constructor(private http: HttpClient, private loginservice: LoginService) { }

  getalltrasportatori(): Observable<Trasportatore[]> {
    return this.http.get<Trasportatore[]>(baseUrl + 'trasportatori/getall' + '?access_token=' + this.loginservice.gettoken());
  }

  gettrasportatore(idtrasportatore): Observable<Trasportatore> {
    return this.http.get<Trasportatore>(baseUrl + 'trasportatori/gettrasportatore/' + idtrasportatore + '?access_token=' + this.loginservice.gettoken());
  }

  aggiungitrasportatore(trasportatore): Observable<Trasportatore[]> {
    return this.http.post<Trasportatore[]>(baseUrl + 'trasportatori/aggiungitrasportatore' + '?access_token=' + this.loginservice.gettoken(), trasportatore);
  }

  rimuovitrasportatore(idtrasportatore): Observable<Trasportatore[]> {
    return this.http.get<Trasportatore[]>(baseUrl + 'trasportatori/rimuovitrasportatore/' + idtrasportatore + '?access_token=' + this.loginservice.gettoken());
  }

  rimuoviatk(idatk) {
    return this.http.get(baseUrl + 'trasportatori/rimuoviatk/' + idatk + '?access_token=' + this.loginservice.gettoken());
  }

  rimuovirimorchio(idrimorchio) {
    return this.http.get(baseUrl + 'trasportatori/rimuovirimorchio/' + idrimorchio + '?access_token=' + this.loginservice.gettoken());
  }

  rimuoviautista(idautista) {
    return this.http.get(baseUrl + 'trasportatori/rimuoviautista/' + idautista + '?access_token=' + this.loginservice.gettoken());
  }

  getallatk(): Observable<Atk[]> {
    return this.http.get<Atk[]>(baseUrl + 'trasportatori/getallatk' + '?access_token=' + this.loginservice.gettoken());
  }

}
