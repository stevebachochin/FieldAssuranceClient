import { Injectable, Inject } from "@angular/core";
import { Response, RequestOptions, Headers } from "@angular/http";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TagContentType } from "@angular/compiler";
import { Globals } from './../models/global.model';
import { AppConfig } from "./app.config";

@Injectable()
export class FormLanguageService {
  [x: string]: any;
  private baseUrl: string;
  private wastouched: boolean = true;
  selectedLanguage: string = "en";
  selectedLanguageName: string = "English";
  protected ApiUrl: string = AppConfig.settings.ConnectionStrings.apiServer;

  ///LANGUAGE OBJECT
  private lang: FormLanguage;
  private _languageData = new BehaviorSubject(this.lang);
  languageData = this._languageData.asObservable();
  changeLanguageData(NewLanguageData: FormLanguage) {
    this._languageData.next(NewLanguageData);
  }
  ///END LANGUAGE OBJECT

  formWasTouched(formresult: boolean) {
    return formresult;
  }

  constructor(
    private http: HttpClient,
    private globals: Globals,
  ) {
    if (localStorage.getItem('selectedLanguage') != null) {
      this.selectedLanguage = localStorage.getItem('selectedLanguage');
      this.selectedLanguageName = localStorage.getItem('selectedLanguageName');
    }
  }


  //ApiUrl: string = AppSettings.Current().ConnectionStrings["FileAPIURL"];
  /**
  * ApiUrl: string = 'http://uskenappdev01:8030/api/';
  * Example http://localhost:56264/api/FieldLangByCode/110
  * GET LANGUAGE BY LANGUAGE CODE
  */

  public getLanguageByLangCode(langCode: string) {
    console.log("lang code " + langCode);
    return this.http.get(`${this.ApiUrl}api/FieldLangByCode/${langCode}`);
  };


  /**  Get all FIELD FORM ASSURANCE LANGUAGE items  http://uskenappdev01:8010/api/FieldLangs */
  public getAllLanguages(): Observable<FormLanguage[]> {
    return this.http
      .get<FormLanguage[]>(`${this.ApiUrl}api/FieldLangs`);
   
  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  //GET specific product from the list
  public getLanguage(formId: string) {
    console.log('Get Lang Form : ' + formId);
    return this.http.get(`${this.ApiUrl}api/FieldLangs/${formId}`);

  };

  //Updates an existing Language record
  public updateLanguageForm(newForm: FormLanguage) {
    console.log("update Form");
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.ApiUrl}api/FieldLangs/${newForm.langid}`, JSON.stringify(newForm), { headers: headers });
  };

  //CREATES A NEW Language RECORD
  public addForm(form: FormLanguage) {
    console.log("add Form");
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    console.log('added Form ');
    return this.http.post(`${this.ApiUrl}api/FieldLangs/`, JSON.stringify(form), { headers: headers });

  };



  //removes an existing Product
  public removeItem(formId: number) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    console.log("removeItem:" + formId);
    return this.http.delete(`${this.ApiUrl}api/FieldLangs/${formId}`, { headers: headers });

  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  /**
   * 
   * Check Language settings  - share by different components
   */
  public checkLanguage(data) {
  
    //if (this.selectedLanguage == "") {
    if (localStorage.getItem('selectedLanguage') == null) {
      //GET LANGUAGE SET BY BROWSER
      this.browserLang = navigator.language;
      this.selectedLanguage = "en";
      this.selectedLanguageName = "English";
      if (this.browserLang != null && this.browserLang != "" && this.browserLang != "en-US") {
        this.selectedLanguage = this.browserLang.substring(0, 2).toLowerCase();

        data.forEach((recordelement) => {
          if (recordelement.Lang == this.selectedLanguage) {

            this.selectedLanguage = recordelement.Lang.toString();
            this.selectedLanguageName = recordelement.LangName.toString();
          }
        }
        );
      }

     this.globals.selectedLanguage = this.selectedLanguage;
     this.globals.selectedLanguageName = this.selectedLanguageName;
     localStorage.setItem('selectedLanguage', this.selectedLanguage);
     localStorage.setItem('selectedLanguageName', this.selectedLanguageName);
    }
  
  }



}

export class FormsSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}

export class FormLanguage {
  public langid: number = 0;
  public Lang: string = "";
  public Header: string = "";
  public Title: string = "";
  public SubTitle: string = "";
  public Instructions: string = "";
  public SectionA: string = "";
  public SectionB: string = "";
  public CName: string = "";
  public CTitle: string = "";
  public FacName: string = "";
  public FacAddress: string = "";
  public FacPhone: string = "";
  public SurgeonName: string = "";
  public SurgeonEmail: string = "";
  public CryolifeRep: string = "";
  public RegionMgr: string = "";
  public Letter: string = "";
  public LetterAck: string = "";
  public LetterFinal: string = "";
  public LetterNone: string = "";
  public LetterSendTo: string = "";
  public ReturnSample: string = "";
  public ReturnSampleY: string = "";
  public ReturnSampleN: string = "";
  public RMANumber: string = "";
  public Product: string = "";
  public SerialLotNumber: string = "";
  public UDI: string = "";
  public Implanted: string = "";
  public DateIncident: string = "";
  public DateReported: string = "";
  public Outcome: string = "";
  public Description: string = "";
  public DocumentNumber: string = "";
  public EffectiveDate: string = "";
  public WelcomeMsg: string = "";
  public LangName: string = "";
  public EditButton: string = "";
  public BackButton: string = "";
  public SubmitButton: string = "";
  public SubmittedBy: string = "";
  public DateSubmitted: string = "";
  public DialogMsg: string = "";
  public OK: string = "";
  public TitleHdr: string = "";
  public Confidential: string = "";
  public SOP: string = "";
  public Welcome: string = "";
  public AuthMsg: string = "";
  public AuthErrorMsg: string = "";
  public AuthNoAccessMsg: string = "";
  public AuthOKMsg: string = "";
  public LoginUserName: string = "";
  public LoginPassword: string = "";
  public LoginSubmit: string = "";
  public AppTitle: string = "";
  public NewForm: string = "";
  public Logout: string = "";
  public FormError: string = "";
  public AdminMenuHeader: string = "";
  public AdminMenuAccessControl: string = "";
  public AdminMenuLangSetup: string = "";
  public LangNameEnglish: string = "";
  public AdminLanguage: string = "";
  public AdminLanguageCode: string = "";
  public FormUpdated: string = "";
  public FormAdded: string = "";
  public UnsavedChanges: string = "";
  public NewLangRecord: string = "";
  public DeleteConfirm: string = "";
  public KeywordValues: string = "";
  public Keyword: string = "";
  public KeywordDescription: string = "";
  public KeywordValue: string = "";
  public AclInstructions: string = "";
  public AclGroups: string = "";
  public AclGroupsAdmin: string = "";
  public AclGroupsIT: string = "";
}


