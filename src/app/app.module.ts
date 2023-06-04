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
  BlogRoutingModule, 
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
  QuillEditorComponent, 
  SmProductCardComponent 
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
import { BlogReplyComponent } from './page/blog/components/blog-reply/blog-reply.component';
import { BlogCardComponent } from './page/blog/components/blog-card/blog-card.component';
import { RelatedPostComponent } from './page/blog/components/related-post/related-post.component';
import { AllBlogsComponent } from './page/blog/page/view-blog/view-blog.component';
import { ToCComponent } from './page/blog/components/t-o-c/t-o-c.component';
import { BlogPageComponent } from './page/blog/page/single-page/blog-page.component';

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
    HeaderComponent, 
    BreadcrumbComponent, 
    NavbarComponent, 
    LoaderSpinerComponent, 
    ProductTableComponent, 
    FadeInAnimationDirective, 
    PageNotFoundComponent, 
    EmailSubComponent, 
    QuillEditorComponent,
    BlogReplyComponent,
    RelatedPostComponent,
    AllBlogsComponent,
    ToCComponent,
    BlogPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ZorroModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    BlogRoutingModule,
    BlogCardComponent
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
    MetadataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
