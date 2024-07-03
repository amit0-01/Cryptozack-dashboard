import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CRYPTO_URL } from 'src/app/helpers/constants';

@Injectable({
  providedIn: 'root'
})

export class StrategyService {

  constructor(
    private http: HttpClient
  ) { }

// ALL BOTS LIST
  allBots(data: any) {
    const userUrl = `${CRYPTO_URL.LIVE_URL}/algo-strategy/runtime-bots`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${data.token}`
    });
    let params = new HttpParams()
      .set('userId', data.userId)
      .set('page', data.pageCount.page)
      .set('limit', data.pageCount.limit)

    if (data.botStatus) {
      params = params.set('botStatus', data.botStatus);
    }

    return this.http.get(userUrl, { headers, params })
      .pipe(map((res: any) => {
        return res.data
      }),
      );
  }

  // ACTIVE BOTS LIST
  activeBots(data: any) {
    const userUrl = `${CRYPTO_URL.LIVE_URL}/algo-strategy/runtime-bots`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${data.token}`
    });
    let params = new HttpParams()
      .set('userId', data.userId)
      .set('page', data.pageCount.page)
      .set('limit', data.pageCount.limit)

    if (data.botStatus) {
      params = params.set('botStatus', data.botStatus);
    }

    return this.http.get(userUrl, { headers, params })
      .pipe(map((res: any) => {
        return res.data
      }),
      );
  }


    // STRATEGY TRANSACTION LIST
    strategyTransaction(data: any) {
      const userUrl = `${CRYPTO_URL.LIVE_URL}/wallet/get-strategy-trade`
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${data.token}`
      });
      let params = new HttpParams()
        .set('userId', data.userId)
        .set('id', data.botId)
        // console.log("1", data);


  
      return this.http.get(userUrl, { headers, params })
        .pipe(map((res: any) => {
          return res
        }),
        );
    }
     
    // PUBLISH ACCESS

    publishAccess(data: any) {
      const userUrl = `${CRYPTO_URL.LIVE_URL}/algo-strategy/publish-strategy-access`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${data.token}`
      });
      const obj= {
        user: data.userId,
        strategyId: data.botId,
        copyStrategyAccess: data.copyStrategyAccess
      }       
    
      return this.http.post(userUrl,obj ,{ headers }) 
        .pipe(map((res: any) => {
          // console.log(res);
            return res.data;
          })
        );
    }

  //TODAY PROFIT

    todayProfit(data: any) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${data.token}`
      });
      const params = new HttpParams()
        .set('userId', data.userId).set('page', data.page).set('limit', data.limit).set('transactionType', data.transactionType)
        .set('fromDate', data.dateRange.from).set('toDate', data.dateRange.to);
      const url = `${CRYPTO_URL.LIVE_URL}/wallet/get-transaction`;
  
      return this.http.get(url, { headers, params })
        .pipe(map((res: any) => {
          return res.data
        }),
        );
    }


}
