# Claude Style for Typora

[English](README.md) · 简体中文

一套浅色、一套深色的 [Typora](https://typora.io) 主题，让文档读起来像 Claude 里的一篇回复。正文、代码和表格照着 Claude 的聊天界面来排，提示框照 Claude 打开文档时的样子，单独成段的文件链接显示成 Claude 分享文件时的卡片，Typora 自己的界面（侧栏、菜单、浮动工具栏、查找栏、对话框）也一起换上了 Claude 的样子。

Claude Style 是独立制作的主题，不是 Anthropic 出品，也没有得到 Anthropic 的认可或支持；主题里不含 Anthropic 的字体、图标或其他文件。Claude 是 Anthropic 的商标。

## 预览

### Claude Style Light

![Claude Style Light](images/preview-light.png)

### Claude Style Dark

![Claude Style Dark](images/preview-dark.png)

### 文件卡片

单独成段的文件链接，浅色和深色（截图时鼠标停在第二张卡片上）：

![文件卡片，浅色](images/file-cards-light.png)

![文件卡片，深色](images/file-cards-dark.png)

## 适用环境

Claude Style 在 Mac 上精心设计，在 macOS、Windows 和 Linux 上全面测试。

## 照的是哪一版桌面应用

桌面应用的界面会更新。Claude Style 1.x 各版照的都是 2026 年 10 月的桌面应用（3.1623 版）。下一个大版本 2.0 留给桌面应用的新界面和交互：桌面应用换上新界面后，2.0 会照新的样子来做。1.x 会持续维护：修复问题、适配 Typora 以后的版本（包括 Typora 自己将来的 2.0），都以补丁版本发布，界面不再大改。1.x 的各个发布会一直留在发布页上，想用现在这个样子的人随时能下载。

## 安装

1. 从 [最新发布](https://github.com/Xv-Bowen/claude-style-typora/releases/latest) 下载 `claude-style-light.css` 和 `claude-style-dark.css`。
2. 在 Typora 里打开 **设置 → 外观 → 打开主题文件夹**。
3. 把两个文件复制进这个文件夹。
4. 退出 Typora 再重新打开，在 **主题** 菜单里选择 **Claude Style Light** 或 **Claude Style Dark**。

想跟着系统外观切换深浅：在 **设置 → 外观** 里打开 **在深色模式下使用独立的主题**，浅色模式选 Claude Style Light，深色模式选 Claude Style Dark。

Typora 运行时会把主题留在内存里。换成新版本的文件后，要退出 Typora 再打开；只在菜单里切换主题，Typora 不会重新读取主题文件。

## 包括哪些部分

| 部分 | 效果 |
| --- | --- |
| 阅读 | Claude 的字号、行距和标题层级；链接、引用、列表、表格、键帽、任务列表和脚注都照 Claude 的样子 |
| 代码 | Claude 的代码卡片，带语言标签和 Claude 的语法高亮；行内代码也照 Claude 的样子 |
| 公式 | 和 Claude 里一样大 |
| 提示框 | GitHub 提示框（note、tip、important、warning、caution）照 Claude 显示文档时的样子：左边一条彩色竖线，第一行是带图标的彩色标题 |
| 图表 | Mermaid 图表用 Claude 画图表时的颜色 |
| 文件链接 | 单独成段的文件链接显示成 Claude 分享文件时的卡片：按文件类型配颜色和图标，写着名字，下面是类型和扩展名。⌘ 点击（Windows 和 Linux 上是 Ctrl 点击）打开文件；把光标放进去就能编辑链接。指向网页、邮箱、文档里某处或文件里某一部分的链接仍是链接。导出的 HTML 和 PDF 里不画卡片，文件链接也是普通链接 |
| 侧栏 | 文件树、大纲和搜索照 Claude 侧栏的样子，包括侧栏里的菜单 |
| 浮动工具栏 | 照 Claude 审阅栏的样子：按钮、菜单和子菜单都照 Claude 的方式打开和显示；一到六级标题收进"段落"的子菜单 |
| 查找和快速打开 | 查找替换栏用 Claude 的输入框；快速打开每行前面有图标，搜索结果像 Claude 的搜索一样把匹配的字加粗 |
| 对话框和提示 | 对话框、通知和提示气泡照 Claude 的样子 |
| 浮动大纲窗口 | 照 Claude 文档里的目录卡片 |
| 文件预览 | 顶栏和"打开方式"按钮照 Claude 的文档面板 |
| 模式 | 源代码模式是一个纯代码视图；专注模式用 Claude 的弱化色淡化其他段落 |
| 动效 | 只有 Claude 里会动的地方才动，其余都是即时变化 |
| 导出 | HTML 和 PDF 与编辑器使用同一套样式（文件卡片只在编辑器里画） |

### 字体

装了下面的字体就用它们，没装就按顺序往后用：

| 用于 | 首选 | 依次回退到 |
| --- | --- | --- |
| 正文 | Anthropic Serif | Times New Roman，中文用苹方（Windows 上是微软雅黑） |
| 界面 | Anthropic Sans | 系统字体，中文用苹方（Windows 上是微软雅黑） |
| 代码 | JetBrains Mono NL | JetBrains Mono、Anthropic Mono、SF Mono、Menlo，中文用苹方（Windows 上是微软雅黑） |

主题不附带、也不下载任何字体，Anthropic 的字体不随主题分发。[JetBrains Mono](https://www.jetbrains.com/lp/mono/) 可以免费安装。

### 图标

界面上的图标都是 Typora 自带的：Typora 自己的图标字体、Font Awesome 和 Ionicons，主题只调整它们的颜色、大小和位置。Claude 有图标、Typora 却没画图标的地方（侧栏的文件夹菜单、浮动工具栏的菜单、快速打开、文件卡片），主题从 Typora 自带的图标里挑表示同一件事的配上。菜单里的对勾、子菜单的箭头和关闭用的叉是主题自己画的简单线条。主题里不带任何图标文件。Claude 的图标属于 Anthropic，不能随主题分发，所以这套主题没有使用 Claude 的图标。

### 打印和 PDF

打印和导出 PDF 跟随当前主题：浅色主题印在 Claude 的米白页面色上，深色主题整页是深色。要打印到纸上，最好先切到浅色主题。

HTML 导出里的代码和编辑器里一样保持一行、可以横向滚动；打印和 PDF 没法滚动，长代码行会换行。

## 你可能会问的问题

**为什么 Typora 有些地方还是系统的样子？**\
在 macOS 上，这些部分由系统绘制，不在主题能改的网页里：右键菜单、标题栏里的菜单、确认对话框、标题栏上的按钮、正文光标的粗细，以及设置窗口。

**为什么点图片不像 Claude 那样弹出大图？**\
主题只能改变 Typora 的外观，而弹出、缩放、关闭这样的看图功能需要脚本，主题加不了。能加上看图功能的插件要改动 Typora 自己的文件，所以不属于这个主题。

**为什么没勾选的子任务也被划掉了？**\
Claude 就是这样：勾选一项任务后，整项连同下面的子任务都变灰、加删除线。子任务自己的复选框仍然是空的。

**为什么按 Esc 关不掉浮动工具栏的块类型菜单？**\
这个菜单是 Typora 自己的，用 Typora 自带的主题按 Esc 也关不掉。点菜单外面，或者再点一次按钮，就能关上。

**为什么一长串网址只有前面一段是链接？**\
没写成链接语法的网址，在哪里结束由 Typora 判断，遇到里面的中文（比如 `?query=中文`）就停下。用 Typora 自带的主题也是这样。

**为什么文件卡片和 Claude 的有点不一样？**\
主题读不到文件，也改不了链接上显示的文字，所以卡片上的名字就是链接文字（Claude 写的是文件名），图片和 PDF 没有缩略图，也没有下载按钮；⌘ 点击（Windows 和 Linux 上是 Ctrl 点击）打开文件。主题认不出类型的文件，第二行只写"文件"，不带 Claude 会写的扩展名。指向文档里某处或文件里某一部分的链接仍是链接，Claude 的回复里它们是普通文字。

**为什么是两个主题文件，而不是一个跟随系统的文件？**\
Typora 的主题菜单里一个主题文件就是一项，只有一个文件就没法自己选浅色或深色了，比如系统是深色时想切到浅色主题再打印。导出的 HTML 页面也会跟着看的人的系统变色。两个文件也能跟着系统外观切换，做法见[安装](#安装)。

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

发现哪里不对，欢迎 [提交 issue](https://github.com/Xv-Bowen/claude-style-typora/issues)，附上截图、Typora 的版本和所用的系统（macOS、Windows 或 Linux 及其版本）。

## 许可证

Claude Style 采用 [知识共享 署名-非商业性使用-禁止演绎 4.0 国际许可协议](LICENSE)（CC BY-NC-ND 4.0）。

- 可以使用，也可以原样转发给别人，但只限非商业用途，并且要注明作者。
- 不可以分享修改过的版本，也不可以用于商业用途。
- 用 Typora 的 `.user.css` 文件为自己调整（见[自定义](#自定义)）没有问题。

其他用途请先联系作者。
