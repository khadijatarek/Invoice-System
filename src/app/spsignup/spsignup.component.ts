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
export class SPsignupComponent implements OnInit{

 // @Input() nId: string="" ;

  spForm : FormGroup;



  constructor(private fb: FormBuilder,private http: HttpClient, private gb: GlobalVariableService, ) {

  }

  ngOnInit(): void {
    this.spForm = this.fb.group({
      numberOfServices: [0, Validators.required],
    });

    console.log(this.spForm);
    console.log(this.spForm.controls);

   // throw new Error('Method not implemented.');
  }

 onSubmit() {

  console.log('onSubmit() called');
  console.log(this.spForm);
  console.log(this.spForm.controls);

  if (this.spForm.valid) {
    const numberOfServices = this.spForm.get('numberOfServices').value;

    for (let i = 1; i <= numberOfServices; i++) {
      const serviceIdControlName = `serviceId${i}`;
      const serviceNameControlName = `serviceName${i}`;
      const serviceDescriptionControlName = `serviceDescription${i}`;
      const serviceId = `service-${i}`;

      console.log(`Adding control ${serviceIdControlName}`);
      console.log(`Adding control ${serviceNameControlName}`);
      console.log(`Adding control ${serviceDescriptionControlName}`);


      const serviceNameControl = this.spForm.get(serviceNameControlName);
      const serviceDescriptionControl = this.spForm.get(serviceDescriptionControlName);

      console.log(this.spForm.errors);
      console.log(this.spForm.controls);

      this.spForm = this.fb.group({
        serviceId : [''],
        serviceName :[''],
        serviceDescription :['']
      });

      if (serviceNameControl && serviceDescriptionControl && serviceNameControl.valid && serviceDescriptionControl.valid) {
        this.spForm.addControl(serviceIdControlName, this.fb.control(serviceId));
        this.spForm.addControl(serviceNameControlName, this.fb.control(serviceNameControl.value, Validators.required));
        this.spForm.addControl(serviceDescriptionControlName, this.fb.control(serviceDescriptionControl.value, Validators.required));
      }

        const service = {
          serviceId: serviceIdControlName,
          name: serviceNameControl.value,
          description: serviceDescriptionControl.value,
        };

        this.http.put(`https://ui-project-d452e-default-rtdb.firebaseio.com/serviceProviders/${this.gb.signupId}/services/${service.serviceId}.json`, service)
          .subscribe(() => console.log(`Service ${service.serviceId} added successfully.`));

    }
  }



//  console.log("national id: " ,this.nId);

 /* const numberOfServices = this.spForm.value.numberOfServices;
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
    }*/
 }

 generateArray(n: number): number[] {
  return Array(n).fill(0).map((x, i) => i);
}

}
