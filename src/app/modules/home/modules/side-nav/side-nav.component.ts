import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavItem } from './components/menu-list/menu-list.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  @Input() menus!:  NavItem[];
  @Input() isExpanded = false;

  isExpandedd:boolean = true;
  showSubmenuu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;


 

  constructor() { }

  ngOnInit(): void {
    
  }
  mouseenter() {
    if (!this.isExpandedd) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpandedd) {
      this.isShowing = false;
    }
  }
  private menuss:Array<any> = ['one','two','three'];
}
