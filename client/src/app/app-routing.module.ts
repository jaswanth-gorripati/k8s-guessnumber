import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { T1Component } from './t1/t1.component'

const routes: Routes = [{
  path:"t1",component:T1Component
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
