import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { WongoingModule } from './wongoing/wongoing.module';

/**
 * 导出加载函数
 * @param http HttpClient对象
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    WongoingModule],
  exports: [
    TranslateModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TranslateService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // 默认语言
  private lang: any = 'zh';

  constructor(private platform: Platform, public translate: TranslateService) {
    platform.ready().then(async () => {
      this.initTranslateConfig();
    });
    console.log('App start...');
  }

  public initTranslateConfig() {
    console.log('initTranslateConfig...');
    // 添加要支持的语言
    this.translate.addLangs(['zh', 'en']);
    // 设置默认语言
    this.translate.setDefaultLang(this.lang);
    // 语言切换处理
    this.translate.use(this.lang).subscribe(() => {
      console.log('语言切换=' + this.lang);
    });
  }
}
