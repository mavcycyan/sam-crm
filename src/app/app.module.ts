import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AppRouterModule } from './app-router.module';
import {StockComponent} from './stock/stock.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './auth-guard.service';
import {LoginComponent} from './auth-page/login/login.component';
import {FrontPageComponent} from './front-page/front-page.component';
import {AuthPageComponent} from './auth-page/auth-page.component';
import {ListModalComponent} from './list/list-modal/list-modal.component';
import {ModalDirective} from './list/modal.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {StockModalComponent} from './stock/stock-modal/stock-modal.component';
import {ModalStockDirective} from './stock/modal-stock.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    StockComponent,
    StockModalComponent,
    LoginComponent,
    FrontPageComponent,
    AuthPageComponent,
    ListModalComponent,
    ModalDirective,
    ModalStockDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  entryComponents: [ListModalComponent, StockModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
