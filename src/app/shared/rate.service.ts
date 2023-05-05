import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  constructor() {}
  elecRate: number = 9.5;
  waterRate: number = 8;
  postPaidTelRate: number = 88;
  prePaidTelRate: number = 88;

  elecExtraFeesRate: number = 0.2;
  waterExtraFeesRate: number = 0.3;
  prePaidTelExtraFeesRate: number = 0.3;
  postPaidTelExtraFeesRate: number = 0.3;

  elecBillType = 'elecBills';
  waterBillType = 'waterBills';
  telBillType = 'telBills';

  /*
  get _elecRate(): number {
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

  get telRate(): number {
    return this._telRate;
  }

  set telRate(value: number) {
    this._telRate = value;
  }

  get elecBillType(): string {
    return this._elecBillType;
  }

  set elecBillType(value: string) {
    this._elecBillType = value;
  }

  get waterBillType(): string {
    return this._waterBillType;
  }

  set waterBillType(value: string) {
    this._waterBillType = value;
  }

  get telBillType(): string {
    return this._telBillType;
  }

  set telBillType(value: string) {
    this._telBillType = value;
  }
  */
}
