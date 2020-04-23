import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RubberConsumeResultPage } from './rubber-consume-result.page';

const routes: Routes = [
  {
    path: '',
    component: RubberConsumeResultPage
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
  declarations: [RubberConsumeResultPage]
})
export class RubberConsumeResultPageModule {}
