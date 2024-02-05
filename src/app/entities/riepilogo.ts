import {Fabbisogno} from './fabbisogno';
import {Trasporto} from './trasporto';
import {Preventivo} from './preventivo';
import {Bonifico} from './bonifico';

export class Riepilogo {
    id: number;
    fabbisogno: Fabbisogno;
    caligasolio: number;
    calibenzina: number;
    calisupreme: number;
    caligpl: number;
    ultimoscarico: number;
    trasporto: Trasporto;
    preventivo: Preventivo;
    das: string;
    numerofatturafornitore: string;
    numerofatturapartenopea: string;
    databonifico: Date;
    importobonifico: number;
    listabonifici: Bonifico[];
    files: any[];
}
