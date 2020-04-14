import IProduct from "./IProduct";

export default interface ICart {
  listProduct: IProduct[];
  taxValue: number;
  totalValue: number;
  amount: number
}
