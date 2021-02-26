import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { SideNavComponent } from './side-nav/side-nav.component';
import { StockHomeComponent } from './stock/stock-home/stock-home.component';
import { StockCreateComponent } from './stock/stock-create/stock-create.component';
import { StockEditComponent } from './stock/stock-edit/stock-edit.component';
import { httpInterceptorProviders } from './interceptors';
import { ProgressComponent } from './progress/progress.component';
import { ShopComponent } from './shop/shop.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    StockHomeComponent,
    StockCreateComponent,
    StockEditComponent,
    ProgressComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
