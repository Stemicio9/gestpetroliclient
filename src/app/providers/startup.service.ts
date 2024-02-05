import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private http: HttpClient, private loginservice: LoginService) { }

  checkloginstatus() {
    return this.loginservice.checkloginstatus();
  }

}
