import { Component, OnInit } from '@angular/core';
import { EnvService } from '../../wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/wongoing/base.service';

@Component({
  selector: 'app-chanliang',
  templateUrl: './chanliang.page.html',
  styleUrls: ['./chanliang.page.scss'],
})
export class ChanliangPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  /** 输入属性-双向绑定 */
  input = {
    startDate: '2016/03/15',
    endDate: '2016/03/30',
    equipCode: '',
    shiftClassId: '全部',
    shiftClassName: '全部',
    rubTypeCode: '全部',
    rubTypeName: '全部',
    mKindCode: '全部',
    mKindName: '全部',
    materName: '',
    equipMultiple: '01001,01003,01005,01006,01008',
    pmtEquipList: []
  };

  /** 数据初始化属性-单向显示 */
  shiftClassList: any[];
  equipList: any[];
  rubTypeList: any[];
  mkindList: any[];
  constructor(private env: EnvService, public translate: TranslateService, private baseService: BaseService, private router : Router) { }

  /** ng初始化 */
  ngOnInit() {
    this.initShiftClass();
    this.initEquip();
    this.initRubType();
    this.initMKind();
  }

  ionViewWillEnter() {
    // this.translate.get(["generic_en_language"]).subscribe(res => {
    //   console.log("ngOnInit get the translate generic_en_language");
    //   console.log(res);
    // });
  }

  /**
   * 初始化生产班组
   */
  private async initShiftClass() {
    let res: any = await this.baseService.getShiftClassList();
    if (res && res.state && res.state == '0') {
      this.shiftClassList = res.result;
    } else {
      console.warn('请求后台接口[getShiftClassList]异常!');
    }
  }

  /**
   * 初始化生产机台
   */
  private initEquip() {
    this.baseService.getEquipList().then((res: any) => {
      console.log('getEquipList调用完毕...');
      console.log(res);
      if (res && res.state && res.state === '0') {
        this.equipList = res.result;
      } else {
        console.warn('请求后台接口[getEquipList]异常!');
      }
    }).catch(err => {
      console.error(err);
    });
  }

  /**
   * 初始化胶料类别
   */
  private initRubType() {
    this.baseService.getRubTypeList().then((res: any) => {
      console.log('getRubTypeList调用完毕...');
      console.log(res);
      if (res && res.state && res.state === '0') {
        this.rubTypeList = res.result;
     } else {
       console.warn('请求后台接口[getRubTypeList]异常!');
     }
    }).catch(err => {
      console.error(err);
    });
  }

  /**
   * 初始化胶料大类
   */
  private initMKind() {
    this.baseService.getMKindList().then((res: any) => {
      console.log('getMKindList调用完毕...');
      console.log(res);
      if (res && res.state && res.state === '0') {
        this.mkindList = res.result;
      } else {
        console.warn('请求后台接口[getMKindList]异常!');
      }
    }).catch(err => {
      console.error(err);
    });
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

    this.input.pmtEquipList.splice(0, this.input.pmtEquipList.length);
    this.equipList.forEach(equip => {
      if (this.input.equipMultiple.indexOf(equip.equipCode) >= 0) {
        this.input.pmtEquipList.push(equip.equipName);
      }
    });

    this.router.navigate(['/tabs/func/chanliang/rubberproductresult'], { queryParams : this.input });
  }
}
