import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
/**
 * ADD
 */
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NzAlertModule } from 'ng-zorro-antd/alert';

/**
 * Component
 */
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
/*
 * Icon
*/
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { PlusCircleOutline, UserOutline, VideoCameraOutline, UploadOutline, FileOutline, EditOutline, DeleteOutline } from '@ant-design/icons-angular/icons';
const icons = [ PlusCircleOutline, UserOutline, VideoCameraOutline, UploadOutline, FileOutline, EditOutline, DeleteOutline ];





registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzGridModule,
    NzCollapseModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzModalModule,
    NzSelectModule,
    NzDatePickerModule,
    NzPaginationModule,
    BsDatepickerModule.forRoot(),
    NzAlertModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
