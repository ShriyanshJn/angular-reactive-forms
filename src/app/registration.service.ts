import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  _url = "https://localhost:44396/api/User/CreateUser"

  register(userData: any) {
    debugger;
    return this._http.post<any>(this._url, userData)
  }

}
