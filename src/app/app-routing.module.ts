import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './page/home/home.page';
import { ProductDetailPage } from './page/product/product-detail/product-detail.page';
import { ProductIndexPage } from './page/product/product-index/product-index.page';
import { PageNotFoundComponent } from './page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'product',
    component:ProductIndexPage
  },
  {
    path: 'product/:id',
    component:ProductDetailPage
  },
  {
    path: 'about',
    loadChildren: () => import('./page/about/about-page-routing.module').then(mod => mod.AboutRoutingModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./page/blog/blog.module').then(mod => mod.BlogRoutingModule)
  },
  {
    path:'**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64], // [x, y] - adjust scroll offset
    preloadingStrategy: PreloadAllModules
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
