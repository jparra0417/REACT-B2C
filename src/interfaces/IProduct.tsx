import IItem from "./IItem";

export default interface IProduct {
  item: IItem;
  taxValue: number;
  totalValue: number;
  unitValue: number;
  amount: number;
}
