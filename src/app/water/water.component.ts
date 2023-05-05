import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { payment } from '../models/payment';
import { v4 as uuidv4 } from 'uuid';
import { BillingService } from '../shared/billing.service';
import { GlobalVariableService } from '../shared/global-variable.service';
import { RateService } from '../shared/rate.service';



@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent {
  pendingPayments:payment[]=[];
  totalAmount:number;
  enteredUnits:string;

  rate:number;
  type:string;

  userID:number;

  constructor(private billing:BillingService, private userInfo:GlobalVariableService , private rateServ:RateService){
  }
  ngOnInit(): void {

    //this.userID=userInfo.UserId;
    this.userID=1111;

    //gai mn el service
    this.rate =this.rateServ.waterRate;
    this.type=this.rateServ.waterBillType;

    //update table
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
    this.billing.addNewPendingPayment(this.userID.toString(),newPayment,this.type)
    .subscribe((response: any) => {
      console.log('Data added to Firebase Realtime Database:', response);
    });

    //update table
    this.getAllPayments();

    //clearing enteredUnits
    this.enteredUnits = '';

  }


  payPendingPayment(pay :payment){
   // window.alert('payment done')
    pay.isPaid=true;

    this.billing.payPayment(this.userID.toString(),pay,this.type)
    .subscribe((response: any) => {
      console.log('Data updated in Firebase Realtime Database:', response);
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

/*  updateTable(){
    this.totalAmount=0;
    this.getAllPayments();
    this.getAllPayments();
    this.getAllPayments();
    this.getAllPayments();
    this.getAllPayments();
    const pays=this.getUnpaidBills(this.pendingPayments);
    for(const p of pays){
      this.totalAmount+=p.totalAmount;
    }
  }*/
}
