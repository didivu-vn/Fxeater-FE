import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from "./middleware/interceptor.provider";

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { MainLayoutComponent } from './layout';
import { ZorroModule } from './shared/lib';
import { 
  AboutPage, 
  BlogPageModule, 
  HomePage, 
  PageNotFoundComponent,
  ProductModule
} from './page';

import { 
  BreadcrumbComponent,
  EmailSubComponent,
  HeaderComponent,
  LoaderSpinerComponent, 
  NavbarComponent, 
  QuillEditorComponent, 
} from './shared/component';

import { 
  ApiService, 
  AuthService, 
  CacheResolverService, 
  MetadataService, 
  SlugService 
} from './service';

import { FadeInAnimationDirective } from './shared/derective/fade-in-animation.directive';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { BlogService } from './page/blog/services/blog.service';



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
    HeaderComponent, 
    BreadcrumbComponent, 
    NavbarComponent, 
    LoaderSpinerComponent, 
    FadeInAnimationDirective, 
    PageNotFoundComponent, 
    EmailSubComponent, 
    QuillEditorComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ZorroModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    BlogPageModule,
    ProductModule
  ],
  exports:[
    ZorroModule
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons },        
    ApiService,
    AuthService,
    SlugService,
    CacheResolverService,
    httpInterceptorProviders,
    MetadataService,
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
