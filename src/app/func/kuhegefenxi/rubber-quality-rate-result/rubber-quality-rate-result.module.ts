import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RubberQualityRateResultPage } from './rubber-quality-rate-result.page';
const routes: Routes = [
  {
    path: '',
    component: RubberQualityRateResultPage
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
  declarations: [RubberQualityRateResultPage]
})
export class RubberQualityRateResultPageModule {}
