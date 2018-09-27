# power

> A NeteaseCloudMusicForVue project

## 前端项目(web-client)

克隆项目地址并下载（需要已安装[Git](https://git-scm.com/downloads)）
```
git clone https://github.com/cpmlhj/NeteaseCloudMusicForVue.git
```

安装依赖
```
npm install
```

启动服务（http://localhost:3000） 因为项目是已网易云音乐的App版模仿的，所以请务必在浏览器上用响应式设计模式浏览
```
npm run dev
```
## Building

使用webpack 对项目进行打包
```
npm run build
```

## 后端项目 (web-middleware)

克隆项目中间件地址并下载
```
git clone http://github.com/cpmlhj/NeteaseCloudMusicForVue.middleware.git
```
上面为我自己做了小些修改的middleware。 -> [原版本在这!](https://github.com/sqaiyan/netmusic-node)

```
# install dependencies

npm install
```

```
# server at localhost: 8686
node app
```
# 预览图
<p align=center>
  <a ><img src="https://github.com/cpmlhj/PersonImg/blob/master/4871538013204_.pic_hd.png" width='300'/></a>
  <a ><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG489.jpeg" width='300'/></a>
  <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG490.jpeg" width='300'/></a>
  <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG491.jpeg" width='300'/></a>
   <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG492.jpeg" width='300'/></a>
   <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG493.jpeg" width='300'/></a>
   <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG494.jpeg" width='300'/></a>
   <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG495.jpeg" width='300'/></a>
  <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG496.jpeg" width='300'/></a>
  <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG497.jpeg" width='300'/></a>
  <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG498.jpeg" width='300'/></a>
  <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG499.jpeg" width='300'/></a>
  <a><img src="https://github.com/cpmlhj/PersonImg/blob/master/WechatIMG501.jpeg" width='300'/></a>
</p>

## 目前完成的功能
1.首页（每日推荐， 分类歌单， 排行榜全功能， 推荐歌单，最新歌曲， 推荐电台）<br>

2.个人列表 （最近播放记录， 喜欢的音乐，收藏歌单）<br>

3.电台 （精选电台） ！！由于大部分电台节目接口为付费接口 所以有些电台节目可能收听不了，这问题暂时无法解决，等待最新的API破解<br>

4.详情单页类（歌单，歌手，电台，专辑，评论，每日推荐）<br>

5.播放页（单曲，节目：上下一曲，播放模式[单曲，随机，顺序]，快进快退，歌词，播放列表， mini播放器）<br>

6.搜索 （热门， 搜索历史，单曲，歌手， 歌单，MV， 专辑）<br>

7.登陆，登出 （注意： 很多功能都必须要登陆已有的网易云账户，且必须是已手机号注册的才能使用）ps: 登陆功能只做简单的登陆登出功能!


## 存在的问题或bug
1.这个项目作为自己学习Vue全家桶时写的项目，由于技术原因，有一部分bug暂时没找出原因。2
2.后续还有很多功能会更新上，不过，不排除推倒重来 ,哈哈！ 如果时间允许的话，我会尝试用更好的办法去完善这个项目， 加油！
