import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductInOrderService} from "../../../services/product-in-order.service";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.sass']
})
export class ListProductsComponent implements OnInit {

  @Input() relItms = [];

  @Output() changeItemList = new EventEmitter<any>();

  constructor(private pioService: ProductInOrderService) { }

  ngOnInit() {
      setTimeout(() => {
          if (typeof this.relItms !== 'undefined') {
              console.log(this.relItms);
              this.relItms.forEach(el => {
                  this.pioService.getProduct(el.item).subscribe(data => {
                      el.max_quant = data.stock_count;
                      console.log(data);});
              });
              console.log(this.relItms);
          }
      }, 500);
  }

  addRow(): void {
    if (typeof this.relItms === 'undefined') {
        this.relItms = [{
            _id: '23752368472368756283',
            item: '3dfsdg3223rdsf323425',
            sku: '3333',
            name: 'PifPif',
            cost: '1000',
            count: '2'
        }];
    } else {
        this.relItms.push({
            _id: '23752368472368756283',
            item: '3dfsdg3223rdsf323425',
            sku: '3333',
            name: 'PifPif',
            cost: '1000',
            count: '2'
        });
    }
    // this.changeItemList.emit(this.relItms);
      console.log(this.relItms);
  }

  recount(itemId: string, value: number) {
      this.relItms.find((el, i, array) => {
          if (el.item === itemId) {
              array[i].count = value;
          }
      });
  }

}
