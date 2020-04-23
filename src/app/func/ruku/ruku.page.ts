import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/wongoing/base.service';

@Component({
  selector: 'app-ruku',
  templateUrl: './ruku.page.html',
  styleUrls: ['./ruku.page.scss'],
})
export class RukuPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
 /** 输入属性-双向绑定 */
 input = {
  startDate: '2016/03/15',
  endDate: '2016/04/30'
};

constructor(private env: EnvService, public translate: TranslateService, private baseService: BaseService, private router : Router) { }

/** ng初始化 */
ngOnInit() {

}



public doSearch() {
  // console.log('------------------------------------------');
  console.log('startDate =' + this.input.startDate);
  console.log('endDate =' + this.input.endDate);
  // console.log('equipCode =' + this.input.equipCode);
  // console.log('shiftClassId =' + this.input.shiftClassId);
  // console.log('shiftClassName =' + this.input.shiftClassName);
  // console.log('rubTypeCode =' + this.input.rubTypeCode);
  // console.log('rubTypeName =' + this.input.rubTypeName);
  // console.log('mKindCode =' + this.input.mKindCode);
  // console.log('mKindName =' + this.input.mKindName);
  // console.log('materName =' + this.input.materName);
  // console.log('equipMultiple =' + this.input.equipMultiple);
  // console.log('pmtEquipList =' + this.input.pmtEquipList);
  // console.log('------------------------------------------');

  this.input.startDate = this.input.startDate.substring(0, 10);
  this.input.startDate.replace(new RegExp(/(-)/g), '/');
  
  this.input.endDate = this.input.endDate.substring(0, 10);
  this.input.endDate.replace(new RegExp(/(-)/g), '/');


  this.router.navigate(['/tabs/func/ruku/inStockResult'], { queryParams : this.input });
}

}
