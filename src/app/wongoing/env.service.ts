import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  /** 是否显示导航 */
  IsShowHeader = true;

  /** 系统接口数据源 */
  public SysDs: any = 'sysDs';
  /** 访问票证 */
  public AccessToken: any = '';
  /** 接口站点路径 */
  public SiteUrl: any = 'https://dataservice.wongoing.cn';
  // public SiteUrl: any = 'http://localhost:8080/archimedes';
  /** 基础目录 */
  public BaseUrl: any = '/rs/';
  
  /** 钉钉接口地址 */
  public DingBackUrl: any = 'http://dingback.wongoing.cn:9090';
  // public DingBackUrl: any = 'http://localhost:9090';

  /** 获取应用信息 */
  public getAppInfo: any = this.SiteUrl + this.BaseUrl + 'system/getAppInfo';
  /** 获取应用列表 */
  public getAppList: any = this.SiteUrl + this.BaseUrl + 'system/getAppList';
  /** 获取用户信息 */
  public getCustomerInfo: any = this.SiteUrl + this.BaseUrl + 'system/getCustomerInfo';
  /** 获取功能模块列表信息 */
  public getSysFunctionList: any = this.SiteUrl + this.BaseUrl + 'system/getSysFunctionList';
  /** 根据功能id获取功能实体 */
  public getSysFunctionById: any = this.SiteUrl + this.BaseUrl + 'system/getSysFunctionById';
  /** 设置用户功能列表 */
  public setCustomerFunctionList: any = this.SiteUrl + this.BaseUrl + 'system/setCustomerFunctionList';
  /** 登录操作 */
  public getLoginInfo: any = this.SiteUrl + this.BaseUrl + 'system/getLoginInfo';
  /** 问题反馈 */
  public setFeedBackInfo: any = this.SiteUrl + this.BaseUrl + 'common/setFeedBackInfo';

  /* func Common interface**/
  /** 获取班次列表 */
  public getShiftList: any = this.SiteUrl + this.BaseUrl + 'common/getShiftList';
  /** 获取生产班组列表 */
  public getShiftClassList: any = this.SiteUrl + this.BaseUrl + 'common/getShiftClassList';
  /** 获取车间列表 */
  public getWorkshopList: any = this.SiteUrl + this.BaseUrl + 'common/getWorkshopList';
  /** 获取生产机台列表 */
  public getEquipList: any = this.SiteUrl + this.BaseUrl + 'common/getEquipList';
  /** 获取胶料类型列表 */
  public getRubTypeList: any = this.SiteUrl + this.BaseUrl + 'common/getRubTypeList';
  /** 获取胶料大类列表 */
  public getMKindList: any = this.SiteUrl + this.BaseUrl + 'common/getMKindList';
  /** 获取码表集合接口 */
  public getSysCodeList: any = this.SiteUrl + this.BaseUrl + 'common/getSysCodeList';

  /** func product interface */
  /** 获取不同机组中的生产机台 */
  public getProductEquipByEquipGroup: any = this.SiteUrl + this.BaseUrl + 'product/getProductEquipByEquipGroup';
  /** 获取胶料产量分析结果列表 */
  public getBusProductionResult: any = this.SiteUrl + this.BaseUrl + 'product/getBusProductionResult';
  /** 获取胶料产量分析趋势图表 */
  public getBusProductionChart: any = this.SiteUrl + this.BaseUrl + 'product/getBusProductionChart';
  /** 获取原料消耗分析结果列表 */
  public getBusShopoutResult: any = this.SiteUrl + this.BaseUrl + 'product/getBusShopoutResult';
  /** 获取原材料消耗分析趋势图表 */
  public getBusShopoutChart: any = this.SiteUrl + this.BaseUrl + 'product/getBusShopoutChart';
  /** 获取投入产出比结果列表 */
  public getBusConsumOutputResult: any = this.SiteUrl + this.BaseUrl + 'product/getBusConsumOutputResult';
  /** 获取投入产出比趋势图表 */
  public getBusConsumOutputChart: any = this.SiteUrl + this.BaseUrl + 'product/getBusConsumOutputChart';
  /** 获取计划执行监控总体数据列表 */
  public getPlanExecMonitorTotalData: any = this.SiteUrl + this.BaseUrl + 'product/getPlanExecMonitorTotalData';

  /** func quality interface */
  /** 获取胶料结存结果列表 */
  public getBusStockResult: any = this.SiteUrl + this.BaseUrl + 'store/getBusStockResult';
  /** 获取胶料结存趋势图表 */
  public getBusStockChart: any = this.SiteUrl + this.BaseUrl + 'store/getBusStockChart';
  /** 获取胶料出库结果列表 */
  public getBusOutStockResult: any = this.SiteUrl + this.BaseUrl + 'store/getBusOutStockResult';
  /** 获取胶料出库趋势图表 */
  public getBusOutStockChart: any = this.SiteUrl + this.BaseUrl + 'store/getBusOutStockChart';
  /** 获取胶料出库趋势图表对应列表 */
  public getBusOutStockChartList: any = this.SiteUrl + this.BaseUrl + 'store/getBusOutStockChartList';
  /** 获取胶料入库结果列表 */
  public getBusInStockResult: any = this.SiteUrl + this.BaseUrl + 'store/getBusInStockResult';
  /** 获取胶料入库趋势图表 */
  public getBusInStockChart: any = this.SiteUrl + this.BaseUrl + 'store/getBusInStockChart';
  /** 获取胶料入库趋势图表列表 */
  public getBusInStockChartList: any = this.SiteUrl + this.BaseUrl + 'store/getBusInStockChartList';
  /** 获取超期胶料结果列表 */
  public getBusOutValidResult: any = this.SiteUrl + this.BaseUrl + 'store/getBusOutValidResult';
  /** 获取超期胶料趋势图表 */
  public getBusOutValidChart: any = this.SiteUrl + this.BaseUrl + 'store/getBusOutValidChart';

  /** func quality interface */
  /** 获取胶料检测类型 */
  public getCheckItem: any = this.SiteUrl + this.BaseUrl + 'quality/getCheckItem';
  /** 物料名称模糊检索 */
  public getMaterNameFuzzySearch: any = this.SiteUrl + this.BaseUrl + 'quality/getMaterNameFuzzySearch';
  /** 获取胶料快检列表 */
  public getFastExaminationList: any = this.SiteUrl + this.BaseUrl + 'quality/getFastExaminationList';
  /** 获取胶料快检列表某项详情 */
  public getFastExaminationItemList: any = this.SiteUrl + this.BaseUrl + 'quality/getFastExaminationItemList';
  /** 获取总体合格率 */
  public getRubberPassRate: any = this.SiteUrl + this.BaseUrl + 'quality/getRubberPassRate';
  /** 根据页数获取胶料质量SPC分析列表 */
  public getRubberQualitySPCListByPage: any = this.SiteUrl + this.BaseUrl + 'quality/getRubberQualitySPCListByPage';
  /** 获取胶料质量SPC分析列表 */
  public getRubberQualitySPCList: any = this.SiteUrl + this.BaseUrl + 'quality/getRubberQualitySPCList';
  /** 获取每项胶料的合格率 */
  public getRubberItemQualityRate: any = this.SiteUrl + this.BaseUrl + 'quality/getRubberItemQualityRate';
  /** 胶料合格率分类统计：获取不合格胶料的生产条码 */
  public getRubberItemQualityBarcodeTraceability: any = this.SiteUrl + this.BaseUrl + 'quality/getRubberItemQualityBarcodeTraceability';

  constructor() { }
}
