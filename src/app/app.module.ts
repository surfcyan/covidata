import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SideMenuOptionsComponent } from './side-menu-options/side-menu-options.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { HomeParentComponent } from './home/home-parent/home-parent.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { BottomSheetAddOxyHospital, BottomSheetApplyFilter, HospitalsComponent } from './oxygen/hospitals/hospitals.component';
import { ShopsComponent } from './oxygen/shops/shops.component';
import { MiscComponent } from './oxygen/misc/misc.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { FireServerService } from './service/fire-server.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SideMenuOptionsComponent,
    HomeParentComponent,
    HospitalsComponent,
    ShopsComponent,
    MiscComponent,
    BottomSheetAddOxyHospital,
    ComingSoonComponent,
    BottomSheetApplyFilter,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatRippleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    ApiService,
    FireServerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
