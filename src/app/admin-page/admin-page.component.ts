import { Component, OnInit } from '@angular/core';
import { RateService } from '../shared/rate.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  electricityRate: number;
  electricityExtraRate: number;

  waterRate: number;
  waterExtraRate: number;

  enteredElecRate: string;
  enteredElecExtraRate: string;
  enteredWaterRate: string;
  enteredWaterExtraRate: string;
  ngOnInit(): void {
    this.updateRate();
  }
  constructor(private rateServ: RateService) {}

  //change in service and firebase
  changeElecRate() {
    this.rateServ.elecRate = parseInt(this.enteredElecRate);
    this.enteredElecRate = '';
    this.updateRate();
  }

  changeElecExtraRate() {
    this.rateServ.elecExtraFeesRate = parseInt(this.enteredElecExtraRate);
    this.enteredElecExtraRate = '';
    this.updateRate();
  }

  changeWaterRate() {
    this.rateServ.waterExtraFeesRate = parseInt(this.enteredWaterRate);
    this.enteredWaterRate = '';
    this.updateRate();
  }

  changeWaterExtraRate() {
    this.rateServ.waterExtraFeesRate = parseInt(this.enteredWaterExtraRate);
    this.enteredWaterExtraRate = '';
    this.updateRate();
  }

  //update UI
  updateRate() {
    this.electricityRate = this.rateServ.elecRate;
    this.electricityExtraRate = this.rateServ.elecExtraFeesRate;

    this.waterRate = this.rateServ.waterRate;
    this.waterExtraRate = this.rateServ.waterExtraFeesRate;
  }
}
