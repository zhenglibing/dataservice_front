import { Component } from '@angular/core';
import * as dd from 'dingtalk-jsapi';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { SettingsService } from './wongoing/settings.service';
import { EnvService } from './wongoing/env.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  selectedTheme: string;  // 保存当前主题样式名称
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private settings: SettingsService,
    private env: EnvService,
    public storage: Storage
  ) {
    this.initializeApp();
    /** 设置customerId的默认值 */
    this.storage.set('customerId', '1').then(()=>{
      console.log('storage item');
    }).catch(error=>{
      console.error('storage error', error);
    });
  }

  /**
   * 初始化应用方法
   */
  initializeApp() {
    if (dd.env.platform == 'notInDingTalk') {
      // 如果没在钉钉容器中运行，则显示头部导航条
      this.env.IsShowHeader = true;
    } else {
      // 如果在钉钉容器中运行则隐藏头部导航条
      this.env.IsShowHeader = false;
    }
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // 订阅可观察者对象
      this.settings.getActiveTheme().subscribe(val => {
        console.log('theme = ' + val);
        const plats: any = this.platform.platforms();
        if (plats.length > 0) {
          console.log('platform = ' + plats[0]);
          // 判断当前平台是android平台核实ios平台
          if (plats[0] === 'android') {
            this.selectedTheme = val + ' md ion-page hydrated';
          } else {
            this.selectedTheme = val + ' ios ion-page hydrated';
          }
        } else {
          this.selectedTheme = val;
        }
        console.log('theme = ' + this.selectedTheme);
      });
    });
  }
}
