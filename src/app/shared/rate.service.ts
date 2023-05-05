import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  constructor() {}
  /*elecRate: number = 9.5;
  waterRate: number = 8;
  postPaidTelRate: number = 88;
  prePaidTelRate: number = 88;

  elecExtraFeesRate: number = 0.2;
  waterExtraFeesRate: number = 0.3;
  prePaidTelExtraFeesRate: number = 0.3;
  postPaidTelExtraFeesRate: number = 0.3;
*/
  elecBillType = 'elecBills';
  waterBillType = 'waterBills';
  telBillType = 'telBills';

  private _elecRate: number = 9.5;
  private _waterRate: number = 8;
  private _postPaidTelRate: number = 88;
  private _prePaidTelRate: number = 88;

  private _elecExtraFeesRate: number = 0.2;
  private _waterExtraFeesRate: number = 0.3;
  private _prePaidTelExtraFeesRate: number = 0.3;
  private _postPaidTelExtraFeesRate: number = 0.3;

  get elecRate(): number {
    return this._elecRate;
  }

  set elecRate(value: number) {
    this._elecRate = value;
  }

  get waterRate(): number {
    return this._waterRate;
  }

  set waterRate(value: number) {
    this._waterRate = value;
  }

  get postPaidTelRate(): number {
    return this._postPaidTelRate;
  }

  set postPaidTelRate(value: number) {
    this._postPaidTelRate = value;
  }

  get prePaidTelRate(): number {
    return this._prePaidTelRate;
  }

  set prePaidTelRate(value: number) {
    this._prePaidTelRate = value;
  }

  get elecExtraFeesRate(): number {
    return this._elecExtraFeesRate;
  }

  set elecExtraFeesRate(value: number) {
    this._elecExtraFeesRate = value;
  }

  get waterExtraFeesRate(): number {
    return this._waterExtraFeesRate;
  }

  set waterExtraFeesRate(value: number) {
    this._waterExtraFeesRate = value;
  }

  get prePaidTelExtraFeesRate(): number {
    return this._prePaidTelExtraFeesRate;
  }

  set prePaidTelExtraFeesRate(value: number) {
    this._prePaidTelExtraFeesRate = value;
  }

  get postPaidTelExtraFeesRate(): number {
    return this._postPaidTelExtraFeesRate;
  }

  set postPaidTelExtraFeesRate(value: number) {
    this._postPaidTelExtraFeesRate = value;
  }
}
