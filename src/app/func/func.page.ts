import { Component, OnInit } from '@angular/core';
import { EnvService } from '../wongoing/env.service';
import { FuncService } from './func.service';

@Component({
  selector: 'app-func',
  templateUrl: 'func.page.html',
  styleUrls: ['func.page.scss']
})
export class FuncPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  isGetDataSuccess = true;                        //是否获取网络数据成功
  /** 功能模块数据 */
  modules: any[];

  constructor(private env: EnvService, private service: FuncService) {  }

  ngOnInit() {
    console.log('isShowHeader is ' + this.isShowHeader);
    this.service.getData(1).then((res: any) => {
      console.log('getSysFunctionList调用完毕...');
      console.log(res);
      if (res && res.state && res.state === '0') {
         this.modules = res.result;
      } else {
        this.isGetDataSuccess = false;
        console.warn('请求后台接口[getSysFunctionList]异常!');
      }
    }).catch(err => {
      this.isGetDataSuccess = false;
      console.log('http请求异常!');
      console.error(err);
    });
  }
}
