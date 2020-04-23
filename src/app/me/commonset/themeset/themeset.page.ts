import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';
import { SettingsService } from '../../.././wongoing/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-themeset',
  templateUrl: './themeset.page.html',
  styleUrls: ['./themeset.page.scss'],
})
export class ThemesetPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  constructor(private router: Router, private env: EnvService, private settings: SettingsService) {

  }

  ngOnInit() {

  }

  /**
   * 主题样式切换方法
   * @param theme 要切换的目标主题
   */
  public changeTheme(theme: any) {
    this.settings.setActiveTheme(theme);
    // this.router.navigateByUrl('tabs/func');
  }
}
