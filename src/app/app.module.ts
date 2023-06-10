import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './routes/app-routing.module';
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
  HomePage, 
  PageNotFoundComponent,
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

import { BlogReplyComponent } from './page/blog/components/blog-reply/blog-reply.component';
import { RelatedPostComponent } from './page/blog/components/related-post/related-post.component';
import { AllBlogsComponent } from './page/blog/pages/view-blog/view-blog.component';
import { ToCComponent } from './page/blog/components/t-o-c/t-o-c.component';
import { BlogPageComponent } from './page/blog/pages/single-page/blog-page.component';
import { NewBlogComponent } from './page/blog/pages/new-blog/new-blog.component';
import { BlogCardComponent } from './page/blog/components/blog-card/blog-card.component';
import { EditBlogComponent } from './page/blog';

import { ProductCardComponent } from './page/product/components/product-card/product-card.component';
import { LgProductCardComponent } from './page/product/components/lg-product-card/lg-product-card.component';
import { SmProductCardComponent } from './page/product/components/sm-product-card/sm-product-card.component';
import { ProductTableComponent } from './page/product/components/product-table/product-table.component';
import { ProductIndexPage } from './page/product/pages/product-index/product-index.page';
import { ProductDetailPage } from './page/product/pages/product-detail/product-detail.page';
import { MypagePageModule } from './page/mypage/mypage.module';



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
    BlogReplyComponent,
    RelatedPostComponent,
    AllBlogsComponent,
    ToCComponent,
    BlogPageComponent,
    EditBlogComponent,
    NewBlogComponent,
    ProductCardComponent, 
    LgProductCardComponent, 
    SmProductCardComponent, 
    ProductTableComponent,
    ProductIndexPage,
    ProductDetailPage,
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
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ZorroModule,
    QuillModule.forRoot(),
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BlogCardComponent,
    MypagePageModule
  ],
})
export class AppModule { }
