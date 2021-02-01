import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {environment} from '../../environments/environment';
import {StockList} from '../interfaces';

export class HttpStockService {

    constructor(private httpClient: HttpClient) {}
    post(params: StockList): Observable<StockList> {
        return this.httpClient.post<any>(environment.serverName + 'api/list/', params);
    }

    patch(params: StockList): Observable<StockList> {
        return this.httpClient.patch<any>(environment.serverName + 'api/list/', params);
    }
}
