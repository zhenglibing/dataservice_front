import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import { EnvService } from './env.service';
import { SettingsService } from './settings.service';
import { UtilsService } from './utils.service';
import { EchartService } from './echart.service';
import { BaseService } from './base.service';

const services = [
  EnvService,
  SettingsService,
  UtilsService,
  EchartService,
  BaseService
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxEchartsModule
  ],
  providers: [ ...services ]
})
export class WongoingModule { }
