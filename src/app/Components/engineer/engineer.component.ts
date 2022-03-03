import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/complaint';
import { ApiService } from 'src/app/Services/api.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.css']
})
export class EngineerComponent implements OnInit {

  username = '';
  userId=0;
  pin='';
  complaints:Complaint[];
  engUsers:User[];
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
      this.pin=info['pin'];

      this.complaintForm = this.fb.group({
        complaintId: [{value:1000000,disabled: true}],
        title: [{value:'',disabled: true}, Validators.compose([Validators.minLength(4), Validators.required])],
        complaintType: [{value:'',disabled: true}, Validators.required],
        mobile: [{value:'',disabled: true}, Validators.required],
        pin: [{value:'',disabled: true}, Validators.required],
        status : [''],
        address:[{value:'',disabled: true}],
        feedback:[{value:'',disabled: true}],
        raisedBy : {
          userId:this.userId
        },
        assignedTo_userId :[{value:'',disabled: true} ,null],
        assignedTo : null

    })

    if (this.username!=''){
      this.getComplaints();
      this.getUsersByType('eng');
    }else{
      this.router.navigate(["/login"]);
    }
   }

  ngOnInit(): void {
  }

  getComplaints(){
    //alert("df")
    this.apiService.getComplaintsByAssignedId(this.userId).subscribe(
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


  edit(c: Complaint){

    this.editComplaint=true;
    this.disableFormforFeedback=true;

    this.complaintForm = this.fb.group({
      complaintId: [{value:c.complaintId,disabled: true}],
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
      assignedTo_userId:c.assignedTo.userId,
      assignedTo : {
        userId:c.assignedTo.userId
      }

  })
}

  onAddComplaint(){
    this.complaintForm.patchValue({assignedTo: {userId: this.complaintForm.get('assignedTo_userId')?.value}});
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
      complaintId: [{value:1000000,disabled: true}],
      title: ['', Validators.required],
      complaintType: ['', Validators.required],
      mobile: ['', Validators.required],
      pin: ['', Validators.required],
      status : [''],
      address:[''],
      raisedBy : {
        userId:this.userId
      },
      assignedTo_userId: null,
      assignedTo : null
    })
  }

  getUsersByType(type:String){
    this.apiService.getUsersByType(type).subscribe(
      (Response: any)=>{
        //let myData = JSON.parse(Response);
        //this.complaints=Response?.assignedComplaints;
        this.engUsers=Response
        //this.complaints=JSON.parse(Response('raisedComplaints') || '');
        //alert("Respons");

      }
    )

  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }



}
