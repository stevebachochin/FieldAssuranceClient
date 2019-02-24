import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormComponent } from "./components/form/form.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthService } from './services/auth.service';
import { LoginComponent } from "./components/login/login.component";
import { LangFormComponent } from "./components/lang-form/lang-form.component";
import { LangListComponent } from "./components/lang-list/lang-list.component";
import { KeyFormComponent } from "./components/key-form/key-form.component";
import { KeyListComponent } from "./components/key-list/key-list.component";
import { DeactivateService } from "./services/deactivateService";
import { AclFormComponent } from "./components/acl-form/acl-form.component";


@NgModule({
    imports: [
      RouterModule.forRoot([
        {
          path: "",
          component: HomeComponent, canActivate: [AuthService]
        },
        {
          path: "login",
          component: LoginComponent,
        },
        {
          path: "home",
          component: HomeComponent, canActivate: [AuthService]
        },
        {
          path: 'form/:id',
          component: FormComponent, canActivate: [AuthService], canDeactivate: [DeactivateService],
        },
        {
          path: 'langform/:id',
          component: LangFormComponent, canActivate: [AuthService], canDeactivate: [DeactivateService],
        },
        {
          path: 'langlist',
          component: LangListComponent, canActivate: [AuthService]
        },
        {
          path: 'keyform/:id',
          component: KeyFormComponent, canActivate: [AuthService], canDeactivate: [DeactivateService],
        },
        {
          path: 'keylist',
          component: KeyListComponent, canActivate: [AuthService]
        },
        {
          path: 'aclform',
          component: AclFormComponent, canActivate: [AuthService]
        },
        {
          path: '**',
          component: HomeComponent, canActivate: [AuthService]
        },
])
    ],
    exports: [
        RouterModule
    ],
    providers: [
     //   AuthService, AuthGuard
    ]
})
export class AppRoutingModule { }
