import { HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from './constants';
import { StorageHelper } from './storage';

class ApplicationUrls {
  private static appUrlsInstance: ApplicationUrls;
    serverUrl: string = '';
  public static getInstance(): ApplicationUrls {
    if (!ApplicationUrls.appUrlsInstance) {
      ApplicationUrls.appUrlsInstance = new ApplicationUrls();
      ApplicationUrls.appUrlsInstance.serverUrl = `${SERVER_URL}`;
    }
    return ApplicationUrls.appUrlsInstance;
  }

  public headers() {
    // const userInfo = StorageHelper.userInfo;
    // const headers = {};
    // if (userInfo && userInfo.token) {
    //   // tslint:disable-next-line:no-string-literal
    //   headers['Authorization'] = `TOKEN ${userInfo.token}`;
    // }
    // return new HttpHeaders(headers);
  }

  get signUpUrl() { return this.serverUrl + 'company/signup/'; }
  get loginUpUrl() { return this.serverUrl + 'company/login/'; }
  
}

export let applicationUrls = ApplicationUrls.getInstance();