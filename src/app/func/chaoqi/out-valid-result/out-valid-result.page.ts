import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from 'src/app/wongoing/env.service';
import { OutValidService } from '../out-valid.service';

@Component({
  selector: 'app-rubber-product-result',
  templateUrl: './out-valid-result.page.html',
  styleUrls: ['./out-valid-result.page.scss'],
})
export class OutValidResultPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  infiniteScroll: IonInfiniteScroll;
  pageIndex = 1;    // 当前页的索引
  maxPageCount = 5; // 允许显示的最大页数
  pageSize = 5;     // 每页大小
  equipList: [];    // 保存选择的机台名称列表
  resultList: any;   // 保存结果数据的数组

  /** 保存查询参数 */
  startDate: any = '2016/03/15';
  endDate: any = '2018/03/30';
  validHours: any =0;
  stockNo : any = '';
  materName  : any ='';
  outValidDate : any ='';

  constructor(private env: EnvService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: Storage,
              private service: OutValidService) { }

  ngOnInit() {
    this.resultList = [];
    this.loadData();
  }

  /**
   * 下拉刷新事件处理
   * @param event 事件
   */
  public doDownRefresh(event) {
    console.log('Begin async operation');
    this.pageIndex = 1;   // 重新从第1页开始显示
    this.resultList.splice(0, this.resultList.length);   // 清空原缓存的数据
    this.loadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  /**
   * 上拉刷新加载分页数据
   * @param event 事件
   */
  public doUpRefresh(event) {
    this.pageIndex++; // 增加一页
    this.loadData();
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // // App logic to determine if all data is loaded
      // // and disable the infinite scroll
      if (this.pageIndex >= this.maxPageCount) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  /**
   * 数据加载
   */
  public loadData() {
    // 从Storage获取customerId
    this.storage.get('customerId').then((customerId) => {
      // console.log('----------------------------------------');
      // console.log('customerId = ' + customerId);
      // 获取路由参数
      this.activatedRoute.queryParams.subscribe(param => {
        //debugger;
        this.startDate = param['startDate'];
        this.endDate = param['endDate'];
        this.validHours = param['validHours'];
        this.stockNo  = param['stockNo'];
        const offset: number = (this.pageIndex - 1) * this.pageSize;
        this.service.getBusOutValidResult(
                                            param['startDate'],
                                            param['endDate'],
                                            param['validHours'],
                                            param['stockNo'],
                                            offset,
                                            this.pageSize).then((res: any) => {
          if (res && res.state && res.state === '0') {
            console.log(res);
            // 把结果数据压入结果数组列表中。
            //debugger;
            res.result.forEach((element: never) => {
              this.resultList.push(element);
            });
          } else {
            console.warn('请求后台接口[getBusOutValidResult]异常!');
          }
        }).catch(err => {
          console.error(err);
        });
      });
    }).catch(error => {
      console.error('从Storage中获取customerId失败!', error);
    });
  }

  /**
   * 跳转到图表展示页面
   */
  public goChartPage(resultIndex: any) {
    console.log('resultIndex = ' + resultIndex);
    if (this.resultList && this.resultList.length > resultIndex)
    {
      //获取物料名
      this.materName = this.resultList[resultIndex][3];
      this.outValidDate = this.resultList[resultIndex][1];
      const params = { 
        dsType: 'demoDs', 
        startDate: this.startDate, 
        endDate: this.endDate, 
        materName:this.materName,
        outValidDate : this.outValidDate,
        offset :(this.pageIndex - 1) * this.pageSize,
        limit :this.pageSize,
        //传递页面显示的参数
        barcode :this.resultList[resultIndex][0],
        storehouse :this.resultList[resultIndex][2],
        rubberType :this.resultList[resultIndex][4],
        stockWeight :this.resultList[resultIndex][6],
        convertStdNum :this.resultList[resultIndex][5],
        equip :this.resultList[resultIndex][7],
        shift :this.resultList[resultIndex][8],
        shiftClass :this.resultList[resultIndex][9],
        usedState :this.resultList[resultIndex][15],
        dealMeasure :this.resultList[resultIndex][14],
        quaState :this.resultList[resultIndex][10],
        quaFlag  :this.resultList[resultIndex][11],
        quaFinish :this.resultList[resultIndex][12],
        validDate :this.resultList[resultIndex][16],
        unQuaReason :this.resultList[resultIndex][13]
      }
      this.router.navigate(['/tabs/func/chaoqi/outValidChart'], { queryParams: params });
    } else {
      console.warn('要查看的数据索引超过了缓存数据列表的长度!');
    }
  }

}
