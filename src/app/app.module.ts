import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AppRouterModule } from './app-router.module';
import {StockComponent} from './stock/stock.component';
import {AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';
import {LoginComponent} from './auth-page/login/login.component';
import {FrontPageComponent} from './front-page/front-page.component';
import {AuthPageComponent} from './auth-page/auth-page.component';
import {ListModalComponent} from './list/list-modal/list-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    StockComponent,
    LoginComponent,
    FrontPageComponent,
    AuthPageComponent,
    ListModalComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
