import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { EnvService } from 'src/app/wongoing/env.service';
import { EchartService } from 'src/app/wongoing/echart.service';

@Component({
  selector: 'app-rubber-qua-spc-power-chart',
  templateUrl: './rubber-qua-spc-power-chart.page.html',
  styleUrls: ['./rubber-qua-spc-power-chart.page.scss'],
})
export class RubberQuaSpcPowerChartPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  
  titleDate ='';
  titleDetail = '';
  input: any;

  initEntity = {
    /* Statistic value */
    'sampleNum': 0,
    'max': 0,
    'min': 0,
    'average': 0,
    /* common value */
    'groupSize': 0,
    'usl': 0,
    'target': 0,
    'lsl': 0,
    /* Calculation value， negative3Signa is UCL, positive3Signa is LCL*/
    'stdDev': 0,
    'negative3Signa': 0,
    'positive3Signa': 0,
    /* Long-term process capability */
    'pp': 0,
    'ppk': 0,
    'ppl': 0,
    'ppu': 0,
    /* Short-term process capability */
    'cp': 0,
    'cpk': 0,
    'cpl': 0,
    'cpu': 0,
    /* Really PPM value */
    'ppmLessLsl': 0,
    'ppmMoreUsl': 0,
    'ppmTotal': 0,
    /* Others */
    'ca': 0,
    'judge': {
      'description': '',
      'judge': ''
    }
  };

  // 标线变量-控制线定义USL、UCL、MEAN、LCL、LSL五条标线的数据结构
  opNormalCtrLine: any= {};
  // echart图表选项
  options:any = { };

  constructor(private env: EnvService, private translate: TranslateService, private storage: Storage, private echartService: EchartService) { }

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

  /**
   * 初始化数据
   */
  public async initData() {
    let qualitySPCListData = await this.storage.get('qualitySPCListData');
    if (qualitySPCListData && qualitySPCListData.length > 0) {
      let pcData = qualitySPCListData[0].processCababilityData;
      // console.log(pcData);
      this.initEntityData(pcData);
      this.initOptionData(pcData);
    }
  }

  /**
   * 初始化实体数据
   * @param pcData 要设置的数据对象
   */
  public initEntityData(pcData) {
    this.initEntity.sampleNum = pcData.sampleNum;
    this.initEntity.max = pcData.max;
    this.initEntity.min = pcData.min;
    this.initEntity.average = pcData.average;
    this.initEntity.groupSize = pcData.groupSize;
    this.initEntity.usl = pcData.usl;
    this.initEntity.target = pcData.target;
    this.initEntity.lsl = pcData.lsl;
    this.initEntity.stdDev = pcData.stdDev;
    this.initEntity.positive3Signa = pcData.positive3Signa;
    this.initEntity.negative3Signa = pcData.negative3Signa;
    this.initEntity.ppk = pcData.ppk;
    this.initEntity.pp = pcData.pp;
    this.initEntity.ppl = pcData.ppl;
    this.initEntity.ppu = pcData.ppu;
    this.initEntity.cpk = pcData.cpk;
    this.initEntity.cp = pcData.cp;
    this.initEntity.cpl = pcData.cpl;
    this.initEntity.cpu = pcData.cpu;
    this.initEntity.ppmLessLsl = pcData.ppmLessLsl;
    this.initEntity.ppmMoreUsl = pcData.ppmMoreUsl;
    this.initEntity.ppmTotal = pcData.ppmTotal;
    this.initEntity.judge = pcData.judge;
    this.initEntity.ca = pcData.ca;
  }

  /**
   * 初始化echarts图形选项数据
   * @param pcData 
   */
  public async initOptionData(pcData) {

    this.opNormalCtrLine = this.echartService.getNormalMarkLineTemplate();
    // 均值线
    this.opNormalCtrLine.data[0][0].coord = [pcData.average,0];
    this.opNormalCtrLine.data[0][0].name = await this.translate.get('generic_spc_average_statistics').toPromise();
    this.opNormalCtrLine.data[0][0].tooltip.formatter = await this.translate.get('generic_spc_average_statistics').toPromise() +':'+pcData.average.toFixed(3);
    this.opNormalCtrLine.data[0][0].label.normal.formatter = await this.translate.get('generic_spc_average_statistics').toPromise();
    this.opNormalCtrLine.data[0][1].coord = [pcData.average,pcData.chartData.yMaxAxis];
    // +3sigma
    this.opNormalCtrLine.data[1][0].coord = [pcData.positive3Signa,0];
    this.opNormalCtrLine.data[1][0].name = 'UCL';
    this.opNormalCtrLine.data[1][0].tooltip.formatter = 'UCL:'+pcData.positive3Signa.toFixed(3);
    this.opNormalCtrLine.data[1][0].label.normal.formatter = 'UCL';
    this.opNormalCtrLine.data[1][1].coord = [pcData.positive3Signa,pcData.chartData.yMaxAxis];
    // -3sigma
    this.opNormalCtrLine.data[2][0].coord = [pcData.negative3Signa,0];
    this.opNormalCtrLine.data[2][0].name = 'LCL';
    this.opNormalCtrLine.data[2][0].tooltip.formatter = 'LCL:'+pcData.negative3Signa.toFixed(3);
    this.opNormalCtrLine.data[2][0].label.normal.formatter = 'LCL';
    this.opNormalCtrLine.data[2][1].coord = [pcData.negative3Signa,pcData.chartData.yMaxAxis];
    // usl
    this.opNormalCtrLine.data[3][0].coord = [pcData.usl,0];
    this.opNormalCtrLine.data[3][0].name = 'USL';
    this.opNormalCtrLine.data[3][0].tooltip.formatter = 'USL:'+pcData.usl.toFixed(3);
    this.opNormalCtrLine.data[3][0].label.normal.formatter = 'USL';
    this.opNormalCtrLine.data[3][1].coord = [pcData.usl,pcData.chartData.yMaxAxis];
    // lsl
    this.opNormalCtrLine.data[4][0].coord = [pcData.lsl,0];
    this.opNormalCtrLine.data[4][0].name = 'LSL';
    this.opNormalCtrLine.data[4][0].tooltip.formatter = 'LSL:'+pcData.lsl.toFixed(3);
    this.opNormalCtrLine.data[4][0].label.normal.formatter = 'LSL';
    this.opNormalCtrLine.data[4][1].coord = [pcData.lsl,pcData.chartData.yMaxAxis];


    const density = await this.translate.get('rubQuaSPCPowerChart_density_y_chart').toPromise();   // 密度

    this.options = this.echartService.getNormalOptionsTemplate(this.echartService.SuccessColor, 
      this.echartService.InfoColor, 
      this.echartService.TextColor, 
      this.echartService.AxisLineColor,
      this.echartService.SplitLineColor);
    this.options.title.subtext = '';    // 取消标题设置
    this.options.xAxis[0].min = pcData.chartData.minAxis;           // 设置X轴坐标的最小值
    this.options.xAxis[0].max = pcData.chartData.maxAxis;           // 设置X轴坐标的最大值

    this.options.yAxis[0].name = this.input.itemName + density;     // 第1个Y轴坐标名称
    this.options.yAxis[1].name = this.input.itemName;               // 第2个Y轴坐标名称

    // 曲线图
    this.options.series[0].name = this.input.itemName;          // 检测项
    this.options.series[0].data = pcData.chartData.normalAxis;

    // 柱状图
    this.options.series[1].name = this.input.itemName + density;
    this.options.series[1].barMaxWidth = this.echartService.getBarWithByGroupNum(pcData.groupNum);    // 根据分组数获取柱状图每个柱的宽度
    this.options.series[1].data = pcData.chartData.histogramAxis;
    
    // 设置标线
    this.options.series[0].markLine = this.opNormalCtrLine;
  }
}
