import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  //private url = 'https://jsonplaceholder.typicode.com/users';
  private url = 'http://localhost:8090/ComplaintRedressalSystemV1/user;'

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUserById(userId: number): Observable<User> {
    const getByIdUrl=`${this.url}/${userId}`;
    return this.http.get<User>(getByIdUrl);
  }

  updateUser(user:User):Observable<any> {
    return this.http.put(this.url, user)
  }

  deleteUser (us: User | number): Observable<User> {
    const id = typeof us === 'number' ? us : us.userId;
    const deleteurl = `${this.url}/${id}`;

    return this.http.delete<User>(deleteurl);
  }

  addUser(newUser:User) {
    //console.log(us.username);
    return this.http.post<User>(this.url,newUser);
  }
  constructor(private http:HttpClient) { }

}
