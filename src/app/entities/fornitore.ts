import {Quotazionegiornaliera} from './quotazionegiornaliera';

export class Fornitore {
    idfornitore: number;
    nomefornitore: string;
    datainiziocontratto: Date;
    datafinecontratto: Date;
    quotazioni: Quotazionegiornaliera[];
}
