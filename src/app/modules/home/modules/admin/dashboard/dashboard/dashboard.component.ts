// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
// import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { from } from 'rxjs';
import { DashboardService } from '../Providers/dashboard.service';
import { DateRangeEnum } from '../../Clints/clint/clint.component';
import { DatePipe } from '@angular/common';
import { ClintService } from '../../Clints/Providers/clint.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";
import { coerceStringArray } from '@angular/cdk/coercion';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  showLoader = false
  admin: any
  filter: any
  DateRangeEnum = DateRangeEnum;
  @Input() SelectedDateRange: DateRangeEnum = DateRangeEnum.Last7Days;
  selectedDefaultValue: any = DateRangeEnum.Last30Dayds;
  userData: any
  clientsLength: any
  filterDays: any
  totalProfit: any
  filteredProfit: any
  companyWallet: any
  totalWithrawal: any
  range = new FormGroup({
    from: new FormControl(),
    to: new FormControl()
  })

  series!: ApexAxisChartSeries;
  chart!: ApexChart;
  dataLabels!: ApexDataLabels;
  markers!: ApexMarkers;
  title!: ApexTitleSubtitle;
  fill!: ApexFill;
  yaxis!: ApexYAxis;
  xaxis!: ApexXAxis;
  tooltip!: ApexTooltip;
  dataSeries: any
  companyWalletDetails:any

  constructor(
    private dashService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private clientService: ClintService,
  ) {
    const data: any = localStorage.getItem('userinfo')
    if (data) {
      this.userData = JSON.parse(data)
    }
  }

  ngOnInit() {
    this.initializeFilter();
    this.getData();
    
  }

  async getData(): Promise<void> {
    this.showLoader = true;
    this.ngxService.start();
    await this.getDefaultData();
    await this.getCompanyTotalProfit();
    await this.getcompanyWallet();
    await this.initChartData();
    await this.getWithrawal();
    this.showLoader = false;
    this.ngxService.stop();
  }


  initializeFilter() {
    var start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    var end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    const obj: any = {
      token: this.userData.token,
      pageCount: {
        page: 1,
        limit: Number.MAX_SAFE_INTEGER
      },
      dateRange: {
        from: start.toISOString(),
        to: end.toISOString()
      },
      filter: {
        text: ''
      },
      transactionType: 'COMPANY_PROFIT',
    }
    this.filter = obj;
  }

  // GET ALL USER LIST
  async getUserData() {
    this.showLoader = true;
    this.ngxService.start();
    try {
      const res: any = await this.clientService.getSubscription(this.filter).toPromise();
      this.clientsLength = res.data.results.length;
      this.showLoader = false;
    } catch (error) {
      this.showLoader = false;
    }
  }


  // COMPANY TOTAL PROFIT
  async getCompanyTotalProfit() {
    this.showLoader = true;
    this.ngxService.start();
    try {
      const data = {
        token: this.userData.token,
        transactionType: 'COMPANY_PROFIT',
        pageCount: {
          page: 1,
          limit: Number.MAX_SAFE_INTEGER
        },
      };
      const res = await this.dashService.companyTotalProfit(data).toPromise();
      this.totalProfit = res.totalAmount !== 0 ? res.totalAmount.toFixed(2) : '0';
      this.showLoader = false;
    } catch (error) {
      this.showLoader = false;
    }
  }

  // FILTER COMPANY PROFIT BASES OF DATE
  async getCompanyFilteredProfit() {
    try {
      const res = await this.dashService.companyProfit(this.filter).toPromise();
      this.filteredProfit = res.totalAmount !== 0 ? res.totalAmount.toFixed(2) : '0';
      const groupedByDate = res.results.reduce((acc: any, curr: any) => {
        const date = curr.createdAt.split('T')[0];
        acc[date] = (acc[date] || 0) + curr.usdtAmount;
        return acc;
      }, {});

      const newarray = Object.entries(groupedByDate).map(([createdAt, usdtAmount]) => ({
        createdAt,
        usdtAmount: typeof usdtAmount === 'number' ? usdtAmount.toFixed(2) : '0.00'
      }));

      this.dataSeries = newarray;
    } catch (error) {
    }
  }

  async initChartData(): Promise<void> {
    const dates = this.dataSeries.map((item: any) => {
      return [new Date(item.createdAt).getTime(), parseFloat(item.usdtAmount)];
    });

    this.series = [
      {
        name: "USDT Amount",
        data: dates
      }
    ];

    this.chart = {
      type: "line",
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };

    this.dataLabels = {
      enabled: false
    };

    this.markers = {
      size: 0
    };

    this.title = {
      text: "Company Profit",
      align: "left"
    };

    this.yaxis = {
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      },
      title: {
        text: "USDT Amount"
      }
    };

    this.xaxis = {
      type: "datetime"
    };

    this.tooltip = {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      }
    };
  }

  // async getCompanyWallet() {
  //   try {
  //     const res= await this.dashService.companyWallet().toPromise();
  //     this.companyWalletDetails = res
  //     this.showLoader = false;
  //   } catch {
  //     this.showLoader = false;
  //   }
  // }

  // GET DEFAULT DATA OF LAST 30 DAYS
  async getDefaultData() {
    var obj = {
      value: this.selectedDefaultValue,
    }
    await this.selectionChange(obj);
  }


  // DATE FILTER FROM TO END DATE
  async selectionChange(event: any) {
    const selectedValue = event.value;
    switch (selectedValue) {
      case '30Days':
        this.filterDays = 'last 30 days';
        break;
      case '7Days':
        this.filterDays = 'last 7 days';
        break;
      case 'today':
        this.filterDays = 'today';
        break;
      default:
        this.filterDays = 'custom';
        break;
    }
    if (selectedValue === DateRangeEnum.Last30Dayds) {
      var start = new Date();

      var today = new Date();
      var last30Days = new Date(today.getTime() - (30 * 24 * 3600000));
      last30Days.setUTCHours(23, 59, 59, 999);
      this.filter.dateRange = {
        from: last30Days.toISOString(),
        to: start.toISOString()
      }
      await this.getCompanyFilteredProfit();
      await this.getUserData();
      await this.initChartData();

    } else if (selectedValue === DateRangeEnum.Last7Days) {
      var start = new Date();

      var today = new Date();
      var last7Days = new Date(today.getTime() - (7 * 24 * 3600000));
      last7Days.setUTCHours(23, 59, 59, 999);
      this.filter.dateRange = {
        from: last7Days.toISOString(),
        to: start.toISOString()
      }
      await this.getCompanyFilteredProfit();
      await this.getUserData();
      await this.initChartData();


    } else if (selectedValue === DateRangeEnum.Today) {
      var start = new Date();
      start.setUTCHours(0, 0, 0, 0);
      var end = new Date();
      end.setUTCHours(23, 59, 59, 999);
      this.filter.dateRange = {
        from: start.toISOString(),
        to: end.toISOString()
      }
      await this.getCompanyFilteredProfit();
      await this.getUserData();
      await this.initChartData();
    }
  }


  async dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    if (this.range && this.range.value && this.range.value.to) {
      const to = this.range.value.to || new Date(dateRangeStart.value);
      const from = this.range.value.from || new Date(dateRangeEnd.value);
      from.setUTCHours(23, 59, 59, 999);
      this.filter.dateRange = {
        from: new Date(from).toISOString(),
        to: new Date(to).toISOString()
      }
      this.showLoader = true;
      this.ngxService.start();
      await this.getUserData();
      await this.getCompanyFilteredProfit();
      await this.initChartData();
      this.showLoader = false;
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


    // COMPANY WALLET
    
  async getcompanyWallet(){
    const token = this.userData.token;
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjU3MzU1LCJlbnYiOiJsaXZlIiwiaWF0IjoxNjA0MzEyODM0fQ.AzwDh768OtDJqcXb58YcZUoOJOUlQmk1LEFSr5wYQ2u';
    try {
      const res: any = await this.dashService.companyWallet(token).toPromise();
      this.companyWallet = res.usdtAmount;
    } catch (error) {
    }
  }

 // COMPANY WITHRAWAL
 async getWithrawal(){
  this.showLoader = true;
  this.ngxService.start();
  try{
    const data = {
      token: this.userData.token,
      transactionType: 'WITHDRAWAL',
      pageCount:{
        page: 1,
        limit: 10
      },
    };
    const res = await this.dashService.withrawal(data).toPromise();
    this.totalWithrawal = res.totalAmount

  }
  catch(error){
    this.showLoader = false;
  }
}


}



