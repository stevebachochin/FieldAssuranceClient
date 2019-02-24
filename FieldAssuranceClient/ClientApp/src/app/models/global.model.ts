import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Globals {
  selectedLanguage: string = '';
  selectedLanguageName: string = '';
  selectedPageSize: number = 5;
  selectedPageIndex: number = 0;
  selectedSortDirection: string = "asc";
  selectedSortActive: string = "CName";
  querySearchName: string = "CName";
  querySearch: string = '';

  constructor() { }

}
