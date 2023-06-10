import { NgModule, Type } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ZorroModule } from "src/app/shared/lib";

// list your feature components here
const _feature_local_components: any[] | Type<any> = [

]

// list your feature routes here, then go
// src\app\app-routing.module.ts
// list your route as lazy-load module there
const routes: Routes = [
    // {
    //     path: '',
    //     component: AllBlogsComponent,
    // },
];

// no need to touch anything here
@NgModule({
    declarations:[
        _feature_local_components
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        ZorroModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        RouterModule,
        _feature_local_components
    ]
})

// rename the class
export class SamplePageModule { }

// src\app\app.module.ts
// then in the imports, add the module