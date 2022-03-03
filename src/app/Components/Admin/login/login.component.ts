import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  admin : any={};
  constructor(
    private fb: FormBuilder,
    private api : ApiService,
    private router : Router
  ) { 

    this.adminLoginForm = this.fb.group({
      uname: ['admin', Validators.required],
      password: ['admin', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  
  validateUser(){
    this.api.adminlogin(this.adminLoginForm.value).subscribe(
      (Response) => {
        console.log(Response);
        var info=JSON.parse(JSON.stringify(Response));
        console.log (info['username']);
        console.log (info['welcomemassage']);
        if (info['username']=="admin"){
          this.router.navigate(["/admin/dashboard"]);
        }

        localStorage.setItem("currentAdminUser",info['username'])
        
      },
      (err) => {
        console.log(err)}
    )
  }
  login(){
    this.api.adminlogin(this.admin).subscribe(
      (Response)=>{
        console.log(Response);
        var info=JSON.parse(JSON.stringify(Response));
          if (info['identifier']!=""){
            localStorage.setItem("currentAdminUser",JSON.stringify(Response))
            if (info['userType']=="adm"){
              this.router.navigate(["/admin/dashboard"]);
              }
            if(info['userType']=="cus") {
                this.router.navigate(["/customer"]);
              }
            if(info['userType']=="eng") {
                this.router.navigate(["/engineer"]);
              }
            if(info['userType']=="man") {
                this.router.navigate(["/manager"]);
              }
        }
      }
    )
  }

}
