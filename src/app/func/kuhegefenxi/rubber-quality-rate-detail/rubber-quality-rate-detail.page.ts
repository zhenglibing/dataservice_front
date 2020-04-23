import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { KuhegefenxiService } from '../kuhegefenxi.service';

@Component({
  selector: 'app-rubber-quality-rate-detail',
  templateUrl: './rubber-quality-rate-detail.page.html',
  styleUrls: ['./rubber-quality-rate-detail.page.scss'],
})
export class RubberQualityRateDetailPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  
  infiniteScroll: IonInfiniteScroll;
  pageIndex = 1;    // 当前页的索引
  maxPageCount = 50; // 允许显示的最大页数
  pageSize = 15;     // 每页大小
  searchKey: any = '';

  titleDate: any = '';
  titleDetail: any = '';

  // 保存查询参数
  input: any = {};
  constructor(private env: EnvService, private translate: TranslateService, private router: Router, private activateRoute: ActivatedRoute, private storge: Storage, private kuhegefenxiService: KuhegefenxiService) { }

  ngOnInit() {
  }

}
