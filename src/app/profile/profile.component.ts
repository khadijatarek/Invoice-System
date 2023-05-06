import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';
import { GlobalVariableService } from '../shared/global-variable.service';
import { UserInfo } from 'firebase/auth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
}) /*fname:any;
  lname:any;
  phone:any;
  nationalID:any;
  address:any;
  email:any;
  postcode:any;
  area:any;
  country:any;
  governerate:any;
*/
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditable = false;
  profileData: any = {};
  userID;
  constructor(
    private formBuilder: FormBuilder,
    private db: FirebaseService,
    private userInfo: GlobalVariableService
  ) {}

  ngOnInit(): void {
    //const userID = '0000'; // Replace with your own user ID
    this.userID = this.userInfo.UserId;
    this.db.getUser(this.userID).subscribe((data: any) => {
      this.profileData = data;
      console.log('dataaaaaaaaaa', data);
      this.initForm();
    });
  }

  initForm(): void {
    this.profileForm = this.formBuilder.group({
      firstname: [
        { value: this.profileData.fname, disabled: true },
        Validators.required,
      ],
      lname: [
        { value: this.profileData.lname, disabled: true },
        Validators.required,
      ],
      pnumber: [
        { value: this.profileData.pnumber, disabled: true },
        Validators.required,
      ],
      NationalID: [
        { value: this.profileData.NationalID, disabled: true },
        Validators.required,
      ],
      address: [
        { value: this.profileData.address, disabled: true },
        Validators.required,
      ],
      email: [
        { value: this.profileData.email, disabled: true },
        [Validators.required, Validators.email],
      ],
      postcode: [
        { value: this.profileData.postcode, disabled: true },
        Validators.required,
      ],
      area: [
        { value: this.profileData.area, disabled: true },
        Validators.required,
      ],
      country: [
        { value: this.profileData.country, disabled: true },
        Validators.required,
      ],
      governerate: [
        { value: this.profileData.governerate, disabled: true },
        Validators.required,
      ],
    });
  }

  /* enableInputs(): void {
    console.log('edit clicked');
    this.isEditable = true;
    this.profileForm.get('NationalID').disable();
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const userID = '010101010'; // Replace with your own user ID
      const updatedProfileData = this.profileForm.getRawValue();
      this.db.AddCustomer(updatedProfileData, userID).subscribe(
        () => {
          console.log('Profile saved successfully!');
          this.isEditable = false;
          this.profileForm.get('nationalId').disable();
        },
        (error) => {
          console.error('Error saving profile:', error);
        }
      );
    } else {
      console.error('Invalid form data:', this.profileForm.errors);
    }
  }*/
}
