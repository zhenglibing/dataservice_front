import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class OutStockService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取胶料出库结果列表
   * @param startDate 开始日期yyyy-MM-dd，默认值2016-03-15
   * @param endDate 结束日期yyyy-MM-dd，默认值2016-03-30
   * @param offset 记录偏移量
   * @param limit 记录结果限定数
   */
  public getBusOutStockResult(startDate: string, endDate:string, offset: any, limit: any) {
    const url = this.env.getBusOutStockResult;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'startDate': startDate, 'endDate': endDate,'offset': offset, 'limit': limit } };
    return this.http.request(method, url, options).toPromise();
  }

    
  /**
   * 获取胶料出库趋势图表
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param materCode 物料编号
   */
  public getBusOutStockChart(startDate: string, endDate:string, materCode: string,offset :string,limit:string) {
    const url = this.env.getBusOutStockChart;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'startDate': startDate, 'endDate': endDate,'materCode': materCode ,'offset':offset,'limit':limit} };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取胶料出库趋势图表列表
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param materCode 物料编码
   */
  public getBusOutStockChartList(startDate: string, endDate:string, materCode: string) {
    const url = this.env.getBusOutStockChartList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'startDate': startDate, 'endDate': endDate,'materCode': materCode } };
    return this.http.request(method, url, options).toPromise();
  }

}
