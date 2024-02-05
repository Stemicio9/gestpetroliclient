import {Fabbisogno} from './fabbisogno';
import {Vocedirettificaconvalore} from './vocedirettificaconvalore';

export class Preventivo {
    id: number;
    data: Date;
    nomecliente:string;
    riferimento: Fabbisogno;
    prezzoalpubblicogasolioservito: number;
    prezzoalpubblicogasolioself: number;
    prezzoalpubblicobenzinaservito: number;
    prezzoalpubblicobenzinaself: number;
    prezzoalpubblicosupremeservito: number;
    prezzoalpubblicosupremeself: number;
    prezzoalpubblicogplservito: number;
    prezzoalpubblicogplself: number;
    marginecessionegasolio: number;
    marginecessionebenzina: number;
    marginecessionesupreme: number;
    marginecessionegpl: number;
    listavocidirettifica: Vocedirettificaconvalore[] = [];
}
