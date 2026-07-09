# 项目结构规范

## 当前结构

```text
.
├── index.html
├── README.md
├── src/
│   ├── styles/
│   │   └── main.css
│   └── scripts/
│       └── main.js
├── assets/
│   ├── brand/
│   │   ├── beidou-logo.png
│   │   └── beidou-logo.svg
│   ├── images/
│   │   ├── ai-employees/
│   │   └── partners/
│   └── videos/
├── resources/
│   └── source-documents/
├── archive/
│   └── releases/
├── docs/
└── tmp/
```

## 目录职责

`index.html`
官网唯一发布入口。只承载页面结构、SEO 信息和资源引用，不再堆放大段样式或脚本。

`src/styles/`
页面样式。当前使用 `main.css` 单入口维护，后续若体量继续增大，可按 `base.css`、`components.css`、`pages.css` 拆分。

`src/scripts/`
页面交互脚本。当前使用 `main.js` 单入口维护，包括导航、路由、动画、轮播、表单弹窗等交互。

`assets/`
线上页面会直接加载的素材，按类型归档：
- `brand/`：品牌 logo、品牌图形、favicon 候选。
- `images/`：页面图片，按业务模块继续分组。
- `videos/`：页面视频、演示视频。

`resources/`
内容源资料和项目资源板块，例如 PPT、原始文案、客户资料、素材来源说明。这里的文件不一定会被网页直接加载。

`archive/`
历史发布版本、阶段性快照和不可直接维护的旧文件。

`tmp/`
临时截图、视觉验证图和一次性产物。该目录被 `.gitignore` 忽略，不作为正式项目结构的一部分。

## 新增文件规则

1. 能被页面直接加载的文件放 `assets/`。
2. 只用于整理、沟通、备份的文件放 `resources/` 或 `archive/`。
3. 不要在根目录新增图片、视频、PPT、临时 HTML。
4. 新增模块素材时，优先建立业务子目录，例如 `assets/images/cases/`。
