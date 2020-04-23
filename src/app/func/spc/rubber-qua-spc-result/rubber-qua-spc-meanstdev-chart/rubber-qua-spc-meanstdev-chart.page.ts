import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EnvService } from 'src/app/wongoing/env.service';
import { EchartService } from 'src/app/wongoing/echart.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rubber-qua-spc-meanstdev-chart',
  templateUrl: './rubber-qua-spc-meanstdev-chart.page.html',
  styleUrls: ['./rubber-qua-spc-meanstdev-chart.page.scss'],
})
export class RubberQuaSpcMeanstdevChartPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  
  titleDate ='';
  titleDetail = '';
  input: any;

  // echart图表选项
  optionsXbar:any = { };
  optionsStdDev:any = { };

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
      let xbarData = qualitySPCListData[0].xbarSData;
      // console.log(xbarData);
      this.initXbarData(xbarData);
      this.initStdDevData(xbarData);
    }    
  }

  /**
   * 初始化均值控制图
   * @param xbarData 
   */
  public initXbarData(xbarData) {
    let opXbarCtrLine = this.echartService.getMarkLineTemplate();
    /*mean value ucl,ucl,cl data setting*/
    opXbarCtrLine.data[0][0].label.normal.formatter = 'UCL=' + xbarData.xbarChartUCL;
    opXbarCtrLine.data[0][0].tooltip.formatter = 'UCL=' + xbarData.xbarChartUCL;
    opXbarCtrLine.data[0][0].coord = [0, xbarData.xbarChartUCL];
    opXbarCtrLine.data[0][1].coord = [xbarData.xbarSGroupAveArr.length - 1, xbarData.xbarChartUCL];
    opXbarCtrLine.data[1][0].label.normal.formatter = 'CL=' + xbarData.xbarSTotalAve;
    opXbarCtrLine.data[1][0].tooltip.formatter = 'CL=' + xbarData.xbarSTotalAve;
    opXbarCtrLine.data[1][0].coord = [0, xbarData.xbarSTotalAve];
    opXbarCtrLine.data[1][1].coord = [xbarData.xbarSGroupAveArr.length - 1, xbarData.xbarSTotalAve];
    opXbarCtrLine.data[2][0].label.normal.formatter = 'LCL=' + xbarData.xbarChartLCL;
    opXbarCtrLine.data[2][0].tooltip.formatter = 'LCL=' + xbarData.xbarChartLCL;
    opXbarCtrLine.data[2][0].coord = [0, xbarData.xbarChartLCL];
    opXbarCtrLine.data[2][1].coord = [xbarData.xbarSGroupAveArr.length - 1, xbarData.xbarChartLCL];

    this.optionsXbar = this.echartService.getLineOptionsTemplate(this.echartService.SuccessColor, 
      this.echartService.InfoColor, 
      this.echartService.TextColor, 
      this.echartService.AxisLineColor,
      this.echartService.SplitLineColor);
    
    this.optionsXbar.title.subtext = '';
    // this.optionsAvg.legend = null;
    this.optionsXbar.grid.top = 10;
    this.optionsXbar.grid.bottom = 5;
    this.optionsXbar.grid.left = 0;
    this.optionsXbar.grid.right = '4%';

    let xAxisValues = [];
    if (xbarData.xbarSGroupAveArr && xbarData.xbarSGroupAveArr.length > 0) {
      for(let i = 0; i < xbarData.xbarSGroupAveArr.length; i++) {
        xAxisValues.push(i);
      }
    }
    this.optionsXbar.xAxis.data = xAxisValues;

    const max = Math.max(Math.max.apply(null, xbarData.xbarSGroupAveArr), xbarData.xbarChartUCL);
    const min = Math.min(Math.min.apply(null, xbarData.xbarSGroupAveArr), xbarData.xbarChartLCL);

    this.optionsXbar.yAxis.min = this.echartService.getChartAxisMin(max, min);
    this.optionsXbar.yAxis.max = this.echartService.getChartAxisMax(max, min);

    this.optionsXbar.series[0].data = xbarData.xbarSGroupAveArr;
    this.optionsXbar.series[0].markLine = opXbarCtrLine; // 设置标线
  }

  /**
   * 初始化极差控制图
   * @param rangeData 
   */
  public initStdDevData(stdDevData) {
    let opStdDevCtrLine = this.echartService.getMarkLineTemplate();
    /*mean value ucl,ucl,cl data setting*/
    opStdDevCtrLine.data[0][0].label.normal.formatter = 'UCL=' + stdDevData.stdChartUCL;
    opStdDevCtrLine.data[0][0].tooltip.formatter = 'UCL=' + stdDevData.stdChartUCL;
    opStdDevCtrLine.data[0][0].coord = [0, stdDevData.stdChartUCL];
    opStdDevCtrLine.data[0][1].coord = [stdDevData.groupStdDevArr.length - 1, stdDevData.stdChartUCL];
    opStdDevCtrLine.data[1][0].label.normal.formatter = 'CL=' + stdDevData.meanStdDev;
    opStdDevCtrLine.data[1][0].tooltip.formatter = 'CL=' + stdDevData.meanStdDev;
    opStdDevCtrLine.data[1][0].coord = [0, stdDevData.meanStdDev];
    opStdDevCtrLine.data[1][1].coord = [stdDevData.groupStdDevArr.length - 1, stdDevData.meanStdDev];
    opStdDevCtrLine.data[2][0].label.normal.formatter = 'LCL=' + stdDevData.stdChartLCL;
    opStdDevCtrLine.data[2][0].tooltip.formatter = 'LCL=' + stdDevData.stdChartLCL;
    opStdDevCtrLine.data[2][0].coord = [0, stdDevData.stdChartLCL];
    opStdDevCtrLine.data[2][1].coord = [stdDevData.groupStdDevArr.length - 1, stdDevData.stdChartLCL];


    this.optionsStdDev = this.echartService.getLineOptionsTemplate(this.echartService.SuccessColor, 
      this.echartService.InfoColor, 
      this.echartService.TextColor, 
      this.echartService.AxisLineColor,
      this.echartService.SplitLineColor);
    
    this.optionsStdDev.title.subtext = '';
    // this.optionsAvg.legend = null;
    this.optionsStdDev.grid.top = 10;
    this.optionsStdDev.grid.bottom = 5;
    this.optionsStdDev.grid.left = 0;
    this.optionsStdDev.grid.right = '4%';

    let xAxisValues = [];
    if (stdDevData.groupStdDevArr && stdDevData.groupStdDevArr.length > 0) {
      for(let i = 0; i < stdDevData.groupStdDevArr.length; i++) {
        xAxisValues.push(i);
      }
    }
    this.optionsStdDev.xAxis.data = xAxisValues;

    const max = Math.max(Math.max.apply(null, stdDevData.groupStdDevArr), stdDevData.stdChartUCL);
    const min = Math.min(Math.min.apply(null, stdDevData.groupStdDevArr), stdDevData.stdChartUCL);

    this.optionsStdDev.yAxis.min = this.echartService.getChartAxisMin(max, min);
    this.optionsStdDev.yAxis.max = this.echartService.getChartAxisMax(max, min);

    this.optionsStdDev.series[0].data = stdDevData.groupStdDevArr;
    this.optionsStdDev.series[0].markLine = opStdDevCtrLine; // 设置标线
  }
}
