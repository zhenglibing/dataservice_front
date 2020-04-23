import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvService } from '../../wongoing/env.service';
import { UtilsService } from '../../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class JihuaService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取计划执行监控总体数据列表
   * @param planDate 计划日期
   * @param equipGroupId 生产区域ID
   * @param equipJson 机台列表json串[{equipCode:'', equipName:''}, {equipCode:'', equipName:''}]
   */
  public getPlanExecMonitorTotalData(planDate, equipGroupId, equipJson) {
    const url = this.env.getPlanExecMonitorTotalData;
    const method = 'POST';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    let body = new HttpParams();
    body = body.append('dsType', dsType);
    body = body.append('planDate', planDate);
    body = body.append('equipGroupId', equipGroupId);
    body = body.append('equipJson', equipJson);
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };
    // const options = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };      // 效果等同上一句
    return this.http.post(url, body.toString(), options).toPromise();
  }
}
