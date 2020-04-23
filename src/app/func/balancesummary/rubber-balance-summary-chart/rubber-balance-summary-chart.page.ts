import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../../../wongoing/env.service';
import { EchartService } from '../../../wongoing/echart.service';
import { RubberBalanceSummaryService } from '../rubber-balance-summary.service';

@Component({
  selector: 'app-rubber-summary-chart',
  templateUrl: './rubber-balance-summary-chart.page.html',
  styleUrls: ['./rubber-balance-summary-chart.page.scss'],
})
export class RubberBalanceSummaryChartPage implements OnInit {

  isShowHeader = this.env.IsShowHeader;
  options: any = {};   //echart图表选项
  //保存横坐标
  xaxis:any = {};
  //保存重量
  weight:any = {};
  //保存数量
  num:any = {};

  /** 保存查询参数 */
  startDate: any = '2016/03/15';
  endDate: any = '2016/03/30';
  materCode: any = '';
  offset :any = 0;
  limit :any = 5;
  date :any ='';
  materName :any ='';
  weigh :any ='';
  number :any ='';
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private env: EnvService, private echartservice: EchartService, private service: RubberBalanceSummaryService) { }

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
      this.startDate = param['startDate'];
      this.endDate = param['endDate'];
      this.materCode = param['materCode'];
      this.offset = param['offset'];
      this.limit = param['limit'];
      this.date = param['date'];
      this.materName = param['materName'];
      this.weigh = param['weigh'];
      this.number = param['number'];
       
      //debugger;
      this.startDate = this.startDate.substring(0, 10);
      this.startDate.replace(new RegExp(/(-)/g), '/');
    
      this.endDate = this.endDate.substring(0, 10);
      this.endDate.replace(new RegExp(/(-)/g), '/');

     
      this.service.getBusStockChart(this.startDate,
                                          this.endDate,
                                          this.materCode,
                                          this.offset,
                                          this.limit).then((res: any) => {
        if (res && res.state && res.state === '0') {
          console.log(res);
          //debugger;
          if (res.result && res.result.length > 0) {
            this.options = this.echartservice.getLineOptionsTemplate(this.echartservice.SuccessColor,
                                                                    this.echartservice.InfoColor,
                                                                    this.echartservice.TextColor,
                                                                    this.echartservice.AxisLineColor,
                                                                    this.echartservice.SplitLineColor);
            
            // 设置标题文本
            this.options.title.subtext = '';
            //debugger;
            // 设置图例
            this.options.legend.data = new Array(1);
            this.options.legend.data[0] = {
              name: res.result[0][1],//物料名作为图例名
              icon: 'rect',
              // textStyle: { color: this.echartservice.Colors[i] }
            };
            
            for(let i = 0; i < res.result.length; i++) {
              //debugger;
              //获取所有时间作为横坐标
              this.xaxis[i] = res.result[i][0];
              this.weight[i] = res.result[i][3];
              this.num[i] = res.result[i][4];              
            }

            //将横坐标转换为数组Array对象
            let xaxisArray: number[] = new Array(res.result.length);
            let numArray: number[] = new Array(res.result.length);
            for(let i = 0; i < xaxisArray.length; i++) 
            {
              xaxisArray[i] = this.xaxis[i];
              numArray[i] = this.num[i];
            }

            // 设置X轴的数据的点
            this.options.xAxis.data = xaxisArray;

            // 设置曲线个数
            this.options.series = new Array(1); 

            // 设置曲线名称及数据 
            this.options.series[0] = {
              //曲线名与图例名相对应才会显示
              name: res.result[0][1],
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
          console.warn('请求后台接口[getBusStockChart]异常!');
        }
      }).catch(err => {
        console.error(err);
      });
    });
  }
}
