import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/wongoing/env.service';

@Component({
  selector: 'app-persion',
  templateUrl: './persion.page.html',
  styleUrls: ['./persion.page.scss'],
})
export class PersionPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
    isDingAvatar = false;   // 是否钉钉头像
    authCode: any = '';     // 免登授权码
    dingUser: any;          // 钉钉用户信息
    err: any = '';
  constructor(private env: EnvService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    // 获取查询参数
    this.dingUser = this.activateRoute.snapshot.queryParams;
    if (this.dingUser && this.dingUser.avatar && this.dingUser != '') {
      this.isDingAvatar = true;
      // alert(this.dingUser.avatar);
    }
  }

}
