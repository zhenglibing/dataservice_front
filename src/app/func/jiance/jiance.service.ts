import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class JianceService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取胶料快检列表
   * @param startTime 开始日期，格式[yyyy-MM-dd]
   * @param endTime 结束日期，格式[yyyy-MM-dd]
   * @param itemCode 检验项代码
   * @param itemName 检验项名称
   * @param equipCode 机台编码
   * @param shift 班组ID
   * @param materialCode 物料编码 
   */
  public getFastExaminationList(startTime, endTime, itemCode, itemName, equipCode, shift, materialCode) {
    const url = this.env.getFastExaminationList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'startTime': startTime, 'endTime': endTime, 'itemCode': itemCode, 'itemName': itemName, 'equipCode': equipCode, 'shift': shift, 'materialCode': materialCode } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取胶料快检列表某项详情
   * @param startTime 开始日期，格式[yyyy-MM-dd]
   * @param endTime 结束日期，格式[yyyy-MM-dd]
   * @param itemCode 检验项代码
   * @param itemName 检验项名称
   * @param equipCode 机台编码
   * @param shift 班组ID
   * @param materialCode 物料编码 
   */
  public getFastExaminationItemList(startTime, endTime, itemCode, itemName, equipCode, shift, materialCode) {
    const url = this.env.getFastExaminationItemList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'startTime': startTime, 'endTime': endTime, 'itemCode': itemCode, 'itemName': itemName, 'equipCode': equipCode, 'shift': shift, 'materialCode': materialCode } };
    return this.http.request(method, url, options).toPromise();
  }
}
