import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private router: Router, private popoverController: PopoverController, private storage: Storage) { }

  ngOnInit() {}

  /**
   * 关闭弹出窗口，并且调转道url页面
   * @param url 要跳转的页面地址
   */
  public async doClose(url) {
    let input = await this.storage.get('inputQueryParams');
    this.popoverController.dismiss();   // 关闭弹出窗口
    this.router.navigate([url], { queryParams: input } );
  }

}
