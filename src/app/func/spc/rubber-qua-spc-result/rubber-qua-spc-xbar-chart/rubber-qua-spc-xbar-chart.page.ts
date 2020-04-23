import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EnvService } from 'src/app/wongoing/env.service';
import { EchartService } from 'src/app/wongoing/echart.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rubber-qua-spc-xbar-chart',
  templateUrl: './rubber-qua-spc-xbar-chart.page.html',
  styleUrls: ['./rubber-qua-spc-xbar-chart.page.scss'],
})
export class RubberQuaSpcXbarChartPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;

  titleDate ='';
  titleDetail = '';
  input: any;

  // echart图表选项
  optionsAvg:any = { };
  optionsRange:any = { };

  constructor(private env: EnvService, private storage: Storage, private translate: TranslateService, private echartService: EchartService) { }

  ngOnInit() {
    this.initTitle();
    this.initData();
  }

  /**
   * 初始化标题数据
   */
  public async initTitle() {
    this.input = await this.storage.get('inputQueryParams');
    this.titleDate = this.input.startDate + '~' + this.input.endDate;
    this.titleDetail = await this.translate.get('rubberQualitySPCResut_detail_title').toPromise();
    this.titleDetail = this.titleDetail.replace(/selectedOptionEquip/g, this.input.equipName).replace(/selectedOptionShift/g, this.input.shiftClassName).replace(/selectedOptionItem/g, this.input.itemName);
  }

  public async initData() {
    let qualitySPCListData = await this.storage.get('qualitySPCListData');
    if (qualitySPCListData && qualitySPCListData.length > 0) {
      let xbarData = qualitySPCListData[0].xbarRData;
      // console.log(xbarData);
      this.initAvgData(xbarData);
      this.initRangeData(xbarData);
    }    
  }

  /**
   * 初始化均值控制图
   * @param xbarData 均值控制图数据
   */
  public initAvgData(xbarData) {
    let opXbarCtrLine = this.echartService.getMarkLineTemplate();
    /*mean value ucl,cl,lcl data setting*/
    opXbarCtrLine.data[0][0].label.normal.formatter = 'UCL=' + xbarData.xbarChartUCL;
    opXbarCtrLine.data[0][0].tooltip.formatter = 'UCL=' + xbarData.xbarChartUCL;
    opXbarCtrLine.data[0][0].coord = [0, xbarData.xbarChartUCL];
    opXbarCtrLine.data[0][1].coord = [xbarData.xbarRGroupAve.length - 1, xbarData.xbarChartUCL];
    opXbarCtrLine.data[1][0].label.normal.formatter = 'CL=' + xbarData.xbarRTotalAve;
    opXbarCtrLine.data[1][0].tooltip.formatter = 'CL=' + xbarData.xbarRTotalAve;
    opXbarCtrLine.data[1][0].coord = [0,xbarData.xbarRTotalAve];
    opXbarCtrLine.data[1][1].coord = [xbarData.xbarRGroupAve.length - 1, xbarData.xbarRTotalAve];
    opXbarCtrLine.data[2][0].label.normal.formatter = 'LCL=' + xbarData.xbarChartLCL;
    opXbarCtrLine.data[2][0].tooltip.formatter = 'LCL=' + xbarData.xbarChartLCL;
    opXbarCtrLine.data[2][0].coord = [0,xbarData.xbarChartLCL];
    opXbarCtrLine.data[2][1].coord = [xbarData.xbarRGroupAve.length - 1, xbarData.xbarChartLCL];

    this.optionsAvg = this.echartService.getLineOptionsTemplate(this.echartService.SuccessColor, 
      this.echartService.InfoColor, 
      this.echartService.TextColor, 
      this.echartService.AxisLineColor,
      this.echartService.SplitLineColor);
    
    this.optionsAvg.title.subtext = '';
    // this.optionsAvg.legend = null;
    this.optionsAvg.grid.top = 10;
    this.optionsAvg.grid.bottom = 5;
    this.optionsAvg.grid.left = 0;
    this.optionsAvg.grid.right = '4%';

    let xAxisValues = [];
    if (xbarData.xbarRGroupAve && xbarData.xbarRGroupAve.length > 0) {
      for(let i = 0; i < xbarData.xbarRGroupAve.length; i++) {
        xAxisValues.push(i);
      }
    }
    this.optionsAvg.xAxis.data = xAxisValues;

    const max = Math.max(Math.max.apply(null, xbarData.xbarRGroupAve), xbarData.xbarChartUCL);
    const min = Math.min(Math.min.apply(null, xbarData.xbarRGroupAve), xbarData.xbarChartLCL);

    this.optionsAvg.yAxis.min = this.echartService.getChartAxisMin(max, min);
    this.optionsAvg.yAxis.max = this.echartService.getChartAxisMax(max, min);

    this.optionsAvg.series[0].data = xbarData.xbarRGroupAve;
    this.optionsAvg.series[0].markLine = opXbarCtrLine; // 设置标线
  }

  /**
   * 初始化极差控制图
   * @param rangeData 极差控制图数据
   */
  public initRangeData(rangeData) {
    let opRangeCtrLine = this.echartService.getMarkLineTemplate();
    /*mean value ucl, cl, lcl data setting*/
    opRangeCtrLine.data[0][0].label.normal.formatter = 'UCL=' + rangeData.rangeChartUCL;
    opRangeCtrLine.data[0][0].tooltip.formatter = 'UCL=' + rangeData.rangeChartUCL;
    opRangeCtrLine.data[0][0].coord = [0, rangeData.rangeChartUCL];
    opRangeCtrLine.data[0][1].coord = [rangeData.xbarRGroupRangeArr.length - 1, rangeData.rangeChartUCL];
    opRangeCtrLine.data[1][0].label.normal.formatter = 'CL=' + rangeData.rangeAve;
    opRangeCtrLine.data[1][0].tooltip.formatter = 'CL=' + rangeData.rangeAve;
    opRangeCtrLine.data[1][0].coord = [0, rangeData.rangeAve];
    opRangeCtrLine.data[1][1].coord = [rangeData.xbarRGroupRangeArr.length - 1, rangeData.rangeAve];
    opRangeCtrLine.data[2][0].label.normal.formatter = 'LCL=' + rangeData.rangeChartLCL;
    opRangeCtrLine.data[2][0].tooltip.formatter = 'LCL=' + rangeData.rangeChartLCL;
    opRangeCtrLine.data[2][0].coord = [0, rangeData.rangeChartLCL];
    opRangeCtrLine.data[2][1].coord = [rangeData.xbarRGroupRangeArr.length - 1, rangeData.rangeChartLCL];


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
    if (rangeData.xbarRGroupRangeArr && rangeData.xbarRGroupRangeArr.length > 0) {
      for(let i = 0; i < rangeData.xbarRGroupRangeArr.length; i++) {
        xAxisValues.push(i);
      }
    }
    this.optionsRange.xAxis.data = xAxisValues;

    const max = Math.max(Math.max.apply(null, rangeData.xbarRGroupRangeArr), rangeData.rangeChartUCL);
    const min = Math.min(Math.min.apply(null, rangeData.xbarRGroupRangeArr), rangeData.rangeChartLCL);

    this.optionsRange.yAxis.min = this.echartService.getChartAxisMin(max, min);
    this.optionsRange.yAxis.max = this.echartService.getChartAxisMax(max, min);

    this.optionsRange.series[0].data = rangeData.xbarRGroupRangeArr;
    this.optionsRange.series[0].markLine = opRangeCtrLine; // 设置标线
  }
}
