import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnvService } from '../wongoing/env.service';
import { DingService } from '../wongoing/ding.service';
import * as dd from 'dingtalk-jsapi';

@Component({
    selector: 'app-me',
    templateUrl: 'me.page.html',
    styleUrls: ['me.page.scss']
})
export class MePage {
    isShowHeader = this.env.IsShowHeader;
    isDingAvatar = false;   // 是否钉钉头像
    authCode: any = '';     // 免登授权码
    dingUser: any;          // 钉钉用户信息
    err: any = '';
    constructor(private router: Router, private env: EnvService, private dingService: DingService) {
        
    }

    ngOnInit() {
        this.initDingInfo();
    }

    /**
     * 初始化钉钉信息
     */
    public initDingInfo() {
        // 先判断是否是在钉钉中运行此应用
    if (dd.env.platform != 'notInDingTalk') {
        dd.ready(()=>{
          dd.runtime.permission.requestAuthCode({corpId: 'ding288e6c6c4c5a33ee35c2f4657eb6378f'}).then((result) => {
            this.authCode = result.code;
            
            this.dingService.getDingUserInfo(this.authCode).then((res: any) => {
                this.dingUser = res.result;
                if (this.dingUser && this.dingUser.avatar && this.dingUser != '') {
                    this.isDingAvatar = true;
                    // alert(this.dingUser.avatar);
                }
            }).catch(err => {
                this.err = JSON.stringify(err);
                alert(this.err);
            }); 
  
          }).catch(err => {
            console.log(err);
            // alert(err);
          });
        });
      } else {
        console.warn('请在钉钉中访问本应用!');
      }
    }

    /**
     * 跳转到个人详情页
     */
    public goPersonPage() {
        this.router.navigate(['/tabs/me/personset'], { queryParams: this.dingUser });
    }
}
