import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SpcService } from '../spc.service';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-rubber-qua-spc-result',
  templateUrl: './rubber-qua-spc-result.page.html',
  styleUrls: ['./rubber-qua-spc-result.page.scss'],
})
export class RubberQuaSpcResultPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;

  infiniteScroll: IonInfiniteScroll;
  pageIndex = 1;    // 当前页的索引
  maxPageCount = 50; // 允许显示的最大页数
  pageSize = 15;     // 每页大小
  searchKey: any = '';

  titleDate: any = '';
  titleDetail: any = '';

  input: any = {
    startDate: '2017-01-08',
    endDate: '2017-01-15',
    equipCode: '01009',
    equipName: 'A-9#270',
    shiftClassId: '全部',
    shiftClassName: '全部',
    materCode: '5010000000002',
    materName: 'ATA',
    itemCode: '302',
    itemName: 'MH'
  };

  origitalDataList = [];
  constructor(private env: EnvService, private translate: TranslateService, private router: Router, private activateRoute: ActivatedRoute, private popoverController: PopoverController, private storge: Storage, private spcService: SpcService ) { }

  ngOnInit() {
    this.getQueryParams();
    this.initTitle();
    this.initSpcData();
    this.cacheSpcChartData();
  }

  /**
   * 获取查询参数
   */
  public getQueryParams() {
    // this.input.startDate = this.activateRoute.snapshot.queryParams['startDate'];
    // this.input.endDate = this.activateRoute.snapshot.queryParams['endDate'];
    // this.input.equipCode = this.activateRoute.snapshot.queryParams['equipCode'];
    // this.input.shiftClassId = this.activateRoute.snapshot.queryParams['shiftClassId'];
    // this.input.shiftClassName = this.activateRoute.snapshot.queryParams['shiftClassName'];
    // this.input.materCode = this.activateRoute.snapshot.queryParams['materCode'];
    // this.input.materName = this.activateRoute.snapshot.queryParams['materName'];
    // this.input.itemCode = this.activateRoute.snapshot.queryParams['itemCode'];
    this.input = this.activateRoute.snapshot.queryParams;
    console.log('--------------');
    console.log('starDate = ' + this.input.startDate);
    console.log('endDate = ' + this.input.endDate);
    console.log('equipCode = ' + this.input.equipCode);
    console.log('shiftClasId =' + this.input.shiftClassId);
    console.log('shiftClassName = ' + this.input.shiftClassName);
    console.log('materCode = ' + this.input.materCode);
    console.log('materName = ' + this.input.materName);
    console.log('itemCode = ' + this.input.itemCode);
    console.log('--------------');
  }

  /**
   * 初始化标题信息
   */
  public async initTitle() {
    this.titleDate = this.input.startDate + '~' + this.input.endDate;
    this.titleDetail = await this.translate.get('rubberQualitySPCResut_detail_title').toPromise();
    this.titleDetail = this.titleDetail.replace(/selectedOptionEquip/g, this.input.equipName).replace(/selectedOptionShift/g, this.input.shiftClassName).replace(/selectedOptionItem/g, this.input.itemName);
  }

  /**
   * 初始化SPC数据
   */
  public initSpcData() {
    this.pageIndex = 1;
    this.origitalDataList.splice(0, this.origitalDataList.length);
    this.loadData();
  }

  /**
   * 缓存SPC图表展示数据
   */
  public async cacheSpcChartData() {
    let res: any = await this.spcService.getRubberQualitySPCList(this.input.startDate, this.input.endDate, this.input.itemCode, this.input.equipCode, this.input.shiftClassId, this.input.materCode);
    console.log('cacheSpcChartData...');
    console.log(res);
    if (res && res.state && res.state == '0') {
      await this.storge.set('qualitySPCListData', res.result);
    } else {
      console.warn('调用远程接口[getRubberQualitySPCList]异常!');
    }
  }

  /**
   * 加载spc数据
   */
  public async loadData() {
    let res: any = await this.spcService.getRubberQualitySPCListByPage(this.input.startDate, this.input.endDate, this.input.itemCode, this.input.equipCode, this.input.shiftClassId, this.input.materCode, this.pageIndex, this.pageSize);
    console.log('loadData...');
    console.log(res);
    if (res && res.state && res.state == '0') {
      if (res.result && res.result.length > 0) {
        if (res.result[0].origitalData && res.result[0].origitalData.length > 0) {
          res.result[0].origitalData.forEach(element => {
            this.origitalDataList.push(element);   
          });
        }
      }
    } else {
      console.warn('调用远程接口[getRubberQualitySPCListByPage]异常!');
    }
  }

  /**
   * 下拉刷新事件处理
   * @param event 事件
   */
  public doDownRefresh(event) {
    console.log('Begin async operation');
    this.pageIndex = 1;   // 重新从第1页开始显示
    this.origitalDataList.splice(0, this.origitalDataList.length);    // 清空原缓存的数据
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  /**
   * 上拉刷新加载分页数据
   * @param event 事件
   */
  public doUpRefresh(event) {
    this.pageIndex++;   // 增加一页
    this.loadData();
    setTimeout(() => {
      event.target.complete();
      if (this.pageIndex >= this.maxPageCount) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  public toggleInfiniteScroll() {
    this.infiniteScroll.disabled = ! this.infiniteScroll.disabled;
  }

  /**
   * 显示弹出窗口
   * @param ev 事件对象
   */
  public async presentPopover(ev: any) {
    const currentPopover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await currentPopover.present();
  }
}
