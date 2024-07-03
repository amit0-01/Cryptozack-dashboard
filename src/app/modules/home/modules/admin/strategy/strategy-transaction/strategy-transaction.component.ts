import { Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StrategyService } from '../provider/strategy.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-strategy-transaction',
  templateUrl: './strategy-transaction.component.html',
  styleUrls: ['./strategy-transaction.component.scss']
})
export class StrategyTransactionComponent {
  displayedColumns: string[] = ['amount', 'time'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource: any = [];
  showLoader = false;
  parseData: any
  filter: any
  totalLength: any
  userId: any
  routeResult: any
  totalTransaction:any


  constructor(
    private ngxService: NgxUiLoaderService,
    private activatedRoute: ActivatedRoute,
    private strategyService: StrategyService,
    private navigateRouter: Router,
    @Inject(MAT_DIALOG_DATA) public values:any
  ) {
    let data = localStorage.getItem('userinfo')
    if (data) {
      this.parseData = JSON.parse(data);
    }

  }


  ngOnInit(): void {
    this.getTransactionDetails();
  }

   
  getTransactionDetails() {
    this.showLoader = true;
    this.ngxService.start();
    const obj: any = {
      token: this.parseData.token,
      userId: this.values.userId,
      botId: this.values.botId
    }

    this.strategyService.strategyTransaction(obj).subscribe((res) => {
      this.dataSource = res.data.transaction
      this.paginator = res.data.transaction.length

      let totalUsdtAmount = 0;  
      for (const item of res.data.transaction) {
        totalUsdtAmount += item.usdtAmount || 0;
        
      }
      this.totalTransaction= totalUsdtAmount.toFixed(2)
      this.showLoader = false;
    })

  }

  pageChange(event: PageEvent) {
    this.filter.pageCount.page = event.pageIndex + 1;
    this.filter.pageCount.limit = event.pageSize;
    // this.getUserData();
  }




}
