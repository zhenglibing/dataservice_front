import { Component, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EnvService } from 'src/app/wongoing/env.service';
import { BaseService } from 'src/app/wongoing/base.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rubber-qua-mater',
  templateUrl: './rubber-qua-mater.page.html',
  styleUrls: ['./rubber-qua-mater.page.scss'],
})
export class RubberQuaMaterPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  isShowHistory = true;    // 是否显示搜索历史

  infiniteScroll: IonInfiniteScroll;
  pageIndex = 1;    // 当前页的索引
  maxPageCount = 50; // 允许显示的最大页数
  pageSize = 15;     // 每页大小
  searchKey: any = '';

  queryParam: any;
  backUrl: any = '/tabs/func/spc';

  materList: any;
  historyMaterList:any = [];
  constructor(private env: EnvService, private router: Router, private activatedRoute: ActivatedRoute, private storage: Storage, private baseService: BaseService) { }

  ngOnInit() {
    this.processQueryParam();
    this.materList = [];
    this.storage.get('historyMaterList').then(value => this.historyMaterList = value);
  }

  /**
   * 处理请求参数，获取from（从那个页面进入的本页）
   */
  public processQueryParam() {
    this.queryParam = this.activatedRoute.snapshot.queryParams;
    // console.log('from = ' + this.queryParam.from);
    if (this.queryParam && this.queryParam.from && this.queryParam.from != '') {
      this.backUrl = '/tabs/func/' + this.queryParam.from;
    }
    // console.log(this.backUrl);
  }

  /**
   * 处理搜索
   */
  public handleChange() {
    console.log(this.searchKey);
    // 处理是否显示搜索历史
    if (this.searchKey != '') {
      this.isShowHistory = false;
    } else {
      this.isShowHistory = true;
    }
    this.pageIndex = 1;
    this.materList.splice(0, this.materList.length);    // 清空原缓存的数据
    this.loadData();
  }

  public async loadData() {
    let offset = (this.pageIndex - 1) * this.pageSize;
    let res: any = await this.baseService.getMaterNameFuzzySearch(this.searchKey, this.pageSize, offset);
    console.log(res);
    if (res && res.state && res.state == '0') {
      // 把结果数据压入结果数组列表中。
      if (res.result.length > 0) {
        res.result.forEach((element: any) => {
          if (element.flag != 0 && element.materialInfo)
          this.materList.push(element);
        });
      }
    } else {
      console.warn('请求远程接口[getMaterNameFuzzySearch]异常!');
    }
  }

  /**
   * 下拉刷新事件处理
   * @param event 事件
   */
  public doDownRefresh(event) {
    console.log('Begin async operation');
    this.pageIndex = 1;   // 重新从第1页开始显示
    this.materList.splice(0, this.materList.length);    // 清空原缓存的数据
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  /**
   * 上拉刷新加载分页数据
   * @param event 事件
   */
  public doUpRefresh(event) {
    this.pageIndex++;   // 增加一页
    this.loadData();
    setTimeout(() => {
      event.target.complete();
      if (this.pageIndex >= this.maxPageCount) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  public toggleInfiniteScroll() {
    this.infiniteScroll.disabled = ! this.infiniteScroll.disabled;
  }

  /**
   * 处理选择，并返回
   * @param materName 物料名称 
   * @param materCode 物料编码
   */
  public doSelectMater(materName, materCode) {
    console.log('materName = ' + materName);
    console.log('materCode = ' + materCode);

    let item = {
      flag: 2,
      materialInfo: {
        'materCode': materCode,
        'materName': materName
      }
    }
    if (this.historyMaterList == null) {
      this.historyMaterList = [];
    }
    let isExist = false;  // 判断搜索历史中是否存在
    this.historyMaterList.forEach(element => {
      if (element && element.materialInfo && element.materialInfo.materCode == materCode) {
        isExist = true;
      }
    });
    if (!isExist) {
      this.historyMaterList.unshift(item);
      if (this.historyMaterList.length > 5) {
        this.historyMaterList.splice(5);
      }
    }
    // 放入缓存
    this.storage.set('historyMaterList', this.historyMaterList).then(() => {
      console.log('historyMaterList进行缓存');
    }).catch(err => {
      console.log('historyMaterList缓存失败!');
    });

    // this.router.navigate(['/tabs/func/spc'], {queryParams: { 'materCode': materCode, 'materName': materName}});
  }

  /**
   * 删除搜索历史中的记录
   */
  public deleteHistory() {
    console.log('deleteHistory');
    
    this.historyMaterList.splice(0, this.historyMaterList.length);
    // 放入缓存
    this.storage.set('historyMaterList', this.historyMaterList).then(() => {
      console.log('historyMaterList进行缓存');
    }).catch(err => {
      console.log('historyMaterList缓存失败!');
    });
  }
}
