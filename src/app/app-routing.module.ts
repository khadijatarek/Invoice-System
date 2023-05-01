import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { ElecComponent } from './elec/elec.component';
import { ProfileComponent } from './profile/profile.component';
import { WaterComponent } from './water/water.component';
import { TelComponent } from './tel/tel.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"signup", component: SignupComponent},
  {path:"login", component:LoginComponent},
  {path:"nav", component: NavbarComponent},
  {path:"elec", component:ElecComponent},
  {path:"water", component:WaterComponent},
  {path:"profile", component:ProfileComponent},
  {path:"tel" , component:TelComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }