import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MypageIndexPage } from "./pages/mypage-index/mypage-index.page";
import { MyBlogPage } from "./pages/my-blog/my-blog.page";
import { AllInfoComponent } from "./pages/all-info/all-info.component";


// list your feature routes here, then go
// src\app\app-routing.module.ts
// list your route as lazy-load module there
const routes: Routes = [
    {
        path: '',
        component: MypageIndexPage,
    },
    {
        path: 'blog',
        component: MyBlogPage,
    },
    {
        path: 'info',
        component: AllInfoComponent,
    },
];

// no need to touch anything here
@NgModule({

    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})

// rename the class
export class MypagePageModule { }