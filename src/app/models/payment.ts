export class payment{
    id?:string;
    dueDate:Date;
    unitsUsed:number;
    totalAmount:number;
    isPaid:boolean;

    constructor(/*dueDate:Date, */unitsUsed:number, totalAmount:number, isPaid:boolean){
        //this.dueDate=dueDate;
        this.unitsUsed=unitsUsed;
        this.totalAmount=totalAmount;
        this.isPaid=isPaid;
    }
}