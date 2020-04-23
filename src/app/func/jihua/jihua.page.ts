import { Component, OnInit } from '@angular/core';
import { EnvService } from '../../wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/wongoing/base.service';

@Component({
  selector: 'app-jihua',
  templateUrl: './jihua.page.html',
  styleUrls: ['./jihua.page.scss'],
})
export class JihuaPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;

  /** 输入属性-双向绑定 */
  input = {
    planDate : '2016/03/16',
    // 机子ID
    equipGroupId : '1#',
    // 页面显示所需机台文字
    equipMultiple : '01003,01004,01005,01006,01008',
    // 页面展示所需机台列表
    equipList : [],
    // 机组对象列表
    equipGroupList : [],
    // 请求所需机台列表数据
    equipJson : [],
    // 请求所需机台列表字符串
    equipJsonString: ''
  };

  /** 数据初始化属性-单向显示 */
  shiftList: any[];
  equipList: any[];
  constructor(private env: EnvService, public translate: TranslateService, private baseService: BaseService, private router: Router) { }

  ngOnInit() {
    this.initEquipGroup();
    this.initEquip();
  }

  /**
   * 初始化生产区域列表
   */
  public async initEquipGroup() {
    const res: any = await this.baseService.getEquipGroup();
    console.log(res);
    if (res && res.state && res.state == '0') {
      this.input.equipGroupList = res.result;
    } else {
      console.warn('请求后台接口[getSysCodeList]异常!');
    }
  }

  /**
   * 初始化机台列表
   */
  public async initEquip() {
    const res: any = await this.baseService.getProductEquipByEquipGroup(this.input.equipGroupId);
    console.log(res);
    if (res && res.state && res.state === '0') {
      this.input.equipList = res.result;
    } else {
      console.warn('请求后台接口[getEquipList]异常!');
    }
  }

  /**
   * 选择生产区域事件处理，获取对应生产区域的机台信息
   * @param event 事件对象
   */
  public async handleEquipGroupChange(event) {
    this.initEquip();
  }

  /**
   * 执行查询
   */
  public doSearch() {
    // console.log('planDate = ' + this.input.planDate);
    // console.log('equipGroupId = ' + this.input.equipGroupId);
    // console.log('equipMultiple = ' + this.input.equipMultiple);
    if (this.input.equipList && this.input.equipList.length > 0) {
      this.input.equipList.forEach(equip => {
        if (this.input.equipMultiple.indexOf(equip.equipCode) > 0) {
          this.input.equipJson.push({ equipCode: equip.equipCode, equipName: equip.equipName });
        }
      });
    }
    this.input.equipJsonString = JSON.stringify(this.input.equipJson);
    this.router.navigate(['/tabs/func/jihua/planexecmonitorresult'], { queryParams: this.input });
  }
}
