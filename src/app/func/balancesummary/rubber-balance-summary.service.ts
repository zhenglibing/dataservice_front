import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class RubberBalanceSummaryService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }


  /**
   * 获取胶料结存结果列表
   * @param startDate 开始日期
   * @param endDate 截止日期
   * @param materName  物料名
   * @param offset  偏移量
   * @param limit 限制
   */
  public getBusStockResult(startDate: string, endDate:string, materName: string,offset: any, limit: any) {
    const url = this.env.getBusStockResult;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType,'startDate': startDate, 'endDate': endDate, 'materName': materName,'offset': offset, 'limit': limit } };
    return this.http.request(method, url, options).toPromise();
  }

    /**
   * 获取胶料结存趋势图表
   * @param startDate 
   * @param endDate 
   * @param materCode 
   */
  public getBusStockChart(startDate: string, endDate:string, materCode: string,offset :any,limit:any) {
    const url = this.env.getBusStockChart;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'startDate': startDate, 'endDate': endDate,'materCode': materCode ,'offset':offset,'limit':limit} };
    return this.http.request(method, url, options).toPromise();
  }

  
}
