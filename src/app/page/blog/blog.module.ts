import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ZorroModule } from "src/app/shared/lib";

import { QuillModule } from "ngx-quill";

import { BlogReplyComponent } from "./components/blog-reply/blog-reply.component";
import { RelatedPostComponent } from "./components/related-post/related-post.component";
import { ToCComponent } from "./components/t-o-c/t-o-c.component";
import { AllBlogsComponent } from "./pages/view-blog/view-blog.component";
import { BlogPageComponent } from "./pages/single-page/blog-page.component";
import { BlogCardComponent } from "./components/blog-card/blog-card.component";
import { QuillEditorComponent } from "src/app/shared/component";
import { NewBlogComponent } from "./pages/new-blog/new-blog.component";

const routes: Routes = [
    {
        path: '',
        component: AllBlogsComponent,
    },
    {
        path: 'new',
        component: NewBlogComponent,
    },
    {
        path: ':id',
        component: BlogPageComponent,
    },
];

const _feature_components = [
    BlogReplyComponent,
    RelatedPostComponent,
    AllBlogsComponent,
    ToCComponent,
    BlogPageComponent,
    NewBlogComponent
]

@NgModule({
    declarations:[
        ..._feature_components
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        ZorroModule,
        CommonModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        BlogCardComponent,
    ],
    exports: [
        RouterModule,
        ..._feature_components
    ]
})
export class BlogPageModule { }