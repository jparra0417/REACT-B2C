import ICart from "./ICart";
import ILookUp from "./ILookUp";
import { IPager } from "./IPager";

export default interface IState {
  cart: ICart;
  lookUp: ILookUp;
  pager: IPager;
  lang: string;
}
