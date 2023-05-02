import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  myForm!: FormGroup;
  showErrorMessage: boolean = false;


  constructor( private formBuilder: FormBuilder, private db: FirebaseService,private router: Router)  {
    this.myForm = this.formBuilder.group({
      nID: ['',[Validators.required, Validators.minLength(4)]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    });
  }


  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false

    const nID = this.myForm.controls['nID'].value;
    const password = this.myForm.controls['password'].value;
    console.log(nID,password);

    this.db.authenticate(nID, password).subscribe(nationalID => {
      console.log('Data sent to backend API:', nationalID);
      this.router.navigate(["/home"]);
      this.showErrorMessage = false;
    });
    (error:any) => console.log(`error is : $(error)`);this.showErrorMessage = true;
    }

}
