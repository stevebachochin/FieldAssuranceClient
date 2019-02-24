import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthApiResponse {

  constructor() { }

  private authResponse: AuthResponse;
  private _authResponseData = new BehaviorSubject(this.authResponse);
  authResponseData = this._authResponseData.asObservable();
  changeAuthResponseData(NewAuthResponseData: AuthResponse) {
    this._authResponseData.next(NewAuthResponseData);
  }

  //METHOD FOR CHANGING AuthResponse object
  changeAuthResponse(NewResponse: AuthResponse) {
    this._authResponseData.next(NewResponse);
  }
}

export class AuthResponse {
  public Authorized: string = "";
  public Message: string = "";
  public UserDisplayName: string = "";
  public LoggedOn: string = "";
  public Admin: string = "";
  public IT: string = "";
  public Application: string = "";
  public UserEmailAddress: string = "";
}













