import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../../../wongoing/env.service';
import { EchartService } from '../../../wongoing/echart.service';
import { RubberProductChartService } from './rubber-product-chart.service';

@Component({
  selector: 'app-rubber-product-chart',
  templateUrl: './rubber-product-chart.page.html',
  styleUrls: ['./rubber-product-chart.page.scss'],
})
export class RubberProductChartPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  options: any = {};   // echart图表选项

  /** 保存查询参数 */
  startDate: any = '2016/03/15';
  endDate: any = '2016/03/30';
  equipCode: any = '';
  shiftClassId: any = '全部';
  rubTypeName: any = '全部';
  mKindName: any = '全部';
  materCode: any = '';
  materName: any = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private env: EnvService, private echartService: EchartService, private service: RubberProductChartService) { }

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
      this.equipCode = param['equipCode'];
      this.shiftClassId = param['shiftClassId'];
      this.rubTypeName = param['rubTypeName'];
      this.mKindName = param['mKindName'];
      this.materCode = param['materCode'];
      this.materName = param['materName'];

      this.startDate = this.startDate.substring(0, 10);
      this.startDate.replace(new RegExp(/(-)/g), '/');
    
      this.endDate = this.endDate.substring(0, 10);
      this.endDate.replace(new RegExp(/(-)/g), '/');

      console.log('startDate = ' + this.startDate);
      console.log('endDate = ' + this.endDate);
      console.log('equipCode =' + this.equipCode);
      console.log('shiftClassId = ' + this.shiftClassId);
      console.log('rubTypeName = ' + this.rubTypeName);
      console.log('mKindName = ' + this.rubTypeName);
      console.log('materCode = ' + this.materCode);
      console.log('materName = ' + this.materName);
      // console.log('----------------------------------------');
      // console.log(this.equipList);
      this.service.getBusProductionChart(this.startDate,
                                          this.endDate,
                                          this.equipCode,
                                          this.shiftClassId,
                                          this.rubTypeName,
                                          this.mKindName,
                                          this.materCode).then((res: any) => {
        if (res && res.state && res.state === '0') {
          console.log(res);
          if (res.result && res.result.length > 0) {
            this.options = this.echartService.getLineOptionsTemplate(this.echartService.SuccessColor,
                                                                    this.echartService.InfoColor,
                                                                    this.echartService.TextColor,
                                                                    this.echartService.AxisLineColor,
                                                                    this.echartService.SplitLineColor);
            
            // 设置标题文本
            this.options.title.subtext = '';
            this.options.grid.top = 30;
            this.options.grid.bottom = 5;
            this.options.grid.left = 0;
            this.options.grid.right = '4%';
            // 设置图例
            this.options.legend.data = new Array(res.result[0].equipList.length);
            for(let i = 0; i < res.result[0].equipList.length; i++) {
              this.options.legend.data[i] = {
                name: res.result[0].equipList[i],
                icon: 'rect',
                // textStyle: { color: this.echartservice.Colors[i] }
              };
            }
            this.options.xAxis.data = res.result[0].dateList;               // 设置X轴的数据的点
            this.options.series = new Array(res.result[0].equipDataList.length);    // 设置曲线个数

            for(let i = 0; i < res.result[0].equipDataList.length; i++) {
              // 设置曲线名称及数据 
              this.options.series[i] = {
                name: res.result[0].equipList[i],
                type:'line',
                smooth : true,
                stack: '',
                data: res.result[0].equipDataList[i],
                markLine: { },
                // lineStyle: {
                //   color: this.echartservice.Colors[i]
                // }
              };
              // 设置Y轴最小值
              let tempmin = Math.min.apply(null, res.result[0].equipDataList[i]);
              this.options.yAxis.min = Math.min(tempmin, this.options.yAxis.min);

              // 设置Y轴最大值
              let tempmax = Math.max.apply(null, res.result[0].equipDataList[i]);
              this.options.yAxis.max = Math.max(tempmax, this.options.yAxis.max);
            }
          }
        } else {
          console.warn('请求后台接口[getBusProductionResult]异常!');
        }
      }).catch(err => {
        console.error(err);
      });
    });
  }
}
