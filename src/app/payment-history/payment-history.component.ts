import { BillingService } from './../shared/billing.service';
import { payment } from './../models/payment';
import { Component, OnInit } from '@angular/core';
import { GlobalVariableService } from '../shared/global-variable.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent implements OnInit {
  payments: payment[];
  userID;
  selectedOption = 'elecBills';
  ngOnInit(): void {
    this.userID = this.userInfo.UserId;
    console.log(this.userID);

    this.getAllPayments(this.selectedOption);
  }
  constructor(
    private billing: BillingService,
    private userInfo: GlobalVariableService
  ) {}
  getAllPayments(selected: string) {
    this.billing
      .getPayments(this.userID.toString(), selected)
      .subscribe((pays) => {
        this.payments = pays;
        console.log(pays);

        return [pays];
      });
  }
}
