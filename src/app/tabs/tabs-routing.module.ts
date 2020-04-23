import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'func',
        children: [
          {
            path: '',
            loadChildren: () => import('../func/func.module').then(m => m.FuncPageModule)
          },
          {
            path: 'chanliang',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/chanliang/chanliang.module').then(m => m.ChanliangPageModule),
              },
              {
                path: 'rubberproductresult',
                loadChildren: () => import('../func/chanliang/rubber-product-result/rubber-product-result.module').then(m => m.RubberProductResultPageModule),
              },
              {
                path: 'rubberproductchart',
                loadChildren: () => import('../func/chanliang/rubber-product-chart/rubber-product-chart.module').then(m => m.RubberProductChartPageModule),
              }
            ]
          },
          {
            path: 'xiaohao',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/xiaohao/xiaohao.module').then(m => m.XiaohaoPageModule),
              },
              {
                path: 'rubberconsumeresult',
                loadChildren: () => import('../func/xiaohao/rubber-consume-result/rubber-consume-result.module').then(m => m.RubberConsumeResultPageModule),
              },
              {
                path: 'rubberconsumechart',
                loadChildren: () => import('../func/xiaohao/rubber-consume-chart/rubber-consume-chart.module').then(m => m.RubberConsumeChartPageModule),
              }
            ]
          },
          {
            path: 'touruchanchu',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/touruchanchu/touruchanchu.module').then(m => m.TouruchanchuPageModule)
              },
              {
                path: 'inputoutputresult',
                loadChildren: () => import('../func/touruchanchu/input-output-result/input-output-result.module').then(m => m.InputOutputResultPageModule),
              },
              {
                path: 'inputoutputchart',
                loadChildren: () => import('../func/touruchanchu/input-output-chart/input-output-chart.module').then(m => m.InputOutputChartPageModule),
              }
            ]
          },
          {
            path: 'jihua',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/jihua/jihua.module').then(m => m.JihuaPageModule)
              },
              {
                path: 'planexecmonitorresult',
                loadChildren: () => import('../func/jihua/plan-exec-monitor-result/plan-exec-monitor-result.module').then(m => m.PlanExecMonitorResultPageModule),
              },
              {
                path: 'planexecmonitorchart',
                loadChildren: () => import('../func/jihua/plan-exec-monitor-chart/plan-exec-monitor-chart.module').then(m => m.PlanExecMonitorChartPageModule),
              }
            ]
          },
          {
            path: 'balanceSummary',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/balancesummary/balancesummary.module').then(m => m.BalancesummaryPageModule),
              },
              {
                path: 'rubberBalanceSummarytResult',
                loadChildren: () => import('../func/balancesummary/rubber-balance-summary-result/rubber-balance-summary-result.module').then(m => m.RubberBalanceSummaryResultPageModule),
              },
              {
                path: 'rubberBalanceSummarytChart',
                loadChildren: () => import('../func/balancesummary/rubber-balance-summary-chart/rubber-balance-summary-chart.module').then(m => m.RubberBalanceSummaryChartPageModule),
              }
            ]
          },
          {
            path: 'chuku',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/chuku/chuku.module').then(m => m.ChukuPageModule),
              },
              {
                path: 'outStockResult',
                loadChildren: () => import('../func/chuku/out-stock-result/out-stock-result.module').then(m => m.OutStockResultPageModule),
              },
              {
                path: 'outStockChart',
                loadChildren: () => import('../func/chuku/out-stock-chart/out-stock-chart.module').then(m => m.OutStockChartPageModule),
              }
            ]  
          },
          {
            path: 'ruku',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/ruku/ruku.module').then(m => m.RukuPageModule),
              },
              {
                path: 'inStockResult',
                loadChildren: () => import('../func/ruku/in-stock-result/in-stock-result.module').then(m => m.InStockResultPageModule),
              },
              {
                path: 'inStockChart',
                loadChildren: () => import('../func/ruku/in-stock-chart/in-stock-chart.module').then(m => m.InStockChartPageModule),
              }
            ]  
          },
          {
            path: 'chaoqi',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/chaoqi/chaoqi.module').then(m => m.ChaoqiPageModule),
              },
              {
                path: 'outValidResult',
                loadChildren: () => import('../func/chaoqi/out-valid-result/out-valid-result.module').then(m => m.OutValidResultPageModule),
              },
              {
                path: 'outValidChart',
                loadChildren: () => import('../func/chaoqi/out-valid-chart/out-valid-chart.module').then(m => m.OutValidChartPageModule),
              }
            ]  
            //loadChildren: () => import('../func/chaoqi/chaoqi.module').then(m => m.ChaoqiPageModule)
          },
          {
            path: 'jiance',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/jiance/jiance.module').then(m => m.JiancePageModule)
              },
              {
                path: 'fastexamresult',
                loadChildren: () => import('../func/jiance/fast-exam-result/fast-exam-result.module').then(m => m.FastExamResultPageModule)
              },
              {
                path: 'fastexamchart',
                loadChildren: () => import('../func/jiance/fast-exam-chart/fast-exam-chart.module').then(m => m.FastExamChartPageModule)
              }
            ]
          },
          {
            path: 'hegefenxi',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/hegefenxi/hegefenxi.module').then(m => m.HegefenxiPageModule)
              },
              {
                path: 'rubberpassratechart',
                loadChildren: () => import('../func/hegefenxi/rubber-pass-rate-chart/rubber-pass-rate-chart.module').then(m => m.RubberPassRateChartPageModule)
              }
            ]
          },
          {
            path: 'spc',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/spc/spc.module').then(m => m.SpcPageModule)
              },
              {
                path: 'rubberquamater',
                loadChildren: () => import('../func/spc/rubber-qua-mater/rubber-qua-mater.module').then(m => m.RubberQuaMaterPageModule),
              },
              {
                path: 'rubberquaspcresult',
                loadChildren: () => import('../func/spc/rubber-qua-spc-result/rubber-qua-spc-result.module').then(m => m.RubberQuaSpcResultPageModule),
              },
              {
                path: 'rubberquaspcpowerchart',
                loadChildren: () => import('../func/spc/rubber-qua-spc-result/rubber-qua-spc-power-chart/rubber-qua-spc-power-chart.module').then(m => m.RubberQuaSpcPowerChartPageModule),
              },
              {
                path: 'rubberquaspcmeanstdevchart',
                loadChildren: () => import('../func/spc/rubber-qua-spc-result/rubber-qua-spc-meanstdev-chart/rubber-qua-spc-meanstdev-chart.module').then(m => m.RubberQuaSpcMeanstdevChartPageModule),
              },
              {
                path: 'rubberquaspcxbarchart',
                loadChildren: () => import('../func/spc/rubber-qua-spc-result/rubber-qua-spc-xbar-chart/rubber-qua-spc-xbar-chart.module').then(m => m.RubberQuaSpcXbarChartPageModule),
              },
              {
                path: 'rubberquaspcrunchart',
                loadChildren: () => import('../func/spc/rubber-qua-spc-result/rubber-qua-spc-run-chart/rubber-qua-spc-run-chart.module').then(m => m.RubberQuaSpcRunChartPageModule),
              }
            ]
          },
          {
            path: 'kuhegefenxi',
            children: [
              {
                path: '',
                loadChildren: () => import('../func/kuhegefenxi/kuhegefenxi.module').then(m => m.KuhegefenxiPageModule)
              },
              {
                path: 'rubberqualityrateresult',
                loadChildren: () => import('../func/kuhegefenxi/rubber-quality-rate-result/rubber-quality-rate-result.module').then(m => m.RubberQualityRateResultPageModule)
              },
              {
                path: 'rubberqualityratedetail',
                loadChildren: () => import('../func/kuhegefenxi/rubber-quality-rate-detail/rubber-quality-rate-detail.module').then(m => m.RubberQualityRateDetailPageModule)
              }
            ]
          }
        ]
      },
      {
        path: 'msg',
        children: [
          {
            path: '',
            loadChildren: () => import('../msg/msg.module').then(m => m.MsgPageModule)
          }
        ]
      },
      {
        path: 'me',
        children: [
          {
            path: '',
            loadChildren: () => import('../me/me.module').then(m => m.MePageModule)
          },
          {
            path: 'personset',
            loadChildren: () => import('../me/persion/persion.module').then(m => m.PersionPageModule)
          },
          {
            path: 'commonset',
            children: [
              {
                path: '',
                loadChildren: () => import('../me/commonset/commonset.module').then(m => m.CommonsetPageModule)
              },
              {
                path: 'themeset',
                loadChildren: () => import('../me/commonset/themeset/themeset.module').then(m => m.ThemesetPageModule)
              },
              {
                path: 'langset',
                loadChildren: () => import('../me/commonset/langset/langset.module').then(m => m.LangsetPageModule)
              }
            ]
          },
          {
            path: 'feedback',
            loadChildren: () => import('../me/feedback/feedback.module').then(m => m.FeedbackPageModule)
          },
          {
            path: 'about',
            loadChildren: () => import('../me/about/about.module').then(m => m.AboutPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/func',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/func',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
