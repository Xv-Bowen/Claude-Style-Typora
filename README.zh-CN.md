# Claude Style for Typora

[English](README.md) · 简体中文

一套浅色、一套深色的 [Typora](https://typora.io) 主题，让文档读起来像 Claude 桌面应用里的一篇回复。正文、代码和表格照着 Claude 的聊天界面来排，提示框照 Claude 打开文档时的样子，Typora 自己的界面（侧栏、菜单、查找栏、对话框）也一起换上了 Claude 的样子。

Claude Style 是独立制作的主题，不是 Anthropic 出品，也没有得到 Anthropic 的认可或支持；主题里不含 Anthropic 的字体、图标或其他文件。Claude 是 Anthropic 的商标。

## 预览

### Claude Style Light

![Claude Style Light](images/preview-light.png)

### Claude Style Dark

![Claude Style Dark](images/preview-dark.png)

## 适用环境

Claude Style 在 Mac 上设计，在 macOS、Windows 和 Linux 上测试过。

## 安装

1. 从 [最新发布](https://github.com/Xv-Bowen/claude-style-typora/releases/latest) 下载 `claude-style-light.css` 和 `claude-style-dark.css`。
2. 在 Typora 里打开 **设置 → 外观 → 打开主题文件夹**。
3. 把两个文件复制进这个文件夹。
4. 退出 Typora 再重新打开，在 **主题** 菜单里选择 **Claude Style Light** 或 **Claude Style Dark**。

如果 Typora 设置了深色模式下用另一套主题，浅色模式选 Claude Style Light、深色模式选 Claude Style Dark，Typora 就会跟着系统外观切换。

Typora 运行时会把主题留在内存里。换成新版本的文件后，要退出 Typora 再打开；只在菜单里切换主题不会重新读取。

## 包括哪些部分

| 部分 | 效果 |
| --- | --- |
| 阅读 | Claude 的字号、行距和标题层级；安静的链接、引用、列表和表格 |
| 代码 | Claude 的代码卡片，带语言标签和 Claude 的语法高亮；行内代码是 Claude 的小代码标签 |
| 公式 | 和 Claude 里一样大 |
| 提示框 | GitHub 提示框（note、tip、important、warning、caution）照 Claude 显示文档时的样子：一条彩色竖线，上面是带图标的彩色标题 |
| 图表 | Mermaid 图表用 Claude 画图表时的颜色 |
| 文件链接 | 单独成段的文件链接显示成 Claude 分享文件时的卡片：按文件类型配颜色和图标，写着名字，下面是类型和扩展名。⌘ 点击（Windows 和 Linux 上是 Ctrl 点击）打开文件；把光标放进去就能编辑链接。网页链接仍是链接，导出时也是普通链接 |
| Typora 界面 | 侧栏里的文件树、大纲和搜索；菜单、查找替换、快速打开、对话框、通知、浮动工具栏和文件预览 |
| 模式 | 源代码模式是一个纯代码视图；专注模式用 Claude 的弱化色淡化其他段落 |
| 动效 | 只有 Claude 里会动的地方才动，其余都是即时变化 |
| 导出 | HTML 和 PDF 与编辑器使用同一套样式 |

### 字体

装了下面的字体就用它们，没装就按顺序往后用：

| 用于 | 首选 | 依次回退到 |
| --- | --- | --- |
| 正文 | Anthropic Serif | Times New Roman，中文用苹方（Windows 上是微软雅黑） |
| 界面 | Anthropic Sans | 系统字体，中文用苹方（Windows 上是微软雅黑） |
| 代码 | JetBrains Mono NL | JetBrains Mono、Anthropic Mono、SF Mono、Menlo，中文用苹方（Windows 上是微软雅黑） |

主题不附带、也不下载任何字体，Anthropic 的字体不随主题分发。[JetBrains Mono](https://www.jetbrains.com/lp/mono/) 可以免费安装。

### 图标

界面上的图标都是 Typora 自带的：Typora 自己的图标字体、Font Awesome 和 Ionicons。主题调整它们的颜色、大小和位置；Claude 有图标、Typora 却没画的地方（侧栏的文件夹菜单、浮动工具栏的菜单、快速打开），主题配上 Typora 在别处表示同一件事用的图标。另外主题自己画了几处简单的线条（菜单里的对勾、子菜单的箭头、关闭用的叉），不带任何图标文件。Claude 的图标属于 Anthropic，不能随主题分发，所以这套主题没有用。

### 打印和 PDF

打印和导出 PDF 跟随当前主题：浅色主题印在 Claude 的米白页面色上，深色主题整页是深色。要印在纸上，先切到浅色主题。

HTML 导出里的代码和编辑器里一样保持一行、可以横向滚动；打印和 PDF 没法滚动，长代码行会换行。

### 主题改不了的地方

macOS 上 Typora 有些部分由系统绘制，保持系统的样子：右键菜单、标题栏里的菜单、确认对话框、标题栏上的按钮、正文光标的粗细，以及设置窗口。

## 自定义

Typora 会在主题之后加载主题文件夹里的两个可选文件，不用改主题文件就能调整：

- `base.user.css` 对所有主题生效；
- `claude-style-light.user.css`、`claude-style-dark.user.css` 分别只对一套主题生效。

例如给正文换一种字体：

```css
:root {
    --font-text: "Source Han Serif SC", serif;
}
```

界面字体和代码字体分别是 `--font-ui` 和 `--font-code`。

## 反馈

发现哪里不对，欢迎 [提交 issue](https://github.com/Xv-Bowen/claude-style-typora/issues)，附上截图以及 Typora 和 macOS 的版本。

## 许可证

Claude Style 采用 [知识共享 署名-非商业性使用-禁止演绎 4.0 国际许可协议](LICENSE)（CC BY-NC-ND 4.0）。

- 可以使用，也可以原样转发给别人，但只限非商业用途，并且要注明作者。
- 不可以分享修改过的版本，也不可以用于商业用途。
- 用 Typora 的 `.user.css` 文件为自己调整（见[自定义](#自定义)）没有问题。

其他用途请先联系作者。
