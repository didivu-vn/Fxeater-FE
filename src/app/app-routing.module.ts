import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './page/home/home.page';


const routes: Routes = [
  {
    path: '',
    component:HomePage
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
