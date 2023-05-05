import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { idToken } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { payment } from '../models/payment';
import { GlobalVariableService } from './global-variable.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient, private gb: GlobalVariableService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  baseUrl = 'https://ui-project-d452e-default-rtdb.firebaseio.com';

  AddCustomer(data: any, id: any): Observable<any> {
    return this.http.put<any>(
      'https://ui-project-d452e-default-rtdb.firebaseio.com/customer/' +
        id +
        '.json',
      data,
      this.httpOptions
    );
  }

  AddAdmin(data: any, id: any): Observable<any> {
    return this.http.put(
      'https://ui-project-d452e-default-rtdb.firebaseio.com/admins/' +
        id +
        '.json',
      data,
      this.httpOptions
    );
  }

  AddSP(data: any, id: any): Observable<any> {
    return this.http.put(
      'https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders/' +
        id +
        '.json',
      data,
      this.httpOptions
    );
  }

  //this.gb.custTelType = this.http.get(`https://ui-project-d452e-default-rtdb.firebaseio.com/customer/${nationalID}/telBillType/.json`);

  authenticate(nationalID: string, password: string): Observable<string> {
    return this.http
      .get(
        `https://ui-project-d452e-default-rtdb.firebaseio.com/customer/${nationalID}.json`
      )
      .pipe(
        switchMap((response: any) => {
          if (response && response.password === password) {
            this.gb.userType = 'customer';
            this.gb.UserId = nationalID;
            this.gb.custTelType = this.http.get(
              `https://ui-project-d452e-default-rtdb.firebaseio.com/customer/${nationalID}/telBillType/.json`
            );
            return of(nationalID);
          } else {
            return this.http
              .get(
                `https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders/${nationalID}.json`
              )
              .pipe(
                catchError(() => {
                  return this.http.get(
                    `https://ui-project-d452e-default-rtdb.firebaseio.com/admin/${nationalID}.json`
                  );
                }),
                switchMap((response: any): Observable<string> => {
                  if (response && response.password === password) {
                    this.gb.userType = 'sp';
                    this.gb.UserId = nationalID;
                    return of(nationalID);
                  } else {
                    this.gb.userType = 'admin';
                    this.gb.UserId = nationalID;
                    return of(nationalID);
                  }
                })
              );
          }
        }),
        catchError(() => {
          throw new Error('Invalid national ID or password');
        })
      );
  }

  getServices(providerId: string): Observable<any[]> {
    const url = `https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders/${providerId}/services/prePaid/.json`;
    return this.http
      .get<any[]>(url)
      .pipe(map((data) => Object.values(data).slice(1)));
  }

  private serviceProvidersUrl =
    'https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders/.json';

  getServiceProviders(): Observable<string[]> {
    return this.http.get<any[]>(this.serviceProvidersUrl).pipe(
      map((serviceProviders) => {
        // Extract the names of all service providers
        const providerNames = [];
        for (const key in serviceProviders) {
          providerNames.push(serviceProviders[key].fname);
        }
        return providerNames;
      })
    );
  }

  //payments
  addPendingPaymentForUser(userId: string, pay: payment, paymentType: string) {
    return this.http.put(
      `${this.baseUrl}/customer/${userId}/${paymentType}/${pay.id}.json`,
      pay
    );
  }

  getAllPayments(userId: string, paymentType: string): Observable<payment[]> {
    return this.http.get<payment[]>(
      `${this.baseUrl}/customer/${userId}/${paymentType}.json`
    );
  }
}
