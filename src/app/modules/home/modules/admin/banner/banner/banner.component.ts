// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { BannerService } from '../Providers/banner.service';

// @Component({
//   selector: 'app-banner',
//   templateUrl: './banner.component.html',
//   styleUrls: ['./banner.component.scss'],
// })
// export class BannerComponent implements OnInit {
//   form: FormGroup = new FormGroup({
//     imageLink : new FormControl('', [Validators.required]),
//     text: new FormControl('', Validators.required),
//     link: new FormControl('',)
//   })
//   data: any[] = [];
//   showLoader: Boolean = false
//   file: File | null = null;
//   constructor(
//     private bannerService: BannerService, 
//     private fb: FormBuilder,
//     private ngxService: NgxUiLoaderService) {
//     // this.form = this.fb.group({
//     //   imageLink: [''],
//     //   text: [''],
//     //   link: [''],
//     // });
//   }
//   ngOnInit(): void {
//     this.getBanner();
//   }

//   getBanner(): void {
//     this.showLoader = true;
//     this.ngxService.start();
//     this.bannerService.getbanner().subscribe(
//       (res: any) => {
//         this.data = res.data.results;
//         this.showLoader = false;
//         this.ngxService.stop();
//       },
//       (error: any) => {
//         this.showLoader = false;
//         console.error('Error fetching banner:', error);
//       }
//     );
//   }

//   uploadBanner() {
//     // console.log(this.form.value)
//     if (this.form.valid) {
//     this.bannerService.upload(this.form.value).subscribe(
//         (res: any) => {
//           console.log(res);
//           this.form.reset({
//             imageLink: '',
//             text: '',
//             link: '',
//           });
//           this.getBanner();
//         },
//         (error: any) => {
//           console.error('Error uploading banner:', error);
//         }
//       );
//     }
//   }

//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.file = file;
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BannerService } from '../Providers/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  form: FormGroup = new FormGroup({
        text: new FormControl('', Validators.required),
        link: new FormControl('',)
      })
  data: any[] = [];  
  file:any;
  showLoader: boolean = false
  base64Image: string | null = null;

  constructor(private bannerService: BannerService, private fb: FormBuilder) { 
    // this.form = this.fb.group({
    //   imageLink: [''],
    //   text: [''],
    //   link: ['']
    // });
  }

  ngOnInit(): void {
    this.getBanner();
  }

  getBanner(): void {
    this.bannerService.getbanner().subscribe(
      (res: any) => {
        this.data = res.data.results; 
        console.log(this.data);  
      },
      (error: any) => {
        console.error('Error fetching banner:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Image = reader.result as string;
      };
      reader.onerror = error => {
        console.error('Error: ', error);
      };
    }
  }


  upload(): void {
    if (this.form.valid && this.base64Image) {
      const formData = {
        image: this.base64Image,
        text: this.form.get('text')?.value,
        link: this.form.get('link')?.value
      };

      this.bannerService.upload(formData).subscribe(
        (res: any) => {
          console.log(res);
          this.form.reset();
          this.file = null;
          this.base64Image = null;
          this.getBanner();
        },
        (error: any) => {
          console.error('Error uploading banner:', error);
        }
      );
    } else {
      console.error('Form is invalid or no file selected');
    }
  }
}
