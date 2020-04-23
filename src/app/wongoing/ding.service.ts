import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class DingService {

  constructor(private env: EnvService, private http: HttpClient) { }

  /**
   * 获取钉钉用户信息
   * @param authCode 免登授权码
   */
  public getDingUserInfo(authCode) {
    const url = this.env.DingBackUrl + '/login';
    let body = new HttpParams();
    body = body.append('authCode', authCode);
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };
    return this.http.post(url, body.toString(), options).toPromise();
  }
}
