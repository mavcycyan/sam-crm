import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface StockList {
    sys_name: string;
    name: string;
    price: string;
    stock_count: string;
    sku: string;
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  stockList: StockList[] = []

  ngOnInit() {
    this.httpClient.get<StockList[]>('http://localhost:3500/api/list/')
        .subscribe(items => {
            this.stockList = items;
        });
  }

}
