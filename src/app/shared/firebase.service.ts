import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { idToken } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  AddCustomer(data: any, id :any):Observable<any>
  {
    return this.http.put<any>('https://ui-project-d452e-default-rtdb.firebaseio.com/customer/'+ id +".json",data ,this.httpOptions);
  }


  AddAdmin(data:any, id:any):Observable<any>
  {
    return this.http.put('https://ui-project-d452e-default-rtdb.firebaseio.com/admins/' + id + ".json", data,this.httpOptions);
  }

  AddSP (data: any, id:any):Observable<any>
  {
    return this.http.put('https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders/' + id  + ".json", data,this.httpOptions);

  }

  private baseUrl = 'https://ui-project-d452e-default-rtdb.firebaseio.com/customer/5555';


  authenticate(NationalID: string, password: string): Observable<string> {
    return this.http.get(`https://ui-project-d452e-default-rtdb.firebaseio.com/customer/${NationalID}.json`).pipe(
      map((response: any) => {
        if (response && response.password === password) {
          return NationalID;
        } else {
          throw new Error('Invalid national ID or password');
        }
      })
    );
  }

 /* login (email: any, password: any): Observable<any>
  {
    const url = `${this.baseUrl}.json?orderBy="email"&equalTo=${email}&limitToFirst=1`;

    return this.http.get<{ [NationalID: string]: any }>(url)
      .pipe(
        map(customers => {
          const NationalID = Object.keys(customers)[0];
          const customer = customers[NationalID];
          if (customer && customer.password === password) {
            console.log(NationalID);
            return NationalID;
          } else {
            throw new Error('Invalid email or password');
          }
        })
      );
  }*/


}
