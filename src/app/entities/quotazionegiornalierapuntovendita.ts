import {Fornitore} from './fornitore';
import {Quotazionegiornaliera} from './quotazionegiornaliera';

export class Quotazionegiornalierapuntovendita {
    id: number;
    data: Date;
    prezzobenzina: number;
    prezzogasolio: number;
    prezzogpl: number;
    prezzosupreme: number;
    prezzobenzinaself: number;
    prezzogasolioself: number;
    prezzogplself: number;
    prezzosupremeself: number;
    marginecessionegasolio: number;
    marginecessionebenzina: number;
    marginecessionesupreme: number;
    marginecessionegpl: number;

    volumegasolioself: number;
    volumegasolioservito: number;
    volumebenzinaself: number;
    volumebenzinaservito: number;
    volumesupremeself: number;
    volumesupremeservito: number;
    volumegpl: number;

    trasportogasolioself: number;
    trasportogasolioservito: number;
    trasportobenzinaself: number;
    trasportobenzinaservito: number;
    trasportosupremeself: number;
    trasportosupremeservito: number;
    trasportogpl: number;

    altrocostogasolioservito: number;
    altrocostogasolioself: number;
    altrocostobenzinaself: number;
    altrocostobenzinaservito: number;
    altrocostosupremeself: number;
    altrocostosupremeservito: number;
    altrocostogpl: number;

    fornitore: Fornitore;
    quotazionefornitore: Quotazionegiornaliera;
}
