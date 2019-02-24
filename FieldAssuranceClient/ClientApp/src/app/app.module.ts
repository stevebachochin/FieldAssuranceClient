import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsService } from './services/formsService';
import { FormLanguageService} from './services/languageService';
import { KeywordService } from './services/KeywordService';
import { AclService } from './services/AclService';
import { Globals } from './models/global.model';
import { AuthApiResponse } from './models/auth-api-response.model';
import { FormsComponent } from './components/forms/forms.component';
import { FormComponent } from './components/form/form.component';
import { DialogBoxComponent } from './components/dialog-box/dialogbox.component';
import { AppRoutingModule } from './app-routing.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {
  MatDialogModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatProgressBarModule,
  MatDatepickerModule, MatNativeDateModule
} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { LangPickListComponent } from "./components/lang-picklist/lang-picklist.component";
import { LangFormComponent } from "./components/lang-form/lang-form.component";
import { AclFormComponent } from "./components/acl-form/acl-form.component";
import { LangListComponent } from "./components/lang-list/lang-list.component";
import { KeyFormComponent } from "./components/key-form/key-form.component";
import { KeyListComponent } from "./components/key-list/key-list.component";
import { AuthService } from './services/auth.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DeactivateService } from "./services/deactivateService";
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './services/app.config';
import { HttpModule } from '@angular/http';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FormsComponent,
    FormComponent,
    HomeComponent,
    LoginComponent,
    DialogBoxComponent,
    WelcomeComponent,
    LangPickListComponent,
    AclFormComponent,
    LangFormComponent,
    LangListComponent,
    KeyFormComponent,
    KeyListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CollapseModule.forRoot()
  ],
  providers: [
    KeywordService,
    FormsService,
    FormLanguageService,
    Globals,
    AuthApiResponse,
    AuthService,
    AclService,
    DeactivateService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    }

  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogBoxComponent],
})
export class AppModule {
}

