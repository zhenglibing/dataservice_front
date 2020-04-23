import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { EnvService } from 'src/app/wongoing/env.service';
import { BaseService } from 'src/app/wongoing/base.service';

@Component({
  selector: 'app-kuhegefenxi',
  templateUrl: './kuhegefenxi.page.html',
  styleUrls: ['./kuhegefenxi.page.scss'],
})
export class KuhegefenxiPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  /** 输入属性-双向绑定 */
  input = {
    startDate: '2016-01-08',
    endDate: '2016-06-15',
    equipCode: '01009',
    equipName: 'A-9#270',
    shiftClassId: '全部',
    shiftClassName: '全部',
    materCode: '5010000000002',
    materName: 'ATA',
    workshopId: 1,
    workshopName: '炼胶A区'
  };

  /** 数据初始化属性-单向显示 */
  workshopList: any[];
  shiftClassList: any[];
  equipList: any[];
  constructor(private env: EnvService, private translate: TranslateService, private router: Router, private activateRoute: ActivatedRoute, private storage: Storage, private baseService: BaseService) {  }

  ngOnInit() {
    this.processQueryParam();
    this.initShiftClass();
    this.initEquip();
    this.initWorkshop();
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
   * 初始化车间列表
   */
  public async initWorkshop() {
    let res: any = await this.baseService.getWorkshopList();
    console.log(res);
    if (res && res.state && res.state == '0') {
      this.workshopList = res.result;
    } else {
      console.warn('请求后台接口[getWorkshopList]异常!');
    }
  }

  /**
   * 处理车间的选择，用于保存车间名称
   * @param event 事件对象
   */
  public handleWorkshopChange(event) {
    console.log('Workshop change');
    this.workshopList.forEach(element => {
      if (element.workshopId == this.input.workshopId) {
        this.input.workshopName = element.workshopName;
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

    this.router.navigate(['/tabs/func/kuhegefenxi/rubberqualityrateresult'], { queryParams: this.input });
  }
}
