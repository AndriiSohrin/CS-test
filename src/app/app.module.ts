import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { FormComponent } from './components/form/form.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import {WebApiDBService} from "./services/web-api-db.service";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    StartPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(WebApiDBService),
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
