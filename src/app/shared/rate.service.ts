import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor() { }
  elecRate: number=9.5;
  waterRate: number=8;
  telRate: number=88;
  
  elecBillType='elecBills';
  waterBillType='waterBills';
  telBillType='elecBills';
}
