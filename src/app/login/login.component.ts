import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  myForm!: FormGroup;


  constructor( private formBuilder: FormBuilder, private db: FirebaseService,)  {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Email', form.value.email);
  }



}
