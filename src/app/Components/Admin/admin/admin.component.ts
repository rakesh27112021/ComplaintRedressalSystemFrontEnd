import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { ApiService } from 'src/app/Services/api.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:User[];
  username = '';
  editUser : boolean = false;
  showModal_AddUser : boolean = false;
  userForm : FormGroup;
  constructor(private router : Router,
    private userservice : UserService,
    private apiService : ApiService,
    private fb: FormBuilder ) { 
      this.userForm = this.fb.group({
        userId: [{value:'',disabled:true}],
        identifier: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName : [''],
        userType : [''],
        status : [''],
        pin:['']

    })

    var info = JSON.parse(localStorage.getItem('currentAdminUser') || '') ;
    this.username=info['identifier'];
    if (this.username!=''){
      this.getUser();
    }else{
      this.router.navigate(["/login"]);
    }
  }

  getUser(): void {
    this.userservice.getUsers()
    .subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    var info = JSON.parse(localStorage.getItem('currentAdminUser') || '') ;
    this.username=info['identifier'];
    if (this.username!=''){
      this.getUser();
    }
  }

  showAddNewUser(){
    this.editUser = !this.editUser;
    this.showModal_AddUser = !this.showModal_AddUser;
  }

  onAddUser(){
    if(!this.editUser){
    this.apiService.addUser(this.userForm?.value).subscribe(
    (response: any)=>{
      var info=JSON.parse(JSON.stringify(response));
      this.getUser();
      this.clearAddUsermodal();
    }
    )
  }else{
    this.apiService.updateUser(this.userForm?.value).subscribe(
      (response: any)=>{
        var info=JSON.parse(JSON.stringify(response));
        this.getUser();
      }
      )
  }
    
  }

  


  clearAddUsermodal(){
    this.editUser = false;
    this.userForm = this.fb.group({
      userId: [''],
      identifier: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName : [''],
      userType : [''],
      status : [''],
      pin:['']

    })
  }

  updateUserForm(u :User){
    this.editUser = true;
    this.userForm = this.fb.group({
      userId: [u.userId],
      identifier: [u.identifier, Validators.required],
      password: [u.password, Validators.required],
      email : [u.email],
      firstName: [u.firstName, Validators.required],
      lastName : [u.lastName],
      userType : [u.userType],
      status : [u.status],
      pin :[u.pin],

  })

  }


  delete(userId : number){
    if (confirm('Do you want to delete this food item ?')) {
      this.apiService.deleteUser(userId).subscribe(
        (Response)=>{
          alert('Deleted successfully');
          this.getUser();
        },
        (err) => { console.log(err) }
      )
    }
    
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }



}
