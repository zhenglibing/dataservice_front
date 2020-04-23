import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from '../../../wongoing/env.service';
import { BaseService } from '../../../wongoing/base.service';
import { JihuaService } from '../jihua.service';

@Component({
  selector: 'app-plan-exec-monitor-result',
  templateUrl: './plan-exec-monitor-result.page.html',
  styleUrls: ['./plan-exec-monitor-result.page.scss'],
})
export class PlanExecMonitorResultPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  infiniteScroll: IonInfiniteScroll;
  resultList: any;   // 保存结果数据的数组

  input: any = {};
  constructor(private env: EnvService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private translate: TranslateService,
              private storage: Storage,
              private baseService: BaseService,
              private service: JihuaService) { }

  ngOnInit() {
    this.resultList = [];
    // 获取查询参数
    this.input = this.activatedRoute.snapshot.queryParams;
    console.log(this.input.planDate);
    console.log(this.input.equipGroupId);
    console.log(this.input.equipMultiple);
    console.log(this.input.equipJsonString);
    this.loadData();
  }

  /**
   * 数据加载
   */
  public async loadData() {
    const customerId = await this.storage.get('customerId');
    const res: any = await this.service.getPlanExecMonitorTotalData(this.input.planDate,
                                                                  this.input.equipGroupId,
                                                                  this.input.equipJsonString);
    console.log(res);
    if (res && res.state && res.state === '0') {
      this.resultList = res.result;
    } else {
      console.warn('请求后台接口[getPlanExecMonitorTotalData]异常!');
    }
  }

}
