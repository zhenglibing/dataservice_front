import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MePage } from './me.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: MePage}]),
        TranslateModule
    ],
    declarations: [MePage]
})
export class MePageModule { }
