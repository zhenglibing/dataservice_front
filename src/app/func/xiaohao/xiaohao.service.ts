import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class XiaohaoService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取原料消耗分析结果列表
   * @param startDate 开始日期，格式[yyyy-MM-dd]
   * @param endDate 结束日期，格式[yyyy-MM-dd]
   * @param equipCode 机台编码列表, '01001','01005'
   * @param shiftId 班次ID
   * @param materName 物料名称
   * @param limit 每页记录数
   * @param offset 记录偏移量
   */
  public getBusShopoutResult(startDate, endDate, equipCode, shiftId, materName, limit, offset) {
    const url = this.env.getBusShopoutResult;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data = null;
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'startDate': startDate, 'endDate': endDate, 'equipCode': equipCode, 'shiftId': shiftId, 'materName': materName, 'limit': limit, 'offset': offset } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取原材料消耗分析趋势图表
   * @param startDate 开始日期，格式[yyyy/MM/dd]
   * @param endDate 结束日期，格式[yyyy/MM/dd]
   * @param equipCode 机台编码列表, '01001','01005'
   * @param shiftId 班次ID
   * @param materCode 物料编码
   * @param limit 每页记录数
   * @param offset 记录偏移量
   */
  public getBusShopoutChart(startDate, endDate, equipCode, shiftId, materCode, limit, offset) {
    const url = this.env.getBusShopoutChart;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data = null;
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'startDate': startDate, 'endDate': endDate, 'equipCode': equipCode, 'shiftId': shiftId, 'materCode': materCode, 'limit': limit, 'offset': offset } };
    return this.http.request(method, url, options).toPromise();
  }
}
