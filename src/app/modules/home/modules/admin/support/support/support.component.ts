import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TitleStrategy } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SupportService } from '../Providers/support.service';
import { ReplyComponent } from '../reply/reply.component'

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {

  displayedColumns: string[] = ['name', 'email', 'ticket', 'title', 'status', 'time', 'message', 'reply'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource: any = [];
  showLoader = false;
  parseData: any;
  newTicketIssue: string = '';
  Replies: any;
  filter: any;
  totalLength: any;

  constructor(
    private supportService: SupportService,
    private ngxService: NgxUiLoaderService,
    private matdialog: MatDialog
  ) {
    let userData = localStorage.getItem('userinfo')
    if (userData) {
      this.parseData = JSON.parse(userData);
    }
  }

  ngOnInit(): void {
    this.initializeFilter();
    this.getData();
  }

  async getData(): Promise<void> {
    await this.getSupport();
  }


  // ininitaliser 
  initializeFilter() {
    const obj: any = {
      token: this.parseData.token,
      page: 1,
      limit: 15,
    }
    this.filter = obj;
  }

  //SUPPORT LIST
  async getSupport() {
    this.showLoader = true;
    this.ngxService.start();
    try {
      const res = await this.supportService.getsupportData(this.filter).toPromise();
      this.dataSource = res.data.results;
      this.Replies = res.data.results[0].issue[0];
      this.totalLength = res.data.count;
      this.showLoader = false;
    } catch (error) {
      this.showLoader = false;
    }
  }

  // PAGINATION

  pageChange(event: PageEvent) {
    this.filter.page = event.pageIndex + 1;
    this.filter.limit = event.pageSize;
    this.getSupport();
  }

  // REPLY
  reply(element: any) {
    this.matdialog.open(ReplyComponent, {
      width: '450px',
      data: element
    })
  }


}
