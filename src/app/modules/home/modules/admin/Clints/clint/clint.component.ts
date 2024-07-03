import { END } from '@angular/cdk/keycodes';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ClintService } from '../Providers/clint.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoggerComponent } from '../logger/logger.component';
import { MatDialog } from '@angular/material/dialog';

export enum DateRangeEnum {
  Last30Dayds = '30Days',
  Last7Days = '7Days',
  Today = 'today',
  Custom = 'custom',
  Next7Days = "Next7Days",
  Next30Days = "Next30Days",
  LastNext30Days = "LastNext30Days"
}

@Component({
  selector: 'app-clint',
  templateUrl: './clint.component.html',
  styleUrls: ['./clint.component.scss']
})


export class ClintComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'strategy', 'signupDate', 'referral','logger', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource: any = [];
  showLoader = false;
  parseData: any
  filter: any
  DateRangeEnum = DateRangeEnum;
  @Input() SelectedDateRange: DateRangeEnum = DateRangeEnum.Last7Days;
  selectedDefaultValue: any = DateRangeEnum.Last30Dayds;
  totalLength: any

  range = new FormGroup({
    from: new FormControl(),
    to: new FormControl()
  })

  constructor(
    private clientService: ClintService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private matDialog: MatDialog,
  ) {
    let data = localStorage.getItem('userinfo')
    if (data) {
      this.parseData = JSON.parse(data);
    }
  }


  ngOnInit(): void {
    this.initializeFilter();
    this.getUserData();
    
  }


  initializeFilter() {
    const obj: any = {
      token: this.parseData.token,
      pageCount: {
        page: 1,
        limit: 15
      },
      filter: {
        text: ''
      }
    }
    this.filter = obj;
  }

  // GET ALL USER LIST
  getUserData() {
    this.showLoader = true;
    this.ngxService.start();
    this.clientService.getUsers(this.filter).subscribe((res: any) => {
      // console.log("getUserData getUserData",res)
      this.dataSource = res.data.results
      this.totalLength = res.data.totalCount;
      this.showLoader = false;
      this.ngxService.stop();
    }, error => {
      this.showLoader = false;
      this.ngxService.stop();
    })
  }

  // GET USER WALLET DETAIL
  walletDetails(data: any) {
    this.router.navigate(["admin/userWallet"], { queryParams: { userId: data.id } });
  }


  pageChange(event: PageEvent) {
    this.filter.pageCount.page = event.pageIndex + 1;
    this.filter.pageCount.limit = event.pageSize;
    this.getUserData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.filter = {
      text: filterValue,
    }
    if (this.filter.filter.text.length >= 2) {
      this.getUserData();
    } else if (this.filter.filter.text.length <= 0) {
      this.filter.filter = {
        text: ''
      }
      this.filter.pageCount = {
        page: 1,
        limit:15
      }
      this.getUserData()
    }
  }


  // ACTIVE STRATEGY
  goToActiveStrategy(data: any) {
    if (data.activeBot > 0) {
      const user = `${data.firstName} ${data.lastName}`.trim();
      const status = 'Active'
      this.router.navigate(["admin/strategy"], { queryParams: { userId: data.id, user: user, status: status } });
    } else {
      alert('Strategy Not Active')
    }
  }

  // ALL STRATEGY
  goToInActiveStrategy(data: any) {
    if (data.inActiveBot + data.activeBot > 0) {
      const status = 'All'
      const user = `${data.firstName} ${data.lastName}`.trim();
      this.router.navigate(["admin/strategy"], { queryParams: { userId: data.id, user: user, status: status } });
    } else {
      alert('Strategy Not Found')
    }
  }

  getLogger(element: any) {
    const userId = element.id;
    this.router.navigate(['admin/client/logger'], { queryParams: { userId: userId } });
}

referral(data:any){
  const userId = data.id;  
  this.router.navigate(['admin/client/referral'], {queryParams: {userId: userId}});
  
}


}

