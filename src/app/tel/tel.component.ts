import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GlobalVariableService } from '../shared/global-variable.service';

@Component({
  selector: 'app-tel',
  templateUrl: './tel.component.html',
  styleUrls: ['./tel.component.scss']
})
export class TelComponent {

  constructor( private gb: GlobalVariableService){}

  u = this.gb.UserId;
  i = this.gb.userType;
  b=this.gb.custTelType;

}
