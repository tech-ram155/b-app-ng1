import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  emailUrl = 'http://localhost:3000/api/v1/users/contact/send-email';

  constructor(private http:HttpClient) { }

  onEmailSubmit(data:FormData){
    return this.http.post(this.emailUrl,data)
  }
}
 