import { Component } from '@angular/core';
import { GlobalVariableService
 } from '../shared/global-variable.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor( private gb :GlobalVariableService ) { }


  isAdmin(): boolean {
    return this.gb.userType === "admin";
  }

  isSp(): boolean {
    return this.gb.userType === "sp";
  }

}
