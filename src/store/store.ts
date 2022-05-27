import { makeAutoObservable } from "mobx";

export default class Store {
  private _dashData: any[];
  private _selectColumn: string;
  private _selectSort: string;
  constructor() {
    makeAutoObservable(this);
    this._dashData = [];
    this._selectSort = "";
    this._selectColumn = "";
  }

  get dashData() {
    return this._dashData;
  }

  set dashData(val) {
    this._dashData = val;
  }
  get selectColumn() {
    return this._selectColumn;
  }

  set selectColumn(val) {
    this._selectColumn = val;
  }

  get selectSort() {
    return this._selectSort;
  }

  set selectSort(val) {
    this._selectSort = val;
  }
  // get selectColumn() {
  //   return this.selectColumn;
  // }

  // set selectColumn(val) {
  //   this.selectColumn = val;
  // }
}
