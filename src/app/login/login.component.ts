import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username:string;
  password:string;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
      try {
          this.loginService.checkloginstatus().subscribe(data => {

              // data è un utente
              console.log("LOGIN STATUS");
              console.log(data);

                  if (data !== undefined && data !== null && data.ruolo !== 2) {

                      this.router.navigate(['admin/riepilogo']);
                  }

                  if (data.ruolo === 2) {
                      console.log("SONO DENTRO QUESTO IF");
                      this.router.navigate(['admin/riepilogocliente']);
                  }

              },
              error => {
                  console.log("NON SONO LOGGATO");
                  console.log(error.error.error_description);
              });
      } catch(e) {
        console.log(e);
      }



    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }


  onSubmit(){
    if (this.loginForm.invalid) {
        this.toastr.error("Non hai inserito valori validi nel form di login!", "Errore");
      return;
    }

    const body = new HttpParams()
        .set('username',  this.loginForm.controls.username.value)
        .set('password',  this.loginForm.controls.password.value)
        .set('grant_type', 'password');


     this.loginService.login(body.toString()).subscribe(
         (log:any) => {
          this.loginService.salvatoken(log.access_token);

             this.loginService.checkloginstatus().subscribe(data => {
                 if (data !== undefined && data !== null && data.ruolo !== 2) {

                     this.router.navigate(['admin/riepilogo']);
                 }

                 if (data.ruolo === 2) {
                     console.log("SONO DENTRO QUESTO IF");
                     this.router.navigate(['admin/riepilogocliente']);
                 }
             });
           //  this.salvatoken(data.access_token);
         }, error => {
             this.toastr.error("Parametri di login sbagliati!", "Errore");
           console.log(error.error.error_description)
         });

  }

}
