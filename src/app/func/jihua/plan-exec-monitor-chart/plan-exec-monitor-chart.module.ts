import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PlanExecMonitorChartPage } from './plan-exec-monitor-chart.page';

const routes: Routes = [
  {
    path: '',
    component: PlanExecMonitorChartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [PlanExecMonitorChartPage]
})
export class PlanExecMonitorChartPageModule {}
