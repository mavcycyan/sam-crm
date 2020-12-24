import {NgModule} from '@angular/core';

// https://metanit.com/web/angular2/7.1.php
import {Routes, RouterModule, PreloadAllModules} from '@angular/router'; // здесь импортируются модуль маршрутизации RouterModule и класс Routes, представляющий коллекцию маршрутов
import {ListComponent} from './list/list.component';
import {StockComponent} from './stock/stock.component';
import {AuthGuardService} from './auth-guard.service';
import {LoginComponent} from './auth-page/login/login.component';
import {FrontPageComponent} from './front-page/front-page.component';
import {AuthPageComponent} from './auth-page/auth-page.component';

const appRoutes: Routes = [
  {path: '', component: FrontPageComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: ListComponent},
      {path: 'stock', component: StockComponent},
  ]},
  {path: '', component: AuthPageComponent, children: [
      {path: 'login', component: LoginComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRouterModule {
}
