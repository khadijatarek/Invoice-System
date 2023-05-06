import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariableService {

  constructor() { }

  UserId: any;
  userType:any;
  signupId: any;
  custTelType : any;   //prePaid or postPaid
  custComName: any;
  custRate :any;
}
