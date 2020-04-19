import ICart from "./ICart";
import { ICash } from "./ICash";

export interface IInvoice {
    id : string;
    cart : ICart;
    payment: number;
    change: number;
    due: number;
    changeCash : ICash[];    
    date ?: number;    
}