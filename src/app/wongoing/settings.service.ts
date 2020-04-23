import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private theme: BehaviorSubject<string>;

  /**
   * 构造方法，设置默认主题
   */
  constructor() {
    this.theme = new BehaviorSubject('primary-theme');
  }

  /**
   * 设置主题的方法
   * @param val 要设置的新主题
   */
  public setActiveTheme(val) {
    this.theme.next(val);
  }

  /**
   * 获取当前主题的观察者对象
   */
  public getActiveTheme() {
    return this.theme.asObservable();
  }
}
