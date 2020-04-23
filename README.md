# dataservice_front
数据服务_前端
1、本项目是基于Ionic5/Angular8的混合移动应用，运行本项目的前提条件是要先安装NodeJs，并在NodeJs下安装Angular和Ionic。
   具体基础开发环境搭建参考https://blog.csdn.net/zlbdmm/article/details/90905609
2、环境搭建后，请按如下步骤创建Ionic项目，并把从本仓库下载的代码复制到项目下即可。
  2.1 windows下打开CMD窗口，创建项目，比如名称为mes，具体命令如下：
  ionic start mes tabs -- type=angular
  2.2 切换当前目录至mes，比如E:\ionicworkspace\mes
  cd E:\ionicworkspace\mes
  2.3 安装项目依赖的模块和插件-@angular/http，用于发送http请求。具体命令如下：
  npm install @angular/http
  2.4 安装项目依赖的模块和插件-@ngx-translate，用于实现国际化。具体命令如下：
  npm install @ngx-translate/core --save
  npm install @ngx-translate/http-loader --save
  2.5 安装项目依赖的模块和插件-echarts，用于实现图表绘制。具体命令如下：
  npm install echarts --save
  npm install ngx-echarts --save
  2.6 安装项目依赖的模块和插件-@ionic/storage，用于读写缓存。具体命令如下：
  npm install @ionic/storage
  2.7 安装项目依赖的模块和插件-dingtalk-jsapi，用于使用钉钉jsapi，本项目可以以H5应用的方式运行在钉钉容器中。具体命令如下：
  npm install dingtalk-jsapi --save
  2.8 把mes/src目录下的内容删除。
  2.9 从本仓库获取所有代码，把获取的代码中src目录下的内容复制到mes/src目录下
  2.10 运行项目，具体命令如下：
  ionic serve
