import { Component, OnInit } from '@angular/core';
import { EnvService } from '../../wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/wongoing/base.service';

@Component({
  selector: 'app-xiaohao',
  templateUrl: './xiaohao.page.html',
  styleUrls: ['./xiaohao.page.scss'],
})
export class XiaohaoPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;

  /** 输入属性-双向绑定 */
  input = {
    startDate: '2016/03/15',
    endDate: '2016/03/30',
    equipCode: '01005',
    shiftId: '全部',
    shiftName: '全部',
    materCode: '',
    materName: 'SBR',
    equipMultiple: '01003,01005',
    pmtEquipList: []
  };

  /** 数据初始化属性-单向显示 */
  shiftList: any[];
  equipList: any[];

  constructor(private env: EnvService, public translate: TranslateService, private baseService: BaseService, private router : Router) { }

  ngOnInit() {
    this.initShift();
    this.initEquip();
  }

  /**
   * 初始化生产班次
   */
  private async initShift() {
    const res: any = await this.baseService.getShiftList();
    if (res && res.state && res.state === '0') {
      this.shiftList = res.result;
    } else {
      console.warn('请求后台接口[getShiftList]异常!');
    }
  }

  /**
   * 初始化生产机台
   */
  private async initEquip() {
    const res: any = await this.baseService.getEquipList();
    if (res && res.state && res.state === '0') {
      this.equipList = res.result;
    } else {
      console.warn('请求后台接口[getEquipList]异常!');
    }
  }

  /**
   * 选择班次事件处理
   * @param event 事件对象
   */
  public handleShiftChange(event) {
    console.log('shift change');
    this.shiftList.forEach(element => {
      if (element.shiftId == this.input.shiftId) {
        this.input.shiftName = element.shiftName;
      }
    });
  }

  /**
   * 执行查询
   */
  public doSearch() {
    this.input.startDate = this.input.startDate.substring(0, 10);
    this.input.startDate = this.input.startDate.replace(new RegExp(/(-)/g), '/');

    this.input.endDate = this.input.endDate.substring(0, 10);
    this.input.endDate = this.input.endDate.replace(new RegExp(/(-)/g), '/');

    this.input.pmtEquipList.splice(0, this.input.pmtEquipList.length);
    this.equipList.forEach(equip => {
      if (this.input.equipMultiple.indexOf(equip.equipCode) > 0) {
        this.input.pmtEquipList.push(equip.equipName);
      }
    });

    this.input.equipCode = this.input.equipMultiple;
    if (this.input.equipCode == '') {
      this.input.equipCode = '全部';
    } else {
      this.input.equipCode = new String(this.input.equipCode).replace(new RegExp(/(,)/g), ';');   // 把逗号改为分号
    }

    this.router.navigate(['/tabs/func/xiaohao/rubberconsumeresult'], { queryParams: this.input });
  }
}
