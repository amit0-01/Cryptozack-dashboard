import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-strategy-details',
  templateUrl: './strategy-details.component.html',
  styleUrls: ['./strategy-details.component.scss']
})

export class StrategyDetailsComponent implements OnInit {
  displayedColumns: string[] = ['buyThreshold', 'initialInvestment', 'lotMultiplier', 'maxPositions', 'profitThreshold'];
  dataSource: any;
  keyValuePairs: { key: string; value: any }[] = [];

  constructor(
    public dialogRef: MatDialogRef<StrategyDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public values :any
  ){    
  }
  ngOnInit(): void {
    this.iterateObject(this.values.strategy.parameters)    
  }

  iterateObject(obj:any){
    for (var key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !=null ) {
        this.iterateObject(obj[key]);
      } else {
        this.keyValuePairs.push({ key: key, value: obj[key] });
      }
    }
    
  }    
  close(){
    this.dialogRef.close()
  }
  

  
  

}
