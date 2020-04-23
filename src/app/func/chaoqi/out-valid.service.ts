import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class OutValidService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取超期胶料结果列表
   * @param startDate 开始日期yyyy-MM-dd，默认值2016-03-15
   * @param endDate 结束日期yyyy-MM-dd，默认值2016-03-30
   * @param validHours 超时小时数
   * @param stockNo 归属仓库号
   * @param offset 记录偏移量
   * @param limit 记录结果限定数
   */
  public getBusOutValidResult(startDate: string, endDate:string, validHours: any,stockNo :string,offset: any, limit: any) {
    const url = this.env.getBusOutValidResult;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'startDate': startDate, 'endDate': endDate,'validHours':validHours,'stockNo':stockNo,'offset': offset, 'limit': limit } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取胶料出库趋势图表
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param materCode 物料编号
   */
  public getBusOutValidChart(materName: string, outValidDate : string ,offset:string,limit:string) {
    const url = this.env.getBusOutValidChart;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'materName': materName, 'outValidDate': outValidDate,'offset':offset,'limit':limit } };
    return this.http.request(method, url, options).toPromise();
  }
}
