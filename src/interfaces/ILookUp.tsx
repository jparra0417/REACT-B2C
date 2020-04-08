import ISort from "./ISort";

export default interface ILookUp {
  search : string;  
  sort: ISort[];
  length: number;
  page: number;
}