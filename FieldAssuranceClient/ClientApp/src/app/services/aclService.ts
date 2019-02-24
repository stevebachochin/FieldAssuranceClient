import { Injectable, Inject } from "@angular/core";
import { Response, RequestOptions, Headers } from "@angular/http";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from "./app.config";

@Injectable()
export class AclService {
  app: string = "Field Assurance";
  protected ApiUrl: string = AppConfig.settings.ConnectionStrings.apiAuthServer; //apiAuthServer
  

  formWasTouched(formresult: boolean) {
    return formresult;
  }

  constructor(
    private http: HttpClient,
  ) {

  }



  //FOR Access Control Lookup
  public getAccessControlByApplication() {
    //console.log("lang code " + langCode);

    return this.http.get(`${this.ApiUrl}api/acl/${this.app}`);
  };

  //Updates an existing  record
  public updateAclForm(form: FormAcl) {
    console.log("update Form");
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.ApiUrl}api/accesscontrol/${form.id}`, JSON.stringify(form), { headers: headers });
  };



}


export class FormAcl {
  public id: number = 0;
  public Application: string = "";
  public Discription: string = "";
  public Groups: string = "";
  public GroupsAdmin: string = "";
  public GroupsIT: string = "";
}

