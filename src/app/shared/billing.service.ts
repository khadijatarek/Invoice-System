import { payment } from './../models/payment';
import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  type:string;
  userId:number=1111;
  rate:number;
  allPayments:payment[];


  constructor(private db:FirebaseService) {

  }
  calculatePaymentAmount(rate:number,units:number){
    return rate*units;
  }

  //add payment
  addNewPendingPayment(pay:payment){
    this.db.addPendingPaymentForUser(this.type,this.userId,pay).subscribe((response: any) => {
      console.log('Data added to Firebase Realtime Database:', response);
    });
  }
  //pay specific
  //pay all
  payPayment(pay:payment){
    //put in firebase
  }
  //get all payments
  getAllPayments() :Observable<any[]> {
    // TODO :get from firebase
    return this.db.fetchAllPaymentsForUser(this.type, this.userId)
      .pipe(
        map(response => {
          const pay = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              pay.push(new payment(key,
                //response[key].dueDate,
                response[key].unitsUsed, response[key].totalAmount, response[key].isPaid)
              );
            }
          }
          return pay;
        }));
   
  }
  
}
