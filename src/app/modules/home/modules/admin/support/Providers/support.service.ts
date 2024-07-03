import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CRYPTO_URL } from 'src/app/helpers/constants';
@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(
    private http: HttpClient
  ) { }


  // GET LIST 
  getsupportData(data: any) {
    const url = `${CRYPTO_URL.LIVE_URL}/user-account/list-support`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${data.token}`
    });
    const params = new HttpParams()
      .set('page', data.page)
      .set('limit', data.limit)
    return this.http.get(url, { headers, params })
      .pipe(map((res: any) => {
        return res;
      }),
      );
  }

  // GET USER SUPPORT DATA
  getsupportUserData(data: any) {
    const url = `${CRYPTO_URL.LIVE_URL}/user-account/support-byId`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${data.token}`
    });
    const params = new HttpParams()
      .set('supportId', data.supportId)

    return this.http.get(url, { headers, params })
      .pipe(map((res: any) => {
        return res;
      }),
      );
  }


  // POST REPLY
  replyToUser(data: any) {
    const url = `${CRYPTO_URL.LIVE_URL}/user-account/support-reply`;
    return this.http.post(url, data);
  }
}
