import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WallettierService } from '../provider/wallettier.service';
import { MatDialog } from '@angular/material/dialog';
import { AddWallettireComponent } from '../add-wallettire/add-wallettire.component';

@Component({
  selector: 'app-wallettier-list',
  templateUrl: './wallettier-list.component.html',
  styleUrls: ['./wallettier-list.component.scss']
})

export class WallettierListComponent {

  displayedColumns: string[] = ['name', 'maxAmount', 'minAmount', 'requiredAmount', 'description'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource: any = [];
  showLoader = false;
  parseData: any
  filter:any
  totalLength:any

  constructor(
    private ngxService: NgxUiLoaderService,
    private walletTierService: WallettierService,
    private matDialog: MatDialog,
  ) {
    let data = localStorage.getItem('userinfo')
    if (data) {
      this.parseData = JSON.parse(data);
    }
  }

  ngOnInit(): void {
    this.getWalletList();
  }

  // INITIALIZER FOR WALLET TIER
  initializeFilter() {
    const obj: any = {
      token: this.parseData.token,
      page: 1,
      limit: 15
    }
    this.filter = obj;
  }

  // GET WALLET TIERS LIST
  getWalletList() {
    this.showLoader = true;
    this.ngxService.start();
    this.walletTierService.getWalletTier(this.parseData.token).subscribe((res) => {
      this.dataSource = res.results
      this.totalLength=res.results.length
      this.showLoader = false;
      this.ngxService.stop();
    }, error => {
      this.showLoader = false;
      this.ngxService.stop();
    })
  }

  // ADD NEW WALLET TIER
  addWallettier() {
    this.matDialog.open(AddWallettireComponent, {
      width: "450px",
    }).afterClosed().subscribe((res) => {
      if (res == true) {
        this.getWalletList();
      }
    })
  }

  // UPDATE WALLET TIER
  updateWalletTier(data: any) {
    // console.log("updateWalletTier", data)
    this.matDialog.open(AddWallettireComponent, {
      width: '450px',
      data
    }).afterClosed().subscribe((res) => {
      if (res == true) {
        this.getWalletList();
      }
    })
  }

  pageChange(event: PageEvent) {
  }
}
