import { Component, OnInit, ViewChild, Input, ElementRef, Output } from '@angular/core';
import { FormsService, FormsSearchCriteria, Form } from '../../services/formsService';
import { Location } from "@angular/common";
import { NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatSortModule, MatSortable } from '@angular/material/sort';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Globals } from '../../models/global.model';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator'
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';
import { EventEmitter } from 'events';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@Component({
    selector: 'forms',
    providers: [FormsService],
    //template: 'xxxxxxxxxxxxx',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  resourceLoaded: boolean;
  formSelector: any;
  forms: any;
  showEditor = true;
  myName: string = "";
  form: Form;
  querySearchName: string;
  querySearch: string;
  selectedPageSize: number;
  private selectedPageIndex: number;
  private selectedSortDirection: string;
  private selectedSortActive: string;

  dataSource = new BehaviorSubject<Form[]>([]);
  //ANGULAR MATERIAL
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() totalCount: number;

  @Output() onPageSwitch = new EventEmitter();

  displayedColumns = ['CName', 'Product', 'RMANumber', 'FacName', 'CryolifeRep', 'RegionMgr', 'Created', 'DateReported', 'DateIncident'];

  constructor(
    private globals: Globals,
    private route: ActivatedRoute,
    public router: Router,
    private zone: NgZone,
    private dataService: FormsService,
    private location: Location)
  {
    this.form = new Form();
  }

  ngOnInit() {

    this.querySearchName = this.globals.querySearchName;
    this.querySearch = this.globals.querySearch;
    this.resourceLoaded = true;
    this.formSelector = this.route.snapshot.data["formSelector"];
    //STORE PAGE SIZE, PAGING, SORT, AND SEARCH AS GLOBAL VALUES
    this.selectedPageSize = this.globals.selectedPageSize;
    this.selectedPageIndex = this.globals.selectedPageIndex;
    this.selectedSortDirection = this.globals.selectedSortDirection;
    this.selectedSortActive = this.globals.selectedSortActive;

    if (this.selectedPageSize == null) { this.selectedPageSize = 5 }
    if (this.selectedPageIndex == null) { this.selectedPageIndex = 1 }
    if (this.selectedSortDirection == null) { this.selectedSortDirection = "asc" }
    if (this.selectedSortActive == null) { this.selectedSortActive = "CName" }
    if (this.querySearchName == null) { this.querySearchName = "CName" }
    if (this.querySearch == null) { this.querySearch = "" }
    //this.paginator.pageSize = this.selectedPageSize;
   
    this.getForms(this.selectedPageIndex, this.selectedPageSize, this.selectedSortDirection, this.selectedSortActive, this.querySearchName, this.querySearch);
    //console.log("GOT SEARCH NAME AFTER INI - " + this.querySearchName);
    //console.log('INI-----------searchname----->' + this.querySearchName + " index " + this.selectedPageIndex + "_size_" + this.selectedPageSize + " sortdir " + this.selectedSortDirection + " sort active" + this.selectedSortActive);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(
      () => {
        this.paginator.pageIndex = 0;
        this.selectedPageIndex = 1;
        this.selectedSortDirection = this.sort.direction;
        this.selectedSortActive = this.sort.active;
        this.globals.selectedSortDirection = this.sort.direction;
        this.globals.selectedSortActive = this.sort.active;

        this.getForms(this.selectedPageIndex, this.selectedPageSize, this.selectedSortDirection, this.selectedSortActive, this.querySearchName, this.querySearch);
        console.log("SortChange" + this.sort.active + "~" + this.sort.direction );
      }

    );
  }


  getForms(pageNumber: number, pageSize: number, sortOrder: string, columnName: string, querySearchName: string, querySearch: string) {

    this.dataService.findForms(pageNumber, pageSize, sortOrder, columnName, querySearchName, querySearch)
      .subscribe(
        (data: any) => {
          this.dataSource.next(data.body);
          this.totalCount = JSON.parse(data.headers.get('Paging-Headers')).totalCount;
          this.resourceLoaded = false;
          //console.log("GOT DATA" + this.totalCount + "~" + this.selectedPageSize);
        }
      );
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row.fldid);
   ///////////OKAY!! this.router.navigate(['/form/' + row.fldid]);
  }

  public paging(event: PageEvent) {
   
    //this.paginator.pageSize = event.pageSize
    this.selectedPageIndex = event.pageIndex + 1;
    this.globals.selectedPageIndex = this.selectedPageIndex;
    this.selectedPageSize = event.pageSize;
    this.globals.selectedPageSize = event.pageSize;
    //console.log('PAGE INDEX EVENT--------Index-------->' + this.selectedPageIndex + "_size_" + this.globals.selectedPageSize);
    this.getForms(this.selectedPageIndex, this.selectedPageSize, this.selectedSortDirection, this.selectedSortActive, this.querySearchName, this.querySearch);
  }
  // SEARCH BUTTON ACTION
  public searchForms(querySearchName, querySearch) {
    if (querySearchName != null && querySearch != null) {
      //console.log("X"+this.querySearchName + '--------------------------->' + this.querySearch+"X");
      this.querySearchName = querySearchName;
      this.querySearch = querySearch;
      this.globals.querySearchName = querySearchName;
      this.globals.querySearch = querySearch;
      this.paginator.pageIndex = 0;
      this.selectedPageIndex = 1;
      this.globals.selectedPageIndex = this.selectedPageIndex;
    }
    this.getForms(this.selectedPageIndex, this.selectedPageSize, this.selectedSortDirection, this.selectedSortActive, querySearchName, querySearch);

  }
  //RESET PAGING, SORTING, AND QUERY SEARCHES - NOT PAGE SIZE
  public clearSearch() {
    this.querySearchName = "CName";
    this.querySearch = "";
    this.globals.querySearchName = "CName";
    this.globals.querySearch = "";

    this.paginator.pageIndex = 0;
    this.selectedPageIndex = 1;
    this.globals.selectedPageIndex = this.selectedPageIndex;

    this.selectedSortDirection = "asc";
    this.selectedSortActive = "CName";
    this.globals.selectedSortDirection = "asc";
    this.globals.selectedSortActive ="CName";
    this.getForms(1, this.selectedPageSize, this.selectedSortDirection, this.selectedSortActive, this.querySearchName, this.querySearch);
  }                                      
 
}  

