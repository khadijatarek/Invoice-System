import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GlobalVariableService } from '../shared/global-variable.service';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-tel',
  templateUrl: './tel.component.html',
  styleUrls: ['./tel.component.scss']
})
export class TelComponent implements OnInit{

  constructor( private gb: GlobalVariableService, private db: FirebaseService){}

  providerId = 'spID'; // Replace with the desired service provider ID
  services1: any[] = [];
  services2: any[] = [];


  ngOnInit(): void {
    this.db.getServices("1234").subscribe(
      (services) => {
        this.services1 = services;
        console.log(services);
      },
    );
    this.db.getServices("2323").subscribe(
      (services) => {
        this.services2 = services;
         console.log(services);
      },
    );
  }

}
