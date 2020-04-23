import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * 获取数据源类型
   */
  public getDataSourceType() {
    const dsType = 'demoDs';
    return dsType;
  }

  /**
   * 获取当前使用的语言
   */
  public getUsedLanguage() {
    const usedLanguage = 'zh';
    return usedLanguage;
  }
}
