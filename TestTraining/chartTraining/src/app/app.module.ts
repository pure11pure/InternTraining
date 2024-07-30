import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'; // นำเข้า HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Chart1Component } from './chart1/chart1.component';
import { Chart2Component } from './chart2/chart2.component';
import { Chart3Component } from './chart3/chart3.component';
import { Chart4Component } from './chart4/chart4.component';
import { Chart5Component } from './chart5/chart5.component';
import { Chart6Component } from './chart6/chart6.component';
// import * as ApexCharts from 'apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    Chart1Component,
    Chart2Component,
    Chart3Component,
    Chart4Component,
    Chart5Component,
    Chart6Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    HttpClientModule
    // ApexCharts
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
