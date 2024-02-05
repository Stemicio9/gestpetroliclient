import {Cliente} from './cliente';
import {Basedicarico} from './basedicarico';
import {Fornitore} from './fornitore';
import {Puntovendita} from './puntovendita';

export class Fabbisogno {
    id: number;
    data: Date;
    puntoVendita: Puntovendita;
    basedicarico: Basedicarico;
    fornitore: Fornitore;
    gasolio: number;
    benzina: number;
    supreme: number;
    gpl: number;
    smaltito: boolean;
    preventivoesistente: boolean;
    trasportoesistente: boolean;
}
