import {Puntovendita} from './puntovendita';

export class Cliente {

    idcliente:number;
    nomecliente:string;
    partitaiva:string;
    listapuntivendita: Puntovendita[] = [];

    marginegasolioservito: number;
    marginegasolioself: number;
    marginebenzinaservito: number;
    marginebenzinaself: number;
    marginesupremeservito: number;
    marginesupremeself: number;
    marginegplservito: number;
    marginegplself: number;

}
