import { BillingService } from './../shared/billing.service';
import { payment } from './../models/payment';
import { Component, OnInit } from '@angular/core';

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
    this.userID = 1111;
    this.getAllPayments(this.selectedOption);
  }
  constructor(private billing: BillingService) {}
  getAllPayments(selected: string) {
    this.billing
      .getPayments(this.userID.toString(), selected)
      .subscribe((pays) => {
        this.payments = pays;
        return [pays];
      });
  }
}
