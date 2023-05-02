import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl, AbstractControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../shared/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  myform!: FormGroup;

  constructor(private formBuilder: FormBuilder,private Db :FirebaseService, private router: Router ) {
    this.myform = this.formBuilder.group({
      fname : ['', [Validators.required]],
      lname : ['', [Validators.required]],
      pnumber : ['', [Validators.required,  Validators.minLength(11)]],
      NationalID : ['', [Validators.required,  Validators.minLength(4)]],
      address : ['', [Validators.required]],
      country : ['', [Validators.required]],
      postcode : ['', [Validators.required]],
      gov : ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      pass1: ['',[Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]],
      pass2: ['',[Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]],
     type:  ['',[Validators.required,]],
    });
  }


  type?:string;

id:number=0;

  onSubmit() {

    this.id++;
    const data = this.myform.value;
   // console.log(this.myform.value);
   //console.log(this.id);
  /*  this.Db.AddCustomer(data,this.id).subscribe(response => {
      console.log('Data sent to backend API:', response);
    }),
    (error:any) => console.log(`error is : $(error)`); */


    const dataAdmin = {
      email: this.myform.controls['email'].value,
      password: this.myform.controls['pass1'].value,
      fname : this.myform.controls['fname'].value,
      lname : this.myform.controls['lname'].value,
      NationalID : this.myform.controls['NationalID'].value,
    };

    const dataCustomer = {
      email: this.myform.controls['email'].value,
      NationalID : this.myform.controls['NationalID'].value,
      fname : this.myform.controls['fname'].value,
      lname : this.myform.controls['lname'].value,
      password: this.myform.controls['pass1'].value,
      country :this.myform.controls['country'].value,
      governerate:this.myform.controls['gov'].value,
      postcode : this.myform.controls['postcode'].value,
      address :this.myform.controls['address'].value,
      pnumber : this.myform.controls['pnumber'].value,
    };

    const dataSP ={
      fname : this.myform.controls['fname'].value,
      NationalID : this.myform.controls['NationalID'].value,
      email: this.myform.controls['email'].value,
      password: this.myform.controls['pass1'].value,
    };
    console.log(this.myform.controls['type'].value);

    if(this.myform.controls['type'].value == 'admin')
    {
      this.Db.AddAdmin(dataAdmin,this.id).subscribe(response => {
        console.log('Data sent to backend API:', response);
        this.router.navigate(["/login"]);

      }),
      (error:any) => console.log(`error is : $(error)`);
    }
    else if(this.myform.controls['type'].value == 'user')
    {
      this.Db.AddCustomer(dataCustomer, this.myform.controls['NationalID'].value).subscribe((response: any) => {
        console.log('Data added to Firebase Realtime Database:', response);
        this.router.navigate(["/login"]);

      });
    }
    else if(this.myform.controls['type'].value == 'service provider')
    {

      this.Db.AddSP(dataSP,this.id).subscribe((response: any) => {
        console.log('Data added to Firebase Realtime Database:', response);
        this.router.navigate(["/login"]);

      });
    }

  }


  }

/*
    (error :any) => console.log(`error is : $(error)`);
     console.log('Valid?', form.valid); // true or false

     const dataAdmin = {
      email: this.myform.controls['email'].value,
      password: this.myform.controls['pass1'].value,
      fname : this.myform.controls['fname'].value,
      lname : this.myform.controls['lname'].value,
    };

    const dataCustomer = {
      email: this.myform.controls['email'].value,
      fname : this.myform.controls['fname'].value,
      lname : this.myform.controls['lname'].value,
      password: this.myform.controls['pass1'].value,
      country :this.myform.controls['country'].value,
      governerate:this.myform.controls['gov'].value,
      postcode : this.myform.controls['postcode'].value,
      address :this.myform.controls['address'].value,
      pnumber : this.myform.controls['pnumber'].value,
    };

    const dataSP ={
      fname : this.myform.controls['fname'].value,
      email: this.myform.controls['email'].value,
      password: this.myform.controls['pass1'].value,
    };

    console.log(this.myform.controls['type'].value);

    if(data.type == 'admin')
    {
      console.log(this.myform.controls['type'].value);
      this.Db.AddAdmin(dataAdmin).subscribe((response: any) => {
        console.log('Data added to Firebase Realtime Database:', response);
      },
      (error) => console.log(`error is : $(error)`));
    }
    else if(data.type == 'user')
    {
      this.Db.AddAdmin(dataCustomer).subscribe((response: any) => {
        console.log('Data added to Firebase Realtime Database:', response);
      });
    }
    else if(data.type == 'service provider')
    {

      this.Db.AddAdmin(dataSP).subscribe((response: any) => {
        console.log('Data added to Firebase Realtime Database:', response);
      });
    }*/













































/* createCompareValidator(controlOne: AbstractControl, controlTwo: AbstractControl) {
    return () => {
    if (controlOne.value !== controlTwo.value)
      return { match_error: 'Value does not match' };
    return null;
    }
  };


  constructor(private formBuilder: FormBuilder) {
/*    this.myForm = formBuilder.group({
      // any validators you may need to check the formatting of your password
      pass1: formBuilder.control('',[Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      ),]) ,
      pass2: formBuilder.control('',[Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      ),]),  fname : ['', [Validators.required]],
      lname : ['', [Validators.required]],
      pnumber : ['', [Validators.required,  Validators.minLength(11)]],
      address : ['', [Validators.required]],
      postcode : ['', [Validators.required]],
      area : ['', [Validators.required]],
      country : ['', [Validators.required]],
      state : ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      type : ['', [Validators.required]],

    });
    this.myForm.addValidators(
      this.createCompareValidator(
        this.myForm.get('pass1') as FormGroup,
        this.myForm.get('pass2') as FormGroup

        ) )

  }

*/
