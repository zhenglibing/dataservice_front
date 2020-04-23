import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvService } from '../../../wongoing/env.service';
import { UtilsService } from '../../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class RubberProductChartService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取胶料产量分析趋势图表
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param equipCode 机台编号列表，以分号分割
   * @param shiftClassId 班组Id
   * @param rubTypeName 胶料类型
   * @param mKindName 胶料大类
   * @param materCode 物料编码
   */
  public getBusProductionChart(startDate: string, endDate:string, equipCode: string, shiftClassId: string, rubTypeName: string, mKindName: string, materCode: string) {
    const url = this.env.getBusProductionChart;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'startDate': startDate, 'endDate': endDate, 'equipCode': equipCode, 'shiftClassId': shiftClassId, 'rubTypeName': rubTypeName, 'mKindName': mKindName, 'materCode': materCode } };
    return this.http.request(method, url, options).toPromise();
  }
}
