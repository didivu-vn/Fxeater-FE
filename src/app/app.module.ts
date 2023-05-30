import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { MainLayoutComponent } from './layout';
import { ZorroModule } from './shared/lib';
import { 
  AboutPage, 
  HomePage, 
  PageNotFoundComponent, 
  ProductDetailPage, 
  ProductIndexPage 
} from './page';

import { 
  BreadcrumbComponent,
  EmailSubComponent,
  HeaderComponent,
  LgProductCardComponent, 
  LoaderSpinerComponent, 
  NavbarComponent, 
  ProductCardComponent, 
  ProductTableComponent, 
  SmProductCardComponent 
} from './shared/component';
import { FadeInAnimationDirective } from './shared/derective/fade-in-animation.directive';



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
    ProductDetailPage, 
    ProductCardComponent, 
    LgProductCardComponent, 
    SmProductCardComponent, 
    HeaderComponent, BreadcrumbComponent, NavbarComponent, LoaderSpinerComponent, ProductTableComponent, FadeInAnimationDirective, PageNotFoundComponent, EmailSubComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
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
