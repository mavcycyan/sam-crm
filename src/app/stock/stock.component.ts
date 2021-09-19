import {Component, ComponentFactoryResolver, OnChanges, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StockList} from '../interfaces';
import {ModalStockDirective} from './modal-stock.directive';
import {StockModalComponent} from './stock-modal/stock-modal.component';
import {environment} from '../../environments/environment';
import {GlobalVars} from '../globals';



@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent implements OnInit, OnChanges {

  constructor(private httpClient: HttpClient, private componentFactoryResolver: ComponentFactoryResolver) { }

  userName = GlobalVars.userName

  stockList: StockList[] = []

  @ViewChild(ModalStockDirective, {static: true}) modal: ModalStockDirective;

  showModal(id = null) {
      const component = StockModalComponent;

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

      const viewContainerRef = this.modal.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);

      if (id !== null) {
          componentRef.instance.isEdit = true;
      }

      componentRef.instance.itemId = id;

      componentRef.instance.close.subscribe(() => {
          viewContainerRef.clear();
      });
      componentRef.instance.onListChange.subscribe(() => {
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
        this.httpClient.get<StockList[]>(environment.serverName + 'api/list/')
            .subscribe(items => {
                this.stockList = items;
            });
    }

  deleteItem(id) {
      this.httpClient.delete<any>(environment.serverName + 'api/list/' + id)
          .subscribe(response => {
              alert(response.message);
              this.ngOnChanges();
          });
  }

}
