import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { idToken } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient) { }

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    }),
  };
  baseUrl='https://ui-project-d452e-default-rtdb.firebaseio.com/';

  AddCustomer(data: any, id :any):Observable<any>
  {
    return this.http.put<any>('https://ui-project-d452e-default-rtdb.firebaseio.com/customer/'+ id +".json",data ,this.httpOptions);
  }


  AddAdmin(data:any, id:any):Observable<any>
  {
    return this.http.put('https://ui-project-d452e-default-rtdb.firebaseio.com/admins' +" "+ ".json", data);
  }

  AddSP (data: any, id:any):Observable<any>
  {
    return this.http.put('https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders' +" " + ".json", data);

  }

  addPendingPaymentForUser(paymentType:string,userId,pay:payment){
    return this.http.post(this.baseUrl+'customer/'+userId+'/'+paymentType+'.json',pay);
  }

  fetchAllPaymentsForUser(paymentType:string,userId){
    return this.http.get<payment>(this.baseUrl+'customer/'+userId+'/'+paymentType+'.json');
  }

}
