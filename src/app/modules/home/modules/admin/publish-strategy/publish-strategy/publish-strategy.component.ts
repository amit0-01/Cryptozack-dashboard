import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertComponent } from 'src/app/_shared/modules/alert/alert.component';
import { PublishService } from '../Providers/publish.service';
import { PublishStrategyListComponent } from '../publish-strategy-list/publish-strategy-list.component';
import { StrategyDetailsComponent } from '../strategy-details/strategy-details.component';


@Component({
  selector: 'app-publish-strategy',
  templateUrl: './publish-strategy.component.html',
  styleUrls: ['./publish-strategy.component.scss']
})
export class PublishStrategyComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'time', 'roi', 'profit', 'status', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource: any = [];
  showLoader = false;
  parseData: any;
  filter: any;
  totalLength: any;

  constructor(
    private PublishService: PublishService,
    private ngxService: NgxUiLoaderService,
    private matDialog: MatDialog
  ) {

    let userData = localStorage.getItem('userinfo')
    if (userData) {
      this.parseData = JSON.parse(userData);
    }
  }

  ngOnInit(): void {
    this.initializeFilter();
    this.publishStrategyList();
  }

  // ininitaliser 
  initializeFilter() {
    const obj: any = {
      token: this.parseData.token,
      page: 1,
      limit: 15,
      access: 'PENDING'
    }
    this.filter = obj;
  }
  //GET LIST

  async publishStrategyList() {
    this.showLoader = true;
    this.ngxService.start();
    try {
      const res = await this.PublishService.publish(this.filter).toPromise();
      // console.log(res);
      this.totalLength = res.data.count;
      this.dataSource = res.data.results
      this.showLoader = false;
    } catch (error) {
      this.showLoader = false;
    }
  }

  //  PAGINATION
  pageChange(event: PageEvent) {
    this.filter.page = event.pageIndex + 1;
    this.filter.limit = event.pageSize;
    this.publishStrategyList();
  }

  // PUBLISH ACCESS
  publish(ele: any) {
    this.matDialog.open(AlertComponent, {
      width: "300px",
      maxHeight: '400px',
    }).afterClosed().subscribe((res) => {
      if (res == true) {
        this._publish(ele);
      }
    });
  }

  _publish(ele: any) {
    this.showLoader = true;
    this.ngxService.start();
    const obj: any = {
      token: this.parseData.token,
      userId: ele.id,
      access: "ACCEPTED"
    };

    this.PublishService.publishAccess(obj)
      .subscribe((res: any) => {
        if (res) {
          this.initializeFilter();
          this.publishStrategyList();
        }
      },error=>{
        this.showLoader = false;
        this.ngxService.stop()
      })
  };


  // PUBLISH REJECTED

  unpublish(ele: any) {
    this.matDialog.open(AlertComponent, {
      width: "300px",
      maxHeight: '400px',
    }).afterClosed().subscribe((res) => {
      if (res == true) {
        this._unpublish(ele);
      }
    });
  }

  _unpublish(element:any) {
    this.showLoader = true;
    this.ngxService.start();
    const obj:any= {
     token: this.parseData.token,
     userId: element.id,
     access: "REJECTED"
    };

    this.PublishService.unpublish(obj)
    .subscribe((res: any) =>{
      if (res) {
        this.initializeFilter();
        this.publishStrategyList();
      }
      this.showLoader = false;
      this.ngxService.stop();
    },
    (error:any)=>{
      this.showLoader = false;
    })
  };

  // Publish List

  showList() {
    this.matDialog.open(PublishStrategyListComponent, {
      width: '800px',
      maxHeight: '600px'
    });
  }
  

  strategyDetails(element: any) {
    // console.log(element);
    
    this.matDialog.open(StrategyDetailsComponent, {
      width:'500px',
      maxHeight: '500px',
      data: element
      //  {
      //   buyThreshold: element.strategy.parameters.buyThreshold,
      //   initialInvestment: element.strategy.parameters.initialInvestment,
      //   lotMultiplier: element.strategy.parameters.lotMultiplier,
      //   maxPositions: element.strategy.parameters.maxPositions,
      //   profitThreshold: element.strategy.parameters.profitThreshold,
      // }
    })

  }
}
