import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MastheadComponent} from './masthead/masthead.component';
import {FooterComponent} from './footer/footer.component';
import {HomeModule} from "./pages/home/home.module";
import {CalculatorModule} from "./pages/calculator/calculator.module";

@NgModule({
  declarations: [
    AppComponent,
    MastheadComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    CalculatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
