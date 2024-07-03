import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PublishService } from '../Providers/publish.service';

@Component({
  selector: 'app-publish-strategy-list',
  templateUrl: './publish-strategy-list.component.html',
  styleUrls: ['./publish-strategy-list.component.scss']
})
export class PublishStrategyListComponent  {
  displayColumns: string[] = ['name', 'email', 'time', 'status',];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  parseData: any
  dataSource: any = [];
  showLoader = false;
  filter:any;
  totalLength:any;
    

  constructor(
    private activatedRoute: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private publishService: PublishService,
  ) {
    let data = localStorage.getItem('userinfo')
    if (data) {
      this.parseData = JSON.parse(data);
    }

  }

  ngOnInit(): void {
    this.initializeFilter();
    this.show_List();
  }


   // FILTERS
   initializeFilter() {
    const obj: any = {
      token: this.parseData.token,
      page: 1,
      limit: 15,
      access: 'ACCEPTED'
    }
    this.filter = obj;
  }
  
  // PUBLISHED STRATEGY LIS
  show_List(){

    this.publishService.publishaccessList(this.filter).subscribe((res) => {
      this.showLoader = true;
      this.ngxService.start();
      this.dataSource = res.data.results;
      this.totalLength = res.data.count;
      // console.log(res);
      this.showLoader = false;

    }, error => {
      this.showLoader = false;
    })
    }
   
    //PAGINATION
    pageChange(event: PageEvent) {
      this.filter.page = event.pageIndex + 1;
      this.filter.limit = event.pageSize;
      this.show_List();
    }
  }



