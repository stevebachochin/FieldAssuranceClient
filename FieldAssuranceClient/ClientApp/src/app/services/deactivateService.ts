import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { NgForm } from "@angular/forms";
import { ComponentCanDeactivate } from '../components/can-deactivate/can-deactivate';
import { FormLanguageService, FormLanguage } from './languageService';


@Injectable()
export  class DeactivateService implements CanDeactivate<ComponentCanDeactivate> {


langData: FormLanguage;


  constructor(
    private langDataService: FormLanguageService,
  ) {
    this.langDataService.languageData.subscribe((value : any)=> {
      this.langData = value;
    });
  }

  canDeactivate(component: ComponentCanDeactivate): boolean {
    if (!component.canDeactivate()) {
      if (confirm(this.langData.UnsavedChanges)) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }


}
