import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  constructor(private http: HttpClient) { }

  AddCustomer(data: any)
  {
    return this.http.put('https://ui-project-d452e-default-rtdb.firebaseio.com/customers/customerID.json', data);
  }

  AddAdmin(data:any)
  {
    return this.http.put('https://ui-project-d452e-default-rtdb.firebaseio.com/admins/adminID.json', data);
  }

  AddSP (data: any)
  {
    return this.http.put('https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders/CompanyID.json', data);

  }

}
