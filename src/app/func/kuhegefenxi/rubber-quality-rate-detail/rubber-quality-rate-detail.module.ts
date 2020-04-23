import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RubberQualityRateDetailPage } from './rubber-quality-rate-detail.page';
const routes: Routes = [
  {
    path: '',
    component: RubberQualityRateDetailPage
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
  declarations: [RubberQualityRateDetailPage]
})
export class RubberQualityRateDetailPageModule {}
