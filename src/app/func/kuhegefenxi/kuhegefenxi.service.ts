import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class KuhegefenxiService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取每项胶料的合格率
   * @param startTime 开始日期，格式[yyyy-MM-dd]
   * @param endTime 结束日期，格式[yyyy-MM-dd]
   * @param workshopId 车间Id
   * @param shiftClassId 班组ID
   * @param materName 模糊检索的物料名称
   * @param page 第几页
   * @param limit 每页记录数
   */
  public getRubberItemQualityRate(startTime, endTime, workshopId, shiftClassId, materName, page, limit) {
    const url = this.env.getRubberItemQualityRate;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'startTime': startTime, 'endTime': endTime, 'workshopId': workshopId, 'shiftClassId': shiftClassId, 'materName': materName, 'page': page, 'limit': limit } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 胶料合格率分类统计：获取不合格胶料的生产条码
   * @param startTime 开始日期，格式[yyyy-MM-dd]
   * @param endTime 结束日期，格式[yyyy-MM-dd]
   * @param workshopId 车间Id
   * @param shiftClassId 班组ID
   * @param materCode 物料编码
   * @param judgeResult 质检结果
   * @param page 第几页
   * @param limit 每页记录数
   */
  public getRubberItemQualityBarcodeTraceability(startTime, endTime, workshopId, shiftClassId, materCode, judgeResult, page, limit) {
    const url = this.env.getRubberItemQualityBarcodeTraceability;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'startTime': startTime, 'endTime': endTime, 'workshopId': workshopId, 'shiftClassId': shiftClassId, 'materCode': materCode, 'judgeResult': judgeResult, 'page': page, 'limit': limit } };
    return this.http.request(method, url, options).toPromise();
  }
}
