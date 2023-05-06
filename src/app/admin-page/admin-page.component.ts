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
    this.rateServ.loadDataFromFirebase();
    this.initialLoad();
  }
  constructor(private rateServ: RateService) {}

  //change in service and firebase
  changeElecRate() {
    this.rateServ.elecRate = parseFloat(this.enteredElecRate);
    this.enteredElecRate = '';
    this.updateRate();
  }

  changeElecExtraRate() {
    this.rateServ.elecExtraFeesRate = parseFloat(this.enteredElecExtraRate);
    this.enteredElecExtraRate = '';
    this.updateRate();
  }

  changeWaterRate() {
    this.rateServ.waterRate = parseFloat(this.enteredWaterRate);
    this.enteredWaterRate = '';
    this.updateRate();
  }

  changeWaterExtraRate() {
    this.rateServ.waterExtraFeesRate = parseFloat(this.enteredWaterExtraRate);
    this.enteredWaterExtraRate = '';
    this.updateRate();
  }
  //just to make data visible
  initialLoad() {
    this.rateServ.getRateFromFireBase('elecRate').subscribe((number) => {
      this.rateServ.elecRate = number;
      this.electricityRate = this.rateServ.elecRate;
    });
    this.rateServ
      .getRateFromFireBase('elecExtraFeesRate')
      .subscribe((number) => {
        this.electricityExtraRate = this.rateServ.elecExtraFeesRate;
        this.rateServ.elecExtraFeesRate = number;
      });
    this.rateServ.getRateFromFireBase('waterRate').subscribe((number) => {
      this.rateServ.waterRate = number;
      this.waterRate = this.rateServ.waterRate;
    });
    this.rateServ
      .getRateFromFireBase('waterExtraFeesRate')
      .subscribe((number) => {
        this.rateServ.waterExtraFeesRate = number;
        this.waterExtraRate = this.rateServ.waterExtraFeesRate;
      });
  }

  //update UI
  updateRate() {
    this.electricityRate = this.rateServ.elecRate;
    this.electricityExtraRate = this.rateServ.elecExtraFeesRate;

    this.waterRate = this.rateServ.waterRate;
    this.waterExtraRate = this.rateServ.waterExtraFeesRate;

    this.rateServ.saveToFireBase();
  }
}
