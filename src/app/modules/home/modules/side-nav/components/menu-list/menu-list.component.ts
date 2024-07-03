import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageHelper } from 'src/app/helpers/storage';

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  children?: NavItem[];
  isSubSubmenu?: boolean;
  locationId?: any;
  // disabled:boolean;
}

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  @Input() menu!: NavItem;
  @Input() isExpanded = true;
  @Input() showSubmenu: boolean = true;
  @Input() isSubSubMenu = false;

  isShowing = true;
  showSubSubMenu: boolean = false;
  
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  shouldHighlightButton(text?: string) {
    if(!text) {
      return false;
    }
    if(window.location.href.includes(text)) {
      return true
    }
    return false;
  }


  handleSubMenu(event:Event) {

    if(this.isSubSubMenu) {
      return;
    } 

    this.showSubmenu = !this.showSubmenu
  }
  stopPropagation(event:Event) {
    event.stopPropagation();
    event.preventDefault();
    if(this.menu.isSubSubmenu) {
      this.isExpanded = true;
      this.showSubmenu = true;
      this.isShowing = true;
      return;
    } 
   
  }

  navigateToRoute() {
  
    this.router.navigate([`${this.menu.route}`])
  }

}
