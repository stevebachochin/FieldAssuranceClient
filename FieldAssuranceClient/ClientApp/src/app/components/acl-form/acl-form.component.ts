import { Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import { FormLanguageService, FormLanguage } from '../../services/languageService';
import { Globals } from '../../models/global.model';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AclService, FormAcl } from '../../services/AclService';
//import { AuthService, FormAcl} from "../../services/auth.Service";


@Component({
  selector: 'aclform',
  templateUrl: './acl-form.component.html',
  styleUrls: ['../form/form.component.css'],
  //changeDetection: ChangeDetectionStrategy.Default providers: [UploadFileService]
})
export class AclFormComponent implements OnInit {
  @ViewChild('fieldForm')
  fieldForm: NgForm;
  resourceLoaded: boolean;
  editable: boolean = false;
  submitted: boolean = true;
  wastouched: boolean = true;
  formData: FormAcl;
  langData: FormLanguage;
  langid: string;
  paramid: any;
  selectedLanguage: string;
  selectedLanguageName: string;
  frmMsg: string = "";
  
  forms: Observable<Object> | undefined;
  allLanguages: Observable<FormLanguage[]>;


  constructor(
    private langDataService: FormLanguageService,
    private aclService: AclService,
   // private authService: AuthService,
    private globals: Globals,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    /**below is used for set up an empty form and empty form labels**/
    this.formData = new FormAcl();
    this.langData = new FormLanguage();
    this.selectedLanguage = globals.selectedLanguage;
    this.selectedLanguageName = globals.selectedLanguageName;
  }


  // WHEN THE PAGE INITIALLY LOADS... 
  ngOnInit() {

   
    this.langDataService.languageData.subscribe(value => this.langData = value);
    this.resourceLoaded = false;
    this.formData = new FormAcl();

    this.editable = true;
    this.submitted = false;
    this.getAclFormData();
   

  }

  //UPDATE Record
  

  public updateForm(record: FormAcl) {
      //MODIFY A PRODUCT ONLY
     // console.log("----->   "+this.fieldForm.submitted);
    this.aclService.updateAclForm(record)
        .subscribe(
          (data: any) => {
            this.submitted = true;
            this.editable = true;
            this.frmMsg = this.langData.FormUpdated;
          }, error => console.log('Could not update the Acl record.')
        );
       
  }
  

  canDeactivate(): Observable<boolean> | boolean {

  //console.log('----------- >    ' + this.fieldForm.dirty);
  return this.fieldForm.submitted || !this.fieldForm.dirty;
  }

  
  formTouched(formresult: boolean) {
 
  }

  getFormMsg() {
    if (this.langData != null) {
      return this.sanitizer.bypassSecurityTrustHtml(this.frmMsg);
      
    }
  }


  //GET THE FORM DATA
  getAclFormData(): void {
    this.aclService.getAccessControlByApplication()
        .subscribe((data : any) => {
          this.formData = data;
          this.resourceLoaded = true;
        }, error => {
          console.log('Error retriving data from key record');
          this.resourceLoaded = true;
        }
      );

  }
  
}
