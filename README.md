#weibocon
自动化微博粉丝运维工具，稳定快速并且精准地找到你想要的粉丝，并让他们加你关注。比较适合加V账号使用，普通账号使用效果可能不佳。  
**本工具采取文档优先开发的方式，目前正处于文档开发状态。程序开发尚未完整，因此暂时无法使用。**

#公开使用
本工具在进入稳定版本前不可运行。

#安装、运行与测试
安装weibocon，执行
```
$ [sudo] npm install -g weibocon
...
$ bower install   #需要安装bower来安装前端所需库
```
本工具采用web界面方式，启动服务器执行下面的命令
```
$ npm start
```
默认将在本地3000端口开启服务。  
测试使用mocha，执行
```
$ npm test
```

#流程
基本的运维思想借鉴于一些媒体微博手动运维的思想：通过微博搜索，找到目标的粉丝，加他们关注，之后过一阵子之后移除对他们的关注。这一过程中大概会有5%~15%的粉丝会予以回粉，如果是加V用户以及粉丝已经有很多的用户，这一比例可能会有所提升。  
weibocon的运维过程和上述过程差不多一致，但是weibocon寻找目标粉丝的方式是：通过监控您关注的微博账号，weibocon为您监控这些账号所发微博的评论，并自动关注这些评论的人。对于所有weibocon为您添加的粉丝，都将被记录，方便采用脚本取消关注。
人工需要做的事情是：  

- 添加监控微博账号
- 授权运营微博（需要从微博开放平台申请AppKey）

人工可能需要做的事情是：  

- 手动清除已经添加的粉丝

