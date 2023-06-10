import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from '../page/home/home.page';
import { PageNotFoundComponent } from '../page';


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
    path: 'about',
    loadChildren: () => import('../page/about/about-page-routing.module').then(mod => mod.AboutRoutingModule)
  },
  {
    path: 'product',
    loadChildren: () => import('../page/product/product-routing.module').then(mod => mod.ProductRoutingModule)
  },
  {
    path: 'blog/all',
    pathMatch: 'full',
    loadChildren: () => import('../page/blog/blog-main-routing.module').then(mod => mod.BlogMainRoutingModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('../page/blog/blog-other-routing.module').then(mod => mod.BlogOtherRoutingModule)
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