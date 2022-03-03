import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './Components/Admin/admin/admin.component'; 
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/Admin/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './Components/header/header.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { ManagerComponent } from './Components/manager/manager.component';
import { EngineerComponent } from './Components/engineer/engineer.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent,
    CustomerComponent,
    ManagerComponent,
    EngineerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
