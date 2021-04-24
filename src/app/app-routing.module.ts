import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeParentComponent } from './home/home-parent/home-parent.component';

const routes: Routes = [
  { path: '', component: HomeParentComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
