import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {StockList} from '../../interfaces';

@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock-modal.component.html',
  styleUrls: ['./stock-modal.component.sass']
})
export class StockModalComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() itemId = null;
  @Input() isEdit = false;
  @Output() close: EventEmitter<any> = new EventEmitter<void>();
  @Output() onListChange: EventEmitter<any> = new EventEmitter<void>();


  constructor(private httpClient: HttpClient) { }

  ngOnChanges() {

  }

  postData(params) {
      this.httpClient.post<any>(environment.serverName + 'api/list/', {
          sys_name: params.itemAlias.value,
          name: params.itemName.value,
          price: params.itemPrice.value,
          stock_count: params.itemQuan.value,
          sku: params.itemSku.value
      }).subscribe(response => {
          alert(response.message);
          this.form.reset();
          this.onListChange.emit();
          this.close.emit();
      });
  }

  patchData(params) {
      this.httpClient.patch<any>(environment.serverName + 'api/list/' + params.itemModlId.value, {
          sys_name: params.itemAlias.value,
          name: params.itemName.value,
          price: params.itemPrice.value,
          stock_count: params.itemQuan.value,
          sku: params.itemSku.value
        }).subscribe(response => {
            alert(response.message);
            this.form.reset();
            this.onListChange.emit();
            this.close.emit();
        });
    }

  ngOnInit() {

    this.form = new FormGroup({
        itemModlId: new FormControl(''),
        itemAlias: new FormControl(''),
        itemName: new FormControl(''),
        itemPrice: new FormControl(''),
        itemQuan: new FormControl(''),
        itemSku: new FormControl(''),
    });

    if ( this.itemId && this.itemId !== null) {
      this.httpClient.get<StockList>(environment.serverName + 'api/list/' + this.itemId, {observe: 'response'})
          .subscribe(order => {
            if (order.body != null) {
              this.form.setValue({
                  itemModlId: order.body._id,
                  itemAlias: order.body.sys_name,
                  itemName: order.body.name,
                  itemPrice: order.body.price,
                  itemQuan: order.body.stock_count,
                  itemSku: order.body.sku,
              });
              this.ngOnChanges();
            }
          });
    }
  }

    submit() {
        if (this.form.status !== 'INVALID') {
            if (this.form.controls.itemModlId.value !== '' && this.form.controls.itemModlId.value !== null) {
                this.patchData(this.form.controls);
            } else {
                this.postData(this.form.controls);
            }
        }
    }

}
