import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../../../wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { EchartService } from '../../../wongoing/echart.service';
import { TouruchuanchuService } from '../touruchuanchu.service';

@Component({
  selector: 'app-input-output-chart',
  templateUrl: './input-output-chart.page.html',
  styleUrls: ['./input-output-chart.page.scss'],
})
export class InputOutputChartPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;

  pageSize = 15;
  pageIndex = 1;

  options: any = {};   //echart图表选项

  input: any = {};
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private env: EnvService, private translate: TranslateService, private echartService: EchartService, private service: TouruchuanchuService) { }

  ngOnInit() {
    // 获取查询参数
    this.input = this.activatedRoute.snapshot.queryParams;
    this.initData();
  }

  /**
   * 初始化数据
   */
  public async initData() {
    const offset = (this.pageIndex - 1) * this.pageSize;
    let res: any = await this.service.getBusConsumOutputChart(this.input.startDate, this.input.endDat, this.input.equipCode, this.input.shiftId, this.pageSize, offset);
    console.log(res);
    if (res && res.state && res.state == '0') {
      this.initOptionData(res.result);  
    } else {
      console.warn('调用远程接口[getBusConsumOutputChart]异常!');
    }
  }

  /**
   * 初始化图形选项
   * @param chartData 图形选项
   */
  public async initOptionData(chartData) {
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
    const inputLegend = await this.translate.get('inputOutputChart_input_legend').toPromise();    // 投入
    const outputLegend = await this.translate.get('inputOutputChart_output_legend').toPromise();  // 产出
    console.log(inputLegend);
    console.log(outputLegend);
    this.options.legend.data = [ {
      name: inputLegend,
      icon: 'rect',
    }, {
      name: outputLegend,
      icon: 'rect',
    } ];

    let xAxisData = [];
    let yAxisData = [[],[]];

    chartData.forEach( element => {
      xAxisData.push(element[2]);   // 日期
      yAxisData[0].push(element[3]);
      yAxisData[1].push(element[4]);
    });

    // 设置X轴的数据点
    this.options.xAxis.data = xAxisData;
    // 设置曲线个数
    this.options.series = new Array(this.options.legend.data.length);
    
    for(let i = 0; i < this.options.legend.data.length; i++) {

      this.options.series[i] = {
        name : this.options.legend.data[i].name,
        type: 'line',
        smooth: true,
        stack: '',
        data: yAxisData[i],
        markLine: {},
      }
    }

    let tempmin = Math.min(Math.min.apply(null, yAxisData[0]), Math.min.apply(null, yAxisData[1]));
    let tempmax = Math.max(Math.max.apply(null, yAxisData[0]), Math.max.apply(null, yAxisData[1]));

    this.options.yAxis.min = tempmin;
    this.options.yAxis.max = tempmax;
  }
}
