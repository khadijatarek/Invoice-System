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

  type:string;
  userId:number=1111;
  rate:number;
  

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
 ;
  }

  //pay specific
  //pay all
  payPayment(pay:payment){
    //put in firebase
    pay.isPaid=true;
    console.log(pay)
    return this.addNewPendingPayment(this.userId.toString(),pay,this.type);    
  }
  //get all payments
 /* getAllPayments() :Observable<any[]> {
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
   
  }*/

  //filter pending
  filterPending(pay:payment[]): payment[]{
    let filtered: payment[]=[];
    for(const p of pay){
      if(p.isPaid==false){
        filtered.push(p);
      }
    }
    return filtered
  }
  
 
  
}
