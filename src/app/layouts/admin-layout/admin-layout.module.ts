import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {FabbisognoComponent} from '../../fabbisogno/fabbisogno.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GestioneclientiComponent} from '../../gestioneclienti/gestioneclienti.component';
import {DataTablesModule} from 'angular-datatables';
import {AggiungimodificaclienteComponent} from '../../aggiungimodificacliente/aggiungimodificacliente.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {AggiungipuntovenditadialogComponent} from '../../aggiungipuntovenditadialog/aggiungipuntovenditadialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {GestionevocidirettificaComponent} from '../../gestionevocidirettifica/gestionevocidirettifica.component';
import {AggiungivocedirettificadialogComponent} from '../../aggiungivocedirettificadialog/aggiungivocedirettificadialog.component';
import {GestionebasidicaricoComponent} from '../../gestionebasidicarico/gestionebasidicarico.component';
import {AggiungibasedicaricodialogComponent} from '../../aggiungibasedicaricodialog/aggiungibasedicaricodialog.component';
import {GestionefornitoriComponent} from '../../gestionefornitori/gestionefornitori.component';
import {AggiungifornitoredialogComponent} from '../../aggiungifornitoredialog/aggiungifornitoredialog.component';
import {AggiungimodificafornitoreComponent} from '../../aggiungimodificafornitore/aggiungimodificafornitore.component';
import {GestionetrasportatoriComponent} from '../../gestionetrasportatori/gestionetrasportatori.component';
import {AggiungimodificatrasportatoreComponent} from '../../aggiungimodificatrasportatore/aggiungimodificatrasportatore.component';
import {AggiungiatkdialogComponent} from '../../aggiungiatkdialog/aggiungiatkdialog.component';
import {AggiungirimorchiodialogComponent} from '../../aggiungirimorchiodialog/aggiungirimorchiodialog.component';
import {AggiungiautistadialogComponent} from '../../aggiungiautistadialog/aggiungiautistadialog.component';
import {GestionepuntivenditaComponent} from '../../gestionepuntivendita/gestionepuntivendita.component';
import {AggiungimodificapuntovenditaComponent} from '../../aggiungimodificapuntovendita/aggiungimodificapuntovendita.component';
import {AggiungimodificafabbisognoComponent} from '../../aggiungimodificafabbisogno/aggiungimodificafabbisogno.component';
import {PreventivoComponent} from '../../preventivo/preventivo.component';
import {CreapreventivoComponent} from '../../creapreventivo/creapreventivo.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AggiungivocedirettificaconvaloredialogComponent} from '../../aggiungivocedirettificaconvaloredialog/aggiungivocedirettificaconvaloredialog.component';
import {AggiungivocedirettificapreventivodialogComponent} from '../../aggiungivocedirettificapreventivodialog/aggiungivocedirettificapreventivodialog.component';
import {TrasportoComponent} from '../../trasporto/trasporto.component';
import {RecappreventivoComponent} from '../../recappreventivo/recappreventivo.component';
import {RecaptrasportoComponent} from '../../recaptrasporto/recaptrasporto.component';
import {CreatrasportoComponent} from '../../creatrasporto/creatrasporto.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ToastrModule} from 'ngx-toastr';
import {ConfermadialogComponent} from '../../confermadialog/confermadialog.component';
import {RichiestedicaricoComponent} from '../../richiestedicarico/richiestedicarico.component';
import {RiepilogoComponent} from '../../riepilogo/riepilogo.component';
import {ModificariepilogoComponent} from '../../modificariepilogo/modificariepilogo.component';
import {AggiungiquotazionedialogComponent} from '../../aggiungiquotazionedialog/aggiungiquotazionedialog.component';
import {GestioneutentiComponent} from '../../gestioneutenti/gestioneutenti.component';
import {AggiungiutentedialogComponent} from '../../aggiungiutentedialog/aggiungiutentedialog.component';
import {VisfabbisognoComponent} from '../../visfabbisogno/visfabbisogno.component';
import {VispreventivoComponent} from '../../vispreventivo/vispreventivo.component';
import {VistrasportoComponent} from '../../vistrasporto/vistrasporto.component';
import {VisriepilogoComponent} from '../../visriepilogo/visriepilogo.component';
import {VisaggiungimodificafabbisognoComponent} from '../../visaggiungimodificafabbisogno/visaggiungimodificafabbisogno.component';
import {VisrecappreventivoComponent} from '../../visrecappreventivo/visrecappreventivo.component';
import {VismodificariepilogoComponent} from '../../vismodificariepilogo/vismodificariepilogo.component';
import {VisrichiestedicaricoComponent} from '../../visrichiestedicarico/visrichiestedicarico.component';
import {VisrecaptrasportoComponent} from '../../visrecaptrasporto/visrecaptrasporto.component';
import {AggiungiquotazionepuntovenditadialogComponent} from '../../aggiungiquotazionepuntovenditadialog/aggiungiquotazionepuntovenditadialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {AggiungiquotazionepuntovenditasoloservitodialogComponent} from '../../aggiungiquotazionepuntovenditasoloservitodialog/aggiungiquotazionepuntovenditasoloservitodialog.component';
import {CreapreventivoallservitoComponent} from '../../creapreventivoallservito/creapreventivoallservito.component';
import {RecappreventivosoloservitoComponent} from '../../recappreventivosoloservito/recappreventivosoloservito.component';
import {AggiungibonificodialogComponent} from '../../aggiungibonificodialog/aggiungibonificodialog.component';
import {RiepilogoclienteComponent} from '../../riepilogocliente/riepilogocliente.component';
import {RiepilogoclientesingolaComponent} from '../../riepilogoclientesingola/riepilogoclientesingola.component';
import {ClifabbisognoComponent} from '../../clifabbisogno/clifabbisogno.component';
import {ClipreventiviComponent} from '../../clipreventivi/clipreventivi.component';
import {ClirecappreventivoComponent} from '../../clirecappreventivo/clirecappreventivo.component';
import {GestioneprezziComponent} from '../../gestioneprezzi/gestioneprezzi.component';
import {GestioneprezzipersingoloclienteComponent} from '../../gestioneprezzipersingolocliente/gestioneprezzipersingolocliente.component';
import {GestioneprezzisingoloprezzoComponent} from '../../gestioneprezzisingoloprezzo/gestioneprezzisingoloprezzo.component';
import {AggiungimodificaquotazionecondatiComponent} from '../../aggiungimodificaquotazionecondati/aggiungimodificaquotazionecondati.component';
import {DateValueAccessorModule} from 'angular-date-value-accessor';
import {AggiungiprezzoconcorrenzadialogComponent} from '../../aggiungiprezzoconcorrenzadialog/aggiungiprezzoconcorrenzadialog.component';
import {ArchivioriepiloghiComponent} from '../../archivioriepiloghi/archivioriepiloghi.component';





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgbModule,
    DataTablesModule,
      MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
      MatAutocompleteModule,
      MatRadioModule,
    ToastrModule.forRoot()

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    FabbisognoComponent,
    GestioneclientiComponent,
    AggiungimodificaclienteComponent,
    AggiungipuntovenditadialogComponent,
    GestionevocidirettificaComponent,
    AggiungivocedirettificadialogComponent,
    GestionebasidicaricoComponent,
    AggiungibasedicaricodialogComponent,
    GestionefornitoriComponent,
    AggiungifornitoredialogComponent,
    AggiungimodificafornitoreComponent,
    GestionetrasportatoriComponent,
    AggiungimodificatrasportatoreComponent,
    AggiungiatkdialogComponent,
    AggiungirimorchiodialogComponent,
    AggiungiautistadialogComponent,
    GestionepuntivenditaComponent,
    AggiungimodificapuntovenditaComponent,
    AggiungimodificafabbisognoComponent,
    PreventivoComponent,
    CreapreventivoComponent,
    AggiungivocedirettificaconvaloredialogComponent,
    AggiungivocedirettificapreventivodialogComponent,
    TrasportoComponent,
    RecappreventivoComponent,
    RecaptrasportoComponent,
    CreatrasportoComponent,
    ConfermadialogComponent,
    RichiestedicaricoComponent,
    RiepilogoComponent,
    ArchivioriepiloghiComponent,
    ModificariepilogoComponent,
    AggiungiquotazionedialogComponent,
    GestioneutentiComponent,
    AggiungiutentedialogComponent,
    VisfabbisognoComponent,
    VispreventivoComponent,
    VistrasportoComponent,
    VisriepilogoComponent,
    VisaggiungimodificafabbisognoComponent,
    VisrecappreventivoComponent,
    VismodificariepilogoComponent,
    VisrichiestedicaricoComponent,
    VisrecaptrasportoComponent,
    AggiungiquotazionepuntovenditadialogComponent,
    AggiungiquotazionepuntovenditasoloservitodialogComponent,
    CreapreventivoallservitoComponent,
    RecappreventivosoloservitoComponent,
    AggiungibonificodialogComponent,
    RiepilogoclienteComponent,
    RiepilogoclientesingolaComponent,
    ClifabbisognoComponent,
    ClipreventiviComponent,
    ClirecappreventivoComponent,
    GestioneprezziComponent,
    GestioneprezzipersingoloclienteComponent,
    GestioneprezzisingoloprezzoComponent,
    AggiungimodificaquotazionecondatiComponent,
    AggiungiprezzoconcorrenzadialogComponent,
  ]
})

export class AdminLayoutModule {}
