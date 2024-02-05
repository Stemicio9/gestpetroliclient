import {Fabbisogno} from './fabbisogno';
import {Atk} from './atk';
import {Rimorchio} from './rimorchio';
import {Autista} from './autista';

export class Trasporto {
    id: number;
    datadicaricazione: Date;
    fabbisogno: Fabbisogno;
    atk: Atk;
    rimorchio: Rimorchio;
    autista: Autista;
    nometrasportatore: string;
    identificativoviaggio: string;
}
