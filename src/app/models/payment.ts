export class payment {
  id?: string;
  dueDate: Date;
  unitsUsed: number;
  totalAmount: number;
  isPaid: boolean;
  rate: number;
  paymentDay: Date;
  extraFee: number;

  constructor(
    id: string,
    /*dueDate:Date, */ unitsUsed: number,
    totalAmount: number,
    isPaid: boolean
  ) {
    //this.dueDate=dueDate;
    this.id = id;
    this.unitsUsed = unitsUsed;
    this.totalAmount = totalAmount;
    this.isPaid = isPaid;
  }
}
