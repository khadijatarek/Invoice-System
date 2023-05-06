import { payment } from './../models/payment';
import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { user } from '@angular/fire/auth';
import { GlobalVariableService } from './global-variable.service';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private db: FirebaseService, private gb: GlobalVariableService) {}
  calculatePaymentAmount(rate: number, units: number) {
    return rate * units;
  }


  calculateTelPaymentAmount(rate: number, units: number) {

    console.log("type:", this.gb.custTelType);
    if(this.gb.custTelType == "prePaid")
    {
      return rate;
    }
    else
    {
      return rate * units;
    }
  }


  //add payment
  addNewPendingPayment(userID: string, pay: payment, billType: string) {
    return this.db.addPendingPaymentForUser(userID, pay, billType);
  }

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

            pay.push(
              /* new payment(
                key,
                //response[key].dueDate,
                response[key].unitsUsed,
                response[key].totalAmount,
                response[key].isPaid
              )
            );*/
              res
            );

            console.log(response);
            console.log(res);
          }
        }
        return pay;
      })
    );
  }

  //pay specific
  payPayment(userID: string, pay: payment, billType: string) {
    //put in firebase
    pay.isPaid = true;
    return this.addNewPendingPayment(userID, pay, billType);
  }

  //  due date adds month
  calcDueDate(enteredDate: string) {
    const enteredDateObj = new Date(enteredDate);
    const dueDateObj = new Date(
      enteredDateObj.setMonth(enteredDateObj.getMonth() + 1)
    );

    return dueDateObj;
  }

  // due date adds a day
  calcDueDatePrePaid(enteredDate: string) {
    const enteredDateObj = new Date(enteredDate);
    const dueDateObj = new Date(
      enteredDateObj.setDate(enteredDateObj.getDay() + 1)
    );

    return dueDateObj;
  }

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
}
