import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/wongoing/base.service';

@Component({
  selector: 'app-balancesummary',
  templateUrl: './balancesummary.page.html',
  styleUrls: ['./balancesummary.page.scss'],
})
export class BalancesummaryPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;

    /** 输入属性-双向绑定 */
    input = {
      startDate: '2016/08/20',
      endDate: '2016/08/31',
      materName: 'ATA'
    };

  constructor(private env: EnvService, public translate: TranslateService, private baseService: BaseService, private router : Router) { }

  ngOnInit() {
  }

  public doSearch() {
    // console.log('------------------------------------------');
    console.log('startDate =' + this.input.startDate);
    console.log('endDate =' + this.input.endDate);

    this.input.startDate = this.input.startDate.substring(0, 10);
    this.input.startDate.replace(new RegExp(/(-)/g), '/');
    
    this.input.endDate = this.input.endDate.substring(0, 10);
    this.input.endDate.replace(new RegExp(/(-)/g), '/');


    this.router.navigate(['/tabs/func/balanceSummary/rubberBalanceSummarytResult'], { queryParams : this.input });
  }

}
