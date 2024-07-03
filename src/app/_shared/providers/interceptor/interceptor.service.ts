
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageHelper } from 'src/app/helpers/storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(
    private route: Router,
    private toastr: ToastrService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = StorageHelper.userInfo && StorageHelper.userInfo.token;
    let newHeaders: any = {};
    if (token && !request.headers.get('Authorization')) {
      newHeaders['Authorization'] = `Bearer ${token}`;
    }

    request = request.clone({
      setHeaders: newHeaders
    });

    const errorHandler = catchError((error, _) => {

      let errorMsg = 'Something went wrong';

      if (error.status === 0) {
        errorMsg = 'Connectivity Error! Please try again after ensuring Internet Connectivity.';
      } else if (error.status === 401) {
        if (error.error) {
          errorMsg = error.error.msg || error.error.error || error.error;
        } else {
          errorMsg = 'Invalid Authorization';
        }

        // Ask user to Re-login
        // this.logoutUser();
        // StorageHelper.clear();
        // this.eventService.publish(EVENTS.LOG_OUT, 'logout');
        // this.router.navigate(['/sto/auth/login']);
        this.logOut();

      } else if (error.status === 403) {

      } else if (error.status === 500) {
        errorMsg = 'Server Error! Something\'s wrong.';
      } else {
        // handle other cases
      }
      if (errorMsg) {
        this.toastr.error(errorMsg, '');
        // this.toastr.toastrConfig.preventDuplicates = false;
      }
      return throwError(error);
    }) as any;

    const successHandler = map<any, any>(res => {
      return res;
    });

    return next.handle(request).pipe(successHandler, errorHandler) as Observable<HttpEvent<any>>;
  }


  logOut() {
    // this.eventService.publish(CustomEvents.RefreshData);
    // this.route.navigate(['auth']);
  }


}
