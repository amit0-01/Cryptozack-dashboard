import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {
  @Input() count: number = 0;
  @Input() title: string = 'Total Vizitor';
  @Input() icon: string = 'email';
  @Input() themeColor = '';
  @Input() IconColor = '';
  constructor() { }

  ngOnInit(): void {
  }

}
