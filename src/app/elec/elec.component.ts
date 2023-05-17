import { Component, OnInit, ViewChild } from '@angular/core';
import { payment } from '../models/payment';
import { BillingService } from '../shared/billing.service';
import { GlobalVariableService } from '../shared/global-variable.service';
import { RateService } from '../shared/rate.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-elec',
  templateUrl: './elec.component.html',
  styleUrls: ['./elec.component.scss'],
})
export class ElecComponent implements OnInit {
  @ViewChild('myForm') myForm: NgForm;

  pendingPayments: payment[] = [];

  type: string;
  userID: number;

  enteredUnits: string;
  enteredDate: string;
  maxDate: string;

  constructor(
    private billing: BillingService,
    private userInfo: GlobalVariableService,
    private rateServ: RateService
  ) {
    const today = new Date();
    this.maxDate = today.toISOString().substring(0, 10);
  }
  ngOnInit(): void {
    //this.userID = this.userInfo.UserId;
    this.userID = 123456;
    console.log(this.userID);
    this.type = this.rateServ.elecBillType;

    //update table
    this.getAllPayments();
  }

  addPayment() {
    if (this.myForm.valid) {
      window.alert(`new reading saved`);
      this.getAllPayments();
      this.getAllPayments();

      //create new bill
      let newPay: payment = this.billing.createNewPayment(
        this.rateServ.elecRate,
        parseInt(this.enteredUnits),
        this.enteredDate,
        this.rateServ.elecExtraFeesRate
      );

      //save to firebase
      this.billing
        .addNewPendingPayment(this.userID.toString(), newPay, this.type)
        .subscribe((response: any) => {
          console.log('Data added to Firebase Realtime Database:', response);
        });

      //update table
      this.getAllPayments();

      //clearing enteredUnits
      this.enteredUnits = '';
      this.enteredDate = '';
    } else {
      window.alert(`enter data`);
    }
  }

  payPendingPayment(pay: payment) {
    pay.isPaid = true;
    pay.paymentDay = new Date();

    this.billing
      .payPayment(this.userID.toString(), pay, this.type)
      .subscribe((response: any) => {
        console.log('Data updated in Firebase Realtime Database:', response);
      });
    //update table
    window.alert('payment done');
    this.getAllPayments();
  }

  getAllPayments() {
    this.billing
      .getPayments(this.userID.toString(), this.type)
      .subscribe((payments) => {
        this.pendingPayments = this.getUnpaidBills(payments);
        return payments;
      });
  }

  getUnpaidBills(bills: payment[]): payment[] {
    return bills.filter((bill) => !bill.isPaid);
  }
}
