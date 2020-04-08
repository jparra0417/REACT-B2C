import IProduct from "./IProduct";

export default interface ICart {
  listProduct: IProduct[];
  taxValue: number;
  totalValue: number;
  active : boolean;
}
