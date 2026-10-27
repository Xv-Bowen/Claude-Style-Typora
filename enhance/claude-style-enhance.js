/*
 * Claude Style Enhance 0.1.5 for Typora
 * https://github.com/Xv-Bowen/Claude-Style-Typora
 * Written by Xv-Bowen (https://github.com/Xv-Bowen)
 * Copyright (c) 2026 Xv-Bowen
 * Licensed under CC BY-NC-ND 4.0: https://creativecommons.org/licenses/by-nc-nd/4.0/
 * SPDX-License-Identifier: CC-BY-NC-ND-4.0
 * Not affiliated with Anthropic
 */

"use strict";
(() => {
  function addStyle(id, css) {
    if (document.getElementById(id) !== null) return;
    const sheet = document.createElement("style");
    sheet.id = id;
    sheet.textContent = css;
    document.head.append(sheet);
  }

  function typoraFile() {
    const file = window.File;
    return typeof file === "object" && file !== null ? file : void 0;
  }
  function rootValue(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function claudeStyleIsOn() {
    return rootValue("--claude-style-enhance") !== "";
  }

  var listeners = [];
  function onThemeChange(listener) {
    listeners.push(listener);
  }
  function mark() {
    const root3 = document.documentElement.classList;
    const on = claudeStyleIsOn();
    root3.toggle("claude-style-enhance-on", on);
  }
  function watchTheme() {
    mark();
    const link = document.getElementById("theme_css");
    if (link === null) return;
    link.addEventListener("load", mark);
    new MutationObserver(() => {
      for (const listener of listeners) listener();
      mark();
    }).observe(link, { attributes: true, attributeFilter: ["href"] });
  }

  var TYPORA = {
    close: ["Close", "Front"],
    select: ["Select", "Front"],
    caseSensitive: ["Case Sensitive", "Front"],
    wholeWord: ["Whole Word", "Front"],
    regularExpression: ["Regular Expression", "Front"],
    readonly: ["Readonly Mode", "Menu"],
    copy: ["Copy", "Menu"]
  };
  var SIMPLIFIED = {
    close: "关闭",
    select: "选择",
    caseSensitive: "区分大小写",
    wholeWord: "查找整个单词",
    regularExpression: "正则表达式",
    readonly: "只读模式",
    copy: "复制",
    copyToClipboard: "复制到剪贴板",
    copied: "已复制",
    projects: "项目列表",
    imagePreview: "图片预览",
    closeImagePreview: "关闭图片预览"
  };
  var TRADITIONAL = {
    close: "關閉",
    select: "選擇",
    caseSensitive: "區分大小寫",
    wholeWord: "尋找整個單字",
    regularExpression: "正規表達式",
    readonly: "唯讀模式",
    copy: "複製",
    copyToClipboard: "複製到剪貼板",
    copied: "已複製",
    projects: "項目列表",
    imagePreview: "圖片預覽",
    closeImagePreview: "關閉圖片預覽"
  };
  var ENGLISH = {
    close: "Close",
    select: "Select",
    caseSensitive: "Case Sensitive",
    wholeWord: "Whole Word",
    regularExpression: "Regular Expression",
    readonly: "Readonly Mode",
    copy: "Copy",
    copyToClipboard: "Copy to clipboard",
    copied: "Copied",
    projects: "Projects",
    imagePreview: "Image preview",
    closeImagePreview: "Close image preview"
  };
  var KINDS = {
    文档: ["文檔", "Document"],
    电子表格: ["電子表格", "Spreadsheet"],
    表格: ["表格", "Table"],
    演示文稿: ["演示文稿", "Presentation"],
    图片: ["圖片", "Image"],
    代码: ["代碼", "Code"],
    图表: ["圖表", "Diagram"],
    文件: ["文件", "File"]
  };
  function script() {
    const file = typoraFile();
    const language = file !== void 0 ? file.language ?? file.option?.userLocale ?? "" : navigator.language;
    if (/^zh[-_](Hant|TW|HK|MO)/i.test(language)) return "traditional";
    if (language === "" || /^zh/i.test(language)) return "simplified";
    return "other";
  }
  function typoraTables() {
    const jquery = window.$;
    return jquery?.localize?.data;
  }
  function say(word) {
    const kind = script();
    if (kind === "simplified") return SIMPLIFIED[word];
    const key = TYPORA[word];
    const found = key !== void 0 ? typoraTables()?.[key[1]]?.[key[0]] : void 0;
    if (found !== void 0 && found !== "") return found;
    return kind === "traditional" ? TRADITIONAL[word] : ENGLISH[word];
  }
  function kindIn(label) {
    const kind = script();
    const words = KINDS[label];
    if (kind === "simplified" || words === void 0) return void 0;
    return kind === "traditional" ? words[0] : words[1];
  }
  var listeners2 = [];
  function onWords(listener) {
    listeners2.push(listener);
    listener();
  }
  function ready() {
    const tables = typoraTables();
    return script() === "simplified" || tables?.["Front"] !== void 0 && tables["Menu"] !== void 0;
  }
  function startLanguage() {
    if (script() === "simplified") return;
    addStyle("claude-style-enhance-words", "");
    const sheet = document.getElementById("claude-style-enhance-words");
    if (sheet === null) return;
    const write = () => {
      sheet.textContent = claudeStyleIsOn() ? wordsCss() : "";
    };
    let tries = 0;
    const wait = () => {
      if (ready() || tries >= 50) {
        write();
        for (const listener of listeners2) listener();
        return;
      }
      tries += 1;
      window.setTimeout(wait, 200);
    };
    wait();
    onThemeChange(() => window.setTimeout(write, 300));
  }
  function cssString(text) {
    return `"${text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  function widthOf(text) {
    const probe = document.createElement("span");
    probe.textContent = text;
    probe.style.cssText = "position: absolute; visibility: hidden; white-space: nowrap; font-family: var(--font-ui); font-size: 12px; line-height: 20px;";
    (document.querySelector("#typora-sidebar") ?? document.body).append(probe);
    const width = Math.ceil(probe.getBoundingClientRect().width);
    probe.remove();
    return width;
  }
  var ON = "html.claude-style-enhance-on";
  var CARD = `${ON} #typora-sidebar.active-tab-files.ty-show-search`;
  var EMPTY = ":has(#file-library-search-input:placeholder-shown)";
  var OPTIONS = `${CARD} #ty-sidebar-search-tabs`;
  function wordsCss() {
    const select = say("select");
    const close2 = say("close");
    const options = [say("regularExpression"), say("wholeWord"), say("caseSensitive")];
    const selectCap = 20 + widthOf(select) + 8;
    const closeCap = 20 + widthOf(close2) + 8;
    const hint = Math.max(selectCap + 18 + 2 + 18, closeCap + widthOf("Esc") + 8) - 20;
    const [regexpWords, wordWords, caseWords] = options.map(widthOf);
    const regexp = 16 + regexpWords + 8;
    const word = regexp + 22 + 20 + wordWords + 8;
    const caseRight = word + 22 + 20 + caseWords + 8;
    const card = 20 + hint + 20 + caseRight + 22;
    const fits = card > 672 ? Infinity : Math.max(480, card + 32);
    const lines = [
      `${ON} #typora-sidebar:not(.ty-no-mount-folder) #file-library::before { content: ${cssString(say("projects"))}; }`,
      `${CARD} #file-library-search::after { content: ${cssString(select)}; }`,
      `${CARD} #file-library-search::before { left: ${selectCap}px; }`,
      `${CARD} #file-library-search-result::before { left: ${selectCap + 20}px; }`,
      `${CARD}${EMPTY} #file-library-search::after { content: ${cssString(close2)}; }`,
      `${CARD}${EMPTY} #file-library-search::before { left: ${closeCap}px; }`,
      `${ON} #typora-quick-open::after { content: ${cssString(select)}; }`,
      `${ON} #typora-quick-open::before { left: ${selectCap}px; }`,
      `${ON} #typora-quick-open-input::after { left: ${selectCap + 20}px; }`,
      `${ON} #typora-quick-open:has(#typora-quick-open-input input:placeholder-shown)::after { content: ${cssString(close2)}; }`,
      `${ON} #typora-quick-open:has(#typora-quick-open-input input:placeholder-shown)::before { left: ${closeCap}px; }`
    ];
    if (fits !== Infinity) {
      lines.push(
        `@media (min-width: ${fits}px) {`,
        `    ${OPTIONS} #filesearch-regexp-option-btn { right: ${regexp}px; }`,
        `    ${OPTIONS} #filesearch-word-option-btn { right: ${word}px; }`,
        `    ${OPTIONS} #filesearch-case-option-btn { right: ${caseRight}px; }`,
        `    ${OPTIONS} #filesearch-case-option-btn::after { content: ${cssString(options[2])}; }`,
        `    ${OPTIONS} #filesearch-word-option-btn::after { content: ${cssString(options[1])}; }`,
        `    ${OPTIONS} #filesearch-regexp-option-btn::after { content: ${cssString(options[0])}; }`,
        `}`
      );
    }
    if (fits > 480) {
      lines.push(
        fits === Infinity ? `@media (min-width: 480px) {` : `@media (min-width: 480px) and (max-width: ${fits - 0.02}px) {`,
        `    ${OPTIONS} #filesearch-regexp-option-btn { right: 16px; }`,
        `    ${OPTIONS} #filesearch-word-option-btn { right: 38px; }`,
        `    ${OPTIONS} #filesearch-case-option-btn { right: 60px; }`,
        `    ${OPTIONS} :is(#filesearch-case-option-btn, #filesearch-word-option-btn, #filesearch-regexp-option-btn)::after { content: none; }`,
        `    ${ON} body:has(#typora-sidebar.active-tab-files.ty-show-search #ty-sidebar-search-tabs .searchpanel-search-option-btn:hover) #ty-tooltip { display: block; }`,
        `}`
      );
    }
    return lines.join("\n");
  }

  var LOCAL = ':is(:not([href*=":"]), [href^="file:" i], [href*=":%5C" i], [href*=":/"]:not([href*="://"])):not([href=""], [href^="//"], [href^="www." i], [href*="#"], [href*="?"], [href$="/"], [href$="%5C" i])';
  var CARD2 = "html.claude-style-enhance-on #write p:not(li p) > .md-link:only-child:not(.md-expand):not(:has(img))";
  var CHIP_RADIUS = "4.5px";
  var CHIP_SHADOW = "0 1px 2px rgb(11 11 11 / 6%), 0 2px 8px light-dark(rgb(11 11 11 / 8%), rgb(0 0 0 / 24%))";
  var ODD_SPACE = /[\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
  var CONTROL = /[\x00-\x1F\x7F-\x9F]/;
  var PROGRAMS = new Set([
    "bat",
    "cmd",
    "com",
    "exe",
    "msi",
    "ps1",
    "vb",
    "vbs",
    "wsf",
    "wsh",
    "app",
    "command",
    "scpt",
    "scptd",
    "applescript",
    "workflow",
    "jar",
    "jnlp"
  ]);
  var BIDI = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g;
  var inPage = false;
  var changes = [];
  var pictures = new Map();
  var refreshSoon = () => void 0;
  var refreshNow = () => void 0;
  function startCards() {
    const write = document.querySelector("#write");
    if (write === null) return;
    addStyle("claude-style-enhance-cards", "");
    const sheet = document.getElementById("claude-style-enhance-cards");
    if (sheet === null) return;
    let timer = 0;
    const refresh = () => {
      timer = 0;
      const rules = rulesFor(write);
      if (sheet.textContent === rules) return;
      sheet.textContent = rules;
      for (const listener of changes) listener();
    };
    refreshNow = () => {
      window.clearTimeout(timer);
      refresh();
    };
    refreshSoon = () => {
      if (timer === 0) timer = window.setTimeout(refresh, 200);
    };
    refresh();
    new MutationObserver(refreshSoon).observe(write, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
    onThemeChange(() => window.setTimeout(refresh, 300));
  }
  function cssString2(text) {
    return `"${text.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\a ")}"`;
  }
  function metaOf(value) {
    if (!value.startsWith('"') || !value.endsWith('"')) return void 0;
    const gap = String.fromCharCode(8196);
    const [label = "", extension = ""] = value.slice(1, -1).replace(/\\2004 ?/g, gap).split("·");
    const trim = (part) => part.split(gap).join("").trim();
    return { label: trim(label), extension: trim(extension) };
  }
  function tidy(text) {
    return text.replace(/\s+/g, " ").trim();
  }
  function lastPart(address) {
    const path = address.replace(/^file:\/\//i, "").split(/[\\/]|%5C/i).filter((part) => part !== "");
    const last = path[path.length - 1] ?? "";
    try {
      return decodeURIComponent(last);
    } catch {
      return last;
    }
  }
  function nameOf(file) {
    const plain = file.replace(BIDI, "");
    const parts = plain.split(".");
    const extension = parts.length > 1 ? parts[parts.length - 1] ?? "" : "";
    const whole = ODD_SPACE.test(plain) || CONTROL.test(plain) || plain.includes("\\") || /[.\s]$/.test(plain) || PROGRAMS.has(extension.toLowerCase());
    const stem = tidy(parts.slice(0, -1).join(".").replace(/[_-]/g, " ").toLowerCase());
    const first = stem.codePointAt(0);
    const name = whole || first === void 0 ? "" : String.fromCodePoint(first).toUpperCase() + stem.slice(String.fromCodePoint(first).length);
    return { name: name !== "" ? name : tidy(plain), extension: whole ? "" : extension.toUpperCase() };
  }
  function pictureUrls(address) {
    if (/^file:\/\//i.test(address)) return [address];
    const file = typoraFile();
    const urls = [];
    const add = (base) => {
      try {
        const url = new URL(address, base).href;
        if (!urls.includes(url)) urls.push(url);
      } catch {
      }
    };
    if (file !== void 0) {
      const opened = file.bundle?.filePath;
      const base = address.startsWith("/") ? "/" : opened;
      if (base !== void 0 && base !== "") add("file://" + base.split("/").map(encodeURIComponent).join("/"));
      return urls;
    }
    add(document.baseURI);
    for (const picture of document.querySelectorAll("#write img")) {
      const source = picture instanceof HTMLImageElement ? picture.src : "";
      if (!/^file:/i.test(source)) continue;
      let folder = new URL(".", source).href;
      for (let up = 0; up < 3; up += 1) {
        add(folder);
        folder = new URL("..", folder).href;
      }
    }
    return urls.slice(0, 12);
  }
  function pictureOf(address) {
    const urls = pictureUrls(address);
    const key = urls.join("\n");
    const known = pictures.get(key);
    if (known !== void 0) return known;
    if (urls.length === 0) {
      pictures.set(key, "failed");
      return "failed";
    }
    pictures.set(key, "loading");
    const results = urls.map(() => "loading");
    const settle = () => {
      for (const result of results) {
        if (result === "loading") return;
        if (result === "failed") continue;
        pictures.set(key, result);
        if (inPage) refreshNow();
        else refreshSoon();
        return;
      }
      pictures.set(key, "failed");
    };
    urls.forEach((url, index) => {
      const picture = inPage ? pageImage() : new Image();
      picture.onload = () => {
        results[index] = picture.naturalWidth > 0 && picture.naturalHeight > 0 ? { url, width: picture.naturalWidth, height: picture.naturalHeight } : "failed";
        settle();
      };
      picture.onerror = () => {
        results[index] = "failed";
        settle();
      };
      picture.src = url;
    });
    return "loading";
  }
  function pageImage() {
    let holder = document.getElementById("claude-style-pictures");
    if (holder === null) {
      holder = document.createElement("div");
      holder.id = "claude-style-pictures";
      holder.setAttribute("aria-hidden", "true");
      holder.style.cssText = "position: absolute; width: 0; height: 0; overflow: hidden; visibility: hidden;";
      document.body.append(holder);
    }
    const picture = document.createElement("img");
    picture.alt = "";
    holder.append(picture);
    return picture;
  }
  function rulesFor(write) {
    const rules = [];
    const done = new Set();
    for (const link of write.querySelectorAll(".md-link > a[href]")) {
      const address = link.getAttribute("href") ?? "";
      const holder = link.parentElement;
      if (address === "" || done.has(address) || holder === null) continue;
      done.add(address);
      const file = lastPart(address);
      if (file === "") continue;
      const { name, extension } = nameOf(file);
      const card = `${CARD2}:has(> a[href=${cssString2(address)}]${LOCAL})`;
      const kind = getComputedStyle(holder).getPropertyValue("--claude-file-meta").trim();
      rules.push(`${card} > a > * { font-size: 0; }`);
      rules.push(`${card} > a > :first-child::before { content: ${cssString2(name)}; font-size: 14px; line-height: 18px; }`);
      const meta = metaOf(kind);
      if (meta !== void 0) {
        const shown = kindIn(meta.label);
        const after = meta.label === "文件" && meta.extension === "" ? extension : meta.extension;
        if (shown !== void 0 || after !== meta.extension) {
          const words = cssString2(shown ?? meta.label).slice(1, -1);
          const line = after !== "" ? `"${words}\\2004·\\2004 ${cssString2(after).slice(1, -1)}"` : `"${words}"`;
          rules.push(`${card} { --claude-card-meta: ${line}; }`);
        }
      }
      if (kind.startsWith('"图片')) {
        const picture = pictureOf(address);
        if (typeof picture === "object") rules.push(thumbnail(card, picture.url, picture));
      }
    }
    return rules.join("\n");
  }
  function thumbnail(card, url, size) {
    const wide = 10 + 64 * size.height / size.width < 70;
    const chip = `left: 16px; width: 64px; border-color: var(--line-strong); border-radius: ${CHIP_RADIUS}; background-color: #fff;`;
    return `${card} { --claude-file-wash: transparent; }
${card} > a::before { content: none; }
${card}::before { ${wide ? "content: none;" : chip} }
${card}::after {
    ${chip}
    ${wide ? "top: calc(50% - 24px); height: 48px;" : ""}
    background-image: url(${cssString2(url)});
    background-position: ${wide ? "center top" : "left top"};
    background-size: ${wide ? "cover" : "100% auto"};
    background-repeat: no-repeat;
    box-shadow: ${CHIP_SHADOW};
}`;
  }

  var pressed;
  function startClicks() {
    window.addEventListener("mousedown", onPress, true);
    window.addEventListener("mouseup", onRelease, true);
    window.addEventListener("click", onClick, true);
  }
  function heldAt(target) {
    if (!(target instanceof Element)) return void 0;
    const card = target.closest("#write .md-link");
    if (card !== null && !card.classList.contains("md-expand") && getComputedStyle(card).getPropertyValue("--claude-card").trim() !== "") return card;
    const math = target.closest('#write [md-inline="inline_math"]');
    if (math !== null && !math.classList.contains("md-expand")) return math;
    return void 0;
  }
  function stop(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function onPress(event) {
    pressed = void 0;
    if (event.button !== 0 || event.detail > 1 || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (typoraFile()?.isReadonlyMode === true) return;
    const held = heldAt(event.target);
    if (held === void 0 || !claudeStyleIsOn()) return;
    stop(event);
    pressed = held;
  }
  function onRelease(event) {
    if (pressed !== void 0 && heldAt(event.target) === pressed) stop(event);
  }
  function onClick(event) {
    const held = pressed;
    pressed = void 0;
    if (held !== void 0 && heldAt(event.target) === held) stop(event);
  }

  var CARD3 = "pre.md-fences:not(.md-diagram)";
  var HOVER = "claude-style-copy-hover";
  var COPIED = "claude-style-copied";
  var TIP = "claude-style-copy-tip";
  var TIP_GAP = 4;
  var TIP_ROOM = 5;
  function px(value) {
    const number = Number.parseFloat(value);
    return Number.isFinite(number) ? number : 0;
  }
  function viewTop(card) {
    for (let node = card.parentElement; node !== null; node = node.parentElement) {
      if (node === document.body || node === document.documentElement) break;
      const overflow = getComputedStyle(node).overflowY;
      if (overflow === "auto" || overflow === "scroll" || overflow === "overlay" || overflow === "hidden") {
        return node.getBoundingClientRect().top + px(getComputedStyle(node).borderTopWidth);
      }
    }
    return 0;
  }
  function buttonOf(card) {
    const look = getComputedStyle(card, "::after");
    const width = px(look.width);
    const height = px(look.height);
    if (look.content === "none" || look.display === "none" || !(width > 0) || !(height > 0)) return void 0;
    const box = card.getBoundingClientRect();
    const frame = getComputedStyle(card);
    const inner = {
      top: box.top + px(frame.borderTopWidth) + px(frame.paddingTop),
      right: box.right - px(frame.borderRightWidth) - px(frame.paddingRight),
      bottom: box.bottom - px(frame.borderBottomWidth) - px(frame.paddingBottom)
    };
    if (look.position === "absolute") {
      const top2 = box.top + px(frame.borderTopWidth) + px(look.top) + px(look.marginTop);
      const right2 = box.right - px(frame.borderRightWidth) - px(look.right) - px(look.marginRight);
      return new DOMRect(right2 - width, top2, width, height);
    }
    const right = inner.right - px(look.marginRight);
    const natural = inner.top + px(look.marginTop);
    let top = natural;
    if (look.position === "sticky") {
      const stuck = viewTop(card) + px(look.top);
      const lowest = inner.bottom - px(look.marginBottom) - height;
      top = Math.max(natural, Math.min(stuck, lowest));
    }
    return new DOMRect(right - width, top, width, height);
  }
  function holds(rect, event) {
    return rect !== void 0 && event.clientX >= rect.left && event.clientX < rect.right && event.clientY >= rect.top && event.clientY < rect.bottom;
  }
  function under(event) {
    if (!claudeStyleIsOn() || !(event.target instanceof Element)) return void 0;
    const card = event.target.closest(CARD3);
    if (!(card instanceof HTMLElement) || card.closest("#write") === null) return void 0;
    const rect = buttonOf(card);
    return holds(rect, event) ? { card, rect } : void 0;
  }
  function startCopy() {
    const write = document.querySelector("#write");
    if (write === null) return;
    const inTypora = !document.body.classList.contains("typora-export");
    let tip;
    if (inTypora) {
      const label = document.createElement("div");
      label.id = TIP;
      label.className = "ty-tooltip";
      label.setAttribute("role", "tooltip");
      document.body.append(label);
      onWords(() => {
        label.textContent = say("copy");
      });
      tip = label;
    }
    let hovered;
    const leave = () => {
      hovered?.classList.remove(HOVER);
      hovered = void 0;
      tip?.classList.remove("shown");
    };
    const enter = (card, rect) => {
      if (hovered === card) return;
      leave();
      hovered = card;
      card.classList.add(HOVER);
      if (tip === void 0 || card.classList.contains(COPIED)) return;
      const width = tip.offsetWidth;
      const height = tip.offsetHeight;
      const left = Math.min(Math.max(rect.left + rect.width / 2 - width / 2, TIP_ROOM), window.innerWidth - TIP_ROOM - width);
      tip.style.left = `${left}px`;
      const below = rect.bottom + TIP_GAP;
      tip.style.top = `${below + height <= window.innerHeight - TIP_ROOM ? below : rect.top - TIP_GAP - height}px`;
      tip.classList.add("shown");
    };
    window.addEventListener("mousemove", (event) => {
      const found = under(event);
      if (found !== void 0) enter(found.card, found.rect);
      else leave();
    }, true);
    document.addEventListener("mouseleave", leave);
    window.addEventListener("scroll", leave, true);
    window.addEventListener("blur", leave);
    for (const type of ["mousedown", "mouseup", "dblclick"]) {
      window.addEventListener(type, (event) => {
        if (under(event) === void 0) return;
        event.preventDefault();
        event.stopPropagation();
      }, true);
    }
    const timers = new WeakMap();
    window.addEventListener("click", (event) => {
      const found = under(event);
      if (found === void 0) return;
      event.preventDefault();
      event.stopPropagation();
      const { card } = found;
      tip?.classList.remove("shown");
      void copyText(codeOf(card)).then((done) => {
        if (!done) return;
        card.classList.add(COPIED);
        window.clearTimeout(timers.get(card));
        timers.set(card, window.setTimeout(() => card.classList.remove(COPIED), 2e3));
      });
    }, true);
  }
  function codeOf(pre) {
    const holder = pre.querySelector(".CodeMirror");
    const value = holder?.CodeMirror?.getValue?.();
    if (typeof value === "string") return value;
    const lines = pre.querySelectorAll(".CodeMirror-line");
    if (lines.length > 0) return Array.from(lines, (line) => line.textContent ?? "").join("\n");
    return pre.textContent ?? "";
  }
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return copyByCommand(text);
    }
  }
  function copyByCommand(text) {
    const selection = window.getSelection();
    const caret = selection !== null && selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : void 0;
    const focused = document.activeElement;
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;";
    document.body.append(field);
    field.select();
    let done = false;
    try {
      done = document.execCommand("copy");
    } catch {
      done = false;
    }
    field.remove();
    if (focused instanceof HTMLElement) focused.focus({ preventScroll: true });
    if (selection !== null && caret !== void 0) {
      selection.removeAllRanges();
      selection.addRange(caret);
    }
    return done;
  }

  var FOLDED = "claude-style-folded";
  var KEY = "claude-style-enhance.folded-roots";
  function stored() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
    } catch {
      return [];
    }
  }
  function store(path, folded) {
    const paths = stored().filter((item) => item !== path);
    if (folded) paths.push(path);
    try {
      localStorage.setItem(KEY, JSON.stringify(paths.slice(-100)));
    } catch {
    }
  }
  function root() {
    const node = document.querySelector("#file-library-tree .file-node-root");
    return node instanceof HTMLElement ? node : null;
  }
  function show(node, folded) {
    node.classList.toggle(FOLDED, folded);
    node.setAttribute("aria-expanded", String(!folded));
  }
  function unfold() {
    const node = root();
    const path = node?.getAttribute("data-path");
    if (node === null || path === null || path === void 0 || !node.classList.contains(FOLDED)) return;
    show(node, false);
    store(path, false);
  }
  function startFolder() {
    const tree = document.querySelector("#file-library-tree");
    if (tree === null) return;
    const restore = () => {
      const node = root();
      const path = node?.getAttribute("data-path");
      if (node === null || path === null || path === void 0) return;
      const folded = stored().includes(path);
      if (node.classList.contains(FOLDED) !== folded) show(node, folded);
    };
    restore();
    new MutationObserver(() => {
      restore();
      if (root()?.querySelector(".file-node-on-edit") != null) unfold();
    }).observe(tree, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "data-path"] });
    window.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || !claudeStyleIsOn()) return;
      if (!(event.target instanceof Element)) return;
      const row = event.target.closest(".file-node-root > .file-node-content");
      const node = row?.parentElement;
      const path = node?.getAttribute("data-path");
      if (!(node instanceof HTMLElement) || path === null || path === void 0 || node.classList.contains("file-node-on-edit")) return;
      const folded = !node.classList.contains(FOLDED);
      show(node, folded);
      store(path, folded);
    }, true);
    const library = typoraFile()?.editor?.library;
    for (const name of ["revealInSidebar", "revealInFileTree"]) {
      const original = library?.[name];
      if (library === void 0 || typeof original !== "function") continue;
      library[name] = function(...args) {
        unfold();
        return original.apply(this, args);
      };
    }
  }

  function toolbar() {
    const editor = typoraFile()?.editor;
    return editor?.toolbar;
  }
  var LISTS = [
    { field: "#file-library-search-input", chosen: "#file-library-search-result .select" },
    { field: "#typora-quick-open-input input", chosen: ".typora-quick-open-item.active" }
  ];
  function startKeys() {
    window.addEventListener("keydown", onKey, true);
    for (const list of LISTS) {
      const field = document.querySelector(list.field);
      field?.addEventListener("keydown", (event) => afterMove(event, list.chosen));
    }
    refreshToolbarLabel();
  }
  function editingFocus() {
    const focused = document.activeElement;
    return focused === null || focused === document.body || focused.closest("#write") !== null;
  }
  var before;
  function isMove(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") return true;
    return event.ctrlKey && !event.metaKey && (event.key === "p" || event.key === "n");
  }
  function onKey(event) {
    if (event.defaultPrevented || !claudeStyleIsOn()) return;
    if (event.key === "Escape") {
      const bar = toolbar();
      if (bar?._menuDom && typeof bar._closeMenus === "function") {
        bar._closeMenus();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const back = document.querySelector("#typora-sidebar.active-tab-files.ty-show-search #ty-sidebar-search-back-btn");
      if (back instanceof HTMLElement && editingFocus()) {
        back.click();
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    before = void 0;
    if (!isMove(event) || !(event.target instanceof Element)) return;
    for (const list of LISTS) {
      if (!event.target.matches(list.field)) continue;
      const chosen = document.querySelector(list.chosen);
      const scroller = chosen !== null ? scrollerOf(chosen) : void 0;
      if (scroller !== void 0) before = { scroller, top: scroller.scrollTop };
    }
  }
  function afterMove(event, chosenSelector) {
    const saved = before;
    before = void 0;
    if (saved === void 0 || !isMove(event) || !claudeStyleIsOn()) return;
    const chosen = document.querySelector(chosenSelector);
    if (chosen === null) return;
    saved.scroller.scrollTop = saved.top;
    const row = chosen.getBoundingClientRect();
    const view2 = saved.scroller.getBoundingClientRect();
    if (row.bottom > view2.bottom) saved.scroller.scrollTop += row.bottom - view2.bottom;
    else if (row.top < view2.top) saved.scroller.scrollTop -= view2.top - row.top;
  }
  function scrollerOf(element) {
    for (let current = element.parentElement; current !== null; current = current.parentElement) {
      const style = getComputedStyle(current);
      if (/(auto|scroll)/.test(style.overflowY) && current.scrollHeight > current.clientHeight) return current;
    }
    return void 0;
  }
  function refreshToolbarLabel() {
    const dom = toolbar()?.dom;
    if (dom === void 0) return;
    let shown = dom.style.display !== "none";
    new MutationObserver(() => {
      const now = dom.style.display !== "none";
      if (now && !shown) {
        for (const wait of [100, 500, 1500]) {
          setTimeout(() => toolbar()?.updateActiveState?.(), wait);
        }
      }
      shown = now;
    }).observe(dom, { attributes: true, attributeFilter: ["style"] });
  }

  var REACHED = 24;
  function startOutline() {
    const editor = typoraFile()?.editor;
    const outline = editor?.library?.outline;
    const original = outline?.highlightVisibleHeader;
    if (outline === void 0 || typeof original !== "function") return;
    outline.highlightVisibleHeader = function(...args) {
      const result = original.apply(this, args);
      if (args[1] === void 0 && claudeStyleIsOn()) markCurrent(outline.headerStr);
      return result;
    };
  }
  function markCurrent(headerSelector) {
    if (document.querySelector("#typora-sidebar.open") === null) return;
    const scroller = document.querySelector("content");
    const write = document.querySelector("#write");
    if (scroller === null || write === null) return;
    const selector = headerSelector ?? "h1, h2, h3, h4, h5, h6";
    const headings = Array.from(write.children).filter((child) => child.matches(selector));
    const first = headings[0];
    if (first === void 0) return;
    const view2 = scroller.getBoundingClientRect();
    const atEnd = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
    let current = first;
    for (const heading of headings) {
      const top = heading.getBoundingClientRect().top - view2.top;
      if (top <= REACHED || atEnd && top < view2.height) current = heading;
      else break;
    }
    mark2(current.getAttribute("cid"));
  }
  function mark2(cid) {
    if (cid === null) return;
    const list = document.querySelector("#outline-content");
    if (list === null) return;
    let label = list.querySelector(`.outline-label[data-ref="${CSS.escape(cid)}"]`);
    if (label === null) return;
    if (!document.body.classList.contains("no-collapse-outline")) {
      const open2 = label.closest(".outline-item-open > .outline-children") ?? list;
      const holder = Array.from(open2.children).find((child) => child === label || child.contains(label));
      label = holder?.querySelector(".outline-label") ?? label;
    }
    for (const old of document.querySelectorAll(".outline-item-active")) old.classList.remove("outline-item-active");
    for (const old of list.querySelectorAll(".outline-active")) old.classList.remove("outline-active");
    label.classList.add("outline-active");
    label.parentElement?.classList.add("outline-item-active");
    keepInView(label);
  }
  function keepInView(label) {
    const box = document.querySelector("#outline-content")?.parentElement;
    if (box === null || box === void 0) return;
    const row = label.getBoundingClientRect();
    const view2 = box.getBoundingClientRect();
    if (row.bottom > view2.bottom) box.scrollTop += row.bottom - view2.bottom;
    else if (row.top < view2.top) box.scrollTop -= view2.top - row.top;
  }

  var ROW = "#ty-sidebar-footer > div";
  var HOVER2 = "claude-style-readonly-hover";
  var TIP2 = "claude-style-readonly-tip";
  var TIP_GAP2 = 4;
  var TIP_ROOM2 = 6;
  function slotOf(row) {
    const slot = getComputedStyle(row, "::before");
    const width = Number.parseFloat(slot.width);
    const height = Number.parseFloat(slot.height);
    if (slot.content === "none" || slot.display === "none" || !(width > 0) || !(height > 0)) return void 0;
    const box = row.getBoundingClientRect();
    const style = getComputedStyle(row);
    const gap = Number.parseFloat(style.columnGap) || 0;
    const switcher = document.getElementById("switch-file-list-btn");
    const right = switcher !== null && switcher.getClientRects().length > 0 ? switcher.getBoundingClientRect().left - gap : box.right - (Number.parseFloat(style.borderRightWidth) || 0) - (Number.parseFloat(style.paddingRight) || 0);
    return new DOMRect(right - width, box.top + (box.height - height) / 2, width, height);
  }
  function holds2(slot, event) {
    return slot !== void 0 && event.clientX >= slot.left && event.clientX < slot.right && event.clientY >= slot.top && event.clientY < slot.bottom;
  }
  function startReadonlyButton() {
    const row = document.querySelector(ROW);
    if (row === null || document.getElementById(TIP2) !== null) return;
    const tip = document.createElement("div");
    tip.id = TIP2;
    tip.className = "ty-tooltip";
    tip.setAttribute("role", "tooltip");
    document.body.append(tip);
    onWords(() => {
      tip.textContent = say("readonly");
    });
    const leave = () => {
      row.classList.remove(HOVER2);
      tip.classList.remove("shown");
    };
    const enter = (slot) => {
      if (row.classList.contains(HOVER2)) return;
      row.classList.add(HOVER2);
      const width = tip.offsetWidth;
      const height = tip.offsetHeight;
      const left = Math.min(Math.max(slot.left + slot.width / 2 - width / 2, TIP_ROOM2), window.innerWidth - TIP_ROOM2 - width);
      tip.style.left = `${left}px`;
      tip.style.top = `${slot.top - TIP_GAP2 - height}px`;
      tip.classList.add("shown");
    };
    const over = (event) => {
      if (!claudeStyleIsOn()) return void 0;
      const slot = slotOf(row);
      return holds2(slot, event) ? slot : void 0;
    };
    row.addEventListener("mousemove", (event) => {
      const slot = over(event);
      if (slot !== void 0) enter(slot);
      else leave();
    });
    row.addEventListener("mouseleave", leave);
    row.addEventListener("mousedown", (event) => {
      if (over(event) === void 0) return;
      event.preventDefault();
      event.stopPropagation();
    });
    row.addEventListener("click", (event) => {
      if (over(event) === void 0) return;
      event.preventDefault();
      event.stopPropagation();
      tip.classList.remove("shown");
      typoraFile()?.toggleReadonlyMode?.();
    });
  }

  var PAUSE = 500;
  var MATCH = "ty-file-search-match-text";
  function fileSearch() {
    const editor = typoraFile()?.editor;
    return editor?.library?.fileSearch;
  }
  function pattern(search, query) {
    let source = query;
    if (search.useRegexp === true) {
      if (search.wholeWord === true) source = `\\b${source.replace(/^\\b|\\b$/g, "")}\\b`;
    } else {
      source = query.trim().replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
      if (search.wholeWord === true) source = `\\b${source}\\b`;
    }
    try {
      return new RegExp(source, search.caseSensitive === true ? "g" : "gi");
    } catch {
      return void 0;
    }
  }
  function piece(text, start, end, match, cut) {
    const span = document.createElement("span");
    if (match) span.classList.add(MATCH);
    let words = text.substring(start, end).replace(/\r*\n/, "");
    if (cut && start === 0) words = words.replace(/^\s+/, "").replace(/\s+$/, " ");
    if (cut && !match && words.length > 20) {
      const last = words.substring(words.length - 20);
      words = "..." + (last.replace(/^.+?\b/, "") || last);
    }
    span.textContent = words;
    return span;
  }
  function mend(line, first, find) {
    const text = line.dataset["lineText"];
    const marked = [...line.querySelectorAll(`.${MATCH}`)].map((span) => span.textContent);
    if (text === void 0 || marked.length === 0) return;
    const pieces = [];
    const found = [];
    let end = 0;
    find.lastIndex = 0;
    for (let hit = find.exec(text); hit !== null; hit = find.exec(text)) {
      if (hit[0] === "") {
        find.lastIndex += 1;
        continue;
      }
      if (end < hit.index) pieces.push(piece(text, end, hit.index, false, first));
      end = hit.index + hit[0].length;
      const match = piece(text, hit.index, end, true, true);
      found.push(match.textContent ?? "");
      pieces.push(match);
    }
    if (end < text.length) pieces.push(piece(text, end, text.length, false, false));
    if (found.length !== marked.length || found.some((words, at) => words !== marked[at])) return;
    line.replaceChildren(...pieces);
  }
  function mendResults(field) {
    const list = document.querySelector("#file-library-search-result");
    if (list === null) return;
    new MutationObserver((records) => {
      const search = fileSearch();
      if (!claudeStyleIsOn() || search === void 0) return;
      let find;
      for (const record of records) {
        for (const item of record.addedNodes) {
          if (!(item instanceof HTMLElement)) continue;
          find ??= pattern(search, field.value.trim());
          if (find === void 0) return;
          const current = find;
          const lines = item.querySelectorAll(".ty-search-item-line:not(.ty-search-item-line-expand)");
          lines.forEach((line, index) => mend(line, index === 0, current));
        }
      }
    }).observe(list, { childList: true });
  }
  function startSearch() {
    const field = document.querySelector("#file-library-search-input");
    if (!(field instanceof HTMLInputElement)) return;
    mendResults(field);
    let timer = 0;
    let composing = false;
    const run = () => {
      timer = 0;
      const search = fileSearch();
      const open2 = document.querySelector("#typora-sidebar.active-tab-files.ty-show-search") !== null;
      if (!claudeStyleIsOn() || !open2 || search?.isShown_ !== true || typeof search.search !== "function") return;
      search.search(field.value.trim());
    };
    const later = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(run, PAUSE);
    };
    field.addEventListener("compositionstart", () => {
      composing = true;
      window.clearTimeout(timer);
    });
    field.addEventListener("compositionend", () => {
      composing = false;
      later();
    });
    field.addEventListener("input", (event) => {
      if (composing || event.isComposing) return;
      later();
    });
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.isComposing) window.clearTimeout(timer);
    }, true);
  }

  var NAME = "claude-style-picture";
  var view;
  var pressed2;
  var moving = false;
  var TOWARD_START = new Set(["ArrowLeft", "ArrowUp", "PageUp", "Home"]);
  var MOVES = new Set([...TOWARD_START, "ArrowRight", "ArrowDown", "PageDown", "End"]);
  var lastKey = "";
  var lastKeyAt = 0;
  function startViewer() {
    window.addEventListener("mousedown", onPress2, true);
    window.addEventListener("mouseup", onRelease2, true);
    window.addEventListener("click", onClick2, true);
    window.addEventListener("keydown", onKey2, true);
    watchCaret();
    onThemeChange(() => {
      if (view !== void 0) close();
    });
    window.addEventListener("resize", () => {
      if (view !== void 0) placeCloser(view);
    });
  }
  function px2(value) {
    const number = Number.parseFloat(value);
    return Number.isFinite(number) ? number : 0;
  }
  function pictureAt(target) {
    if (!(target instanceof HTMLImageElement)) return void 0;
    const holder = target.closest("#write .md-image.md-img-loaded");
    if (holder === null || holder.classList.contains("md-expand")) return void 0;
    return target.complete ? target : void 0;
  }
  function isPlain(event) {
    return event.button === 0 && !event.metaKey && !event.ctrlKey;
  }
  function stop2(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function onPress2(event) {
    pressed2 = void 0;
    if (view !== void 0 || moving || !isPlain(event)) return;
    const picture = pictureAt(event.target);
    if (picture === void 0 || !claudeStyleIsOn()) return;
    stop2(event);
    pressed2 = picture;
  }
  function onRelease2(event) {
    if (pressed2 !== void 0 && pictureAt(event.target) === pressed2) stop2(event);
  }
  function onClick2(event) {
    const picture = pressed2;
    pressed2 = void 0;
    if (picture === void 0 || pictureAt(event.target) !== picture) return;
    stop2(event);
    open(picture);
  }
  function onKey2(event) {
    if (view === void 0) {
      lastKey = event.shiftKey ? "" : event.key;
      lastKeyAt = performance.now();
      return;
    }
    if (event.key === "Escape") {
      stop2(event);
      close();
    } else if (event.key === "Tab") {
      stop2(event);
      view.overlay.querySelector(".claude-style-viewer-close")?.focus({ preventScroll: true });
    } else if (event.metaKey || event.ctrlKey) {
      close();
    }
  }
  function placeCaret(holder, after) {
    const selection = window.getSelection();
    if (selection === null) return;
    const range = document.createRange();
    if (after) range.setStartAfter(holder);
    else range.setStartBefore(holder);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  function watchCaret() {
    const write = document.querySelector("#write");
    if (write === null) return;
    new MutationObserver((records) => {
      if (view !== void 0 || moving) return;
      if (performance.now() - lastKeyAt > 500 || !MOVES.has(lastKey)) return;
      for (const record of records) {
        const holder = record.target;
        if (!(holder instanceof HTMLElement) || !holder.matches(".md-image.md-img-loaded.md-expand")) continue;
        if ((record.oldValue ?? "").split(/\s+/).includes("md-expand")) continue;
        const selection = window.getSelection();
        const anchor = selection?.anchorNode ?? null;
        if (selection === null || anchor === null || !holder.contains(anchor)) continue;
        const picture = holder.querySelector("img");
        if (!(picture instanceof HTMLImageElement) || !picture.complete || !claudeStyleIsOn()) return;
        placeCaret(holder, !TOWARD_START.has(lastKey));
        lastKey = "";
        open(picture);
        return;
      }
    }).observe(write, { subtree: true, attributes: true, attributeFilter: ["class"], attributeOldValue: true });
  }
  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function canMorph() {
    return typeof document.startViewTransition === "function" && !reducedMotion();
  }
  function cornerOf(element) {
    let current = element;
    for (let level = 0; current !== null && level < 5; level += 1) {
      const style = getComputedStyle(current);
      const clips = current.tagName === "IMG" || style.overflow === "hidden" || style.overflow === "clip";
      if (clips && style.borderRadius !== "" && style.borderRadius !== "0px") return style.borderRadius;
      current = current.parentElement;
    }
    return "0px";
  }
  function onScreen(element) {
    if (!element.isConnected) return false;
    const box = element.getBoundingClientRect();
    return box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < window.innerHeight && box.right > 0 && box.left < window.innerWidth;
  }
  function named(element, on) {
    if (on) element.style.setProperty("view-transition-name", NAME, "important");
    else element.style.removeProperty("view-transition-name");
  }
  function caretNow() {
    const selection = window.getSelection();
    return selection !== null && selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : void 0;
  }
  function realSize(picture, ratio) {
    if (picture.naturalWidth > 0 && picture.naturalHeight > 0) {
      return [picture.naturalWidth / ratio, picture.naturalHeight / ratio];
    }
    const box = picture.getBoundingClientRect();
    return [box.width, box.height];
  }
  function build(origin) {
    const overlay = document.createElement("div");
    overlay.id = "claude-style-viewer";
    overlay.tabIndex = -1;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", say("imagePreview"));
    const column = document.createElement("div");
    column.className = "claude-style-viewer-column";
    const figure = document.createElement("div");
    figure.className = "claude-style-viewer-figure";
    const frame = document.createElement("div");
    frame.className = "claude-style-viewer-frame";
    const ratio = Number(origin.getAttribute("data-pixel-ratio")) || 1;
    const [width, height] = realSize(origin, ratio);
    const image = document.createElement("img");
    image.className = "claude-style-viewer-image";
    image.src = origin.currentSrc || origin.src;
    image.alt = origin.alt;
    image.draggable = false;
    image.style.maxWidth = `min(${width}px, var(--claude-style-viewer-max-width))`;
    image.style.maxHeight = `min(${height}px, var(--claude-style-viewer-max-height))`;
    frame.append(image);
    const closer = document.createElement("button");
    closer.type = "button";
    closer.className = "claude-style-viewer-close";
    closer.setAttribute("aria-label", say("closeImagePreview"));
    closer.addEventListener("click", (event) => {
      stop2(event);
      close();
    });
    figure.append(frame, closer);
    column.append(figure);
    const words = origin.alt.trim();
    if (words !== "") {
      const caption = document.createElement("div");
      caption.className = "claude-style-viewer-caption";
      caption.textContent = words;
      column.append(caption);
    }
    overlay.append(column);
    const made = {
      overlay,
      figure,
      frame,
      image,
      closer,
      origin,
      ratio,
      previousFocus: document.activeElement,
      previousCaret: caretNow(),
      scale: 1,
      x: 0,
      y: 0
    };
    listen(made);
    return made;
  }
  function listen(current) {
    const { overlay, frame } = current;
    for (const type of ["mousedown", "mouseup", "click", "dblclick", "contextmenu"]) {
      overlay.addEventListener(type, (event) => event.stopPropagation());
    }
    overlay.addEventListener("wheel", (event) => {
      event.preventDefault();
      const lines = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : 1;
      const speed = event.ctrlKey ? 0.01 : 2e-3;
      const [x, y] = event.ctrlKey ? [event.clientX, event.clientY] : middle(current);
      zoomTo(current, current.scale * Math.exp(-event.deltaY * lines * speed), x, y);
    }, { passive: false });
    let pinchStart = 1;
    overlay.addEventListener("gesturestart", (event) => {
      event.preventDefault();
      pinchStart = current.scale;
    });
    overlay.addEventListener("gesturechange", (event) => {
      event.preventDefault();
      const pinch = event;
      zoomTo(current, pinchStart * pinch.scale, pinch.clientX, pinch.clientY);
    });
    frame.addEventListener("dblclick", (event) => {
      stop2(event);
      if (current.scale > 1.01) {
        ease(current);
        current.scale = 1;
        current.x = 0;
        current.y = 0;
        apply(current);
      } else {
        ease(current);
        const real = realScale(current);
        zoomTo(current, real > 1.01 ? real : 2, ...middle(current));
      }
    });
    frame.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || current.scale <= 1.01) return;
      stop2(event);
      frame.setPointerCapture(event.pointerId);
      overlay.classList.add("claude-style-viewer-dragging");
      let lastX = event.clientX;
      let lastY = event.clientY;
      const move = (next) => {
        current.x += next.clientX - lastX;
        current.y += next.clientY - lastY;
        lastX = next.clientX;
        lastY = next.clientY;
        clampMove(current);
        apply(current);
      };
      const end = () => {
        overlay.classList.remove("claude-style-viewer-dragging");
        frame.removeEventListener("pointermove", move);
        frame.removeEventListener("pointerup", end);
        frame.removeEventListener("pointercancel", end);
      };
      frame.addEventListener("pointermove", move);
      frame.addEventListener("pointerup", end);
      frame.addEventListener("pointercancel", end);
    });
  }
  function fitted(current) {
    return current.figure.getBoundingClientRect();
  }
  function middle(current) {
    const box = fitted(current);
    return [box.left + box.width / 2, box.top + box.height / 2];
  }
  function realScale(current) {
    const width = fitted(current).width;
    return width > 0 ? realSize(current.origin, current.ratio)[0] / width : 1;
  }
  function zoomTo(current, wanted, pointerX, pointerY) {
    const most = Math.min(16, Math.max(4, realScale(current) * 2));
    const scale = Math.min(most, Math.max(1, wanted));
    const box = fitted(current);
    const offsetX = pointerX - (box.left + box.width / 2);
    const offsetY = pointerY - (box.top + box.height / 2);
    current.x = offsetX - (offsetX - current.x) * (scale / current.scale);
    current.y = offsetY - (offsetY - current.y) * (scale / current.scale);
    current.scale = scale;
    if (scale <= 1) {
      current.x = 0;
      current.y = 0;
    }
    clampMove(current);
    apply(current);
  }
  function clampMove(current) {
    const box = fitted(current);
    const clamp = (offset, size, start, room) => {
      const scaled = size * current.scale;
      const centre = start + size / 2;
      const a = scaled / 2 - centre;
      const b = room - scaled / 2 - centre;
      return Math.min(Math.max(a, b), Math.max(Math.min(a, b), offset));
    };
    current.x = clamp(current.x, box.width, box.left, window.innerWidth);
    current.y = clamp(current.y, box.height, box.top, window.innerHeight);
  }
  function apply(current) {
    const { frame, overlay, scale, x, y } = current;
    frame.style.transform = scale > 1 ? `translate(${x}px, ${y}px) scale(${scale})` : "";
    overlay.classList.toggle("claude-style-viewer-zoomed", scale > 1.01);
    placeCloser(current);
  }
  function placeCloser(current) {
    const { closer, scale, x, y } = current;
    let shiftX = 0;
    let shiftY = 0;
    let over = false;
    if (scale > 1.01) {
      const box = fitted(current);
      const width = box.width * scale;
      const height = box.height * scale;
      const left = box.left + box.width / 2 + x - width / 2;
      const top = box.top + box.height / 2 + y - height / 2;
      const style = getComputedStyle(closer);
      const startX = box.left + px2(style.left);
      const startY = box.top + px2(style.top);
      const ownWidth = px2(style.width);
      const ownHeight = px2(style.height);
      const wantX = startX + left + width - box.right;
      const wantY = startY + top - box.top;
      const placeX = Math.min(
        Math.max(wantX, px2(style.scrollMarginLeft)),
        window.innerWidth - px2(style.scrollMarginRight) - ownWidth
      );
      const placeY = Math.min(
        Math.max(wantY, px2(style.scrollMarginTop)),
        window.innerHeight - px2(style.scrollMarginBottom) - ownHeight
      );
      shiftX = placeX - startX;
      shiftY = placeY - startY;
      over = placeX < left + width && placeX + ownWidth > left && placeY < top + height && placeY + ownHeight > top;
    }
    closer.style.setProperty("--claude-style-viewer-close-x", `${shiftX}px`);
    closer.style.setProperty("--claude-style-viewer-close-y", `${shiftY}px`);
    closer.classList.toggle("claude-style-viewer-close-over", over);
  }
  function ease(current) {
    const { overlay, frame } = current;
    overlay.classList.add("claude-style-viewer-easing");
    frame.addEventListener("transitionend", () => overlay.classList.remove("claude-style-viewer-easing"), { once: true });
  }
  function setCorners(origin, target) {
    const root3 = document.documentElement.style;
    root3.setProperty("--claude-style-vt-source-radius", cornerOf(origin));
    if (target !== void 0) root3.setProperty("--claude-style-vt-target-radius", cornerOf(target));
  }
  function open(origin) {
    const made = build(origin);
    const show2 = () => {
      document.body.append(made.overlay);
      origin.style.visibility = "hidden";
      view = made;
      made.overlay.focus({ preventScroll: true });
    };
    if (!canMorph()) {
      show2();
      return;
    }
    const root3 = document.documentElement;
    moving = true;
    root3.classList.add("claude-style-vt");
    setCorners(origin, void 0);
    named(origin, true);
    const transition = document.startViewTransition(() => {
      named(origin, false);
      show2();
      named(made.frame, true);
      setCorners(origin, made.frame);
    });
    transition.finished.catch(() => void 0).finally(() => {
      named(made.frame, false);
      root3.classList.remove("claude-style-vt");
      moving = false;
    });
  }
  function close() {
    const current = view;
    if (current === void 0 || moving) return;
    const { overlay, frame, origin, previousFocus, previousCaret } = current;
    const finish = () => {
      overlay.remove();
      origin.style.visibility = "";
      view = void 0;
      if (previousFocus instanceof HTMLElement && previousFocus.closest("#write") !== null) {
        const scroller = document.querySelector("content");
        const top = scroller?.scrollTop;
        const keep = () => {
          if (scroller !== null && top !== void 0 && scroller.scrollTop !== top) scroller.scrollTop = top;
        };
        previousFocus.focus({ preventScroll: true });
        const selection = window.getSelection();
        if (selection !== null && previousCaret !== void 0 && previousCaret.startContainer.isConnected) {
          selection.removeAllRanges();
          selection.addRange(previousCaret);
        }
        keep();
        requestAnimationFrame(keep);
        window.setTimeout(keep, 60);
      }
    };
    if (!canMorph()) {
      finish();
      return;
    }
    const root3 = document.documentElement;
    const visible = onScreen(origin);
    moving = true;
    root3.classList.add("claude-style-vt", "claude-style-vt-closing");
    if (!visible) root3.classList.add("claude-style-vt-no-origin");
    setCorners(origin, frame);
    named(frame, true);
    const transition = document.startViewTransition(() => {
      named(frame, false);
      finish();
      if (visible) named(origin, true);
    });
    transition.finished.catch(() => void 0).finally(() => {
      named(origin, false);
      root3.classList.remove("claude-style-vt", "claude-style-vt-closing", "claude-style-vt-no-origin");
      moving = false;
    });
  }

  var VERSION = "0.1.5";
  function whenTyporaIsReady(start) {
    let tries = 0;
    const wait = () => {
      if (typoraFile()?.editor !== void 0) {
        start();
        return;
      }
      tries += 1;
      if (tries < 200) setTimeout(wait, 100);
    };
    wait();
  }
  function begin(name, start) {
    try {
      start();
    } catch (error) {
      console.warn(`[Claude Style enhance] ${name} did not start`, error);
    }
  }
  var root2 = document.documentElement;
  if (root2.dataset["claudeStyleEnhance"] === void 0) {
    root2.dataset["claudeStyleEnhance"] = VERSION;
    whenTyporaIsReady(() => {
      begin("the theme check", watchTheme);
      begin("the picture viewer", startViewer);
      begin("the copy buttons", startCopy);
      begin("the card and formula clicks", startClicks);
      begin("the read-only button", startReadonlyButton);
      begin("the keys", startKeys);
      begin("the outline", startOutline);
      begin("the file cards", startCards);
      begin("the sidebar search", startSearch);
      begin("the words", startLanguage);
      begin("the open folder's fold", startFolder);
    });
  }
})();

/*
 * End of Claude Style Enhance 0.1.5 for Typora
 * https://github.com/Xv-Bowen/Claude-Style-Typora
 * Written by Xv-Bowen (https://github.com/Xv-Bowen)
 * Copyright (c) 2026 Xv-Bowen
 * Licensed under CC BY-NC-ND 4.0: https://creativecommons.org/licenses/by-nc-nd/4.0/
 * SPDX-License-Identifier: CC-BY-NC-ND-4.0
 * Not affiliated with Anthropic
 */
