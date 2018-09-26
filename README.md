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
