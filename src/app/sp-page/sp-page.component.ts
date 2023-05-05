import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GlobalVariableService } from '../shared/global-variable.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sp-page',
  templateUrl: './sp-page.component.html',
  styleUrls: ['./sp-page.component.scss']
})
export class SpPageComponent {
  numServices: number;
  tableData: any[];

  constructor(private http: HttpClient, private gb: GlobalVariableService) {

  }

  generateTable() {
    this.tableData = [];
    for (let i = 0; i < this.numServices; i++) {
      this.tableData.push({
        id: '',
        name: '',
        description: '',
        type: '',
        rate: null
      });
    }
  }

  deleteRow(row) {
    const index = this.tableData.indexOf(row);
    if (index !== -1) {
      this.tableData.splice(index, 1);
    }
  }

  saveServices() {
    const uid = 'INSERT_USER_ID_HERE'; // Replace with user ID
  //  this.db.object(`serviceProviders/${uid}/services`).set(this.tableData);

  for(let i=0; i< this.tableData.length; i++) {

    const serviceId =this.tableData[i].id;

    if(this.tableData[i].type == "prepaid")
    {
      const url = `https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders/${this.gb.UserId}/services/prePaid/${serviceId}.json`;
      const serviceData = this.tableData[i];
      this.http.put(url, serviceData)
        .subscribe(() => console.log(`Service ${serviceId} added successfully.`));
    }

    else if(this.tableData[i].type == "postpaid")
    {
      const url = `https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders/${this.gb.UserId}/services/postPaid/${serviceId}.json`;
      const serviceData = this.tableData[i];
      this.http.put(url, serviceData)
        .subscribe(() => console.log(`Service ${serviceId} added successfully.`));
    }
  }

  }
}
