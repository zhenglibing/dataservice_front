import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { KuhegefenxiService } from '../kuhegefenxi.service';

@Component({
  selector: 'app-rubber-quality-rate-result',
  templateUrl: './rubber-quality-rate-result.page.html',
  styleUrls: ['./rubber-quality-rate-result.page.scss'],
})
export class RubberQualityRateResultPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;

  infiniteScroll: IonInfiniteScroll;
  pageIndex = 1;    // 当前页的索引
  maxPageCount = 50; // 允许显示的最大页数
  pageSize = 15;     // 每页大小
  searchKey: any = '';

  titleDate: any = '';
  titleDetail: any = '';

  // 保存查询参数
  input: any = {};
  result: any = {
    titles:[],
    details: [],
    total: [],
    page: 1
  };
  constructor(private env: EnvService, private translate: TranslateService, private router: Router, private activateRoute: ActivatedRoute, private storge: Storage, private kuhegefenxiService: KuhegefenxiService) { }

  ngOnInit() {
    this.getQueryParams();
    this.initTitle();
    this.loadData();
  }

  /**
   * 获取查询参数
   */
  public getQueryParams() {
    this.input = this.activateRoute.snapshot.queryParams;
  }

  /**
   * 初始化标题信息
   */
  public async initTitle() {
    this.titleDate = this.input.startDate + '~' + this.input.endDate;
    this.titleDetail = await this.translate.get('rubberItemQualityRateResult_detail_title').toPromise();
    this.titleDetail = this.titleDetail.replace(/selectedOptionWorkshop/g, this.input.workshopName).replace(/selectedOptionShiftClass/g, this.input.shiftClassName);

    this.result.titles.splice(0, this.result.titles.length);        // 清空数组
    this.result.titles.push(await this.translate.get('generic_quaNum').toPromise());
    this.result.titles.push(await this.translate.get('generic_unQuaNum').toPromise());
    this.result.titles.push(await this.translate.get('generic_quaRate').toPromise());
    this.result.titles.push(await this.translate.get('generic_output').toPromise());
    this.result.titles.push(await this.translate.get('rubberItemQualityRateResult_MHUnQuaNum').toPromise());
    this.result.titles.push(await this.translate.get('rubberItemQualityRateResult_MHQuaRate').toPromise());
    this.result.titles.push(await this.translate.get('rubberItemQualityRateResult_T50QUnQua').toPromise());
    this.result.titles.push(await this.translate.get('rubberItemQualityRateResult_T50QuaRate').toPromise());
  }

  /**
   * 初始化数据
   */
  public async loadData() {
    let res: any = await this.kuhegefenxiService.getRubberItemQualityRate(this.input.startDate, this.input.endDate, this.input.workshopId, this.input.shiftClassId, this.input.materName, this.pageIndex, this.pageSize);
    console.log(res);
    if (res && res.state && res.state == '0') {
      this.result.details = res.result.details;
      this.result.total = res.result.total;
      this.result.page = res.result.page;
    } else {
      console.warn('访问远程接口[getRubberItemTotalQualityRate]异常!');
    }
  }

}
