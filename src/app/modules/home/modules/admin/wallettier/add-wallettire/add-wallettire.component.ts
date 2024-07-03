import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WallettierService } from '../provider/wallettier.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-wallettire',
  templateUrl: './add-wallettire.component.html',
  styleUrls: ['./add-wallettire.component.scss']
})
export class AddWallettireComponent {
  showLoader: any
  controls: any

  walletTierForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    maxAmount: new FormControl('', Validators.required),
    minAmount: new FormControl('', Validators.required),
    requiredAmount: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(
    private walletTierService: WallettierService,
    private dialogRef: MatDialogRef<AddWallettireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log("comming data", data)
    this.controls = this.walletTierForm.controls;
  }

  // CREATE NEW WALLET TIER
  addWalletTier() {
    this.walletTierService.createWalletTier(this.walletTierForm.value).subscribe((res) => {
      // console.log("addWalletTier addWalletTier", res)
      if (res) {
        this.dialogRef.close(true);
      }
    })
  }

  // UPDATE WALLET TIER 
  updateWalletTier() {
    const walletTierId = this.data.id
    // console.log("walletTierForm walletTierForm", walletTierId)
    this.walletTierService.updateWalletTier(this.walletTierForm.value).subscribe((res) => {
      // console.log("addWalletTier addWalletTier", res)
      if (res) {
        this.dialogRef.close(true);
      }
    })
  }


}
