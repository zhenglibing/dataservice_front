import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EnvService } from 'src/app/wongoing/env.service';
import { EchartService } from 'src/app/wongoing/echart.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rubber-qua-spc-run-chart',
  templateUrl: './rubber-qua-spc-run-chart.page.html',
  styleUrls: ['./rubber-qua-spc-run-chart.page.scss'],
})
export class RubberQuaSpcRunChartPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  
  titleDate ='';
  titleDetail = '';
  input: any;

  initEntity = {
    average: 0,
    groupSize: 0,
    groupStdDev: 0,
    lsl: 0,
    max: 0,
    min: 0,
    negative3Signa: 0,
    positive3Signa: 0,
    sampleNum: 0,
    stdDev: 0,
    target: 0,
    usl: 0
  };

  options: any = {};

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
      let runChartData = qualitySPCListData[0].runChartData;
      // console.log(runChartData);
      this.initEntityData(runChartData);
      this.initOptionData(runChartData);
    }    
  }

  /**
   * 初始化实体数据
   * @param runChartData 要设置的数据对象
   */
  public initEntityData(runChartData) {
    this.initEntity.average = runChartData.average;
    this.initEntity.lsl = runChartData.lsl;
    this.initEntity.max = runChartData.max;
    this.initEntity.min = runChartData.min;
    this.initEntity.negative3Signa = runChartData.negative3Signa;
    this.initEntity.positive3Signa = runChartData.positive3Signa;
    this.initEntity.sampleNum = runChartData.sampleNum;
    this.initEntity.stdDev = runChartData.stdDev;
    this.initEntity.target = runChartData.target;
    this.initEntity.usl = runChartData.usl;
  }

  /**
   * 初始化图形选项
   * @param runChartData 数据对象
   */
  public async initOptionData(runChartData) {
    this.options = this.echartService.getLineOptionsTemplate(this.echartService.SuccessColor, 
      this.echartService.InfoColor, 
      this.echartService.TextColor, 
      this.echartService.AxisLineColor,
      this.echartService.SplitLineColor);
    
    this.options.title.subtext = '';      // 取消标题设置
    this.options.grid.top = 10;
    this.options.grid.bottom = 5;
    this.options.grid.left = 0;
    this.options.grid.right = '4%';

    let xAxisValues = [];
    if (runChartData.runChartData && runChartData.runChartData.length > 0) {
      for(let i = 0; i < runChartData.runChartData.length; i++) {
        xAxisValues.push(i);
      }
    }
    this.options.xAxis.name = await this.translate.get('generic_chart_serial').toPromise();
    this.options.xAxis.data = xAxisValues;

    this.options.yAxis.name = await this.translate.get('rubberQualitySPCResut_value_serialId').toPromise();
    this.options.yAxis.min = runChartData.min;
    this.options.yAxis.max = runChartData.max;

    this.options.series[0].name = await this.translate.get('rubberQualitySPCResut_value_serialId').toPromise();
    this.options.series[0].data = runChartData.runChartData;
    this.options.series[0].areaStyle = { normal: {} };
  }

}
