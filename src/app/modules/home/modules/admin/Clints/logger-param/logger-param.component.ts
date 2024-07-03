import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logger-param',
  templateUrl: './logger-param.component.html',
  styleUrls: ['./logger-param.component.scss'],
})
export class LoggerParamComponent implements OnInit {
  keyValuePairs: { key: string; value: any }[] = [];
  Params: boolean | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public values: any,
  private dialogRef: MatDialogRef<any>
  ) {
  }

  ngOnInit() {
    if(this.values.Params == true){
      this.Params = this.values.Params;
    this.iterateObject(this.values.Data.param);
    }
    else{
    this.iterateObject(this.values.Data.activity);
    }
  }

  iterateObject(obj: any) {
    for (var key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.iterateObject(obj[key]);
      } else {
        this.keyValuePairs.push({ key: key, value: obj[key] });
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
