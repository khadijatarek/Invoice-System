import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { payment } from '../models/payment';
import { FirebaseService } from '../shared/firebase.service';


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
  
  constructor(private db:FirebaseService){

  } 
  ngOnInit(): void {
    //just for dev
    this.loadData();
    this.userID=1111;
    //get rate from service
    //but for now lets set it with 6
    this.rate =6;

    
  }

  addNewPendingPayment(){
    let newPayment=new payment(parseInt(this.enteredUnits),3535354,false);
    //calculate total(using service)
    this.pendingPayments.push(newPayment);
    //save to firebase
    this.db.addPendingPaymentForUser(this.type,this.userID, newPayment).subscribe((response: any) => {
        console.log('Data added to Firebase Realtime Database:', response);
      });
    //clearing enteredUnits



    this.getAllPayments();

  }
  loadData(){
    this.pendingPayments.push(new payment(34,44,false));
    this.pendingPayments.push(new payment(4545,44,false));
    this.pendingPayments.push(new payment(545645,44,false));
    this.pendingPayments.push(new payment(6887,3454656,false));
    this.pendingPayments.push(new payment(8990,44,false));
    //this.getAllPayments();
  }
  
  getAllPayments(){
    this.db.fetchAllPaymentsForUser(this.type,this.userID).subscribe((response: payment) => {
      console.log('Fetched data from Firebase Realtime Database:', response);
    });
  }

}
