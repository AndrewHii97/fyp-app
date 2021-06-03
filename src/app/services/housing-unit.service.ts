import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from '../interfaces/house';
import { ADDRESS } from  '../config/config';

@Injectable({
  providedIn: 'root'
})
export class HousingUnitService {

  constructor(private httpClient: HttpClient) { 

  }

  public createNewHouse(ownername:string, unitcode: string): Observable<any>{ 
    let url = `${ADDRESS}/house/new`
    let payload = new HttpParams()
      .set('ownername',ownername)
      .set('unitcode',unitcode);
    let option: any = { 
      responseType : 'json'
    }

    return this.httpClient.post<any>(url, payload, option);
  }

  public getHouses(): Observable<House[]>{ 
    let url = `${ADDRESS}/house/list`;
    return this.httpClient.get<House[]>( url);
  }

  public updateHouse(house: House ): Observable<any>{ 
    let url = `${ADDRESS}/house/update`;
    let payload = new HttpParams()
      .set('livingunitid',house.livingunitid)
      .set('ownername',house.ownername)
      .set('unitcode',house.unitcode);

    let option: any ={ 
      responseType: 'json'
    };

    return this.httpClient.post<any>(url, payload, option);
  }

  public deleteHouse(id): Observable<any>{
    let url = `${ADDRESS}/house/delete`;
    let payload = new HttpParams().set('livingunitid',id);
    let option: any ={ 
      responseType: 'json'
    };
    return this.httpClient.post<any>(url, payload, option);

  }


}
