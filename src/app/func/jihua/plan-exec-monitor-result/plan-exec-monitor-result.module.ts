import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PlanExecMonitorResultPage } from './plan-exec-monitor-result.page';

const routes: Routes = [
  {
    path: '',
    component: PlanExecMonitorResultPage
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
  declarations: [PlanExecMonitorResultPage]
})
export class PlanExecMonitorResultPageModule {}
