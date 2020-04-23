import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { RubberQuaSpcResultPage } from './rubber-qua-spc-result.page';
import { PopoverComponent } from './popover/popover.component';

const routes: Routes =[
  {
    path: '',
    component: RubberQuaSpcResultPage
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
  entryComponents: [PopoverComponent],
  declarations: [RubberQuaSpcResultPage, PopoverComponent]
})
export class RubberQuaSpcResultPageModule {}
