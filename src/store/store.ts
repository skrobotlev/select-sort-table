import { makeAutoObservable } from "mobx";

export default class Store {
  private _dashData: any[];

  constructor() {
    makeAutoObservable(this);
    this._dashData = [];
  }

  get dashData() {
    return this._dashData;
  }

  set dashData(val) {
    this._dashData = val;
  }
}
