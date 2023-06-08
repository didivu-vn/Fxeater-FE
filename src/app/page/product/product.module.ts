import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { ZorroModule } from "src/app/shared/lib";


import { ProductCardComponent } from "./components/product-card/product-card.component";
import { LgProductCardComponent } from "./components/lg-product-card/lg-product-card.component";
import { SmProductCardComponent } from "./components/sm-product-card/sm-product-card.component";
import { ProductTableComponent } from "./components/product-table/product-table.component";
import { BlogCardComponent } from "../blog/components/blog-card/blog-card.component";
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
    declarations:[
        ProductCardComponent, 
        LgProductCardComponent, 
        SmProductCardComponent, 
        ProductTableComponent,
        ProductIndexPage,
        ProductDetailPage
    ],
    imports:[
        RouterModule.forChild(routes),
        FormsModule,
        ZorroModule,
        CommonModule,
        ReactiveFormsModule,
        BlogCardComponent
    ],
    exports:[
        RouterModule,
        ProductCardComponent, 
        LgProductCardComponent, 
        SmProductCardComponent, 
        ProductTableComponent,
        ProductIndexPage,
        ProductDetailPage
    ]
})
export class ProductModule {}