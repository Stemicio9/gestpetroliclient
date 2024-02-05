import {Vocedirettificaconvalore} from './vocedirettificaconvalore';
import {Quotazionegiornalierapuntovendita} from './quotazionegiornalierapuntovendita';
import {Concorrente} from './concorrente';

export class Puntovendita {
    idpunto: number;
    nome: string;
    codicedestinazione: string;
    via: string;
    citta: string;
    provincia: string;
    cap: string;
    listavocidirettifica: Vocedirettificaconvalore[];
    quotazioni: Quotazionegiornalierapuntovendita[];
    email: string;
    allservito: boolean;
    listaconcorrenti: Concorrente[];
}
