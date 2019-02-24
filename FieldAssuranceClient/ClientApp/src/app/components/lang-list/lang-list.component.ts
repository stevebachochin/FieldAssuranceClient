import { Component, OnInit, ElementRef } from '@angular/core';
import { FormLanguageService, FormLanguage } from '../../services/languageService';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';



@Component({
    selector: 'langlist',
    templateUrl: './lang-list.component.html',
    styleUrls: ['./lang-list.component.css']
})
export class LangListComponent implements OnInit {

  resourceLoaded: boolean;
  langData: FormLanguage;
  allLanguages: Observable<FormLanguage[]>;

  displayedColumns = ['LangNameEnglish', 'Lang', 'Remove'];
  
  constructor(
    public router: Router,
    private langDataService: FormLanguageService,
  )
  {
    this.langData = new FormLanguage();
  }

  ngOnInit() {

    this.resourceLoaded = false;
    this.langDataService.languageData.subscribe(value => this.langData = value);
    this.langDataService.getAllLanguages().subscribe(
      (data: any) => {
        this.allLanguages = data;
        this.resourceLoaded = true;
      })
  }

  public deleteRecord(langId: number) {
    this.resourceLoaded = false;
    if (confirm(this.langData.DeleteConfirm)) {
      this.langDataService.removeItem(langId).subscribe(response => {
        this.langDataService.getAllLanguages().subscribe(
          (data: any) => {
            this.allLanguages = data;
            this.resourceLoaded = true;
          })
      }, error => console.log('Could not delete Language Record.' + langId));
      this.router.navigate(['../langlist']);
    }
  } 

 
}  

