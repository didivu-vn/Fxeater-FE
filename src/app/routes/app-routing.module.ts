import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage, PageNotFoundComponent } from '../page';
import { AuthGuard } from '../shared/guard/auth.guard';


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
    loadChildren: () => import('../page/blog/blog-main-routing.module').then(mod => mod.BlogMainRoutingModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('../page/blog/blog-other-routing.module').then(mod => mod.BlogOtherRoutingModule)
  },
  {
    path: 'mypage',
    loadChildren: () => import('../page/mypage/mypage.module').then(mod => mod.MypagePageModule),
    canActivate: [AuthGuard]
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
