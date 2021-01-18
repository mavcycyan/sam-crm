import {Component, ComponentFactoryResolver, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListModalComponent} from './list-modal/list-modal.component';
import {ModalDirective} from './modal.directive';
import {OrdersData} from '../interfaces';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnChanges {

  @ViewChild(ModalDirective, {static: false}) modalDir: ModalDirective;

  listOrders: OrdersData[] = []

  statusName = {
    new: 'New',
    ready: 'Ready',
    sent: 'Sent',
    done: 'Done',
    break: 'Refusal',
  }

  constructor(private httpClient: HttpClient,
              private resolver: ComponentFactoryResolver) {
  }

  showModal(id = null) {
    const modalFactory = this.resolver.resolveComponentFactory(ListModalComponent);
    this.modalDir.containerModal.clear();

    const component = this.modalDir.containerModal.createComponent(modalFactory);

    if (id !== null) {
        component.instance.isEdit = true;
    }

    component.instance.orderId = id;
    component.instance.close.subscribe(() => {
       this.modalDir.containerModal.clear();
    });
    component.instance.onListChange.subscribe(() => {
       this.onListChange();
    });
  }

   ngOnChanges() {
       this.onListChange();

   }

  ngOnInit() {
      this.onListChange();
  }

  onListChange() {
      this.httpClient.get<OrdersData[]>(environment.serverName)
          .subscribe(orders => {
              const newOrders = [];
              let newOrdersItt = 0;
              let newOrderDate = '';
              for (let i = 0; i < orders.length; i++) {
                  const orderDate = orders[i].date.substr(0, 10);
                  if (orderDate !== newOrderDate) {
                      newOrderDate = orderDate;
                      newOrders[newOrdersItt] = {date: orders[i].date, isSeparator: true};
                      newOrdersItt++;
                  }
                  newOrders[newOrdersItt] = orders[i];
                  newOrdersItt++;
              }
              this.listOrders = newOrders;
          });
  }

  deleteOrder(id) {
      this.httpClient.delete<any>(environment.serverName + id)
          .subscribe(response => {
              alert(response.message);
              this.ngOnChanges();
          });
  }

}
