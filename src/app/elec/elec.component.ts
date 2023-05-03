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
  allPayments:payment[]=[];
  rate:number;
  enteredUnits:string;
  
  type:string="elecBills";
  userID:number;
  
  constructor(private db:FirebaseService ,private billing:BillingService, private userInfo:GlobalVariableService ){
    //this.userID=userInfo.UserId;
  } 
  ngOnInit(): void {
    this.userID=1111;
    this.billing.type=this.type;
    this.rate =6;
    this.billing.rate=this.rate;//gai mn el service
    //updat table  
  }

  addPayment(){
    //generate a new id to payment
    let generatedPaymentId= uuidv4();
    
    //calculate total(using service)
    let totalPaymentAmount =this.billing.calculatePaymentAmount(this.rate,parseInt(this.enteredUnits));
    
    //save to firebase
    let newPayment=new payment(generatedPaymentId,parseInt(this.enteredUnits),totalPaymentAmount,false);
    this.billing.addNewPendingPayment(newPayment);

    //update table

    //clearing enteredUnits
    this.enteredUnits = '';
    //////
    this.updateTable()

  }
 
  updateTable(){
    this.getAllPayments();
    this.pendingPayments=this.billing.filterPending(this.allPayments);
  }

  payPendingPayment(pay :payment){
    this.billing.payPayment(pay);
    //update table
  }

  getAllPayments(){
    this.billing.getAllPayments()
    .subscribe((payments) => {
      this.allPayments = payments;
      return(payments);
    }); 
  }
  /*filterPendingPayments(){
   this.clearPayments()
    this.billing.getAllPayments()
    .subscribe((payments) => {
      this.allPayments = payments;
    });
    for (const pay of this.allPayments){
      if (pay.isPaid == false){
        this.pendingPayments.push(pay);
      }
    }
  }
  clearPayments(){
    this.pendingPayments=[];
    this.allPayments=[];
  }*/

}
