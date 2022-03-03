import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/Admin/admin/admin.component';
import { LoginComponent } from './Components/Admin/login/login.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { EngineerComponent } from './Components/engineer/engineer.component';
import { ManagerComponent } from './Components/manager/manager.component';

const routes: Routes = [
  {path:"admin/dashboard",component:AdminComponent},
  {path:"login",component:LoginComponent},
  {path:"customer",component:CustomerComponent},
  {path:"manager",component:ManagerComponent},
  {path:"engineer",component:EngineerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
