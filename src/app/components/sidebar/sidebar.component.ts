import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/fabbisogno', title: 'Fabbisogno',  icon: 'dashboard', class: '' },
    { path: '/admin/preventivo', title: 'Preventivo',  icon: 'dashboard', class: '' },
    { path: '/admin/trasporto', title: 'Trasporti',  icon: 'dashboard', class: '' },
    { path: '/admin/riepilogo', title: 'Riepilogo',  icon: 'dashboard', class: '' },
    { path: '/admin/archivioriepiloghi', title: 'Fabbisogni archiviati',  icon: 'dashboard', class: '' },
    { path: '/admin/gestioneclienti', title: 'Gestione Clienti',  icon: 'dashboard', class: '' },
    { path: '/admin/gestionepuntivendita', title: 'Gestione Punti Vendita',  icon: 'dashboard', class: '' },
    { path: '/admin/gestioneprezzi', title: 'Gestione Prezzi',  icon: 'dashboard', class: '' },
    { path: '/admin/gestionetrasportatori', title: 'Gestione Trasportatori',  icon: 'dashboard', class: '' },
    { path: '/admin/gestionevocidirettifica', title: 'Gestione voci di rettifica',  icon: 'dashboard', class: '' },
    { path: '/admin/gestionebasidicarico', title: 'Gestione basi di carico',  icon: 'dashboard', class: '' },
    { path: '/admin/gestionefornitori', title: 'Gestione fornitori',  icon: 'dashboard', class: '' },
    { path: '/admin/gestioneutenti', title: 'Gestione utenti',  icon: 'dashboard', class: '' },
];

export const ROUTESVISUALIZZATORE: RouteInfo[] = [
    { path: '/admin/visfabbisogno', title: 'Fabbisogno',  icon: 'dashboard', class: '' },
    { path: '/admin/vispreventivo', title: 'Preventivo',  icon: 'dashboard', class: '' },
    { path: '/admin/vistrasporto', title: 'Trasporti',  icon: 'dashboard', class: '' },
    { path: '/admin/visriepilogo', title: 'Riepilogo',  icon: 'dashboard', class: '' },
];

export const ROUTESCLIENTE: RouteInfo[] = [
    { path: '/admin/clifabbisogno', title: 'Fabbisogno',  icon: 'dashboard', class: '' },
    { path: '/admin/clipreventivi', title: 'Preventivo',  icon: 'dashboard', class: '' },
    { path: '/admin/riepilogocliente', title: 'Riepilogo',  icon: 'dashboard', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {

      this.loginservice.checkloginstatus().subscribe(result => {

          this.loginservice.utenteloggato = result;

          if (this.loginservice.utenteloggato.ruolo === 0) {
              this.menuItems = ROUTES.filter(menuItem => menuItem);
          } else if (this.loginservice.utenteloggato.ruolo === 1) {
              this.menuItems = ROUTESVISUALIZZATORE.filter(menuItem => menuItem);
          } else if (this.loginservice.utenteloggato.ruolo === 2) {
              this.menuItems = ROUTESCLIENTE.filter(menuItem => menuItem);
          }
      });
  }

  logout() {
      this.loginservice.logout();
      this.router.navigate(['/']);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
