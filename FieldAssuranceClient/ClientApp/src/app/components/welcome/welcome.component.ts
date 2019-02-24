import { Component} from '@angular/core';
import { AuthApiResponse, AuthResponse } from '../../models/auth-api-response.model';
import { FormLanguageService, FormLanguage } from '../../services/languageService';

@Component({
  selector: 'welcome',
  template: `<div class="panel-subheading">
                  <div class="col-sm-12 hdr" *ngIf="authData?.UserDisplayName">{{langData?.Welcome}} {{authData?.UserDisplayName}}</div>
             <div>`,
  styleUrls: ['../welcome/welcome.component.css'],
})
export class WelcomeComponent {

  welcomesubhdr: string;
  langData: any;
  authData: any;

  constructor(
    private langDataService: FormLanguageService,
    private authApiResponse: AuthApiResponse
  ) {
    this.langDataService.languageData.subscribe(value => this.langData = value);
    this.authApiResponse.authResponseData.subscribe(value => this.authData = value);
  }
 
}
