## 使用前必读
```
1)业务系统（接入UAP）请使用主干master代码，禁止使用分支vue-temple-base

2)非业务系统推荐使用分支vue-temple-base
```




## Run 开发
```bash
    # 克隆项目
    从svn下载代码
    # 安装依赖
    npm install（或者cnpm install）

    # 本地开发 开启服务
    npm run dev(或者cnpm run dev)

```
浏览器访问 http://localhost:9001

## Build 发布
```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview(也可以使用cnpm)

    # 构建生成环境
    npm run build:prod(也可以使用cnpm)
```

## 本地启动服务
	//如果是本地启动vue前端服务，则需要在host里配置vue.deppontest.com域名为127.0.0.1
	//后端service服务也需要在host里配置 dpboot.deppontest.com域名为127.0.0.1

## FileTree 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
│   ├── dev.env.js             //开发环境接口地址配置
│   ├── index.js               //主要配置文件
│   ├── prod.env.js             //生产环境接口地址配置
│   ├── sit.env.js             //测试环境接口地址配置
│   ├── postcss.config.js      //postcss配置
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── components             // 全局UI组件
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── utils                  // 全局公用方法
│   ├── containers              // 自适应布局组合
│   ├── view                   // view界面
│   │    ├── errorPages           //错误界面
│   │    └── home              //首页
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 静态资源
│   ├── css                     //css
│   ├── js                      //js
│   ├── img                      //图片
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json
