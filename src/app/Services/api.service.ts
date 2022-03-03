import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable, of } from 'rxjs';
import { Complaint } from '../complaint';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  url = 'http://localhost:8090/ComplaintRedressalSystemV1';

  adminlogin(admin:User):Observable<User>{
    return this.http.post<any>(this.url+"/user/login/1", admin);
  }

  addUser(newUser:User) {
    //console.log(us.username);
    return this.http.post<User>(this.url + "/user",newUser);
  }
  updateUser(newUser:User) {
    //console.log(us.username);
    return this.http.put<User>(this.url + "/user",newUser);
  }

  deleteUser (us: User | number): Observable<User> {
    const id = typeof us === 'number' ? us : us.userId;
    const deleteurl = this.url + "/user/"+id;

    return this.http.delete<User>(deleteurl);
  }

  getUserById(userId:number) {
    //console.log(us.username);
    return this.http.get<User>(this.url + "/user/"+userId);
  }

  getComplaintsUserById(userId:number) {
    //console.log(us.username);
    return this.http.get<Complaint[]>(this.url + "/user/complaints/user/"+userId);
    //return this.http.get<Complaint[]>(this.url + "complaints/1");
  }
  addComplaint(newComplaint:Complaint) {
    //console.log(us.username);
    return this.http.post<Complaint>(this.url + "/user/complaints",newComplaint);
  }

  getComplaintsByPin(pin: String ){
    return this.http.get<Complaint[]>(this.url + "/user/complaints/manager/"+ pin);
  }

  getUsersByType(type: String ){
    return this.http.get<Complaint[]>(this.url + "/user/type/"+ type);
  }
  getComplaintsByAssignedId(userId: Number ){
    return this.http.get<Complaint[]>(this.url + "/user/complaints/user/eng/"+ userId);
  }
  
}
