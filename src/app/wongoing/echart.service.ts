import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EchartService {

  public SuccessColor: any = '#a52a2a';
  public InfoColor: any = '#3880ff';
  public TextColor: any = '#000000';
  public AxisLineColor: any = '#7044ff';
  public SplitLineColor: any = '#cccccc';
  public BackgroundColor: any = '#ffffff';

  public Colors: any = ['#a52a2a', '#008000', '#000080', '#800080', '#808000', '#008080', '#ffaa500', '#7fffd4', '#deb887', '#5f9ea0', '#ff7f50', '#6495ed'];

  constructor() { }
  /**
     * 获取eCharts Line图表的options模版
     * @param successColor 主线条颜色1
     * @param infoColor 主线条颜色2
     * @param textColor 文本颜色
     * @param axisLineColor 坐标线颜色
     * @param splitLineColor 分割线颜色
     */
    public getLineOptionsTemplate(successColor: any, infoColor: any, textColor: any, axisLineColor: any, splitLineColor: any) {
      var options: any = {
      backgroundColor: this.BackgroundColor,
      color: [successColor, infoColor],
      title: {
          textStyle: {
              color: textColor,
          },
          top: 0,
          padding: 0,
          itemGap: 0,
          subtext: '最大值：最小值：均值：方差：',
          subtextStyle: {
              color: textColor,
          }
      },
      legend: {
        data: [
          {
            name: '系列1',
            icon: 'cicle',
            textStyle: {
              color: this.SuccessColor
            }
          }
        ]
      },
      animation: false,
      tooltip: {
          trigger: 'axis'
      },
      grid: {
          top: 40,
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLine: {
              lineStyle: {
                  color: axisLineColor,
              },
          },
          axisLabel: {
              textStyle: {
                  color: textColor,
              },
              rotate: 60
          },
          data: []
      },
      yAxis: {
          type: 'value',
          scale : true,
          axisLine: {
              lineStyle: {
                  color: axisLineColor,
              },
          },
          splitLine: {
              lineStyle: {
                  color: splitLineColor,
              },
          },
          axisLabel: {
              textStyle: {
                  color: textColor,
              },
          },
          min : 0,
          max : 0
      },
      series: [
          {
              name:'',
              type:'line',
              smooth : true,
              stack: '',
              data:[],
              markLine: { }
          }
      ],
      };
      return options;
  }

  /**
   * 获取echarts图表标线模版，定义UCL、MEAN、LCL三条标线的数据结构
   */
  public getMarkLineTemplate() {
      var markLineTemplate: any = {
          animation: true,
          data: [
              [{
                  coord: [],
                  symbol: 'none',
                  name: '',
                  lineStyle: {
                      normal: {
                          type: 'dotted'
                      }
                  },
                  tooltip: {
                      formatter: ''
                  },
                  label: {
                      normal: {
                          formatter: '',
                          textStyle: {
                              align: 'right',
                              baseline: 'bottom'
                          }
                      }
                  }
              },{
                  coord: [],
                  symbol: 'none'
              }],
              [{
                  coord: [],
                  symbol: 'none',
                  lineStyle: {
                      normal: {
                          type: 'dashed'
                      }
                  },
                  tooltip: {
                      formatter: ''
                  },
                  label: {
                      normal: {
                          formatter: '',
                          textStyle: {
                              align: 'right',
                              baseline: 'bottom'
                          }
                      }
                  }
              },{
                  coord: [],
                  symbol: 'none'
              }],
              [{
                  coord: [],
                  symbol: 'none',
                  lineStyle: {
                      normal: {
                          type: 'dotted'
                      }
                  },
                  tooltip: {
                      formatter: ''
                  },
                  label: {
                      normal: {
                          formatter: '',
                          textStyle: {
                              align: 'right',
                              baseline: 'bottom'
                          }
                      }
                  }
              },{
                  coord: [],
                  symbol: 'none'
              }]
          ]
      };
      return markLineTemplate;
  }
   /**
   * 获取echarts图表标点模版，定义max、min点的数据结构
   */
  public getMarkPointTemplate() {
      var markPointTemplate: any = {
          animation: true,
          data:[{
                  symbol: 'pin',
                  name: '最大值',
              },{
                  symbol: 'pin',
                  name: '最小值'
              }],
      };
      return markPointTemplate;
  }
  /**
   * 获取eCharts 过程能力图表的options模版
   * @param successColor 主线条颜色1
   * @param infoColor 主线条颜色2
   * @param textColor 文本颜色
   * @param axisLineColor 坐标线颜色
   * @param splitLineColor 分割线颜色
   */
  public getNormalOptionsTemplate(successColor: any, infoColor: any, textColor: any, axisLineColor: any, splitLineColor: any) {
      var options: any = {
      backgroundColor: this.BackgroundColor.bg,
      color: [successColor, infoColor],
      title: {
          textStyle: {
              color: textColor,
          },
          top: 0,
          padding: 0,
          itemGap: 0,
          subtext: '最大值：最小值：均值：方差：',
          subtextStyle: {
              color: textColor,
          }
      },
      animation: true,
      tooltip: {
          trigger: 'axis',
          formatter:''
      },
      grid: {
          top: 40,
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true
      },
      xAxis: [{
          axisLine: {
              lineStyle: {
                  color: axisLineColor,
              },
          },
          splitLine: {
              lineStyle: {
                  color: splitLineColor,
              },
          },
          axisLabel: {
              textStyle: {
                  color: textColor,
              }
          },
          min : 0.0,
          max : 0.0,
      }],
      yAxis: [{
          name: '重量密度',
          type: 'value',
          position: 'right',
          axisLine: {
              lineStyle: {
                  color: axisLineColor,
              },
          },
          splitLine: false,
          axisLabel: {
              formatter: '{value}'
          },
      },{
          name: '重量',
          type: 'value',
          position: 'left',
          yAxisIndex: 1,
          axisLine: {
              lineStyle: {
                  color: axisLineColor,
              },
          },
          splitLine: {
              lineStyle: {
                  color: splitLineColor,
              },
          },
          axisLabel: {
              textStyle: {
                  color: textColor,
              },
              formatter: '{value}'
          },
      }],
      series: [
          {
              name:'重量',
              type:'line',
              yAxisIndex: 1,
              smooth : true,
              data:[],
              markLine: { }
          },{
              name:'重量密度',
              type:'bar',
              barMaxWidth:'30%',
              data:[]
          }
      ],};
      return options;
  }

  /**
   * 获取echarts 正态分布图标线模版，定义USL、UCL、MEAN、LCL、LSL五条标线的数据结构
   */
  public getNormalMarkLineTemplate() {
      var markLineTemplate: any = {
          animation: true,
          data: [
          [{
              coord: [],
              symbol: 'none',
              name: '',
              lineStyle: {
                  normal: {
                      type: 'dotted'
                  }
              },
              tooltip: {
                  formatter: ''
              },
              label: {
                  normal: {
                          formatter: '',
                          textStyle: {
                              align: 'center'
                          }
                  }
              }
          },{
              coord: [],
              symbol: 'none'
          }],
          [{
              coord: [],
              symbol: 'none',
              lineStyle: {
                  normal: {
                      type: 'dashed'
                  }
              },
              tooltip: {
                  formatter: ''
              },
              label: {
                  normal: {
                      formatter: '',
                      textStyle: {
                              align: 'center',
                          baseline: 'bottom'
                      }
                  }
              }
          },{
              coord: [],
              symbol: 'none'
          }],
          [{
              coord: [],
              symbol: 'none',
              lineStyle: {
                  normal: {
                      type: 'dashed'
                  }
              },
              tooltip: {
                  formatter: ''
              },
              label: {
                  normal: {
                      formatter: '',
                      textStyle: {
                              align: 'center',
                          baseline: 'bottom'
                      }
                  }
              }
          },{
              coord: [],
              symbol: 'none'
          }],
          [{
              coord: [],
              symbol: 'none',
              lineStyle: {
                  normal: {
                      type: 'dotted'
                  }
              },
              tooltip: {
                  formatter: ''
              },
              label: {
                  normal: {
                      formatter: '',
                      textStyle: {
                              align: 'center',
                          baseline: 'bottom'
                      }
                  }
              }
          },{
              coord: [],
              symbol: 'none'
          }],
          [{
              coord: [],
              symbol: 'none',
              lineStyle: {
                  normal: {
                      type: 'dotted'
                  }
              },
              tooltip: {
                  formatter: ''
              },
              label: {
                  normal: {
                      formatter: '',
                      textStyle: {
                              align: 'center',
                          baseline: 'bottom'
                      }
                  }
              }
          },{
              coord: [],
              symbol: 'none'
          }]
      ]
      };
      return markLineTemplate;
  }

  /**
   * 获取图表坐标的最小值
   * @param max 
   * @param min 
   */
  public getChartAxisMin(max, min) {
      var v = 0;
      var diff = max - min;
      if (diff > min) {
          if (min == 0) {
          v = min/2 - diff/10;
          }
          else {
          v = min/2;
          }
      }
      else {
          v = min - diff/2;
      }
      // 不四舍五入，返回2位小数
      return Number(v.toString().substring(0, v.toString().indexOf('.') + 3));
  }

  /**
   * 获取图表坐标的最大值
   * @param max 
   * @param min 
   */
  public getChartAxisMax(max, min) {
      var v = 0;
      var diff = max - min;
      if (diff > min) {
          v = max + min/2;
      }
      else {
          v = max + diff/2;
      }
      // 不四舍五入，返回2位小数
      if (v.toString().indexOf('.') > 0) {
        return Number(v.toString().substring(0, v.toString().indexOf('.') + 3));
      } else {
          return v;
      }
      
  }

  /**
   * 根据子组数获取柱形图的条目宽度
   * @param groupNum
   */
  public getBarWithByGroupNum(groupNum: number) {
      var w = 11;
      switch (groupNum){
      case 1 :
          w = 80;
          break;
      case 2 :
      case 3 :
          w = 36;
          break;
      case 4 :
          w = 30;
          break;
      case 5 :
      case 6 :
          w=25;
          break;
      default:
          w=20;
      }
      return w;
  }

  /**
   * 获取eCharts Line图表的options模版
   * @param successColor 主线条颜色1
   * @param infoColor 主线条颜色2
   * @param textColor 文本颜色
   * @param axisLineColor 坐标线颜色
   * @param splitLineColor 分割线颜色
   */
  public getEnergyLineOptionsTemplate(successColor: any, infoColor: any, textColor: any, axisLineColor: any, splitLineColor: any) {
      var options: any = {
      backgroundColor: this.BackgroundColor.bg,
      color: [successColor, infoColor],
      legend: {
          left: 'left',
          selectedMode: 'single',
          data: [],
          textStyle: {
              color: textColor,
              fontWeight:'bold'
          }
      },
      title: {
          textStyle: {
              color: textColor,
          },
          top: 0,
          padding: 0,
          itemGap: 0,
          subtext: '',
          subtextStyle: {
              color: textColor,
          }
      },
      animation: false,
      tooltip: {
          trigger: 'axis'
      },
      grid: {
          top: 40,
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLine: {
              lineStyle: {
                  color: axisLineColor,
              },
          },
          axisLabel: {
              textStyle: {
                  color: textColor,
              },
              rotate: 60
          }
      },
      yAxis: {
          type: 'value',
          scale : true,
          axisLine: {
              lineStyle: {
                  color: axisLineColor,
              },
          },
          splitLine: {
              lineStyle: {
                  color: splitLineColor,
              },
          },
          axisLabel: {
              textStyle: {
                  color: textColor,
              },
          }
      },
      series: []
      };
      return options;
  }

  /**
   * 获取eCharts Gauge图表的options模版
   * @param successColor 主线条颜色1
   * @param infoColor 主线条颜色2
   * @param textColor 文本颜色
   * @param axisLineColor 坐标线颜色
   * @param splitLineColor 分割线颜色
   */
  public getGaugeOptionsTemplate(successColor: any, infoColor: any, textColor: any, axisLineColor: any, splitLineColor: any) {
      var options: any = {
          tooltip : {
              formatter: "{a} <br/>{b} : {c}%"
          },
          grid: {
              top: 40,
              left: '0%',
              right: '0%',
              bottom: '0%',
              containLabel: true
          },
          series: [
              {
                  name: '设备综合利用率',
                  type: 'gauge',
                  title:{color: textColor, fontSize:24},
                  detail: {formatter:'{value}%', color: successColor},
                  data: [{value: 0}]
              }
          ]
      };
      return options;
  }

  /**
   * 获取eCharts Bar图表的options模版
   * @param successColor 主线条颜色1
   * @param infoColor 主线条颜色2
   * @param textColor 文本颜色
   * @param axisLineColor 坐标线颜色
   * @param splitLineColor 分割线颜色
   */
  public getOeeBarOptionsTemplate(successColor: any, infoColor: any, textColor: any, axisLineColor: any, splitLineColor: any) {
      var options: any = {
          animation: false,
          grid: {
              top: 40,
              left: '12%',
              right: '4%',
              bottom: '15%',
          },
          yAxis: {
              type: 'category',
              boundaryGap: true,
              axisLine: {
                  lineStyle: {
                      color: axisLineColor,
                  },
              },
              axisLabel: {
                  textStyle: {
                      color: textColor,
                  },
                  rotate: 60
              },
              data:[]
          },
          xAxis: {
              type: 'value',
              scale : true,
              axisLine: {
                  lineStyle: {
                      color: axisLineColor,
                  },
              },
              splitLine: {
                  lineStyle: {
                      color: splitLineColor,
                  },
              },
              axisLabel: {
                  textStyle: {
                      color: textColor,
                  },
              }
          },
          series: [
              {
                  name: 'Performance',
                  type: 'bar',
                  barMaxWidth: '90%',
                  data: [{value:0, itemStyle:{color:'#33ff00'}},{value:0, itemStyle:{color:'#ff00cc'}},{value:0, itemStyle:{color:'#ff8800'}}]
              },
          ]
      };
      return options;
  }
}
