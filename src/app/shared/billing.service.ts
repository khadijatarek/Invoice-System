import { payment } from './../models/payment';
import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/operators';
import { GlobalVariableService } from './global-variable.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private db: FirebaseService, private gb: GlobalVariableService) {}

  //build a new payment
  createNewPayment(
    rate: number,
    units: number,
    enteredDate: string,
    extraFeesRate: number
  ): payment {
    let generatedPaymentId = uuidv4();
    let paymentAmount = this.calculatePaymentAmount(rate, units);
    let dueDate = this.calcDueDate(enteredDate);
    let extraFee = this.addExtraFees(dueDate, paymentAmount, extraFeesRate);

    let newPayment = new payment(
      generatedPaymentId,
      units,
      paymentAmount,
      false
    );
    newPayment.rate = rate;
    newPayment.extraFee = extraFee;
    newPayment.dueDate = dueDate;

    return newPayment;
  }

  //add payment
  addNewPendingPayment(userID: string, pay: payment, billType: string) {
    return this.db.addPendingPaymentForUser(userID, pay, billType);
  }

  //get all user's payments
  getPayments(userID: string, billType: string) {
    return this.db.getAllPayments(userID, billType).pipe(
      map((response) => {
        const pay = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            let res: payment = new payment(
              key,
              response[key].unitsUsed,
              response[key].totalAmount,
              response[key].isPaid
            );
            res.dueDate = response[key].dueDate;
            res.extraFee = response[key].extraFee;
            res.rate = response[key].rate;
            res.paymentDay = response[key].paymentDay;

            pay.push(res);

            console.log(response);
            console.log(res);
          }
        }
        return pay;
      })
    );
  }

  //pay specific payment
  payPayment(userID: string, pay: payment, billType: string) {
    //put in firebase
    pay.isPaid = true;
    return this.addNewPendingPayment(userID, pay, billType);
  }

  //due date adds month
  calcDueDate(enteredDate: string) {
    const enteredDateObj = new Date(enteredDate);
    const dueDateObj = new Date(
      enteredDateObj.setMonth(enteredDateObj.getMonth() + 1)
    );

    return dueDateObj;
  }

  //due date adds a day
  calcDueDatePrePaid(enteredDate: string) {
    const enteredDateObj = new Date(enteredDate);
    const dueDateObj = new Date(
      enteredDateObj.setDate(enteredDateObj.getDay() + 1)
    );
    return dueDateObj;
  }

  //law fi gharama
  addExtraFees(dueDate: Date, billAmount: number, extraFeesRate: number) {
    const now = new Date();
    let extraFees: number;
    if (dueDate < now) {
      extraFees = billAmount * extraFeesRate;
    } else {
      extraFees = 0;
    }
    return extraFees;
  }

  //total amount
  calculatePaymentAmount(rate: number, units: number) {
    return rate * units;
  }

  calculateTelPaymentAmount(rate: number, units: number) {
    console.log('type:', this.gb.custTelType);
    if (this.gb.custTelType == 'prePaid') {
      return rate;
    } else {
      return rate * units;
    }
  }
}
