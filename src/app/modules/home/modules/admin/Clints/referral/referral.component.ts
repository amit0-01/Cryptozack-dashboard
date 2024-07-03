import { P } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ClintService } from '../Providers/clint.service';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'joined']
  userId: string | undefined;
  parseData: any;
  dataSource: any;
  showLoader = false;



  constructor(
  private ngxService: NgxUiLoaderService,
  private activatedRoute: ActivatedRoute,
  private clintService: ClintService,
  private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.userId = params['userId']
    });

    let data = localStorage.getItem('userinfo');
    if(data){
      this.parseData = JSON.parse(data);
    }
  }
  ngOnInit(): void {
    this.referral()
  }

  referral(){
    this.showLoader = true;
    this.ngxService.start();
    const token = this.parseData.token;
    const user = this.userId;
    this.clintService.referral(token, user).subscribe((res:any) =>{
    this.dataSource = res.data.referredUsers;
    this.showLoader = false;
    this.ngxService.stop();
    })
  }

  backToUser(){
  this.router.navigate(['admin/client'])
  }

  pageChange(event:any){

  }

}


