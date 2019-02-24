import { Injectable, Inject } from "@angular/core";
import { Response, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from "./app.config";

@Injectable()
export class FormsService {
  [x: string]: any;
  private baseUrl: string;
  private wastouched: boolean = true;
  protected ApiUrl: string = AppConfig.settings.ConnectionStrings.apiServer;
  //private products: any;

  formWasTouched(formresult: boolean) {
    return formresult;
  }

  constructor(private http: HttpClient) {
   
  }

  //ApiUrl: string = 'http://uskenappdev01:8030/api/';

  //Gets the list of Employees
  public getAllForms(): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.ApiUrl}api/Fields`)

  }
  /**
   * 
   * @param pageNumber
   * @param pageSize
   * @param sortOrder
   * @param columnName
   * @param querySearch      SEARCH TEXT
   * @param querySearchName  WHAT FIELD IS THE SEARCH ON
   */
  public findForms(pageNumber: number, pageSize: number, sortOrder: string, columnName: string, querySearchName: string, querySearch: string): Observable<any> {
    if (querySearchName != null && querySearch != null && querySearchName != "" && querySearch != "") {
      let httpParams = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortOrder', sortOrder.toString())
        .set('columnName', columnName.toString())
        .set('querySearchName', querySearchName.toString())
        .set('querySearch', querySearch.toString())
      return this.http.get<any>(`${this.ApiUrl}api/Fields`, {
        params: httpParams,
        observe: 'response',
        responseType: 'json'
      }
      )
    } else {

      let httpParams = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortOrder', sortOrder.toString())
        .set('columnName', columnName.toString())
      // .set('querySearchName', querySearchName.toString())
      // .set('querySearch', querySearch.toString())
      return this.http.get<any>(`${this.ApiUrl}api/Fields`, {
        params: httpParams,
        observe: 'response',
        responseType: 'json'
      }
      )
    }

  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  //GET specific record from the list
  public getForm(formId: string) {
    console.log('Get Form : ' + formId);
    return this.http.get(`${this.ApiUrl}api/Fields/${formId}`);

  };

  //Updates an existing Record
  public updateForm(newForm: Form) {
    console.log("update Form");
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.ApiUrl}api/Fields/${newForm.fldid}`, JSON.stringify(newForm), { headers: headers });
  };

  //CREATES A NEW FIELD RECORD
  public addForm(form: Form) {
    console.log("add Form, create PDF of the form and send email notification to reviewer");
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    //console.log('added Form : ' + JSON.stringify(form));
    return this.http.post(`${this.ApiUrl}api/Fields/`, JSON.stringify(form), { headers: headers });

  };

  //removes an existing Record
  public removeItem(formId: number) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    console.log("removeItem:" + formId);
    return this.http.delete(`${this.ApiUrl}api/Fields/${formId}`, { headers: headers });

  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}

export class FormsSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}

export class Form {
  public fldid: number = 0;
  public Lang: string = "";
  public Created: Date | undefined;
  public CName: string = "";
  public CTitle: string = "";
  public FacName: string = "";
  public FacAddress: string = "";
  public FacPhone: string = "";
  public SurgeonName: string = "";
  public SurgeonEmail: string = "";
  public CryolifeRep: string = "";
  public RegionMgr: string = "";
  public LetterAck: string = "";
  public LetterFinal: string = "";
  public LetterNone: string = "";
  public LetterSendTo: string = "";
  public ReturnSample: string = "";
  public RMANumber: string = "";
  public Product: string = "";
  public SerialLotNumber: string = "";
  public UDI: string = "";
  public Implanted: string = "";
  public DateIncident: Date | undefined;
  public DateReported: Date | undefined;
  public Outcome: string = "";
  public Description: string = "";
  public DocumentNumber: string = "";
  public EffectiveDate: Date | undefined;
  public SubmittedBy: string = "";
  public SubmittedByEmail: string = "";
}
