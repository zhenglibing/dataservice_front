import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { EnvService } from '../wongoing/env.service';
import { UtilsService } from '../wongoing/utils.service';

@Injectable({
  providedIn: 'root'
})
export class FuncService {
  /** 注入依赖 */
  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取远程接口数据
   */
  public getData(customerId) {
    const url = this.env.getSysFunctionList;
    const method = 'GET';
    const data  = null;
    const options = { params: { 'customerId': customerId } };
    return this.http.request(method, url, options).toPromise();
  }
}
