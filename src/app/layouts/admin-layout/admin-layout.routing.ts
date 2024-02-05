import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import {FabbisognoComponent} from '../../fabbisogno/fabbisogno.component';
import {GestioneclientiComponent} from '../../gestioneclienti/gestioneclienti.component';
import {AggiungimodificaclienteComponent} from '../../aggiungimodificacliente/aggiungimodificacliente.component';
import {GestionevocidirettificaComponent} from '../../gestionevocidirettifica/gestionevocidirettifica.component';
import {GestionebasidicaricoComponent} from '../../gestionebasidicarico/gestionebasidicarico.component';
import {GestionefornitoriComponent} from '../../gestionefornitori/gestionefornitori.component';
import {AggiungimodificafornitoreComponent} from '../../aggiungimodificafornitore/aggiungimodificafornitore.component';
import {GestionetrasportatoriComponent} from '../../gestionetrasportatori/gestionetrasportatori.component';
import {AggiungimodificatrasportatoreComponent} from '../../aggiungimodificatrasportatore/aggiungimodificatrasportatore.component';
import {GestionepuntivenditaComponent} from '../../gestionepuntivendita/gestionepuntivendita.component';
import {AggiungimodificapuntovenditaComponent} from '../../aggiungimodificapuntovendita/aggiungimodificapuntovendita.component';
import {AggiungimodificafabbisognoComponent} from '../../aggiungimodificafabbisogno/aggiungimodificafabbisogno.component';
import {PreventivoComponent} from '../../preventivo/preventivo.component';
import {CreapreventivoComponent} from '../../creapreventivo/creapreventivo.component';
import {RecappreventivoComponent} from '../../recappreventivo/recappreventivo.component';
import {TrasportoComponent} from '../../trasporto/trasporto.component';
import {RecaptrasportoComponent} from '../../recaptrasporto/recaptrasporto.component';
import {CreatrasportoComponent} from '../../creatrasporto/creatrasporto.component';
import {RichiestedicaricoComponent} from '../../richiestedicarico/richiestedicarico.component';
import {RiepilogoComponent} from '../../riepilogo/riepilogo.component';
import {ModificariepilogoComponent} from '../../modificariepilogo/modificariepilogo.component';
import {GestioneutentiComponent} from '../../gestioneutenti/gestioneutenti.component';
import {VisfabbisognoComponent} from '../../visfabbisogno/visfabbisogno.component';
import {VispreventivoComponent} from '../../vispreventivo/vispreventivo.component';
import {VistrasportoComponent} from '../../vistrasporto/vistrasporto.component';
import {VisriepilogoComponent} from '../../visriepilogo/visriepilogo.component';
import {VisaggiungimodificafabbisognoComponent} from '../../visaggiungimodificafabbisogno/visaggiungimodificafabbisogno.component';
import {VisrecappreventivoComponent} from '../../visrecappreventivo/visrecappreventivo.component';
import {VismodificariepilogoComponent} from '../../vismodificariepilogo/vismodificariepilogo.component';
import {VisrecaptrasportoComponent} from '../../visrecaptrasporto/visrecaptrasporto.component';
import {VisrichiestedicaricoComponent} from '../../visrichiestedicarico/visrichiestedicarico.component';
import {RiepilogoclienteComponent} from '../../riepilogocliente/riepilogocliente.component';
import {RiepilogoclientesingolaComponent} from '../../riepilogoclientesingola/riepilogoclientesingola.component';
import {ClifabbisognoComponent} from '../../clifabbisogno/clifabbisogno.component';
import {ClipreventiviComponent} from '../../clipreventivi/clipreventivi.component';
import {ClirecappreventivoComponent} from '../../clirecappreventivo/clirecappreventivo.component';
import {GestioneprezziComponent} from '../../gestioneprezzi/gestioneprezzi.component';
import {GestioneprezzipersingoloclienteComponent} from '../../gestioneprezzipersingolocliente/gestioneprezzipersingolocliente.component';
import {GestioneprezzisingoloprezzoComponent} from '../../gestioneprezzisingoloprezzo/gestioneprezzisingoloprezzo.component';
import {AggiungimodificaquotazionecondatiComponent} from '../../aggiungimodificaquotazionecondati/aggiungimodificaquotazionecondati.component';
import {ArchivioriepiloghiComponent} from '../../archivioriepiloghi/archivioriepiloghi.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'fabbisogno',      component: FabbisognoComponent },
    { path: 'preventivo',      component: PreventivoComponent },
    { path: 'trasporto',      component: TrasportoComponent },
    { path: 'riepilogo',      component: RiepilogoComponent },
    { path: 'archivioriepiloghi',      component: ArchivioriepiloghiComponent },
    { path: 'gestioneclienti',      component: GestioneclientiComponent },
    { path: 'gestionepuntivendita',      component: GestionepuntivenditaComponent },
    { path: 'gestionetrasportatori',      component: GestionetrasportatoriComponent },
    { path: 'gestionevocidirettifica',      component: GestionevocidirettificaComponent },
    { path: 'gestionebasidicarico',      component: GestionebasidicaricoComponent },
    { path: 'gestionefornitori',      component: GestionefornitoriComponent },
    { path: 'gestioneutenti',      component: GestioneutentiComponent },
    { path: 'gestioneprezzi',      component: GestioneprezziComponent },
    { path: 'gestioneprezzisingolocliente',      component: GestioneprezzipersingoloclienteComponent },
    { path: 'gestioneprezzisingoloprezzo',      component: GestioneprezzisingoloprezzoComponent },
    { path: 'aggiungimodificaquotazionecondati',      component: AggiungimodificaquotazionecondatiComponent },
    { path: 'aggiungimodificacliente', component: AggiungimodificaclienteComponent},
    { path: 'aggiungimodificafabbisogno', component: AggiungimodificafabbisognoComponent},
    { path: 'aggiungimodificapuntovendita', component: AggiungimodificapuntovenditaComponent},
    { path: 'aggiungimodificafornitore', component: AggiungimodificafornitoreComponent},
    { path: 'aggiungimodificatrasportatore', component: AggiungimodificatrasportatoreComponent},
    { path: 'creapreventivo', component: CreapreventivoComponent},
    { path: 'creatrasporto', component: CreatrasportoComponent},
    { path: 'recappreventivo', component: RecappreventivoComponent},
    { path: 'recaptrasporto', component: RecaptrasportoComponent},
    { path: 'richiestedicarico', component: RichiestedicaricoComponent},
    { path: 'modificariepilogo', component: ModificariepilogoComponent},

    { path: 'visfabbisogno',      component: VisfabbisognoComponent },
    { path: 'vispreventivo',      component: VispreventivoComponent },
    { path: 'vistrasporto',      component: VistrasportoComponent },
    { path: 'visriepilogo',      component: VisriepilogoComponent },
    { path: 'visaggiungimodificafabbisogno', component: VisaggiungimodificafabbisognoComponent},
    { path: 'visrecappreventivo', component: VisrecappreventivoComponent},
    { path: 'vismodificariepilogo', component: VismodificariepilogoComponent},
    { path: 'visrecaptrasporto', component: VisrecaptrasportoComponent},
    { path: 'visrichiestedicarico', component: VisrichiestedicaricoComponent},


    { path: 'riepilogocliente',      component: RiepilogoclienteComponent },
    { path: 'riepilogoclientesingola',      component: RiepilogoclientesingolaComponent },
    { path: 'clifabbisogno',      component: ClifabbisognoComponent },
    { path: 'clipreventivi',      component: ClipreventiviComponent },
    { path: 'clirecappreventivo',      component: ClirecappreventivoComponent },
];
