import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { payment } from '../models/payment';
import { FirebaseService } from '../shared/firebase.service';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { BillingService } from '../shared/billing.service';
import { GlobalVariableService } from '../shared/global-variable.service';


@Component({
  selector: 'app-elec',
  templateUrl: './elec.component.html',
  styleUrls: ['./elec.component.scss']
})
export class ElecComponent implements OnInit {
  pendingPayments:payment[]=[];
  rate:number;
  enteredUnits:string;
  
  type:string="elecBills";
  userID:number;
  
  constructor(private billing:BillingService, private userInfo:GlobalVariableService ){
  } 
  ngOnInit(): void {
  
    //this.userID=userInfo.UserId;  
    this.userID=1111;
    this.billing.type=this.type;
    this.rate =6;
    this.billing.rate=this.rate;//gai mn el service
    this.getAllPayments();
  }

  addPayment(){
    window.alert('new reading saved')
    this.getAllPayments();
    this.getAllPayments();

    //building payment
    let generatedPaymentId= uuidv4();
    
    //calculate total(using service)
    let totalPaymentAmount =this.billing.calculatePaymentAmount(this.rate,parseInt(this.enteredUnits));
    
    //building payment
    let newPayment=new payment(generatedPaymentId,parseInt(this.enteredUnits),totalPaymentAmount,false);
    
    //save to firebase
    this.billing.addNewPendingPayment(this.userID.toString(),newPayment,this.type).subscribe((response: any) => {
      console.log('Data added to Firebase Realtime Database:', response);
    });

    //update table
    this.getAllPayments();

    //clearing enteredUnits
    this.enteredUnits = '';
    
  }
 

  payPendingPayment(pay :payment){
   // window.alert('payment done')
    console.log(pay.isPaid)
    pay.isPaid=true;
    console.log(pay)

    this.billing.payPayment(pay).subscribe((response: any) => {
      console.log('Data added to Firebase Realtime Database:', response);
    });
    //update table
    window.alert('payment done')
    this.getAllPayments();
    }

  getAllPayments(){
    this.billing.getPayments(this.userID.toString(),this.type)
    .subscribe((payments) => {
      this.pendingPayments = this.getUnpaidBills(payments);
      return(payments);
    }); 
  }
  getUnpaidBills(bills: payment[]): payment[] {
    return bills.filter((bill) => !bill.isPaid);
  }
}
