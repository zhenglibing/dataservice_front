import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/wongoing/env.service';

@Component({
  selector: 'app-hegefenxi',
  templateUrl: './hegefenxi.page.html',
  styleUrls: ['./hegefenxi.page.scss'],
})
export class HegefenxiPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  /** 输入属性-双向绑定 */
  input = {
    startDate: '2016-01-08',
    endDate: '2016-01-20'
  };

  constructor(private env: EnvService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * 执行查询跳转到图表页
   */
  public doSearch() {
    this.router.navigate(['/tabs/func/hegefenxi/rubberpassratechart'], { queryParams: this.input });
  }
}
