import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { map } from 'rxjs';
import { CRYPTO_URL } from 'src/app/helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  constructor(
    private http: HttpClient
  ) { }


  // GET ALL WITHDRAWAL REQUESTS
  getWithdrawalRequests(data: any) {

    const url = `${CRYPTO_URL.LIVE_URL}/wallet/get-withdrawal-request`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${data.token}`
    });

    const params = new HttpParams()
      .set('page', data.page)
      .set('limit', data.limit);

    return this.http.get(url, { headers, params })
      .pipe(map((res: any) => {
        return res.data
      }),
      );
  }

  approveRequest(data:any){
    const obj = {
      requestId: data
    };
    const url = `${CRYPTO_URL.LIVE_URL}/wallet/withdrawal-amount`;
    return this.http.post(url, obj)
    .pipe(map(res =>{
      return res;
    }))
    ;
  }

  

}
