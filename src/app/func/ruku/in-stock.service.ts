import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class InStockService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取胶料入库结果列表
   * @param startDate 开始日期yyyy-MM-dd，默认值2016-03-15
   * @param endDate 结束日期yyyy-MM-dd，默认值2016-03-30
   * @param offset 记录偏移量
   * @param limit 记录结果限定数
   */
  public getBusInStockResult(startDate: string, endDate:string, offset: any, limit: any) {
    const url = this.env.getBusInStockResult;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'startDate': startDate, 'endDate': endDate,'offset': offset, 'limit': limit } };
    return this.http.request(method, url, options).toPromise();
  }


    /**
   * 获取胶料入库趋势图表
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param materCode 物料编号
   */
  public getBusInStockChart(startDate: string, endDate:string, materCode :string,offset: any, limit: any) {
    const url = this.env.getBusInStockChart;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'startDate': startDate, 'endDate': endDate,'materCode':materCode,'offset': offset, 'limit': limit } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取胶料入库趋势图表列表
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param materCode 物料编号
   */
  public getBusInStockChartList(startDate: string, endDate:string, materCode :string) {
    const url = this.env.getBusInStockChartList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'startDate': startDate, 'endDate': endDate,'materCode':materCode} };
    return this.http.request(method, url, options).toPromise();
  }
}
