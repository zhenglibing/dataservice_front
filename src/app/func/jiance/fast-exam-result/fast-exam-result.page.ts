import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { JianceService } from '../jiance.service';

@Component({
  selector: 'app-fast-exam-result',
  templateUrl: './fast-exam-result.page.html',
  styleUrls: ['./fast-exam-result.page.scss'],
})
export class FastExamResultPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;

  titleDate: any = '';
  titleDetail: any = '';
  noSearchData = false;     // 未找到数据标志

  /** 输入属性-双向绑定 */
  input: any = {};
  resultList: any;
  constructor(private env: EnvService, private translate: TranslateService, private router: Router, private activatedRoute: ActivatedRoute, private popoverController: PopoverController, private storage: Storage, private jianceService: JianceService) { }

  ngOnInit() {
    this.getQueryParams();
    this.initTitle();
    this.initData();
  }

  /**
   * 获取查询参数
   */
  public getQueryParams() {
    this.input = this.activatedRoute.snapshot.queryParams;
    console.log('-----------------------');
    console.log('startDate = ' + this.input.startDate);
    console.log('endDate = ' + this.input.endDate);
    console.log('itemCode = ' + this.input.itemCode);
    console.log('itemName = ' + this.input.itemName);
    console.log('equipCode = ' + this.input.equipCode);
    console.log('shiftClassId = ' + this.input.shiftClassId);
    console.log('materCode = ' + this.input.materCode);
    console.log('-----------------------');
  }

  /**
   * 初始化标题信息
   */
  public async initTitle() {
    this.titleDate = this.input.startDate + '~' + this.input.endDate;
    this.titleDetail = await this.translate.get('fastExamResult_title_string').toPromise();
    this.titleDetail = this.titleDetail.replace(/selectedOptionEquip/g, this.input.equipName).replace(/selectedOptionShift/g, this.input.shiftClassName).replace(/selectedOptionExamType/g, this.input.itemName);
  }
  /**
   * 初始化数据
   */
  public async initData() {
    const res: any = await this.jianceService.getFastExaminationList(this.input.startDate, this.input.endDate, this.input.itemCode, this.input.itemName, this.input.equipCode, this.input.shiftClassId, this.input.materCode);
    console.log(res);
    if (res && res.state && res.state == '0') {
      this.resultList = res.result;
      if (res.result.length == 0) {
        this.noSearchData = true;
      } else {
        this.noSearchData = false;
      }
    } else {
      console.warn('调用远程接口[getFastExaminationList]异常!');
    }
  }

  /**
   * 下拉刷新事件处理
   * @param event 
   */
  public doDownRefresh(event) {
    console.log('Begin async operation');
    this.initData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  /**
   * 跳转到图表页
   * @param index 
   */
  public goChartPage(index) {
    console.log('index = ' + index);
    const params = {
      startDate: this.input.startDate,
      endDate: this.input.endDate,
      itemCode: this.input.itemCode,
      itemName: this.input.itemName,
      equipCode: this.input.equipCode,
      equipName: this.input.equipName,
      shiftClassId: this.input.shiftClassId,
      shiftClassName: this.input.shiftClassName,
      materCode: this.input.materCode,
      materName: this.input.materName,
      perMax: this.resultList[index].perMax,
      perMin: this.resultList[index].perMin
    };
    this.router.navigate(['/tabs/func/jiance/fastexamchart'], { queryParams: params });
  }
}
