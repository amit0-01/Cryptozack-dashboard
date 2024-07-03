import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CRYPTO_URL } from 'src/app/helpers/constants';
@Injectable({
  providedIn: 'root'
})
export class PublishService {

  constructor(
    private http: HttpClient

  ) { }
  // GET ALL DATA
  publish(data: any){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${data.token}`
      });
     const params = new HttpParams()
     .set('page', data.page)
     .set('limit', data.limit)
     .set('access', data.access)
  const url = `${CRYPTO_URL.LIVE_URL}/algo-strategy/list-publish-strategy-request`;

  return this.http.get(url, {headers, params} )
  .pipe(map((res: any) =>{

    return res;
  }),
  );
}

// GET PUBLISH
publishAccess(data: any) {
  const userUrl = `${CRYPTO_URL.LIVE_URL}/algo-strategy/publish-strategy-access`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${data.token}`
  });

  const obj= {
    id: data.userId,
    access: data.access
  }       
  // console.log(obj);


  return this.http.post(userUrl,obj ,{ headers }) 
    .pipe(map((res: any) => {
        return res.data;
      })
    );
}

//PUBLISHD REQUEST LIST

publishaccessList(data:any){
  const url = `${CRYPTO_URL.LIVE_URL}/algo-strategy/list-publish-strategy-request`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${data.token}`
  });
 const params = new HttpParams()
 .set('page', data.page)
 .set('limit', data.limit)
 .set('access', data.access)
return this.http.get(url, {headers, params} )
.pipe(map((res: any) =>{

return res
}),
);
}

// UNPUBLISH

unpublish(data:any){
  const userUrl = `${CRYPTO_URL.LIVE_URL}/algo-strategy/publish-strategy-access`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${data.token}`
  });

  const obj= {
    id: data.userId,
    access: data.access
  }       
  // console.log(obj);


  return this.http.post(userUrl,obj ,{ headers }) 
    .pipe(map((res: any) => {
        return res.data;
      })
    );

    }
}
