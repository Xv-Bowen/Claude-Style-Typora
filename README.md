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

Files linked in paragraphs of their own, in the light and the dark theme (in the screenshots the pointer rests on the second card):

![File cards, light](images/file-cards-light.png)

![File cards, dark](images/file-cards-dark.png)

## Compatibility

Claude Style is carefully designed on the Mac and thoroughly tested on macOS, Windows and Linux.

## Installation

1. Download `claude-style-light.css` and `claude-style-dark.css` from the [latest release](https://github.com/Xv-Bowen/claude-style-typora/releases/latest).
2. In Typora, open **Settings → Appearance → Open Theme Folder**.
3. Copy both files into that folder.
4. Quit Typora and open it again, then choose **Claude Style Light** or **Claude Style Dark** from the **Themes** menu.

To switch between light and dark with the system appearance, turn on **Use separate theme in dark mode** in **Settings → Appearance**, then choose Claude Style Light for light mode and Claude Style Dark for dark mode.

Typora keeps themes in memory while it runs. After you replace the files with a newer version, quit and reopen Typora; switching themes from the menu does not make Typora read the theme files again.

## What it covers

| Area | What you get |
| --- | --- |
| Reading | Claude's text size, line spacing and heading scale; links, quotes, lists, tables, keycaps, task lists and footnotes as in Claude |
| Code | Claude's code card with a language label and Claude's syntax colours; inline code as in Claude |
| Math | Formulas set at the same size as in Claude |
| Alerts | GitHub alerts (note, tip, important, warning, caution) drawn the way Claude shows them in a document: a coloured line down the left side and a coloured title with its icon on the first line |
| Diagrams | Mermaid diagrams in the colours Claude uses for them |
| File links | A file linked in a paragraph of its own shows as the card Claude draws for a file it shares: coloured by the kind of file, with its icon, its name, and the kind and extension under it. Command-click (Ctrl-click on Windows and Linux) opens it; put the caret in it to edit the link. Links to web pages, mail addresses, a place in the document or a part of a file stay links. HTML and PDF exports draw no cards: file links are plain links there |
| Sidebar | File tree, outline and search in the look of Claude's sidebar, with its menus |
| Floating toolbar | The look of Claude's review bar: its buttons, menus and submenus open and behave the way Claude's do, and the heading levels sit in a submenu of Paragraph |
| Find and quick open | The find and replace bar with Claude's text fields; quick open shows an icon on each row, and search results mark their matches in bold, as Claude's search does |
| Dialogs and notices | Dialogs, notifications and tooltips in Claude's look |
| Outline window | The floating outline window drawn as the outline card of a Claude document |
| File preview | The header and the Open with button drawn as in Claude's document panel |
| Modes | Source mode as a plain code view; focus mode dims the other blocks to Claude's muted text colour |
| Motion | Only what moves in Claude moves; everything else changes at once |
| Export | HTML and PDF use the same styles as the editor (file cards are drawn in the editor only) |

### Fonts

The theme uses these fonts when they are installed, and the next ones in each list when they are not:

| Used for | Preferred | Falls back to |
| --- | --- | --- |
| Text | Anthropic Serif | Times New Roman, then PingFang SC (Microsoft YaHei on Windows) for Chinese |
| Interface | Anthropic Sans | The system font, PingFang SC (Microsoft YaHei on Windows) for Chinese |
| Code | JetBrains Mono NL | JetBrains Mono, Anthropic Mono, SF Mono, Menlo, then PingFang SC (Microsoft YaHei on Windows) for Chinese |

No font is bundled or downloaded. The Anthropic typefaces are not distributed with this theme. [JetBrains Mono](https://www.jetbrains.com/lp/mono/) is free to install.

### Icons

Every icon in the interface is one Typora already ships: its own icon font, Font Awesome and Ionicons. The theme only sets their colour, size and place. Where Claude shows an icon but Typora draws none (the sidebar's folder menu, the floating toolbar's menus, quick open, file cards), the theme adds the icon from Typora's own sets that stands for the same thing. The tick in menus, the arrow of a submenu and the close cross are simple lines the theme draws itself. The theme contains no icon files. Claude's icons belong to Anthropic and may not be distributed with a theme, so this theme does not use Claude's icons.

### Printing and PDF

Printing and PDF export follow the theme you are using: the light theme prints on Claude's warm page colour and the dark theme prints dark. To print on paper, switching to the light theme first is usually best.

Code in HTML exports stays on one line and scrolls, as it does in the editor. In print and PDF, long code lines wrap, because paper cannot scroll.

## Questions you may have

**Why do some parts of Typora keep the system look?**\
On macOS they are drawn by the system, not by the page a theme can style: right-click menus, the menus in the title bar, confirmation dialogs, the window's title bar buttons, the thickness of the text cursor and the Settings window.

**Why does clicking a picture not open a larger view, as in Claude?**\
A theme can only change how Typora looks, while a viewer that opens, zooms and closes needs a script, which a theme cannot add. Plugins that add such a viewer change Typora's own files, so they are not part of this theme.

**Why is an unticked subtask crossed out?**\
Claude does the same: once a task is ticked, the whole item greys and is crossed out, the tasks under it included. The subtask's own box stays unticked.

**Why does Esc not close the block type menu of the floating toolbar?**\
The menu is Typora's, and Esc does not close it with Typora's own themes either. Click outside it, or click the button again.

**Why is only the first part of a long web address a link?**\
For an address typed without link syntax, Typora decides where it ends, and it stops before Chinese characters in it (in `?query=中文`, for example). Typora's own themes show the same.

**Why does a file card differ a little from Claude's?**\
A theme cannot read the file or change the text a link shows, so the card shows the link's text as its name (Claude shows the file's name), has no preview of pictures or PDFs and no download button; Command-click (Ctrl-click on Windows and Linux) opens the file. For a kind of file the theme does not know, the second line reads only 文件 (file), without the extension Claude adds. Links to a place in the document or to a part of a file stay links, where Claude's replies show them as plain text.

**Why are there two theme files rather than one that follows the system?**\
Typora lists each theme file as one entry in its Themes menu, so with a single file you could no longer choose light or dark yourself, for example the light theme for printing while the system is dark. An exported HTML page would also change colour with the reader's system. The two files can switch with the system appearance as well; see [Installation](#installation).

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

Found something that does not look right? Please [open an issue](https://github.com/Xv-Bowen/claude-style-typora/issues) with a screenshot, your Typora version and your system (macOS, Windows or Linux, and its version).

## License

Claude Style is licensed under [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International](LICENSE) (CC BY-NC-ND 4.0).

- You may use it and share unchanged copies, for non-commercial purposes, with credit to the author.
- You may not share changed versions of it, or use it commercially.
- Adjusting it for your own use with Typora's `.user.css` files (see [Customization](#customization)) is fine.

For anything else, please ask the author.
