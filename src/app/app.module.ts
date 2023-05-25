import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ZorroModule } from './shared/lib';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { AboutPage, HomePage } from './page';
import { MainLayoutComponent } from './layout';
import { ProductDetailPage } from './page/product/product-detail/product-detail.page';
import { ProductIndexPage } from './page/product/product-index/product-index.page';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent, 
    HomePage, 
    AboutPage, 
    MainLayoutComponent, 
    ProductIndexPage, 
    ProductDetailPage],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ZorroModule,
    BrowserAnimationsModule
  ],
  exports:[
    ZorroModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
