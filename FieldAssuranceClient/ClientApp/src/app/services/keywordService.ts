import { Injectable, Inject } from "@angular/core";
import { Response, RequestOptions, Headers } from "@angular/http";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from "./app.config";

@Injectable()
export class KeywordService {

  protected ApiUrl: string = AppConfig.settings.ConnectionStrings.apiServer;


  formWasTouched(formresult: boolean) {
    return formresult;
  }

  constructor(
    private http: HttpClient,
  ) {

  }



  /**  Get all FIELD FORM ASSURANCE LANGUAGE items  http://uskenappdev01:8010/api/FieldLangs */
  //NOT GET REWUEST FOR SECURITY
  public getAllKeywords() {
    //const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    const headers = new HttpHeaders().set("App", "Field Assurance");
    return this.http.post(`${this.ApiUrl}api/keywords`, null, { headers: headers })
  }
//  return this.http.post(`${this.ApiUrl}api/Keywords/`, JSON.stringify(form), { headers: headers });

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  //GET specific record from the list
  public getKeyword(formId: string) {
    const headers = new HttpHeaders().set("App", "Field Assurance");
    return this.http.post(`${this.ApiUrl}api/keywords/${formId}`, null, { headers: headers })

  };

  //Updates an existing  record
  public updateKeywordForm(newForm: FormKeyword) {
    console.log("update Form");
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.ApiUrl}api/Keywords/${newForm.kid}`, JSON.stringify(newForm), { headers: headers });
  };

  //CREATES A NEW Language RECORD
  public addForm(form: FormKeyword) {
    console.log("add Form");
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    console.log('added Form ');
    return this.http.post(`${this.ApiUrl}api/Keywords/`, JSON.stringify(form), { headers: headers });

  };



  //removes an existing Product
  public removeItem(formId: number) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    console.log("removeItem:" + formId);
    return this.http.delete(`${this.ApiUrl}api/Keywords/${formId}`, { headers: headers });

  }

}



export class FormKeyword {
  public kid: number = 0;
  public Category: string = "";
  public Keyword1: string = "";
  public Discription: string = "";
  public Value: string = "";
}


