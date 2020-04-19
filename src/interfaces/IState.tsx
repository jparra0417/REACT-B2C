import ICart from "./ICart";
import ILookUp from "./ILookUp";
import { IPager } from "./IPager";
import { IInvoice } from "./IInvoice";

export default interface IState {
  cart: ICart;
  lookUp: ILookUp;
  pager: IPager;
  lang: string;
  invoice?: IInvoice;
}
