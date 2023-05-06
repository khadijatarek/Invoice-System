import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ElecComponent } from './elec/elec.component';
import { WaterComponent } from './water/water.component';
import { ProfileComponent } from './profile/profile.component';
import { TelComponent } from './tel/tel.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire//compat';
import { HttpClientModule } from '@angular/common/http';
import { SPsignupComponent } from './spsignup/spsignup.component';
import { DateFormatPipe } from './date-format.pipe';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SpPageComponent } from './sp-page/sp-page.component';
import { FooterComponent } from './footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDialogComponentComponent } from './my-dialog-component/my-dialog-component.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    ElecComponent,
    WaterComponent,
    ProfileComponent,
    TelComponent,
    SPsignupComponent,
    DateFormatPipe,
    PaymentHistoryComponent,
    AdminPageComponent,
    SpPageComponent,
    FooterComponent,
    MyDialogComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
