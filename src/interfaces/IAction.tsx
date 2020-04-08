import { EAction } from "../enums/EAction";

export interface IAction {
  type: EAction;
  payload?: any;
}
