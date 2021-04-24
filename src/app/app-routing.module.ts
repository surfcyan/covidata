import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { HomeParentComponent } from './home/home-parent/home-parent.component';
import { HospitalsComponent } from './oxygen/hospitals/hospitals.component';
import { MiscComponent } from './oxygen/misc/misc.component';
import { ShopsComponent } from './oxygen/shops/shops.component';

const routes: Routes = [
  { path: '', component: HomeParentComponent, },
  { path: 'oxygen/hospital', component: HospitalsComponent, },
  { path: 'oxygen/shops', component: ShopsComponent, },
  { path: 'oxygen/misc', component: MiscComponent, },
  { path: 'coming-soon', component: ComingSoonComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
