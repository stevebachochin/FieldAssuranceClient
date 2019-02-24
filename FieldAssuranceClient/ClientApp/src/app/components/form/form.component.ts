import { Component, OnInit, ChangeDetectionStrategy, ViewChild, HostListener} from '@angular/core';
import { FormsService, Form } from '../../services/formsService';
import { FormLanguageService, FormLanguage } from '../../services/languageService';
import { AuthApiResponse, AuthResponse } from '../../models/auth-api-response.model';
import { Globals } from '../../models/global.model';
import { Location } from "@angular/common";
import { NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialogbox.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DeactivateService } from '../../services/deactivateService';
import { NgForm } from '@angular/forms';
import { AppConfig } from "../../services/app.config";

@Component({
  selector: 'fieldform',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [FormsService],
  //changeDetection: ChangeDetectionStrategy.Default providers: [UploadFileService]
})
export class FormComponent implements OnInit {
  resourceLoaded: boolean;
  //browserLang: string;
  model: any;
  files: any[] | undefined;
  FormId: string = "passing ssid - THIS WORKED";
  editable: boolean = false;
  submitted: boolean = true;
  wastouched: boolean = true;
  myName: string = "";
  formData: Form;
  langData: any;
  fldid: any;
  paramid: any;
  accepted: Boolean = true;
  acceptedStr: string = "yes";
  isChecked: boolean = false;
  selectedLanguage: string;
  selectedLanguageName: string;
  pdfFileName: string = "";
  frmMsg: string = "";
  @ViewChild('fieldForm')
  fieldForm: NgForm;
  authData: AuthResponse;
  
  forms: Observable<Object> | undefined;
  allLanguages: Observable<FormLanguage[]>;

  navigationSubscription: any;
  fileAPIURL: string = "";
  timeout: number = AppConfig.settings.ConnectionStrings.timeout;

  constructor(
    private zone: NgZone,
    private dataService: FormsService,
    private langDataService: FormLanguageService,
    private globals: Globals,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private deactivateGuard: DeactivateService,
    private authApiResponse: AuthApiResponse,
  ) {
    /**below is used for set up an empty form and empty form labels**/
    this.formData = new Form();
    this.langData = new FormLanguage();
    this.selectedLanguage = globals.selectedLanguage;
    this.selectedLanguageName = globals.selectedLanguageName;
    this.authApiResponse.authResponseData.subscribe(value => this.authData = value);
  }


  // WHEN THE PAGE INITIALLY LOADS... 
  ngOnInit() {
    this.langDataService.languageData.subscribe(value => {
      this.langData = value;
    });
    this.resourceLoaded = false;
    //Form Values
    this.formData = new Form();
    this.editable = true;
    this.submitted = false;
    this.setFormTimeOut();
    this.makeDefaultValues();
    //console.log("------------------->  " + this.authData.UserEmailAddress);
  }

  /**
   * Converts check box values from "true / false" to "yes / no"
   */
  toggleCheckBox(input: HTMLInputElement, fldName: string) {
 
    if (input.checked === true) {
      this.formData[fldName] = "yes";

    } else {
      this.formData[fldName] = "no";
    }
  }
  //UPDATE OR ADD A FIELD Record
  
  public updateForm(item: Form) {
    this.resourceLoaded = false;
    //ADD A NEW FIELD RECORD & add the selected form language
    this.formData.Lang = localStorage.getItem('selectedLanguage');
    //ADD CREATED DATE
    this.formData.Created = new Date();
    //ADD USER INFORMATION
    this.formData.SubmittedBy = this.authData.UserDisplayName.toString();
    this.formData.SubmittedByEmail = this.authData.UserEmailAddress.toString();
    //this.formData.SubmittedBy = "Steve";
    //this.formData.SubmittedByEmail = "12345@me.com";
    ////////this.formData.SubmittedByEmail = this.authData.UserEmailAddress;




    let formId = this.dataService.addForm(this.formData)
      .subscribe((data: any) => {
        //this.frmMsg = this.getSafeHTMLValue(this.langData.FormError + "<br /><br />"+ data.toString());
        this.frmMsg = this.langData.FormError + "<br /><br />" + data.toString();
        if (data.toString().includes("error")) {
          console.log("Error " + this.frmMsg);
          this.resourceLoaded = true;
        } else {
          this.router.navigate(['../home']);
        }
      }, error => {
        console.log('Could not create a new Field Assurance Form.');
        this.frmMsg = this.langData.FormError + "<br /><br />Form processing error.";
        this.resourceLoaded = true;
      }
    );
 

   }
  /**
      //DETERMINES IF FORM HAS BEEN TOUCHED
      canDeactivate(): Observable<boolean> | boolean {
          return confirm('Discard changes?');
  }
  **/
  //create default global variables //sets a default language base on browser's setting
 

  private makeDefaultValues() {
    if (this.formData.LetterAck == "") { this.formData.LetterAck = "no"; }
    if (this.formData.LetterFinal == "") { this.formData.LetterFinal = "no"; }
    if (this.formData.LetterNone == "") { this.formData.LetterNone = "no"; }
    this.resourceLoaded = true;
  }
  //Example of calling a common method in a service
  
  formTouched(formresult: boolean) {
 
  }
  //set timeout to fill out the form.  For Demo fill out in 5 minutes. 1000 = 1 second
  private setFormTimeOut() {
    setTimeout(() => {
      //LOG TIME OUT MSG
      console.log('Timed out');
      const dialogConfig = new MatDialogConfig();

      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        hasBackdrop: true,
        id: 1,
        msg: this.langData.DialogMsg,
        panelClass: 'materialDialogBox',
        backdropClass: 'materialDialogBoxBD',
        langOK: this.langData.OK
      };

      const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        data => this.router.navigate(['../home'])
      );
    }, this.timeout);
    //}, 1200000); or 1000 = 1 second 60000 = 1 minute or 1,200,000 = 20 minutes
    // }, 12,000,000);
  }
  getFormMsg() {
    if (this.langData != null) {
      
      return this.sanitizer.bypassSecurityTrustHtml(this.frmMsg);
      
    }
  }

  canDeactivate(): Observable<boolean> | boolean {

    //console.log('----------- >    ' + this.fieldForm.dirty);
    return this.fieldForm.submitted || !this.fieldForm.dirty;
  }

}
