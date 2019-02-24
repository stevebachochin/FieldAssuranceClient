import { Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import { FormLanguageService, FormLanguage } from '../../services/languageService';
import { Globals } from '../../models/global.model';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'langform',
  templateUrl: './lang-form.component.html',
  styleUrls: ['../form/form.component.css'],
  //changeDetection: ChangeDetectionStrategy.Default providers: [UploadFileService]
})
export class LangFormComponent implements OnInit {
  @ViewChild('fieldForm')
  fieldForm: NgForm;
  resourceLoaded: boolean;
  editable: boolean = false;
  submitted: boolean = true;
  wastouched: boolean = true;
  formData: FormLanguage;
  langData: FormLanguage;
  langid: string;
  paramid: any;
  selectedLanguage: string;
  selectedLanguageName: string;
  frmMsg: string = "";
  
  forms: Observable<Object> | undefined;
  allLanguages: Observable<FormLanguage[]>;


  constructor(
 //   private zone: NgZone,
    private langDataService: FormLanguageService,
    private globals: Globals,
  //  private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
   // private deactivateGuard: DeactivateService,
  ) {
    /**below is used for set up an empty form and empty form labels**/
    this.formData = new FormLanguage();
    this.langData = new FormLanguage();
    this.selectedLanguage = globals.selectedLanguage;
    this.selectedLanguageName = globals.selectedLanguageName;
  }


  // WHEN THE PAGE INITIALLY LOADS... 
  ngOnInit() {
    this.langDataService.languageData.subscribe(value => this.langData = value);
    this.resourceLoaded = false;
    this.formData = new FormLanguage();

    this.editable = true;
    this.submitted = false;

    this.route.params.subscribe(
      params => {
        let id = params['id'];
        this.getLangFormData(id);
      //  console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDd"+params);
      }
    );
  }

  //UPDATE OR ADD A NEW Record
  
  public updateForm(record: FormLanguage) {
    if (this.langid == "new") {
      //ADD A PRODUCT
      this.langDataService.addForm(record)
        .subscribe((data: any) => {
          console.log('new language record created');
          this.router.navigate(['../langlist']);

        }, error => console.log('Could not create a language record.'));
    } else {
      //MODIFY A Record
      //console.log("----->   "+this.fieldForm.submitted);
      this.langDataService.updateLanguageForm(record)
        .subscribe(
          (data: any) => {
            this.submitted = true;
            this.editable = true;
            this.frmMsg = this.langData.FormUpdated;
          }, error => console.log('Could not update the language record.'));
    }




  }

  canDeactivate(): Observable<boolean> | boolean {

  console.log('----------- >    ' + this.fieldForm.dirty);
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
  getLangFormData(langid: string): void {
    this.langid = langid;
    //NEW FORM
    if (langid == "new") {
      //clears any previous values
      this.formData = new FormLanguage();
      this.editable = true;
      this.submitted = false;
      this.resourceLoaded = true;
      // console.log('New Product - this id = ' + this.id);
    } else {


      //this.dataService.getProduct(langid)
      this.langDataService.getLanguage(langid)
        .subscribe((data : any) => {
          this.formData = data;
          this.resourceLoaded = true;
        }, error => {
          console.log('Error retriving data from language record');
          this.frmMsg = this.langData.FormError + "<br /><br />Form processing error.";
          this.resourceLoaded = true;
        }
      );


    }

  }

}
