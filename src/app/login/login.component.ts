import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';
import { Router } from '@angular/router';
import { GlobalVariableService } from '../shared/global-variable.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  myForm!: FormGroup;
  showErrorMessage: boolean = false;


  constructor(private http:HttpClient, private formBuilder: FormBuilder, private db: FirebaseService,private router: Router, private gv : GlobalVariableService)  {
    this.myForm = this.formBuilder.group({
      nID: ['',[Validators.required, Validators.minLength(4)]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    });
  }


 async onSubmit(form: FormGroup) {

    console.log('Valid?', form.valid); // true or false

    const nID = this.myForm.controls['nID'].value;
    const password = this.myForm.controls['password'].value;
    console.log(nID,password);

    this.db.authenticate(nID, password).subscribe(nationalID => {
      console.log('Data sent to backend API:', nationalID);
      this.showErrorMessage = false;
  });

  this.gv.custTelType = await this.http.get<string>(`https://ui-project-d452e-default-rtdb.firebaseio.com/customer/${nID}/telBillType/.json`).toPromise();
  this.gv.custComName= await this.http.get<string>(`https://ui-project-d452e-default-rtdb.firebaseio.com/customer/${nID}/telCompany/.json`).toPromise();


    console.log("user is: ",this.gv.userType);
    console.log("Id is: ",this.gv.UserId);
    console.log('bill type is:', this.gv.custTelType);
    console.log('company is:', this.gv.custComName);

    if(this.showErrorMessage == false)
    {
      this.router.navigate(["/home"]);
    }

    (error:any) => console.log(`error is : $(error)`);this.showErrorMessage = true;

    }

}
