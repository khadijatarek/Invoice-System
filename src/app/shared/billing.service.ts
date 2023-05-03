import { payment } from './../models/payment';
import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  constructor(private db:FirebaseService) {

  }
  calculatePaymentAmount(rate:number,units:number){
    return rate*units;
  }

  //add payment
  addNewPendingPayment(userID:string,pay:payment,billType:string){
    return this.db.addPendingPaymentForUser(userID,pay,billType);
  }

  getPayments(userID:string,billType:string){
    return this.db.getAllPayments(userID,billType).pipe(
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

  //pay specific
  
  payPayment(userID:string,pay:payment,billType:string){
    //put in firebase
    pay.isPaid=true;
    return this.addNewPendingPayment(userID,pay,billType);    
  }
  
  //pay all
 
  
}
