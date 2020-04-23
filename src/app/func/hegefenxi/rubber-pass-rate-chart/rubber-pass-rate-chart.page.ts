import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/wongoing/env.service';
import { EchartService } from 'src/app/wongoing/echart.service';
import { HegefenxiService } from '../hegefenxi.service';
@Component({
  selector: 'app-rubber-pass-rate-chart',
  templateUrl: './rubber-pass-rate-chart.page.html',
  styleUrls: ['./rubber-pass-rate-chart.page.scss'],
})
export class RubberPassRateChartPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  options: any = {};    // echart图标选项
  // 保存查询参数
  input: any = {};
  resultList: any;
  constructor(private env: EnvService, private translate: TranslateService, private router: Router, private activateRoute: ActivatedRoute, private echartService: EchartService, private hegefenxiService: HegefenxiService) { }

  ngOnInit() {
    this.getQueryParams();
    this.initData();
  }

  /**
   * 获取查询参数
   */
  public async getQueryParams() {
    this.input = this.activateRoute.snapshot.queryParams;
  }

  /**
   * 初始化数据
   */
  public async initData() {
    const res: any = await this.hegefenxiService.getRubberPassRate(this.input.startDate, this.input.endDate);
    console.log(res);
    if (res && res.state && res.state == '0') {
      this.resultList = res.result;
      this.initChartOption(this.resultList);
    } else {
      console.warn('请求远程接口[getRubberPassRate]异常!');
    }
  }

  /**
   * 初始化图标选项
   * @param data 图标数据
   */
  public async initChartOption(data) {
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
    this.options.legend.data = new Array(2);
    let names = [2];
    names[0] = await this.translate.get('rubberPassRateChart_dayQuaRate').toPromise();
    names[1] = await this.translate.get('rubberPassRateChart_cumulatedQuaRate').toPromise();
    this.options.legend.data[0] = { name: names[0], icon: 'rect' };
    this.options.legend.data[1] = { name: names[1], icon: 'rect' };
    
    // X轴的数据
    let xAxisValues = [];
    let yAxisValues1 = [];
    let yAxisValues2 = [];
    for(let i = 0; i < data.length; i++) {
      xAxisValues.push(data[i].checkDateSimple);
      yAxisValues1.push(data[i].dayPassRate);
      yAxisValues2.push(data[i].cumPassRate);
    }
    this.options.xAxis.data = xAxisValues;

    // 曲线数据
    this.options.series = new Array(2);
    this.options.series[0] = {
      name: names[0],
      type: 'line',
      smooth: true,
      stack: '',
      data: yAxisValues1,
      markLine: {},
    };
    this.options.series[1] = {
      name: names[1],
      type: 'line',
      smooth: true,
      stack: '',
      data: yAxisValues2,
      markLine: {},
    };

    const min1 = Math.min.apply(null, yAxisValues1);
    const min2 = Math.min.apply(null, yAxisValues2);
    const min = Math.min(min1, min2);

    const max1 = Math.max.apply(null, yAxisValues1);
    const max2 = Math.max.apply(null, yAxisValues2);
    const max = Math.max(max1, max2);

    this.options.yAxis.min = min;
    this.options.yAxis.max = max;
  }
}
