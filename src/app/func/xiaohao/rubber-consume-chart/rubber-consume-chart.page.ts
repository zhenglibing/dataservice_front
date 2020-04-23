import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../../../wongoing/env.service';
import { EchartService } from '../../../wongoing/echart.service';
import { XiaohaoService } from '../xiaohao.service';

@Component({
  selector: 'app-rubber-consume-chart',
  templateUrl: './rubber-consume-chart.page.html',
  styleUrls: ['./rubber-consume-chart.page.scss'],
})
export class RubberConsumeChartPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;

  pageSize = 15;
  pageIndex = 1;

  options: any = {};   //echart图表选项

  input: any = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private env: EnvService, private echartService: EchartService, private xiaohaoService: XiaohaoService) { }

  ngOnInit() {
    // 获取查询参数
    this.input = this.activatedRoute.snapshot.queryParams;
    console.log('----------------rubber-consume-chart---------------');
    console.log('startDate = ' + this.input.startDate);
    console.log('endDate = ' + this.input.endDate);
    console.log('equipCode = ' + this.input.equipCode);
    console.log('shiftId = ' + this.input.shiftId);
    console.log('shiftName = ' + this.input.shiftName);
    console.log('materCode = ' + this.input.materCode);
    console.log('materName = ' + this.input.materName);

    this.initData();
  }

  /**
   * 初始化数据
   */
  public async initData() {
    const offset = (this.pageIndex - 1) * this.pageSize;
    let res: any = await this.xiaohaoService.getBusShopoutChart(this.input.startDate, this.input.endDate, this.input.equipCode, this.input.shiftId, this.input.materCode, this.pageSize, offset);
    console.log(res);
    if (res && res.state && res.state == '0') {
      if (res.result && res.result.length > 0) {
        this.initOptionData(res.result[0]);
      } else {
        console.warn('调用远程接口[getBusShopoutChart]时，没有获取到符合条件的数据!');
      }
    } else {
      console.warn('调用远程接口[getBusShopoutChart]异常！');
    }
  }

  /**
   * 初始化图形选项
   * @param chartData 图形数据
   */
  public initOptionData(chartData) {
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
    this.options.legend.data = new Array(chartData.legendData.length);
    for(let i = 0; i < chartData.legendData.length; i++) {
      this.options.legend.data[i] = {
        name: chartData.legendData[i],
        icon: 'rect',
      };
    }

    // 设置X轴的数据点
    this.options.xAxis.data = chartData.xAxisData;
    this.options.series = new Array(chartData.legendData.length);    // 设置曲线个数

    let tempmin = 0;
    let tempmax = 0;
    // 设置曲线及数据
    for(let i = 0; i < chartData.legendData.length; i++) {
      // 设置曲线名称及数据
      let values = [];
      chartData.seriesData[i].forEach(element => {
        values.push(element.value);
      });
      this.options.series[i] = {
        name: chartData.legendData[i],
        type: 'line',
        smooth: true,
        stack: '',
        data: values,
        yAxisIndex: 0,
        markLine: {},
      };
      // 设置Y轴最大值和最小值
      tempmin = Math.min(tempmin, Math.min.apply(null, values));
      tempmax = Math.max(tempmax, Math.max.apply(null, values));
    }

    this.options.yAxis.min = tempmin;
    this.options.yAxis.max = tempmax;
  }
}
