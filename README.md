### admin-client
后台管理系统的前端项目部分，后端项目部分为：[admin-client-server](https://github.com/Snail-Lu/admin-client-server)

### 目录结构
```
admin-client
├── README.md               # 说明文档
├── package.json
├── .gitignore
├── public                  # 静态资源
│   ├── index.html          # html模板
│   └── ...
└── src
    ├─ assets               # 静态资源
    │  ├── css
    │  └─- images
    │
    ├─ components           # 展示组件
    │  ├─ App               # 根组件，主要的路由在这里配置 
    │  └─ ...
    │     
    ├─ containers           # 容器组件
    │  │ 
    │  └─ ...
    │
    ├─ redux                 # redux目录
    │  ├─ actions.js         # action creator
    │  ├─ actionTypes.js     # action类型定义
    │  ├─ reducers.js        # reducer
    │  └─ store.js           # store
    │ 
    ├─ utils                 # 工具类
    │  ├─ actions.js         # action creator
    │  ├─ actionTypes.js     # action类型定义
    │  ├─ reducers.js        # reducer
    │  └─ store.js           # store
    │ 
    ├─ services              # 各组件后台请求服务
    │  └─ index.js          
    ├─ index.js              # 入口js文件
    └─ index.scss            # 公用样式

```


### 基本使用

clone项目：  
```
git clone git@github.com:Snail-Lu/admin-client.git
```
安装依赖： 
```
cd admin-client
npm install 
```

运行项目：
```
npm run start
```


### 可用的Scripts
在项目目录中，可以运行：  

* `npm start` 在开发模式下运行项目
* `npm test`  以交互式监视模式启动测试运行器
* `npm run build` 生产构建
* `npm run eject` 配置弹射（不可逆操作），执行后配置文件和传递依赖项会被复制到config目录下，以便自定义配置
* `npm run deploy` 部署到github pages


### 相关参考文档
* Create React App文档 [中文](https://www.html.cn/create-react-app/docs/getting-started/) | [英文](https://create-react-app.dev/docs/getting-started)
* React文档 [中文](https://react.docschina.org/docs/getting-started.html) | [英文](https://reactjs.org/docs/getting-started.html)
* React-router [中文(非最新版本)](http://react-guide.github.io/react-router-cn/index.html) | [英文](https://reacttraining.com/react-router/web/guides/quick-start) 
* Redux [中文](http://cn.redux.js.org) | [英文](https://redux.js.org/introduction/getting-started)
* axios [中文](http://www.axios-js.com/zh-cn/docs/) | [英文](https://github.com/axios/axios)





