import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { idToken } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { payment } from '../models/payment';
import { GlobalVariableService } from './global-variable.service';

interface ServiceProvider {
  fname: string;
  password: string;
  services: {
    [key: string]: {
      [key: string]: {
        name: string;
        rate: number;
      };
    };
  };
}

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

  getUser(UserID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer/${UserID}.json`);
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


  getServiceNamesByType(serviceProviderName: string, serviceType: string) {
    return this.http.get('https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders.json')
      .pipe(
        map((response: any) => {
          const serviceNames: string[] = [];

          Object.keys(response).forEach((spId) => {
            const serviceProvider = response[spId];
            const telCompany = serviceProvider.fname;
            const services = serviceProvider.services;

            if (telCompany === serviceProviderName && services[serviceType]) {
              const serviceTypeObj = services[serviceType];

              Object.keys(serviceTypeObj).forEach((serviceId) => {
                const service = serviceTypeObj[serviceId];

                if (service && service.id) {
                  const subServiceName = service.name;
                  console.log("name: ", subServiceName);

                  if (subServiceName && !serviceNames.includes(subServiceName)) {
                    serviceNames.push(subServiceName);
                  }
                }
              });
            }
          });

          console.log('Service names:', serviceNames);

          return serviceNames;
        })
      );
  }



  getServiceRate(fname: string, serviceType: string, serviceIDName: string): Observable<any | null> {
    const url = `https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders.json`;
    return this.http.get<any>(url).pipe(
      map((data) => {
        let rate:any | null = null;
        for (const key in data) {
          if (data.hasOwnProperty(key) && data[key].fname === fname) {
            console.log('found fname', fname);
            console.log('found key', key);
            console.log('services', data[key].services);
            console.log('serviceType', serviceType);
            console.log('serviceIDName', serviceIDName);
            const services = data[key].services;
            if (services && services[serviceType]) {

              const serviceTypeObj = services[serviceType];

              Object.keys(serviceTypeObj).forEach((serviceId) => {
                const service = serviceTypeObj[serviceId];
                if ((service && service.id) ) {
                  if(service.name = serviceIDName)
                  {
                   rate = service.rate;
                  }
                  console.log("rooate: ", rate);
                }

              });
            }
            break;
          }
        }
        return rate;
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

  //rates
  addRates(rateType: string, rateValue: number) {
    return this.http.put(`${this.baseUrl}/rates/${rateType}.json`, rateValue);
  }

  getRates(rateType: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/rates/${rateType}.json`);
  }


}
