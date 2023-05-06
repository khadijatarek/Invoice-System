import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { GlobalVariableService } from './global-variable.service';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  constructor(private db: FirebaseService, private gb:GlobalVariableService) {
    this.loadDataFromFirebase();
  }
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
  telBillType = this.gb.custTelType;

  private _elecRate: number; //= 9.5;
  private _waterRate: number; //= 8;
  private _postPaidTelRate: number = this.gb.custRate;
  private _prePaidTelRate: number = this.gb.custRate;

  private _elecExtraFeesRate: number; // = 0.2;
  private _waterExtraFeesRate: number; //= 0.3;
  private _prePaidTelExtraFeesRate: number = 0.3;
  private _postPaidTelExtraFeesRate: number = 0.3;

  saveRateToFireBase(rateType: string, rateValue) {
    return this.db.addRates(rateType, rateValue);
  }
  getRateFromFireBase(rateType: string) {
    return this.db.getRates(rateType);
  }

  loadDataFromFirebase() {
    this.getRateFromFireBase('elecRate').subscribe((number) => {
      this.elecRate = number;
    });
    this.getRateFromFireBase('elecExtraFeesRate').subscribe((number) => {
      this.elecExtraFeesRate = number;
    });
    this.getRateFromFireBase('waterRate').subscribe((number) => {
      this.waterRate = number;
    });
    this.getRateFromFireBase('waterExtraFeesRate').subscribe((number) => {
      this.waterExtraFeesRate = number;
    });
  }

  saveToFireBase() {
    //update water extra
    this.saveRateToFireBase('elecRate', this.elecRate).subscribe(
      (response: any) => {
        console.log('Data added to Firebase Realtime Database:', response);
      }
    );
    //update elec extra
    this.saveRateToFireBase(
      'elecExtraFeesRate',
      this.elecExtraFeesRate
    ).subscribe((response: any) => {
      console.log('Data added to Firebase Realtime Database:', response);
    });

    //update water
    this.saveRateToFireBase('waterRate', this.waterRate).subscribe(
      (response: any) => {
        console.log('Data added to Firebase Realtime Database:', response);
      }
    );

    //update water extra
    this.saveRateToFireBase(
      'waterExtraFeesRate',
      this.waterExtraFeesRate
    ).subscribe((response: any) => {
      console.log('Data added to Firebase Realtime Database:', response);
    });
  }
  ///////////////////////////////////////////////

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
