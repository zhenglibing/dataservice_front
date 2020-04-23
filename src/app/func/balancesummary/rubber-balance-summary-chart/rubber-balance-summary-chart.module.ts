import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { RubberBalanceSummaryChartPage } from './rubber-balance-summary-chart.page';

const routes: Routes = [
  {
    path: '',
    component: RubberBalanceSummaryChartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgxEchartsModule
  ],
  declarations: [RubberBalanceSummaryChartPage]
})
export class RubberBalanceSummaryChartPageModule {}
