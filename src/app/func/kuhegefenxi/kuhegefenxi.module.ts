import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { KuhegefenxiPage } from './kuhegefenxi.page';

const routes: Routes = [
  {
    path: '',
    component: KuhegefenxiPage
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
  declarations: [KuhegefenxiPage]
})
export class KuhegefenxiPageModule {}
