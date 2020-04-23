import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class HegefenxiService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取总体合格率
   * @param startTime 开始日期，格式[yyyy-MM-dd]
   * @param endTime 结束日期，格式[yyyy-MM-dd]
   */
  public getRubberPassRate(startTime, endTime) {
    const url = this.env.getRubberPassRate;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'startTime': startTime, 'endTime': endTime } };
    return this.http.request(method, url, options).toPromise();
  }
}
