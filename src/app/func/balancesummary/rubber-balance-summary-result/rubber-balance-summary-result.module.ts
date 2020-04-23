import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { RubberBalanceSummaryResultPage } from './rubber-balance-summary-result.page';

const routes: Routes = [
  {
    path: '',
    component: RubberBalanceSummaryResultPage
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
  declarations: [RubberBalanceSummaryResultPage]
})
export class RubberBalanceSummaryResultPageModule {}
