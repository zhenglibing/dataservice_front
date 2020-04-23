import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class SpcService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 根据页数获取胶料质量SPC分析列表
   * @param startTime 开始日期，格式[yyyy-MM-dd]
   * @param endTime 结束日期，格式[yyyy-MM-dd]
   * @param itemCode 检验项代码
   * @param equipCode 机台编码
   * @param shift 班次ID
   * @param materialCode 物料编码 
   * @param page 第几页
   * @param limit 每页记录数
   */
  public getRubberQualitySPCListByPage(startTime, endTime, itemCode, equipCode, shift, materialCode, page, limit) {
    const url = this.env.getRubberQualitySPCListByPage;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'startTime': startTime, 'endTime': endTime, 'itemCode': itemCode, 'equipCode': equipCode, 'shift': shift, 'materialCode': materialCode, 'page': page, 'limit': limit }};
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取胶料质量SPC分析列表
   * @param startTime 开始日期，格式[yyyy-MM-dd]
   * @param endTime 结束日期，格式[yyyy-MM-dd]
   * @param itemCode 检验项代码
   * @param equipCode 机台编码
   * @param shift 班组ID
   * @param materialCode 物料编码 
   */
  public getRubberQualitySPCList(startTime, endTime, itemCode, equipCode, shift, materialCode) {
    const url = this.env.getRubberQualitySPCList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'startTime': startTime, 'endTime': endTime, 'itemCode': itemCode, 'equipCode': equipCode, 'shift': shift, 'materialCode': materialCode } };
    return this.http.request(method, url, options).toPromise();
  }
}
