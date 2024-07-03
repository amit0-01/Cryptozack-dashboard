import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { StrategyService } from '../provider/strategy.service';
import { MatDialog } from '@angular/material/dialog';
import { StrategyTransactionComponent } from '../strategy-transaction/strategy-transaction.component';
import { AlertComponent } from 'src/app/_shared/modules/alert/alert.component';
import { ThisReceiver } from '@angular/compiler';

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
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.scss']
})


export class StrategyListComponent implements OnInit {
  displayedColumns: string[] = [ 'profit', 'status', 'signupDate', 'action', ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource: any = [];
  showLoader = false
  parseData: any
  filter: any
  DateRangeEnum = DateRangeEnum;
  @Input() SelectedDateRange: DateRangeEnum = DateRangeEnum.Last7Days;
  selectedDefaultValue: any = DateRangeEnum.Last30Dayds;
  totalLength: any
  userId: any
  userName: any
  status: any
  totalProfit: any
  todayProfit: any
  //DEFAULT VALUE
  DefaultValue = ' TRADE_PROFIT'
  todayfilter:any;
  totalUsdtAmount:any 

  range = new FormGroup({
    from: new FormControl(),
    to: new FormControl()
  })

  constructor(
    private router: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private navigateRouter: Router,
    private strategyService: StrategyService,
    private matDialog: MatDialog,

  ) {
    this.router.queryParams.subscribe(res => {
      if (res['userId']) {
        this.userId = res['userId']
        this.userName = res['user']
        this.status = res['status']
      }
    });

    let data = localStorage.getItem('userinfo')
    if (data) {
      this.parseData = JSON.parse(data);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.allBotsList();
    this.initializeFilter();
    this.getDefaultData();
    this.initializeFilterTodayProfit();
    this.todayTransaction();

  }

  initializeFilter() {
    var start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    var end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    const obj: any = {
      token: this.parseData.token,
      pageCount: {
        page: 1,
        limit: 5
      },
      dateRange: {
        from: start.toISOString(),
        to: end.toISOString()
      },
      filter: {
        text: ''
      },
      userId: this.userId,
    }
    if (this.status == 'Active') {
      obj.botStatus = 'active'
    }
    this.filter = obj;
  }

  // GET DEFAULT DATA OF LAST 30 DAYS
  getDefaultData() {
    var obj = {
      value: this.selectedDefaultValue,
    }
    this.selectionChange(obj);
  }

  // GET ACTIVE STRATEGY LISTS
  strategyLists() {
    this.showLoader = true;
    this.ngxService.start();
    this.strategyService.activeBots(this.filter).subscribe((res: any) => {
      // console.log("strategyLists strategyLists",res.results)
    // this.strategyService.activeBots(this.filter).subscribe((res: any) => {
    //   console.log("strategyLists strategyLists", res.results);
    //   this.botId = res.results.map((result: { botId: any }) => result.botId);
    //   this.publishAccess= res.results.map((result: { 
    //     botConfiguration: any }) => result.
    //     botConfiguration.publishAccess
    //     );
      // console.log(this.publishAccess);
      // console.log('real id', this.botId);
      this.dataSource = res.results
      this.totalLength = res.count;
      this.showLoader = false;
    }, error => {
      this.showLoader = false;
    })
  }

  // CHANGE VALUE IN TWO DIGITS
  formetValues(data: any) {
    return data = data !== 0 ? data.toFixed(2) : '0'
  }

  // BACK NAVIGATE TO USER LISTS
  backToUser() {
    this.navigateRouter.navigate(['/admin/client'])
  }

  // DATE FILTER FROM TO END DATE
  selectionChange(event: any) {
    const selectedValue = event.value;
    if (selectedValue === DateRangeEnum.Last30Dayds) {
      var start = new Date();

      var today = new Date();
      var last30Days = new Date(today.getTime() - (30 * 24 * 3600000));
      last30Days.setUTCHours(23, 59, 59, 999);
      this.filter.dateRange = {
        from: last30Days.toISOString(),
        to: start.toISOString()
      }
      this.strategyLists()
    } else if (selectedValue === DateRangeEnum.Last7Days) {
      var start = new Date();

      var today = new Date();
      var last7Days = new Date(today.getTime() - (7 * 24 * 3600000));
      last7Days.setUTCHours(23, 59, 59, 999);
      this.filter.dateRange = {
        from: last7Days.toISOString(),
        to: start.toISOString()
      }
      this.strategyLists();
    } else if (selectedValue === DateRangeEnum.Today) {
      var start = new Date();
      start.setUTCHours(0, 0, 0, 0);
      var end = new Date();
      end.setUTCHours(23, 59, 59, 999);
      this.filter.dateRange = {
        from: start.toISOString(),
        to: end.toISOString()
      }
      this.strategyLists();
    }
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    if (this.range && this.range.value && this.range.value.to) {
      const to = this.range.value.to || new Date(dateRangeStart.value);
      const from = this.range.value.from || new Date(dateRangeEnd.value);
      from.setUTCHours(23, 59, 59, 999);
      this.filter.dateRange = {
        from: new Date(from).toISOString(),
        to: new Date(to).toISOString()
      }
      this.strategyLists();
    }
  }

  getCustomOptiontext() {
    if (this.range && this.range.value && (this.range.value.to || this.range.value.from)) {
      let to = this.range.value.to || new Date();
      let from = this.range.value.from || new Date();
      to = new DatePipe('en-US').transform(to, 'longDate');
      from = new DatePipe('en-US').transform(from, 'longDate');
      return `${from} - ${to}`;
    }
    return 'Custom';
  }

  pageChange(event: PageEvent) {
    this.filter.pageCount.page = event.pageIndex + 1;
    this.filter.pageCount.limit = event.pageSize;
    this.strategyLists();
  }


  // GET ALL BOTS LISTS
  async allBotsList() {
    const obj: any = {
      token: this.parseData.token,
      pageCount: {
        page: 1,
        limit: Number.MAX_SAFE_INTEGER
      },
      filter: {
        text: ''
      },
      userId: this.userId,
    }

    if (this.status == 'Active') {
      obj.botStatus = 'active'
    }

    try {
      const res = await this.strategyService.allBots(obj).toPromise();
      let totalUsdtAmount = 0;
      for (const item of res.results) {
        totalUsdtAmount += item.currentProfit || 0;
      }
      this.totalProfit = totalUsdtAmount !== 0 ? totalUsdtAmount.toFixed(2) : '0'
    } catch {
    }
  }


  strategyTransaction(data:any){
    this.matDialog.open(StrategyTransactionComponent,{
      width:"700px",
      data:{
        userId:this.userId,
        user:this.userName,
        botId:data,
        status:this.status
      }
    })
    
    // this.navigateRouter.navigate(["admin/strategy/str_transaction"], { queryParams: { userId: this.userId, botId:data,user:this.userName,status:this.status } });
  }

  publish(ele:any) {
    // console.log(this.userId);

    this.matDialog.open(AlertComponent, {
      width: "300px",
      maxHeight: '400px',
    }).afterClosed().subscribe((res)=>{
      if(res){
      this._publish(ele);
      }
    });
   
  
  }

  _publish(ele:any){
    // console.log(ele);
    ele.botConfiguration.publishAccess = !ele.botConfiguration.publishAccess;
    const userId = this.userId;
    const botId = ele.botId;
    // const publish = ele.botConfiguration.isPublish;
    const publish = ele.botConfiguration.publishAccess;
    const obj: any = {
      token: this.parseData.token,
      userId: userId,
      botId: botId,
      copyStrategyAccess: "ACCEPTED"
  
    };
    // console.log(obj);
  
 
        this.strategyService.publishAccess(obj).subscribe((res:any) =>{
          // console.log(res);
        })
  }


//  TODAY PROFIT

  initializeFilterTodayProfit() {
    var start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    var end = new Date();
    end.setUTCHours(23, 59, 59, 999);
  
    const dateRange: any = {
      from: start.toISOString(),
      to: end.toISOString()
    };
  
    const obj: any = {
      token: this.parseData.token,
      userId: this.userId,
      transactionType: 'TRADE_PROFIT',
      page: 1,
      limit: Number.MAX_SAFE_INTEGER,
      dateRange: dateRange
    };
  
    this.todayfilter = obj;
  }
  

  


  async todayTransaction() {
    // console.log(this.todayfilter);
    try {
      const res = await this.strategyService.todayProfit(this.todayfilter).toPromise();
      let total = 0;
      res.results.forEach((result:any)=>{
          total = total + result.usdtAmount;
          
      })
      // console.log(total);
      this.todayProfit = total !==0 ? total.toFixed(2) : '0'
    }
    catch {
    }
  }




  }


