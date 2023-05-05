import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GlobalVariableService } from '../shared/global-variable.service';
import { FirebaseService } from '../shared/firebase.service';
import { payment } from '../models/payment';
import { BillingService } from '../shared/billing.service';
import { RateService } from '../shared/rate.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-tel',
  templateUrl: './tel.component.html',
  styleUrls: ['./tel.component.scss'],
})
export class TelComponent implements OnInit {
  pendingPayments: payment[] = [];
  totalAmount: number;
  enteredUnits: string;

  rate: number;
  type: string;
  extraRate: number;

  userID: number;

  enteredDate: string;
  dueDate: Date;

  maxDate: string;

  // just for telephone:
  //serviceType: string = 'prePaid'; //prePaid or postPaid
  serviceType: string = 'postPaid'; //prePaid or postPaid
  //serviceType: string=''; //prePaid or postPaid

  constructor(
    private gb: GlobalVariableService,
    private db: FirebaseService,
    private billing: BillingService,
    private userInfo: GlobalVariableService,
    private rateServ: RateService
  ) {
    const today = new Date();
    this.maxDate = today.toISOString().substring(0, 10);
  }

  //sp part msh 3arfa a3mlha feeha eh???

  providerId = 'spID'; // Replace with the desired service provider ID
  services1: any[] = [];
  services2: any[] = [];

  ngOnInit(): void {
    this.db.getServices('1234').subscribe((services) => {
      this.services1 = services;
      console.log(services);
    });
    this.db.getServices('2323').subscribe((services) => {
      this.services2 = services;
      console.log(services);
    });

    //billing related
    this.userID = 1111;

    //gai mn el service
    this.type = this.rateServ.telBillType;
    if (this.serviceType == 'prePaid') {
      this.rate = this.rateServ.prePaidTelRate;
      this.extraRate = this.rateServ.prePaidTelExtraFeesRate;
    } else {
      this.rate = this.rateServ.postPaidTelRate;
      this.extraRate = this.rateServ.postPaidTelExtraFeesRate;
    }
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
        this.rate,
        parseInt(this.enteredUnits)
      );

      //calculate extra fee
      let extraFee = this.billing.addExtraFees(
        this.dueDate,
        paymentAmount,
        this.extraRate
      );

      //building payment
      let newPayment = new payment(
        generatedPaymentId,
        parseInt(this.enteredUnits),
        paymentAmount,
        false
      );
      newPayment.rate = this.rate;
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
    if (this.serviceType == 'prePaid') {
      this.dueDate = this.billing.calcDueDatePrePaid(this.enteredDate);
    } else {
      this.dueDate = this.billing.calcDueDate(this.enteredDate);
    }
  }
}
