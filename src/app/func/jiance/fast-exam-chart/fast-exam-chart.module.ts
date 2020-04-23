import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { FastExamChartPage } from './fast-exam-chart.page';
const routes: Routes = [
  {
    path: '',
    component: FastExamChartPage
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
  declarations: [FastExamChartPage]
})
export class FastExamChartPageModule {}
