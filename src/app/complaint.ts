export class Complaint {
    complaintId:number;
    title:string;
    complaintType:string;
    mobile:string;
    pin:string;
    status:string;
    address:string;
    feedback:String;
    raisedBy:{
        userId:Number;
        identifier:String;
    };
    assignedTo:{
        userId:Number;
        identifier:String;
    };

}