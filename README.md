# Claude Style for Typora

English · [简体中文](README.zh-CN.md)

A light and a dark theme for [Typora](https://typora.io) that make your documents read like a reply in the Claude desktop app. The text, code and tables follow Claude's chat view, alerts follow the way Claude shows a document, a file linked on its own becomes the card Claude shows for a file it shares, and Typora's own interface (sidebar, menus, floating toolbar, find bar, dialogs) takes on Claude's look as well.

Claude Style is an independent theme. It is not made, endorsed or supported by Anthropic, and it contains no fonts, icons or other files from Anthropic. Claude is a trademark of Anthropic.

## Preview

### Claude Style Light

![Claude Style Light](images/preview-light.png)

### Claude Style Dark

![Claude Style Dark](images/preview-dark.png)

### File cards

Files linked in paragraphs of their own, in the light and the dark theme (the pointer is over the second card):

![File cards, light](images/file-cards-light.png)

![File cards, dark](images/file-cards-dark.png)

## Compatibility

Claude Style is designed on the Mac and tested on macOS, Windows and Linux.

## Installation

1. Download `claude-style-light.css` and `claude-style-dark.css` from the [latest release](https://github.com/Xv-Bowen/claude-style-typora/releases/latest).
2. In Typora, open **Settings → Appearance → Open Theme Folder**.
3. Copy both files into that folder.
4. Quit Typora and open it again, then choose **Claude Style Light** or **Claude Style Dark** from the **Themes** menu.

If Typora is set to use a different theme in dark mode, choose Claude Style Light for light mode and Claude Style Dark for dark mode, and Typora will follow the system appearance.

Typora keeps themes in memory while it runs. After you replace the files with a newer version, quit and reopen Typora; switching themes from the menu does not reload them.

## What it covers

| Area | What you get |
| --- | --- |
| Reading | Claude's text size, line spacing and heading scale; quiet links, quotes, lists and tables; keycaps, task lists and footnotes as in Claude |
| Code | Claude's code card with a language label and Claude's syntax colours; inline code as Claude's small code chip |
| Math | Formulas set at the same size as in Claude |
| Alerts | GitHub alerts (note, tip, important, warning, caution) drawn the way Claude shows them in a document: a coloured rule with a coloured title and icon above the text |
| Diagrams | Mermaid diagrams in the colours Claude uses for them |
| File links | A file linked in a paragraph of its own shows as the card Claude draws for a file it shares: coloured by the kind of file, with its icon, its name, and the kind and extension under it. Command-click (Ctrl-click on Windows and Linux) opens it; put the caret in it to edit the link. Web links stay links, and exports keep the plain link |
| Sidebar | File tree, outline and search in the look of Claude's sidebar, with its menus |
| Floating toolbar | The look of Claude's review bar: its buttons, menus and submenus open and behave the way Claude's do, and the heading levels sit in a submenu of Paragraph |
| Find and quick open | The find and replace bar; quick open shows an icon on each row, and search results mark their matches in bold, as Claude's search does |
| Dialogs and notices | Dialogs, notifications and tooltips in Claude's look |
| Outline window | The floating outline window as the outline card of a Claude document |
| File preview | The header and the Open with button of Claude's document panel |
| Modes | Source mode as a plain code view; focus mode dims the other blocks in Claude's quiet colours |
| Motion | Only what moves in Claude moves; everything else changes at once |
| Export | HTML and PDF use the same styles as the editor |

### Fonts

The theme uses these fonts when they are installed, and the next ones in each list when they are not:

| Used for | Preferred | Falls back to |
| --- | --- | --- |
| Text | Anthropic Serif | Times New Roman, then PingFang SC (Microsoft YaHei on Windows) for Chinese |
| Interface | Anthropic Sans | The system font, PingFang SC (Microsoft YaHei on Windows) for Chinese |
| Code | JetBrains Mono NL | JetBrains Mono, Anthropic Mono, SF Mono, Menlo, then PingFang SC (Microsoft YaHei on Windows) for Chinese |

No font is bundled or downloaded. The Anthropic typefaces are not distributed with this theme. [JetBrains Mono](https://www.jetbrains.com/lp/mono/) is free to install.

### Icons

Every icon in the interface is one Typora already ships: its own icon font, Font Awesome and Ionicons. The theme sets their colour, size and place. Where Claude shows an icon but Typora draws none (the sidebar's folder menu, the floating toolbar's menus, quick open, file cards), the theme adds one of Typora's own icons for the same thing. It also draws a few simple strokes itself (the tick in menus, the arrow of a submenu and the close cross), and it contains no icon files. Claude's icons belong to Anthropic and cannot be shared with a theme, so this theme does not use them.

### Printing and PDF

Printing and PDF export follow the theme you are using: the light theme prints on Claude's warm page colour and the dark theme prints dark. Switch to the light theme before printing on paper.

Code in HTML exports stays on one line and scrolls, as it does in the editor. In print and PDF, long code lines wrap, because paper cannot scroll.

### What a theme cannot change

Some parts of Typora on macOS are drawn by the system, so they keep the system look: right-click menus, the menus in the title bar, confirmation dialogs, the window's title bar buttons, the thickness of the text cursor and the Settings window.

## Customization

Typora loads two optional files from the theme folder after the theme, so you can adjust it without editing the theme files:

- `base.user.css` applies to every theme;
- `claude-style-light.user.css` and `claude-style-dark.user.css` apply to one theme each.

For example, to use another font for the text:

```css
:root {
    --font-text: "Source Han Serif SC", serif;
}
```

The interface and code fonts are `--font-ui` and `--font-code`.

## Feedback

Found something that does not look right? Please [open an issue](https://github.com/Xv-Bowen/claude-style-typora/issues) with a screenshot and your Typora and macOS versions.

## License

Claude Style is licensed under [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International](LICENSE) (CC BY-NC-ND 4.0).

- You may use it and share unchanged copies, for non-commercial purposes, with credit to the author.
- You may not share changed versions of it, or use it commercially.
- Adjusting it for your own use with Typora's `.user.css` files (see [Customization](#customization)) is fine.

For anything else, please ask the author.
