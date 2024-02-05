import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {baseUrl, LoginService} from './login.service';
import {Fabbisogno} from '../entities/fabbisogno';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {

  constructor(private http: HttpClient, private cookieService: CookieService, private loginservice: LoginService) { }


  stampapreventivo(preventivo) {
    return this.http.post(baseUrl + 'pdf/preventivo' + '?access_token=' + this.loginservice.gettoken(), preventivo, { responseType: 'blob' });
  }


  stampatrasporto(viaggio) {
    return this.http.post(baseUrl + 'pdf/trasporto' + '?access_token=' + this.loginservice.gettoken(), viaggio, { responseType: 'blob' });

  }


  getexcelfile(range) {
    return this.http.post(baseUrl + 'riepilogo/generaexcel' + '?access_token=' + this.loginservice.gettoken(), range, { responseType: 'blob' });
  }


}
