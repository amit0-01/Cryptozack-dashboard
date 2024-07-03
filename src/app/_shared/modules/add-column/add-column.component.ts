import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.scss']
})
export class AddColumnComponent implements OnInit {
  // columnList = [{ name: 'Column 1', checked: false }, { name: 'Column 1', checked: false }, { name: 'Column 1', checked: false }]
  constructor(
    private dialogRef: MatDialogRef<AddColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string, checked: boolean, optional: boolean }[]
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  updateColumns() {
    this.dialogRef.close(this.data);
  }

  displayKey(key:string){
   key = `${key[0].toUpperCase()}${key.slice(1)}`;
   if(key == 'PhoneNumber'){
    return "Phone number"
   }else{
     return key.replace(/_/g, " ");
   }
  }

}
