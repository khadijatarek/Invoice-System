import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl, AbstractControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../shared/firebase.service';
import { Router } from '@angular/router';
import { GlobalVariableService } from '../shared/global-variable.service';

@Component({
  selector: 'app-spsignup',
  templateUrl: './spsignup.component.html',
  styleUrls: ['./spsignup.component.scss']
})
export class SPsignupComponent {

  @Input() nId: string="" ;

  spForm =new FormGroup({
    numberOfServices: new FormControl()
  });



  constructor(private http: HttpClient, private gb: GlobalVariableService) {
    this.nId = this.nId || '';
    console.log(this.gb.signupId);
  }

 onSubmit() {

//  console.log("national id: " ,this.nId);

  const numberOfServices = this.spForm.value.numberOfServices;
  for (let i = 1; i <= numberOfServices; i++) {
    const serviceIdControlName = `serviceId${i}`;
    const serviceNameControlName = `serviceName${i}`;
    const serviceDescriptionControlName = `serviceDescription${i}`;
    const serviceId = `service-${i}`;
    const service = {
      serviceId: serviceId,
      name: this.spForm.get(serviceNameControlName)?.value || '',
      description: this.spForm.get(serviceDescriptionControlName)?.value || '',

    };
    this.http.put(`https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders/${this.gb.signupId}/services/${serviceId}.json`, service)
      .subscribe(
        () => console.log(`Service ${serviceId} added successfully.`)      );
    }
 }

 generateArray(n: number): number[] {
  return Array(n).fill(0).map((x, i) => i);
}

}
