import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
// import { NgxsDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PicturesState } from "./store/state";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { SideBarComponent } from './side-bar/side-bar.component';
import { SearchComponent } from './search/search.component';
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideBarComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([PicturesState]),
    BrowserAnimationsModule,
    // NgxsDevtoolsPluginModule.forRoot()
    MatInputModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
