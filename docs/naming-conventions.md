# 命名与组件规范

## 文件命名

统一使用英文小写 kebab-case：

```text
beidou-logo.svg
ai-security.png
partner-casm-white.png
fight-detection-0205.mp4
```

避免在正式文件名中使用中文、空格、括号和版本口语，例如：

```text
官网内容0707.pptx
北斗官网_发布优化版.html
打架识别0205.mp4
```

源资料可以保留中文标题含义，但正式落盘名应转换为可维护命名，例如 `official-content-2026-07-07.pptx`。

## CSS 命名

当前项目采用语义化短类名和模块前缀混合方式，新增样式遵循以下规则：

1. 页面级容器：`page-*`，例如 `page-home`。
2. 模块区块：使用业务名，例如 `hero`、`metrics`、`partners`。
3. 模块内部元素：使用清晰短名或模块前缀，例如 `hero-grid`、`emp-grid`、`case-track`。
4. 状态类：使用 `is-*` 或动词状态，例如 `is-looping`、`active`、`scrolled`。
5. JS 钩子优先使用 `data-*` 属性，不新增只为脚本服务的视觉类名。

## 组件整理

现有页面组件按功能归类维护：

```text
导航组件：nav、nav-in、nav-links、nav-cta
首屏组件：hero、hero-grid、hero-stats、hero-light-canvas
卡片组件：pcard、emp、mcell、sol、ccard
轮播组件：emp-grid、case-track、emp-carousel-dots
弹窗组件：modal、modal-card、modal-close
页脚组件：footer、foot-bot
```

新增组件时先判断是否属于已有模块：

1. 属于已有模块：沿用模块前缀，例如 `emp-*`。
2. 是新的复用组件：使用明确业务名，例如 `resource-card`。
3. 只在单一区块使用：放在对应区块附近，避免抽象过早。

## JavaScript 命名

1. DOM 初始化函数使用 `init*`，例如 `initHeroLight()`。
2. 用户动作函数使用动词开头，例如 `openModal()`、`submitForm()`。
3. 配置常量使用复数或语义名，例如 `pages`、`pageTitles`。
4. 不在全局新增无意义缩写，除非是局部循环变量。

## 资源命名

资源命名格式建议：

```text
业务模块-内容-状态.扩展名
```

示例：

```text
partner-casm-white.png
hero-light-desktop.png
case-rail-security-cover.jpg
```

品牌、合作方、案例、AI 员工等素材分别放入独立目录，避免把所有图片堆在一个文件夹里。
