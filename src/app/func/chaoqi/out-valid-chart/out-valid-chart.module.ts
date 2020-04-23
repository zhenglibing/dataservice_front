import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { OutValidChartPage } from './out-valid-chart.page';

const routes: Routes = [
  {
    path: '',
    component: OutValidChartPage
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
  declarations: [OutValidChartPage]
})
export class OutValidChartPageModule {}
