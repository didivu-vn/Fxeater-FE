import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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

    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})

// rename the class
export class SamplePageModule { }

// src\app\app.module.ts
// then in the imports, add the module