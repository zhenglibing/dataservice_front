import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class TouruchuanchuService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取投入产出比结果列表
   * @param startDate 开始日期，格式[yyyy/MM/dd]
   * @param endDate 结束日期，格式[yyyy/MM/dd]
   * @param equipCode 机台编码
   * @param shiftId 班次ID
   * @param limit 每页记录数
   * @param offset 记录偏移量
   */
  public getBusConsumOutputResult(startDate, endDate, equipCode, shiftId, limit, offset) {
    const url = this.env.getBusConsumOutputResult;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data = null;
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'startDate': startDate, 'endDate': endDate, 'equipCode': equipCode, 'shiftId': shiftId, 'limit': limit, 'offset': offset} };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取投入产出比趋势图表
   * @param startDate 开始日期，格式[yyyy/MM/dd]
   * @param endDate 结束日期，格式[yyyy/MM/dd]
   * @param equipCode 机台编码
   * @param shiftId 班次ID
   * @param limit 每页记录数
   * @param offset 记录偏移量
   */
  public getBusConsumOutputChart(startDate, endDate, equipCode, shiftId, limit, offset) {
    const url = this.env.getBusConsumOutputChart;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data = null;
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'startDate': startDate, 'endDate': endDate, 'equipCode': equipCode, 'shiftId': shiftId, 'limit': limit, 'offset': offset } };
    return this.http.request(method, url, options).toPromise();
  }
}
