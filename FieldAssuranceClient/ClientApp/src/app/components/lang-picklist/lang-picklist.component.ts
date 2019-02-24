import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { FormLanguageService, FormLanguage } from '../../services/languageService';
import { Globals } from '../../models/global.model';
import { Location } from "@angular/common";
import { NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
//import { MatProgressBarModule } from '@angular/material/progress-bar';
//import { AuthApiResponse } from '../../models/auth-api-response.model';




@Component({
  selector: 'langpicklist',
  templateUrl: './lang-picklist.component.html',
  styleUrls: ['../form/form.component.css'],
  //changeDetection: ChangeDetectionStrategy.Default providers: [UploadFileService]
})
export class LangPickListComponent implements OnInit {
  //browserLang: string;
  resourceLoaded: boolean;
  model: any;
  langData: any;
  selectedLanguage: string;
  selectedLanguageName: string;
  
  forms: Observable<Object> | undefined;
  allLanguages: Observable<FormLanguage[]>;
  navigationSubscription: any;
  fileAPIURL: string = "";

  constructor(
    private zone: NgZone,
    private langDataService: FormLanguageService,
    private globals: Globals,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    /**below is used for set up an empty form and empty form labels**/
    this.langData = new FormLanguage();
    this.selectedLanguage = localStorage.getItem('selectedLanguage');
    this.selectedLanguageName = localStorage.getItem('selectedLanguageName');
  }


  // WHEN THE PAGE INITIALLY LOADS... 
  ngOnInit() {
     //GET LIST OF LANGUAGES FOR PICKLIST
    
    this.langDataService.languageData.subscribe(value => this.langData = value);
    this.resourceLoaded = false;
   
      this.langDataService.getAllLanguages().subscribe(
      (data: any) => {
        this.allLanguages = data;
        this.langDataService.checkLanguage(data);
        this.selectedLanguage = localStorage.getItem('selectedLanguage');
        this.selectedLanguageName = localStorage.getItem('selectedLanguageName');
        this.globals.selectedLanguageName = this.selectedLanguageName;
        this.globals.selectedLanguage = this.selectedLanguage;
        //GATHER LANGUAGE VALUES AND STORE AS AN OBJECT FOR THE ENTIRE APPLICATION TO USE.
      }

    )
  
  }
 
  
  public changeLanguage(langcode, langname) {
    this.selectedLanguage = langcode;
    this.selectedLanguageName = langname;
    this.globals.selectedLanguageName = this.selectedLanguageName;
    this.globals.selectedLanguage = this.selectedLanguage;
    console.log(this.selectedLanguageName + ' language applied');
    localStorage.setItem('selectedLanguageName', this.selectedLanguageName);
    localStorage.setItem('selectedLanguage', this.selectedLanguage);
    this.getLanguageValues("new");
  }


  private getLanguageValues(action: string) {
    this.langDataService.languageData.subscribe(value => this.langData = value);
    if (this.langData == null || action == "new") {

      //console.log("lang data null or action == new");
      this.langDataService.getLanguageByLangCode(this.selectedLanguage)
        .subscribe((data: any) => {
          this.langDataService.changeLanguageData(data);
         // console.log("No defaults found .... Loading Form page language data " + this.langData.Lang);
          this.resourceLoaded = false;
        });
    } else {
     // console.log("default language pack used - object already loaded");
      this.resourceLoaded = false;
    }
   }

  getInnerHTMLValue() {
    if (this.langData != null) {
      return this.sanitizer.bypassSecurityTrustHtml(this.langData.WelcomeMsg);
    }
  }

}
