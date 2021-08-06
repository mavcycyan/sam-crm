import {
    Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderSingleData} from '../../interfaces';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.sass']
})

export class ListModalComponent implements OnInit, OnChanges {

    form: FormGroup;
    orderDate: string;
    itemsRelated: object;

  constructor(private httpClient: HttpClient) {
  }

  @Input() orderId = null;
  @Input() isEdit = false;
  @Output() close: EventEmitter<any> = new EventEmitter<void>();
  @Output() onListChange: EventEmitter<any> = new EventEmitter<void>();

  postData(params) {
      console.log(params);
      this.httpClient.post<any>(environment.serverName + 'api/orders/', {
          items : [
              {
                  id: '5feb9993c923a51d743e5e65',
                  name: 'Custom item',
                  cost: 300,
                  count: 1
              }
          ],
          processed_by: '5feb2704be1f681244f8a646',
          status: 'new',
          client_name: params.orderName.value,
          client_city: params.orderCity.value,
          client_phone: params.orderPhone.value,
          client_paytype: params.orderPay.value,
          client_delivery: params.orderDelivery.value,
          client_comment: params.orderComment.value
      }).subscribe(response => {
          alert(response.message);
          this.form.reset();
          this.onListChange.emit();
          this.close.emit();
      });
  }

  patchData(params) {
      this.httpClient.patch<any>(environment.serverName + 'api/orders/' + params.orderModlId.value, {
          items : [
              {
                  id: '5feb9993c923a51d743e5e65',
                  name: 'Custom item',
                  cost: 300,
                  count: 1
              }
          ],
          processed_by: '5feb2704be1f681244f8a646',
          status: params.orderStatus.value,
          client_name: params.orderName.value,
          client_city: params.orderCity.value,
          client_phone: params.orderPhone.value,
          client_paytype: params.orderPay.value,
          client_delivery: params.orderDelivery.value,
          client_comment: params.orderComment.value
      }).subscribe(response => {
          alert(response.message);
          this.form.reset();
          this.onListChange.emit();
          this.close.emit();
      });
  }

  ngOnChanges() {

  }

  ngOnInit() {
      this.form = new FormGroup({
          orderModlId: new FormControl(''),
          orderName: new FormControl('', Validators.required),
          orderStatus: new FormControl(''),
          orderCity: new FormControl('', Validators.required),
          orderPhone: new FormControl('', Validators.required),
          orderPay: new FormControl('', Validators.required),
          orderDelivery: new FormControl('', Validators.required),
          orderComment: new FormControl('')
      });

      if (this.orderId && this.orderId !== null) {
          this.httpClient.get<OrderSingleData>(environment.serverName + 'api/orders/' + this.orderId, {observe: 'response'} )
              .subscribe( order => {
                  if (order.body != null) {
                      this.form.setValue({
                          orderModlId: order.body._id,
                          orderName: order.body.client_name,
                          orderStatus: order.body.status,
                          orderCity: order.body.client_city,
                          orderPhone: order.body.client_phone,
                          orderPay: order.body.client_paytype,
                          orderDelivery: order.body.client_delivery,
                          orderComment: order.body.client_comment,
                      });
                      this.orderDate = order.body.date;
                      this.itemsRelated = order.body.items;
                      this.ngOnChanges();
                  }
              });
      }
  }

  submit() {
      if (this.form.status !== 'INVALID') {
          if (this.form.controls.orderModlId.value !== '' && this.form.controls.orderModlId.value !== null) {
              this.patchData(this.form.controls);
          } else {
              this.postData(this.form.controls);
          }
      }
  }

}
