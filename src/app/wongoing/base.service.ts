import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvService } from './env.service';
import { UtilsService } from './utils.service';

/**
 * 基础业务服务类
 */
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient, private env: EnvService, private utilsService: UtilsService) { }

  /**
   * 获取班次列表
   */
  public getShiftList() {
    const url = this.env.getShiftList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取生产班组列表
   */
  public getShiftClassList() {
    const url = this.env.getShiftClassList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取车间列表
   */
  public getWorkshopList() {
    const url = this.env.getWorkshopList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取生产机台列表
   */
  public getEquipList() {
    const url = this.env.getEquipList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取胶料类型列表
   */
  public getRubTypeList() {
    const url = this.env.getRubTypeList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取胶料大类列表
   */
  public getMKindList() {
    const url = this.env.getMKindList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取胶料检测项
   */
  public getCheckItem() {
    const url = this.env.getCheckItem;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage} };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取符合指定条件的物料信息
   * @param materialName 要搜索的物料名称关键字
   * @param limit 限制返回结果的记录数
   * @param offset 记录偏移量
   */
  public getMaterNameFuzzySearch(materialName, limit, offset) {
    const url = this.env.getMaterNameFuzzySearch;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: {'dsType': dsType, 'usedLanguage': usedLanguage, 'materialName': materialName, 'limit': limit, 'offset': offset } };
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取码表集
   * @param codeType 代码类型
   */
  public getSysCodeList(codeType) {
    const url = this.env.getSysCodeList;
    const method = 'GET';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    const options = { params: { 'dsType': dsType, 'usedLanguage': usedLanguage, 'codeType': codeType }};
    return this.http.request(method, url, options).toPromise();
  }

  /**
   * 获取机台区域组
   */
  public getEquipGroup() {
    const codeType = 'EquipGroup';
    return this.getSysCodeList(codeType);
  }

  /**
   * 获取库房列表
   */
  public getStockList() {
    const codeType = 'Stock';
    return this.getSysCodeList(codeType);
  }

  /**
   * 获取不同机组中的生产机台
   * @param equipGroupId 机组ID
   */
  public getProductEquipByEquipGroup(equipGroupId) {
    const url = this.env.getProductEquipByEquipGroup;
    const method = 'POST';
    const dsType = this.utilsService.getDataSourceType();
    const usedLanguage = this.utilsService.getUsedLanguage();
    let body = new HttpParams();
    body = body.append('dsType', dsType);
    body = body.append('equipGroupId', equipGroupId);
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-from-urlencoded;charset=UTF-8') };
    return this.http.post(url, body.toString(), options).toPromise();
  }
}
