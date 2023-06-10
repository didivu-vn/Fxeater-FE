import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProductIndexPage } from "./pages/product-index/product-index.page";
import { ProductDetailPage } from "./pages/product-detail/product-detail.page";



const routes: Routes = [
    {
        path: '',
        component: ProductIndexPage,
    },
    {
        path: ':id',
        component: ProductDetailPage,
    },
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
    ],
    exports:[
        RouterModule,
    ]
})
export class ProductRoutingModule {}