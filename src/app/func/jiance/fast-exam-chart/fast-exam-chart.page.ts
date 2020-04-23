import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { EnvService } from 'src/app/wongoing/env.service';
import { EchartService } from 'src/app/wongoing/echart.service';
import { JianceService } from '../jiance.service';

@Component({
  selector: 'app-fast-exam-chart',
  templateUrl: './fast-exam-chart.page.html',
  styleUrls: ['./fast-exam-chart.page.scss'],
})
export class FastExamChartPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  // 保存请求参数
  queryParam: any = {};
  item: any = {};

  // echart图表选项
  optionsAvg: any = {};     // 均值控制图图表选项
  optionsRange: any = {};   // 极差控制图图表选项
  constructor(private env: EnvService, private translate: TranslateService, private activatedRoute: ActivatedRoute, private storage: Storage, private echartService: EchartService, private jianceService: JianceService) { }

  ngOnInit() {
    this.getQueryParams();
    this.initData();
  }

  /**
   * 获取查询参数
   */
  public getQueryParams() {
    this.queryParam = this.activatedRoute.snapshot.queryParams;
  }

  /**
   * 从缓存中获取数据
   */
  public async initData() {
    const res: any = await this.jianceService.getFastExaminationItemList(this.queryParam.startDate, this.queryParam.endDate, this.queryParam.itemCode, this.queryParam.itemName, this.queryParam.equipCode, this.queryParam.shiftClassId, this.queryParam.materCode);
    console.log(res);
    if (res && res.state && res.state == '0') {
      const chartData = res.result;
      if (chartData && chartData.length > 0) {
        this.item = chartData[0];
        this.initAvgData(this.item);
        this.initRangeData(this.item);
      }
    } else {
      console.warn('调用远程接口[getFastExaminationItemList]异常!');
    }
  }

  /**
   * 初始化均值控制图
   * @param xbarData 均值控制图数据
   */
  public async initAvgData(xbarData) {
    let opXbarCtrLine = this.echartService.getMarkLineTemplate();
    /* mean value ucl,cl,lcl data setting */
    opXbarCtrLine.data[0][0].label.normal.formatter = 'UCL=' + xbarData.xbarUcl;
    opXbarCtrLine.data[0][0].tooltip.formatter = 'UCL=' + xbarData.xbarUcl;
    opXbarCtrLine.data[0][0].coord = [0, xbarData.xbarUcl];
    opXbarCtrLine.data[0][1].coord = [xbarData.xbarGroupAveArr.length - 1, xbarData.xbarUcl];
    opXbarCtrLine.data[1][0].label.normal.formatter = 'CL=' + xbarData.xbarAve;
    opXbarCtrLine.data[1][0].tooltip.formatter = 'CL=' + xbarData.xbarAve;
    opXbarCtrLine.data[1][0].coord = [0, xbarData.xbarAve];
    opXbarCtrLine.data[1][1].coord = [xbarData.xbarGroupAveArr.length - 1, xbarData.xbarAve];
    opXbarCtrLine.data[2][0].label.normal.formatter = 'LCL=' + xbarData.xbarLcl;
    opXbarCtrLine.data[2][0].tooltip.formatter = 'LCL=' + xbarData.xbarLcl;
    opXbarCtrLine.data[2][0].coord = [0, xbarData.xbarLcl];
    opXbarCtrLine.data[2][1].coord = [xbarData.xbarGroupAveArr.length - 1, xbarData.xbarLcl];

    this.optionsAvg = this.echartService.getLineOptionsTemplate(this.echartService.SuccessColor,
      this.echartService.InfoColor,
      this.echartService.TextColor,
      this.echartService.AxisLineColor,
      this.echartService.SplitLineColor);
    
    this.optionsAvg.title.subtext = '';
    // this.optionsAvg.legend = null;
    this.optionsAvg.grid.top = 10;
    this.optionsAvg.grid.bottom = 5;
    this.optionsAvg.left = 0;
    this.optionsAvg.right = '4%';

    let xAxisValues = [];
    if (xbarData.xbarGroupAveArr && xbarData.xbarGroupAveArr.length > 0) {
      for(let i = 0; i < xbarData.xbarGroupAveArr.length; i++) {
        xAxisValues.push(i);
      }
    }
    this.optionsAvg.xAxis.data = xAxisValues;

    const max = Math.max(Math.max.apply(null, xbarData.xbarGroupAveArr), xbarData.xbarUcl);
    const min = Math.min(Math.min.apply(null, xbarData.xbarGroupAveArr), xbarData.xbarLcl);

    this.optionsAvg.yAxis.min = this.echartService.getChartAxisMin(max, min);
    this.optionsAvg.yAxis.max = this.echartService.getChartAxisMax(max, min);

    this.optionsAvg.series[0].data = xbarData.xbarGroupAveArr;
    this.optionsAvg.series[0].markLine = opXbarCtrLine;   // 设置标线
  }

  /**
   * 初始化极差控制图
   * @param rangeData 极差控制图数据
   */
  public initRangeData(rangeData) {
    let opRangeCtrLine = this.echartService.getMarkLineTemplate();
    /* mean value ucl, cl, lcl data setting */
    opRangeCtrLine.data[0][0].label.normal.formatter = 'UCL=' + rangeData.rangeUcl;
    opRangeCtrLine.data[0][0].tooltip.formatter = 'UCL=' + rangeData.rangeUcl;
    opRangeCtrLine.data[0][0].coord = [0, rangeData.rangeUcl];
    opRangeCtrLine.data[0][1].coord = [rangeData.groupRangeArr.length - 1, rangeData.rangeUcl];
    opRangeCtrLine.data[1][0].label.normal.formatter = 'CL=' + rangeData.rangeAve;
    opRangeCtrLine.data[1][0].tooltip.formatter = 'CL=' + rangeData.rangeAve;
    opRangeCtrLine.data[1][0].coord = [0, rangeData.rangeAve];
    opRangeCtrLine.data[1][1].coord = [rangeData.groupRangeArr.length - 1, rangeData.rangeAve];
    opRangeCtrLine.data[2][0].label.normal.formatter = 'LCL=' + rangeData.rangeLcl;
    opRangeCtrLine.data[2][0].tooltip.formatter = 'LCL=' + rangeData.rangeLcl;
    opRangeCtrLine.data[2][0].coord = [0, rangeData.rangeLcl];
    opRangeCtrLine.data[2][1].coord = [rangeData.groupRangeArr.length - 1, rangeData.rangeLcl];

    this.optionsRange = this.echartService.getLineOptionsTemplate(this.echartService.SuccessColor,
      this.echartService.InfoColor,
      this.echartService.TextColor,
      this.echartService.AxisLineColor,
      this.echartService.SplitLineColor);

    this.optionsRange.title.subtext = '';
    // this.optionsAvg.legend = null;
    this.optionsRange.grid.top = 10;
    this.optionsRange.grid.bottom = 5;
    this.optionsRange.grid.left = 0;
    this.optionsRange.grid.right = '4%';

    let xAxisValues = [];
    if (rangeData.groupRangeArr && rangeData.groupRangeArr.length > 0) {
      for(let i = 0; i < rangeData.groupRangeArr.length; i++) {
        xAxisValues.push(i);
      }
    }
    this.optionsRange.xAxis.data = xAxisValues;

    const max = Math.max(Math.max.apply(null, rangeData.groupRangeArr), rangeData.rangeUcl);
    const min = Math.min(Math.min.apply(null, rangeData.groupRangeArr), rangeData.rangeLcl);

    this.optionsRange.yAxis.min = this.echartService.getChartAxisMin(max, min);
    this.optionsRange.yAxis.max = this.echartService.getChartAxisMax(max, min);

    this.optionsRange.series[0].data = rangeData.groupRangeArr;
    this.optionsRange.series[0].markLine = opRangeCtrLine;    // 设置标线
  }
}
