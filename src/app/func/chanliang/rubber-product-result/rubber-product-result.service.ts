import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvService } from '../../../wongoing/env.service';
import { UtilsService } from '../../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class RubberProductResultService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取胶料产量分析结果列表
   * @param customerId 客户Id
   * @param startDate 开始日期yyyy-MM-dd，默认值2016-03-15
   * @param endDate 结束日期yyyy-MM-dd，默认值2016-03-30
   * @param equipCode 机台编号列表，以;分割
   * @param shiftClassId 班组Id，默认值“全部”
   * @param rubTypeName 胶料类型名称，默认值“全部”
   * @param mKindName 胶料大类名称，默认值“全部”
   * @param materName  物料名称，默认值""
   * @param offset 记录偏移量
   * @param limit 记录结果限定数
   */
  public getBusProductionResult(customerId: any, startDate: string, endDate:string, equipCode: string, shiftClassId: string, rubTypeName: string, mKindName: string, materName: string, offset: any, limit: any) {
    const url = this.env.getBusProductionResult;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const data  = null;
    const options = { params: { 'dsType': dsType, 'customerId': customerId, 'startDate': startDate, 'endDate': endDate, 'equipCode': equipCode, 'shiftClassId': shiftClassId, 'rubTypeName': rubTypeName, 'mKindName': mKindName, 'materName': materName, 'offset': offset, 'limit': limit } };
    return this.http.request(method, url, options).toPromise();
  }


}
