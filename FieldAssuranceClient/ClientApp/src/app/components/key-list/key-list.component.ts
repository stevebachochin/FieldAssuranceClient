import { Component, OnInit, ElementRef } from '@angular/core';
import { FormLanguageService, FormLanguage } from '../../services/languageService';
import { KeywordService, FormKeyword } from '../../services/KeywordService';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';



@Component({
    selector: 'keylist',
    templateUrl: './key-list.component.html',
    styleUrls: ['../lang-list/lang-list.component.css']
})
export class KeyListComponent implements OnInit {

  resourceLoaded: boolean;
  langData: FormLanguage;
  allKeywords: Observable<FormKeyword[]>;

  displayedColumns = ['Keyword1', 'Discription'];
  
  constructor(
    public router: Router,
    private langDataService: FormLanguageService,
    private keywordService: KeywordService,
  )
  {
    this.langData = new FormLanguage();
  }

  ngOnInit() {

    this.resourceLoaded = false;
    this.langDataService.languageData.subscribe(value => this.langData = value);
    this.keywordService.getAllKeywords().subscribe(
      (data: any) => {
        this.allKeywords = data;
        this.resourceLoaded = true;
      })
  }
}  

