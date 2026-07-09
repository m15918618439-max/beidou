# 北斗智能官网

这是一个静态官网项目，当前技术栈保持为原生 HTML、CSS、JavaScript，不引入构建工具和前端框架，优先保证发布简单、迁移成本低、页面可直接打开。

## 快速入口

- 生产入口：`index.html`
- 样式入口：`src/styles/main.css`
- 脚本入口：`src/scripts/main.js`
- 运行素材：`assets/`
- 源资料与内容资源：`resources/`
- 结构和规范文档：`docs/`

## 本地预览

直接用浏览器打开 `index.html` 即可预览。若后续接入接口、路由或构建工具，再统一新增开发服务器配置。

## 维护原则

1. 根目录只保留入口、说明和工程配置。
2. 页面代码放在 `src/`，运行时图片、视频、品牌素材放在 `assets/`。
3. PPT、内容源稿、需求资料等放在 `resources/`，不要混入根目录。
4. 文件名使用英文小写 kebab-case，例如 `beidou-logo.svg`、`fight-detection-0205.mp4`。
5. 新增页面组件时，先看 `docs/naming-conventions.md`，保持类名、资源名和数据属性一致。
