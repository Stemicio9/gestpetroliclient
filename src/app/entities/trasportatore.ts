import {Atk} from './atk';
import {Rimorchio} from './rimorchio';
import {Autista} from './autista';

export class Trasportatore {
    nometrasportatore: string;
    listaatk: Atk[] = [];
    listarimorchi: Rimorchio[] = [];
    listaautisti: Autista[] = [];
}
