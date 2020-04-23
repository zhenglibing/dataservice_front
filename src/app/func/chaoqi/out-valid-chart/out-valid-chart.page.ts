import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../../../wongoing/env.service';
import { EchartService } from '../../../wongoing/echart.service';
import { OutValidService } from '../out-valid.service';

@Component({
  selector: 'app-rubber-product-chart',
  templateUrl: './out-valid-chart.page.html',
  styleUrls: ['./out-valid-chart.page.scss'],
})
export class OutValidChartPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  options: any = {};   //echart图表选项
  //保存横坐标
  xaxis:any = {};
  //保存重量
  weightArray:any = {};
  //保存数量
  num:any = {};
  //图例名
  legend :string ='数量';
  /** 保存查询参数 */

  materName: any = '';
  outValidDate  : any ='';
  offset: any ='';
  limit: any ='';

  //传递页面显示的参数
  barcode :any ='';
  storehouse :any ='';
  rubberType :any ='';
  stockWeight :any ='';
  convertStdNum :any ='';
  equip :any ='';
  shift :any ='';
  shiftClass :any ='';
  usedState :any ='';
  dealMeasure :any ='';
  quaState :any ='';
  quaFlag  :any ='';
  quaFinish :any ='';
  validDate :any ='';
  unQuaReason :any ='';

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private env: EnvService, private echartservice: EchartService, private service: OutValidService) { }

  ngOnInit() {
    this.loadData();
  }

  /**
   * 数据加载
   */
  public loadData() {
    // console.log('----------------------------------------');
    // 获取路由参数
    this.activatedRoute.queryParams.subscribe(param => {
      //debugger;
      this.materName = param['materName'];
      this.outValidDate = param['outValidDate'];
      this.offset = param['offset'];
      this.limit = param['limit'];
      //传递参数
      this.barcode = param['barcode'];
      this.storehouse  = param['storehouse'];
      this.rubberType  = param['rubberType'];
      this.stockWeight  = param['stockWeight'];
      this.convertStdNum  = param['convertStdNum'];
      this.equip  = param['equip'];
      this.shift  = param['shift'];
      this.shiftClass  = param['shiftClass'];
      this.usedState  = param['usedState'];
      this.dealMeasure  = param['dealMeasure'];
      this.quaState  = param['quaState'];
      this.quaFlag   = param['quaFlag'];
      this.quaFinish  = param['quaFinish'];
      this.validDate  = param['validDate'];
      this.unQuaReason  = param['unQuaReason'];

      this.service.getBusOutValidChart(this.materName,this.outValidDate,this.offset,this.limit).then((res: any) => {
        if (res && res.state && res.state === '0') {
          console.log(res);
         
          if (res.result && res.result.length > 0) {
            this.options = this.echartservice.getLineOptionsTemplate(this.echartservice.SuccessColor,
                                                                    this.echartservice.InfoColor,
                                                                    this.echartservice.TextColor,
                                                                    this.echartservice.AxisLineColor,
                                                                    this.echartservice.SplitLineColor);
            
             // 设置标题文本
             this.options.title.subtext = '超期胶料趋势图';

             // 设置图例
             this.options.legend.data = new Array(1);
             this.options.legend.data[0] = {
               name: this.legend,
               icon: 'rect',
               // textStyle: { color: this.echartservice.Colors[i] }
             };
 
              for(let i = 0; i < res.result.length; i++) {
               //debugger;
               //获取所有时间作为横坐标
               this.xaxis[i] = res.result[i][0];
               this.weightArray[i] = res.result[i][2];
               this.num[i] = res.result[i][1];              
             }
 
             //将横坐标转换为数组Array对象
             let xaxisArray: number[] = new Array(res.result.length);
             let numArray: number[] = new Array(res.result.length);
             let weightArrayArray: number[] = new Array(res.result.length);

             for(let i = 0; i < xaxisArray.length; i++) 
             {
               xaxisArray[i] = this.xaxis[i];
               numArray[i] = this.num[i];
               weightArrayArray = this.weightArray[i];
             }
 
             // 设置X轴的数据的点
             this.options.xAxis.data = xaxisArray;
 
             // 设置曲线个数
             this.options.series = new Array(1); 
 
             // 设置曲线名称及数据 
             this.options.series[0] = {
               //曲线名与图例名相对应才会显示
               name: this.legend,
               type:'line',
               smooth : true,
               stack: '',
               data: numArray,
               markLine: { },
               // lineStyle: {
               //   color: this.echartservice.Colors[i]
               // }
             };
            
             // 设置Y轴最小值
             let tempmin = Math.min.apply(null, numArray);
             this.options.yAxis.min = Math.min(tempmin, this.options.yAxis.min);
             
             // 设置Y轴最大值
             let tempmax = Math.max.apply(null,numArray);
             this.options.yAxis.max = Math.max(tempmax, this.options.yAxis.max);
            
          }
        } else {
          console.warn('请求后台接口[getBusOutValidChart]异常!');
        }
      }).catch(err => {
        console.error(err);
      });
    });
  }
}
