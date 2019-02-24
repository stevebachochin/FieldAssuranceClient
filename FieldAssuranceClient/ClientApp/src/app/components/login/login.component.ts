import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { FormLanguageService, FormLanguage } from '../../services/languageService';
import { AuthService } from "../../services/auth.service";
import { UserLogin } from '../../models/user-login.model';
import { AuthApiResponse, AuthResponse } from '../../models/auth-api-response.model';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})

export class LoginComponent implements OnInit {
  //CREATE NEW LOGIN FORM
  userLogin = new UserLogin();
  authMsg: string = "";
  langData: any;
  authData: AuthResponse;
  responseLowerCase: string;
  resourceLoaded: boolean;

  @Input()
  isModal = false;

  //constructor(private alertService: AlertService, private authService: AuthService, private configurations: ConfigurationService) {
  constructor(
    private langDataService: FormLanguageService,
    private authService: AuthService,
    private authApiResponse: AuthApiResponse,
    private router: Router,
  ) {
    this.langData = new FormLanguage();
  }


  ngOnInit() {
    this.resourceLoaded = false;
    this.langDataService.languageData.subscribe(value => {
      this.langData = value;
      //INSTRUCT THE USER TO PROVIDE USER NAME AND PASSWORD
      if (value != undefined)
      {
        this.authMsg = value.AuthMsg;
        this.resourceLoaded = true;
      }
      
    });
   // this.authMsg = this.langData.AuthErrorMsg.toString()+"XXXXX";
  }

  login() {
    //use this.userLogin.userName to get user name, this.userLogin.password to get password
    localStorage.removeItem('userToken');
    this.authService.login(this.userLogin.username, this.userLogin.password)
      .subscribe((data: any) => {
        this.authData = JSON.parse(data.headers.get('AuthResponse-Headers'));
        this.authApiResponse.changeAuthResponse(this.authData);
        this.authApiResponse.authResponseData.subscribe(value => this.authData = value);
        this.interpretMsg(this.authData.Message);
        //console.log('Test -------------->  ' + this.authData.UserEmailAddress );
        if (this.authData.Authorized == "yes")
        {
          localStorage.setItem('userToken', data.body.access_token);
          this.router.navigate(['/home']);
        }
      }, error => {
        console.log('Error with connecting to AD service');
      }
      );
  }
  /**  interpret API response to end user language */
  interpretMsg(response: string) {

    this.responseLowerCase = response.toLowerCase();

    switch (this.responseLowerCase) {
      case "authorized":
        this.authMsg = this.langData.AuthOKMsg;
        break;
      case "invalid username or password":
      case "invalid request":
        this.authMsg = this.langData.AuthErrorMsg;
        break;
      case "not authorized":
        this.authMsg = this.langData.AuthNoAccessMsg;
        break;
      default:
        this.authMsg = response;
    }
  }
}


