import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Complaint } from "src/app/complaint";
import { ApiService } from 'src/app/Services/api.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  username = '';
  userId=0;
  complaints:Complaint[];
  editComplaint : boolean = false;
  showModal_AddComplaint : boolean = false;
  complaintForm : FormGroup;
  disableFormforFeedback:boolean = false;

  constructor(private router : Router,
    private userservice : UserService,
    private apiService : ApiService,
    private fb: FormBuilder ) { 
      var info = JSON.parse(localStorage.getItem('currentAdminUser') || '') ;
      this.username=info['identifier'];
      this.userId=Number(info['userId']);

      this.complaintForm = this.fb.group({
        complaintId: 1000000,
        title: ['', Validators.compose([Validators.minLength(4), Validators.required])],
        complaintType: ['', Validators.required],
        mobile: ['', Validators.required],
        pin: ['', Validators.required],
        status : [''],
        address:[''],
        feedback:[''],
        raisedBy : {
          userId:this.userId
        },
        assignedTo : null

    })

    if (this.username!=''){
      this.getComplaints();
    }else{
      this.router.navigate(["/login"]);
    }
   }

  ngOnInit(): void {
  }

  getComplaints(){
    this.apiService.getComplaintsUserById(this.userId).subscribe(
      (Response: any)=>{
        //let myData = JSON.parse(Response);
        //this.complaints=Response?.assignedComplaints;
        this.complaints=Response
        //this.complaints=JSON.parse(Response('raisedComplaints') || '');
        //alert("Respons");

      }
    )

  }

  delete(id:number){

  }


  provideFeedback(c: Complaint){

    this.editComplaint=true;
    this.disableFormforFeedback=true;

    this.complaintForm = this.fb.group({
      complaintId: c.complaintId,
      title: [c.title, Validators.required],
      complaintType: [c.complaintType, Validators.required],
      mobile: [c.mobile, Validators.required],
      pin: [c.pin, Validators.required],
      status : [c.status],
      address:[c.address],
      feedback:[c.feedback],
      raisedBy : {
        userId:this.userId
      },
      assignedTo : null

  })
}

  onAddComplaint(){
    //this.complaintForm.setValue({complaintId:40,title:98745,complaintType:,userId:this.userId})
    this.apiService.addComplaint(this.complaintForm?.value).subscribe(
      (response: any)=>{
        var info=JSON.parse(JSON.stringify(response));
        this.getComplaints();
      }
    )

  }
  clearAddComplaintmodal(){
    this.editComplaint=false;
    this.disableFormforFeedback=false;
    this.complaintForm = this.fb.group({
      complaintId: 1000000,
      title: ['', Validators.required],
      complaintType: ['', Validators.required],
      mobile: ['', Validators.required],
      pin: ['', Validators.required],
      status : [''],
      address:[''],
      raisedBy : {
        userId:this.userId
      },
      assignedTo : null
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }



}
