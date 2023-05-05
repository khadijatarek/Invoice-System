import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { payment } from '../models/payment';
import { v4 as uuidv4 } from 'uuid';
import { BillingService } from '../shared/billing.service';
import { GlobalVariableService } from '../shared/global-variable.service';
import { RateService } from '../shared/rate.service';
import { DateFormatPipe } from '../date-format.pipe';

@Component({
  selector: 'app-elec',
  templateUrl: './elec.component.html',
  styleUrls: ['./elec.component.scss'],
})
export class ElecComponent implements OnInit {
  pendingPayments: payment[] = [];
  totalAmount: number;
  enteredUnits: string;

  //rate: number;
  type: string;
  //extraRate: number;

  userID: number;

  enteredDate: string;
  dueDate: Date;

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
    //this.userID=userInfo.UserId;
    this.userID = 1111;

    //gai mn el service
    //this.rate = this.rateServ.elecRate;
    this.type = this.rateServ.elecBillType;
    //this.extraRate = this.rateServ.elecExtraFeesRate;

    //update table
    this.getAllPayments();
  }

  addPayment() {
    if (this.enteredUnits != '') {
      window.alert(`new reading saved date:${this.enteredDate}`);
      this.getAllPayments();
      this.getAllPayments();
      this.calculateDueDate();
      //building payment
      let generatedPaymentId = uuidv4();

      //calculate total(using service)
      let paymentAmount = this.billing.calculatePaymentAmount(
        this.rateServ.elecRate,
        parseInt(this.enteredUnits)
      );

      //calculate extra fee
      let extraFee = this.billing.addExtraFees(
        this.dueDate,
        paymentAmount,
        this.rateServ.elecExtraFeesRate
      );

      //building payment
      let newPayment = new payment(
        generatedPaymentId,
        parseInt(this.enteredUnits),
        paymentAmount,
        false
      );
      newPayment.rate = this.rateServ.elecRate;
      newPayment.extraFee = extraFee;
      newPayment.dueDate = this.dueDate;

      //save to firebase
      this.billing
        .addNewPendingPayment(this.userID.toString(), newPayment, this.type)
        .subscribe((response: any) => {
          console.log('Data added to Firebase Realtime Database:', response);
        });

      //update table
      this.getAllPayments();

      //clearing enteredUnits
      this.enteredUnits = '';
      this.enteredDate = '';
    }
  }

  payPendingPayment(pay: payment) {
    // window.alert('payment done')
    pay.isPaid = true;
    pay.paymentDay = new Date();

    this.billing
      .payPayment(this.userID.toString(), pay, this.type)
      .subscribe((response: any) => {
        console.log('Data updated in Firebase Realtime Database:', response);
      });
    //update table
    window.alert('payment done'); ///////////////// e3melii hena pop up
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

  calculateDueDate() {
    this.dueDate = this.billing.calcDueDate(this.enteredDate);
  }
}
