import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './page/home/home.page';
import { ProductDetailPage } from './page/product/product-detail/product-detail.page';
import { ProductIndexPage } from './page/product/product-index/product-index.page';


const routes: Routes = [
  {
    path: '',
    component:HomePage
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
