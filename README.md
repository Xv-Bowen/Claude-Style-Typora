# Claude Style for Typora

English · [简体中文](README.zh-CN.md)

A light and a dark theme for [Typora](https://typora.io) that make your documents read like a reply in Claude. The text, code and tables follow Claude's chat view, alerts follow the way Claude shows a document, a file linked on its own becomes the card Claude shows for a file it shares, and Typora's own interface (sidebar, menus, floating toolbar, find bar, dialogs) takes on Claude's look as well.

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

Test report: [Claude Style 1.2.2 on Linux](reports/claude-style-1.2.2-linux-test-report.html) (an HTML file; download it and open it in a browser).

## Which version of the desktop app it follows

The desktop app's interface changes over time. The Claude Style 1.1 series follows the desktop app as of October 2026 (version 3.1623); the 1.2 series follows the new interface that came after it (version 3.6556): sizes, spacing, corners, type and layout and icons follow the new interface, and the colours stay those of the 1.1 series. Only one colour follows the new interface: in the sidebar, file names and their extensions, outline headings, New and Search, the 项目列表 heading and the folder's name in the footer are always in the colour of the body text. Tables, the border around inline code and file cards keep the look of the 1.1 series; see [Questions you may have](#questions-you-may-have) for why. The releases of the 1.1 series stay on the Releases page, but they are no longer updated; please move to the 1.2 series soon.

## Installation

1. Download `claude-style-light.css` and `claude-style-dark.css` from the [latest release](https://github.com/Xv-Bowen/claude-style-typora/releases/latest).
2. In Typora, open **Settings → Appearance → Open Theme Folder**.
3. Copy both files into that folder.
4. Quit Typora and open it again, then choose **Claude Style Light** or **Claude Style Dark** from the **Themes** menu.

To switch between light and dark with the system appearance, turn on **Use separate theme in dark mode** in **Settings → Appearance**, then choose Claude Style Light for light mode and Claude Style Dark for dark mode.

Typora keeps themes in memory while it runs. After you replace the files with a newer version, quit and reopen Typora; switching themes from the menu does not make Typora read the theme files again.

The 1.1 series is no longer updated: problems are fixed only in the 1.2 series, and the enhancement script works only with the 1.2 series, so please move to the 1.2 series soon. To keep the look of the 1.1 series anyway, download its last release, 1.1.16, from the [Releases page](https://github.com/Xv-Bowen/claude-style-typora/releases).

## What it covers

| Area | What you get |
| --- | --- |
| Reading | Claude's text size, line spacing and heading scale; links, quotes, lists, tables, keycaps, task lists and footnotes as in Claude |
| Code | Claude's code card with a language label and Claude's syntax colours, and a copy button at its top right while the pointer is on it (it works with the enhancement script); inline code as in Claude |
| Math | Formulas set at the same size as in Claude |
| Alerts | GitHub alerts (note, tip, important, warning, caution) drawn the way Claude shows them in a document: a coloured line down the left side and a coloured title with its icon on the first line |
| Diagrams | Mermaid diagrams in the colours Claude uses for them |
| File links | A file linked in a paragraph of its own shows as the card Claude draws for a file it shares: coloured by the kind of file, with its icon, its name, and the kind and extension under it. Command-click (Ctrl-click on Windows and Linux) opens it; put the caret in it to edit the link. Links to web pages, mail addresses, a place in the document or a part of a file stay links. HTML and PDF exports draw no cards: file links are plain links there (with the [enhancement script](#enhancement-script-optional)'s export snippet, exports draw them too) |
| Pictures | When the text cursor moves onto a picture (click it, or reach it with the arrow keys), the picture is shown enlarged in the middle of the window with the rest of the window dimmed and a close button at its top right, as Claude shows a picture. Clicking the close button or anywhere in the text, or leaving with the arrow keys, closes it |
| Sidebar | File tree, outline and search in the look of Claude's sidebar, with its menus. Under the Files / Outline switch sit a New row and a Search row, as at the top of Claude's sidebar (they read 新建 and 搜索 in Chinese, New and Search in English, and Typora's own words in other languages), and a heading reading 项目列表 ("project list"; it is in Chinese whatever language Typora is set to, and follows Typora's language with the enhancement script) stands over the files. On the Mac, the bar at the foot of the sidebar, with the folder's name, always shows. The bar at the foot of the sidebar has no switch between the file tree and the article list; switch with View → File Tree or View → Articles. At the right of the bar at the foot of the sidebar, a lock shows whether the document is in Read-Only Mode (View → Readonly Mode): open while you can edit, shut and shown pressed while the mode is on. Without the enhancement script, clicking it does nothing; with the script, a click switches the mode. A name too long for its row fades out at the end, as in Claude's sidebar; the whole path shows when the pointer rests on it. The sidebar search opens as a card in the middle of the window, like Claude's search: file names and matching lines in one list, with the rest of the window dimmed. At its foot, as at the foot of Claude's search, it names the keys that work there: 关闭 Esc ("close") while the field is empty and 选择 ↑ ↓ ("select") once something is typed; on the right are the switches 区分大小写 ("case sensitive"), 查找整个单词 ("whole word") and 正则表达式 ("regular expression"). These words are in Chinese whatever language Typora is set to (with the enhancement script they follow Typora's language) |
| Floating toolbar | The look of Claude's review bar: its buttons, menus and submenus open and behave the way Claude's do, and the heading levels sit in a submenu of Paragraph |
| Find and quick open | The find and replace bar is a card at the top right of the page, as Claude's find bar is; when nothing matches it reads 0 / 0. Quick open stands where Claude's search does, with the rest of the window dimmed, one line for each result: its icon, its name and, on the right, its folder; search results mark their matches in bold, as Claude's search does; at its foot it names the keys that work there, as the sidebar search does |
| Dialogs and notices | Dialogs, notifications and tooltips in Claude's look |
| Outline window | The floating outline window drawn as the outline card of a Claude document |
| File preview | The header and the Open with button drawn as in Claude's document panel |
| Modes | Source mode as a plain code view; focus mode dims the other blocks to Claude's muted text colour |
| Motion | Only what moves in Claude moves; everything else changes at once |
| Export | HTML and PDF use the same styles as the editor (file cards are drawn in the editor only, and in exports too with the enhancement script's export snippet) |

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

## Enhancement script (optional)

A theme can only change how Typora looks. An optional script, `claude-style-enhance.js`, adds a few things a theme cannot do. The theme draws the buttons and icons, and the script makes them work: without it, the theme works as it does now, except that the code cards' copy button and the lock at the foot of the sidebar do nothing when clicked; with it, the script does nothing while another theme is in use. The script does not go online and does not change your documents. The script is made for the 1.2 series only: script 0.1.3 and later need Claude Style 1.2.3 or later, and with an older theme (the 1.1 series included) the script does nothing. Scripts 0.1.4 (from Claude Style 1.2.4), 0.1.3 (in Claude Style 1.2.3) and 0.1.1 (in Claude Style 1.2.2) are adapted to Typora 1.14.15, and 0.1.0 (in Claude Style 1.2.1) to Typora 1.14.10. The script works by hooking into Typora's own code, so a later version of Typora may need an update of the script.

With the script:

- **Pictures**: click a picture, or reach it with the arrow keys, and it opens enlarged in the middle of the window, growing from where it sits in the text. Zoom with the scroll wheel or by pinching on the trackpad, drag it once it is zoomed in, and double-click to switch between fitting the window and its actual size (a picture already shown at its actual size doubles). The close button at the picture's top right or Esc closes it, and the text stays where it was.
- **Clicks**: a single click on a file card or an inline formula no longer shows its Markdown; to edit it, double-click, or click while holding ⌥ (Alt on Windows and Linux).
- **File cards**: a card shows the file's name without its extension, with `_` and `-` as spaces (`Q3_report-final.pptx` reads "Q3 report final"); for a kind of file the theme does not know, the second line names the extension too; cards for pictures show a thumbnail.
- **Copying code**: click the copy button at a code card's top right to copy its code; the button then turns into a tick.
- **Read-only**: click the lock at the foot of the sidebar to turn Read-Only Mode on or off, the same switch as View → Readonly Mode; pointing at the lock shows a tip naming the mode.
- **Sidebar search**: it searches as you type, half a second after you stop, without Return; Esc closes it wherever the cursor is.
- **Arrow keys**: in the sidebar search results and in quick open, ↑ and ↓ scroll one row at a time instead of jumping several rows.
- **Floating toolbar**: Esc closes the block type menu, and the English "Paragraph" the toolbar shows at first soon changes to Typora's interface language.
- **Outline**: the outline marks the section you are reading.
- **Top folder**: clicking the top folder's row folds and unfolds it, and Typora remembers it after a restart.
- **Interface words**: the Chinese words the theme writes into the interface (项目列表, the keys named at the foot of the search card and of quick open, the three search switches) follow the language Typora is set to; in Simplified Chinese they stay as they are.
- **Export**: exported HTML and PDF draw file cards too, with their icons and thumbnails, and the copy button of code cards in HTML works too. This takes a snippet pasted into Typora's export settings; see [Exporting HTML and PDF](#exporting-html-and-pdf) below.

### Installing the script

Install the theme first (see [Installation](#installation)), then download `claude-style-enhance.zip` from the [latest release](https://github.com/Xv-Bowen/claude-style-typora/releases/latest) and unzip it. Quit Typora before installing.

- **macOS**: open Terminal, type `bash` and a space, drag the unzipped `install-mac.sh` into the Terminal window and press Return. If Typora is not in the Applications folder, add a space and the path to Typora.app at the end. If Terminal says "macOS does not let this terminal change Typora", allow Terminal in **System Settings → Privacy & Security → App Management** and run it again.
- **Windows**: right-click `install-windows.ps1` and choose Run with PowerShell. If Typora is in a folder only an administrator can change, it asks for an administrator.
- **Linux**: in a terminal, go to the unzipped folder and run `sudo bash install-linux.sh`. If Typora is not found, add `--path` and Typora's folder at the end.

Then open Typora and choose Claude Style Light or Claude Style Dark.

The installer adds only one line to Typora's own page file, which loads `claude-style-enhance.js` from the theme folder, and keeps a copy of that file first. Every Typora update puts Typora's own file back, so run the installer again after updating Typora.

#### Without the installer

The installer does only two things, which you can also do yourself or hand to an AI tool you use. Quit Typora first, and keep a copy of the page file you are about to change:

1. Copy `claude-style-enhance.js` into Typora's theme folder (the one **Settings → Appearance → Open Theme Folder** opens).
2. In Typora's own page file, add one line right after the line named below:

- **macOS**: the page file is `/Applications/Typora.app/Contents/Resources/TypeMark/index.html`. After `<script src="./appsrc/main.js" aria-hidden="true" defer></script>`, add:

  ```html
  <script src="file:///Users/your-user-name/Library/Application%20Support/abnerworks.Typora/themes/claude-style-enhance.js" defer data-claude-style-enhance></script>
  ```

  Put the name of your user folder in place of `your-user-name`. This is a web address: write spaces as `%20`, and encode any other characters the way web addresses do. If macOS does not let you change the file, allow the program you change it with in **System Settings → Privacy & Security → App Management**.
- **Windows and Linux**: the page file is `resources/window.html` in Typora's folder (on Windows often `C:\Program Files\Typora`, on Linux often `/usr/share/typora` or `/opt/typora`). After `<script src="./appsrc/window/frame.js" defer="defer"></script>` (`./app/window/frame.js` in some versions), add:

  ```html
  <script src="typora://app/userData/themes/claude-style-enhance.js" defer data-claude-style-enhance></script>
  ```

  Before Typora 1.4, write `typora://userData` in place of `typora://app/userData`. On Windows, save the file as UTF-8 without a byte order mark, or Typora opens a blank window.

After a Typora update, add the line again. To uninstall, delete the line and `claude-style-enhance.js` from the theme folder.

### Exporting HTML and PDF

Exported files do not include the installed script. For exported HTML and PDF to draw file cards too, paste the whole content of the unzipped `claude-style-export-head.txt` into Typora's export settings (this works without installing the script):

- HTML: **Settings → Export → HTML**, into **Append in `<head />`**.
- PDF: **Settings → Export → PDF**, into **Append Extra Content (HTML)**.

The snippet takes effect when the exported page uses Claude Style.

### Uninstalling the script

Quit Typora and run `uninstall-mac.sh`, `uninstall-windows.ps1` or `uninstall-linux.sh` from the same folder, the way you ran the installer. It takes the line out of Typora's page file and deletes the script from the theme folder; remove the snippet from the export settings yourself.

## Questions you may have

**Why do some parts of Typora keep the system look?**\
On macOS they are drawn by the system, not by the page a theme can style: right-click menus, the menus in the title bar, confirmation dialogs, the window's title bar buttons, window tabs, the tooltip that shows a link's title, the thickness of the text cursor and the Settings window.

**Why is the file name in the title bar not centred over the page when the sidebar is open?**\
The name is drawn by the macOS title bar, not by the page a theme can style. With the sidebar open, Typora asks the title bar to centre the name over the space beside the sidebar, but on macOS 27 with Typora 1.14.10 the title bar does not do so, with Typora's own themes too.

**Why does the sidebar not show the desktop through it, as macOS's Liquid Glass does?**\
On the Mac, Typora's window is opaque: when a theme makes the background see-through, the window shows black or white behind it, not the desktop. So a theme cannot give Typora macOS's Liquid Glass look.

**Why can an enlarged picture not be zoomed or downloaded, as in Claude?**\
A theme can only change how Typora looks, while zooming and downloading need a script, which a theme cannot add. What a theme can use is a state Typora sets itself: when the text cursor is on a picture, Typora opens the picture's source, and the theme then shows the picture enlarged and hides the source; when the cursor leaves, the large view closes. So while the large view is open the cursor is still in the source, and typing changes how the picture is written; to change a picture's path or description, use source mode. The optional [enhancement script](#enhancement-script-optional) opens pictures in a viewer of their own, which zooms and drags; the viewer has no download button.

**Why is an unticked subtask crossed out?**\
Claude does the same: once a task is ticked, the whole item greys and is crossed out, the tasks under it included. The subtask's own box stays unticked.

**Why does Esc not close the block type menu of the floating toolbar?**\
The menu is Typora's, and Esc does not close it with Typora's own themes either. Click outside it, or click the button again. With the [enhancement script](#enhancement-script-optional), Esc closes the menu.

**Why does the floating toolbar show "Paragraph" in English at first?**\
Typora builds the toolbar before it loads its interface language; click in the text and it reads 段落 (paragraph). Typora's own themes show the same. With the enhancement script, it soon changes to 段落 by itself.

**Why does the quick open list jump several rows when I press the down arrow?**\
That is how Typora scrolls it: when the chosen row reaches the bottom of the list, Typora scrolls it straight to the top; with the up arrow it scrolls one row at a time. A theme cannot change this, and Typora's own themes do the same. The chosen row always stays in view. With the enhancement script, the down arrow scrolls one row at a time too.

**Why does the sidebar search only show results after I press Return, and why does Esc sometimes not close it?**\
Both are how Typora works: its sidebar search starts when you press Return, and Esc closes the search only while the cursor is in the search field. A theme cannot change keys or how searching works. To find files by name as you type, use Open Quickly in the File menu. When the cursor is not in the field, click the close button at the top right of the card, or press ⇧⌘F again (Ctrl+Shift+F on Windows and Linux), which puts the cursor back in the field. With the enhancement script, it searches as you type, and Esc closes it wherever the cursor is.

**Why does the caret before the top folder not fold it?**\
Typora does not let the top folder fold and draws no caret for it. The theme draws one only so the folder lines up with the folders under it; clicking it does nothing. With the enhancement script, clicking the top folder's row folds it.

**Why is only the first part of a long web address a link?**\
For an address typed without link syntax, Typora decides where it ends, and it stops before Chinese characters in it (in `?query=中文`, for example). Typora's own themes show the same.

**Why do some words repeat in a sidebar search result?**\
When a line matches more than once, Typora puts the result together with the words before each match, so some words show twice (searching for alpha in "Alpha alpha alphabet" shows "AlphaAlpha alphaAlpha alpha alphabet"). The number of matches is right. Typora's own themes show the same; neither the theme nor the script can change it.

**Why can I still tick tasks in Read-Only Mode?**\
Read-Only Mode is Typora's, and it does not stop a click on a task's checkbox; on Linux, Return may change the text too. The lock at the foot of the sidebar only switches the mode for you and cannot change what it stops. Typora's own themes behave the same.

**Why do some rare characters show as boxes?**\
The theme bundles no fonts. A character that no installed font has, such as 𠀀 (U+20000), shows as a box whatever the theme. Installing a font that has it makes it show.

**Why does Alt-click not open a file card or a formula for editing on Linux?**\
Many Linux desktops move a window when you drag it with Alt held down (Xfce does by default), and the window manager takes the click before Typora sees it. Double-click instead, or choose another key for moving windows in the desktop's settings.

**Why does Tab not reach the lock at the foot of the sidebar?**\
The lock is drawn by the theme on Typora's footer, and Typora does not let Tab reach the buttons there. From the keyboard, switch with View → Readonly Mode.

**Why does the table toolbar's "More" button move to a second row in a narrow window?**\
On Windows and Linux the table toolbar has a More button. The theme's toolbar buttons are 28px, as in Claude, larger than in Typora's own themes, so in a very narrow window with the sidebar open they do not fit on one row: More moves to a second row, over the table's header, and still works. The Mac's table toolbar has no More button.

**Why does a file card differ a little from Claude's?**\
A theme cannot read the file or change the text a link shows, so the card shows the link's text as its name (Claude shows the file's name), has no preview of pictures or PDFs and no download button; Command-click (Ctrl-click on Windows and Linux) opens the file. For a kind of file the theme does not know, the second line reads only 文件 (file), without the extension Claude adds. Links to a place in the document or to a part of a file stay links, where Claude's replies show them as plain text. With the enhancement script, the card shows the file's name, names the extension for kinds it does not know, and shows a thumbnail for pictures; PDFs still have no preview, and there is no download button.

**Why are there two theme files rather than one that follows the system?**\
Typora lists each theme file as one entry in its Themes menu, so with a single file you could no longer choose light or dark yourself, for example the light theme for printing while the system is dark. An exported HTML page would also change colour with the reader's system. The two files can switch with the system appearance as well; see [Installation](#installation).

**Why do tables in the 1.2 series look as they did in the 1.1 series?**\
The 1.2 series takes most of its styles from the desktop app's new interface, but tables keep the look of the 1.1 series. The new interface's tables drop the outer border, the rounded corners and the header's fill, and separate the rows with a few lines only; with its border and header fill, the table of the 1.1 series makes rows and columns easier to follow, so it was not changed.

**Why is inline code in the 1.2 series still red, with a thin border?**\
The 1.2 series takes its styles from the new interface and keeps all the colours of the 1.1 series, so inline code is still red. The new interface also drops the thin border around inline code; the border sets code apart from the text more clearly, so Claude Style keeps it, as in the 1.1 series.

**Why do file cards in the 1.2 series look as they did in the 1.1 series?**\
The new interface turned the card for a shared file into a single row with a small icon block on the left; the card of the 1.1 series, coloured by the kind of file, makes a file easier to recognise at a glance, so it was not changed.

**Will the 1.1 series still get updates?**\
No. The 1.1 series is no longer updated: problems are fixed only in the 1.2 series, and the enhancement script works only with the 1.2 series, so please move to the 1.2 series soon. The releases of the 1.1 series stay on the Releases page; the last one is 1.1.16.

**Why did the version numbers change?**\
Since 26 October 2026, the second number tells which interface of the desktop app a release follows: the 1.1 series follows the earlier interface and the 1.2 series the new one, and the third number counts the releases in order. The releases once numbered 1.0.0 to 1.3.9 are now 1.1.0 to 1.1.15, and 2.0.0 and 2.1.0 are now 1.2.0 and 1.2.1. The files of every release are unchanged.

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

The icon outlines the theme uses on exported pages come from Font Awesome 4.1.0 (SIL OFL 1.1) and Ionicons 2.0.1 (MIT), under their own licences.

For anything else, please ask the author.
