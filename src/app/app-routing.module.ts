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
import { SPsignupComponent } from './spsignup/spsignup.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SpPageComponent } from './sp-page/sp-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nav', component: NavbarComponent },
  { path: 'elec', component: ElecComponent },
  { path: 'water', component: WaterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'tel', component: TelComponent },
  { path: 'spsignup', component: SPsignupComponent },
  { path: 'paymentHistory', component: PaymentHistoryComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'sp', component: SpPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
