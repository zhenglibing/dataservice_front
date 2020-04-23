import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/wongoing/base.service';

@Component({
  selector: 'app-chaoqi',
  templateUrl: './chaoqi.page.html',
  styleUrls: ['./chaoqi.page.scss'],
})
export class ChaoqiPage implements OnInit {

  isShowHeader = this.env.IsShowHeader;

   /** 输入属性-双向绑定 */
   input = {
    startDate: '2016/03/15',
    endDate: '2016/03/30',
    validHours :0,
    stockNo: '全部'
  };

  /** 数据初始化属性-单向显示 */
  stockList: any[];

  constructor(private env: EnvService, public translate: TranslateService, private baseService: BaseService, private router : Router) { }
  
  /** ng初始化 */
  ngOnInit() {
    this.initStockList();
  }



  public doSearch() {

    console.log('startDate =' + this.input.startDate);
    console.log('endDate =' + this.input.endDate);


    this.input.startDate = this.input.startDate.substring(0, 10);
    this.input.startDate.replace(new RegExp(/(-)/g), '/');
    
    this.input.endDate = this.input.endDate.substring(0, 10);
    this.input.endDate.replace(new RegExp(/(-)/g), '/');


    this.router.navigate(['/tabs/func/chaoqi/outValidResult'], { queryParams : this.input });
  }


   /**
   * 初始化仓库列表
   */
  private initStockList() {
    this.baseService.getStockList().then((res: any) => {
      //debugger;
      console.log('getStockList调用完毕...');
      console.log(res);
      if (res && res.state && res.state === '0') {
        this.stockList = res.result;
     } else {
       console.warn('请求后台接口[getStockList]异常!');
     }
    }).catch(err => {
      console.error(err);
    });
  }

}
