import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BaseService } from 'src/app/wongoing/base.service';

@Component({
  selector: 'app-jiance',
  templateUrl: './jiance.page.html',
  styleUrls: ['./jiance.page.scss'],
})
export class JiancePage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  /** 输入属性-双向绑定 */
  input = {
    startDate: '2016-01-08',
    endDate: '2017-01-08',
    equipCode: '全部',
    equipName: '全部',
    shiftClassId: '全部',
    shiftClassName: '全部',
    materCode: '5080000000027',
    materName: 'BOG101-试B',
    itemCode: '302',
    itemName: 'MH'
  };

  /** 数据初始化属性-单向显示 */
  checkItemList: any[];
  shiftClassList: any[];
  equipList: any[];
  constructor(private env: EnvService, private translate: TranslateService, private router: Router, private activateRoute: ActivatedRoute, private storage: Storage, private baseService: BaseService) { }

  ngOnInit() {
    this.processQueryParam();
    this.initShiftClass();
    this.initEquip();
    this.initCheckItem();
  }

  /**
   * 处理请求参数，（处理选择物料后返回的值）
   */
  public processQueryParam() {
    this.activateRoute.queryParams.subscribe(param => {
      console.log('processQueryParam...begin');
      console.log('materCode = ' + param['materCode']);
      console.log('materName = ' + param['materName']);
      console.log('processQueryParam...end');
      if (param['materCode']) {
        this.input.materCode = param['materCode'];
      }
      if (param['materName']) {
        this.input.materName = param['materName'];
      }
    });
  }

  /**
   * 初始化生产班组
   */
  public async initShiftClass() {
    let res: any = await this.baseService.getShiftClassList();
    console.log(res);
    if (res && res.state && res.state == '0') {
      this.shiftClassList = res.result;
    } else {
      console.warn('请求后台接口[getShiftClassList]异常!');
    }
  }

  /**
   * 初始化生产机台
   */
  public async initEquip() {
    let res: any = await this.baseService.getEquipList();
    console.log(res);
    if (res && res.state && res.state === '0') {
      this.equipList = res.result;
    } else {
      console.warn('请求后台接口[getEquipList]异常!');
    }
  }

  /**
   * 初始化胶料检测项
   */
  public async initCheckItem() {
    let res: any = await this.baseService.getCheckItem();
    console.log(res);
    if (res && res.state && res.state == '0') {
      this.checkItemList = res.result;
    } else {
      console.warn('请求后台接口[getCheckItem]异常!');
    }
  }

  /**
   * 处理检测项的选择，用于保存检测项名称
   * @param event 事件对象
   */
  public handleCheckItemChange(event) {
    console.log('CheckItem change');
    this.checkItemList.forEach(element => {
      if (element.itemCd == this.input.itemCode) {
        this.input.itemName = element.itemName;
      }
    });
  }

  /**
   * 处理机台的选择，用于保存选择的机台名称
   * @param event 事件对象
   */
  public handleEquipChange(event) {
    console.log('Equip change');
    this.equipList.forEach(element => {
      if (element.equipCode == this.input.equipCode) {
        this.input.equipName = element.equipName;
      }
    });
  }

  /**
   * 处理班组的选择，用于保存选择的班组名称
   * @param event 事件对象
   */
  public handleShiftClassChange(event) {
    console.log('shift class change');
    this.shiftClassList.forEach(element => {
      if (element.shiftClassId == this.input.shiftClassId) {
        this.input.shiftClassName = element.shiftClassName;
      }
    });
  }

  /**
   * 执行查询
   */
  public doSearch() {
    console.log('执行查询');
    this.input.startDate = this.input.startDate.substring(0, 10);
    this.input.endDate = this.input.endDate.substring(0, 10);
    console.log('startDate = ' + this.input.startDate);
    console.log('endDate = ' + this.input.endDate);
    console.log('materCode = ' + this.input.materCode);
    console.log('materName = ' + this.input.materName);
    console.log('itemCode = ' + this.input.itemCode);
    console.log('equipCode = ' + this.input.equipCode);
    console.log('shiftClassId = ' + this.input.shiftClassId);
    
    this.storage.set('inputQueryParams', this.input).then().catch(err => {
      console.error('spc页面缓存查询条件异常！', err);
    }); //缓存查询条件
    this.router.navigate(['/tabs/func/jiance/fastexamresult'], { queryParams: this.input });
  }
}
