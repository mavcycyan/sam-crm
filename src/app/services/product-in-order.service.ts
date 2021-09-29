import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {StockList} from '../interfaces';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductInOrderService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): any {
      return this.httpClient.get<StockList>( environment.serverName + 'api/list/');
  }

  getProduct(id: string): any {
      return this.httpClient.get<StockList>( environment.serverName + 'api/list/' + id );
  }
}
