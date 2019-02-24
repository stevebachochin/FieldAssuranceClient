import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormLanguageService, FormLanguage } from '../../services/languageService';
import { Globals } from '../../models/global.model';
import { Observable } from "rxjs";
import { AuthApiResponse, AuthResponse } from '../../models/auth-api-response.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
 // isExpanded : boolean= false;
  appTitle : string= "CryoLife Field Assurance Forms";
  appLogo : string= "assets/images/CryoLifeLogo.png";
  currentURL: string;
  //LANGUAGE DATA
  langData: any;
  selectedLanguage: string;
  selectedLanguageName: string;
  authData: any;
  allLanguages: Observable<FormLanguage[]>;
  isCollapsed: boolean;

  constructor(
    private router: Router,
    private langDataService: FormLanguageService,
    private globals: Globals,
    private authApiResponse: AuthApiResponse,
  ) {
    router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        //console.log("current url", event.url); // event.url has current url
        this.currentURL = event.url;
      }
    });
    this.langData = new FormLanguage();
    this.selectedLanguage = globals.selectedLanguage;
    this.selectedLanguageName = globals.selectedLanguageName;
    this.authApiResponse.authResponseData.subscribe(value => this.authData = value);
  }

  ngOnInit() {

    //GET LIST OF LANGUAGES FOR PICKLIST
    //this.resourceLoaded = true;
    this.langDataService.getAllLanguages().subscribe(
      (data: any) => {
        this.allLanguages = data;
        this.langDataService.checkLanguage(data);
        this.selectedLanguage = localStorage.getItem('selectedLanguage');
        this.selectedLanguageName = localStorage.getItem('selectedLanguageName');
        //GATHER LANGUAGE VALUES AND STORE AS AN OBJECT FOR THE ENTIRE APPLICATION TO USE.
        this.getLanguageValues();
      }

    )
  }

  private getLanguageValues() {
    this.langDataService.languageData.subscribe(value => this.langData = value);
    if (this.langData == null) {

      //console.log("NAV - lang data null or action == new");
      this.langDataService.getLanguageByLangCode(this.selectedLanguage)
        .subscribe((data: any) => {
          this.langDataService.changeLanguageData(data);
        });
    } else {
    }
  }

  Logout() {
    this.authData = new AuthResponse();
    localStorage.removeItem('userToken');
    this.authData.Authorized == 'no';
    this.authApiResponse.changeAuthResponse(this.authData);
    this.router.navigate(['/login']);
  }

}
