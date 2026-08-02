# 王涵宇 Felix · 个人作品集

纯 HTML / CSS / JavaScript 构建的个人作品集，突出 AI 应用、全栈工程落地、技术写作与项目实践。零框架、零构建工具，可直接部署到 GitHub Pages。

## 文件结构

```
my-portfolio/
├─ index.html          页面结构（改标题、导航、各段文字）
├─ styles.css          样式（改颜色/字体就改最上面的 :root 变量）
├─ script.js           交互逻辑（一般不用动）
├─ projects/           独立项目案例页与共用案例样式
├─ assets/projects/    案例页和首页卡片使用的项目截图
├─ data/
│  └─ content.js       项目列表和首屏统计数字 ← 改内容主要改这里
└─ README.md           本说明
```

## 本地预览

现在可以直接双击 `index.html` 打开，项目和统计数据均能正常显示。也可以启动本地服务器预览：

```bash
cd my-portfolio
python3 -m http.server 8000
```

然后浏览器打开 http://localhost:8000 。改完文件刷新页面即可看到效果。

## 怎么改成你自己的

1. **修改个人介绍、写作、奖项** —— 编辑 `index.html` 中相应区块。
2. **加/改项目** —— 编辑 `data/content.js` 中的 `projects` 数组。每个项目是一段：
   ```js
   {
     "title": "项目名",
     "description": "一句话介绍",
     "category": "agent",        // 对应：agent / data / backend（全栈/后端）/ tool
     "status": "进行中",          // 可留空
     "stack": ["Python", "RAG"], // 项目技术标签
     "image": "assets/projects/demo.png", // 首页卡片截图，可选
     "imageAlt": "项目界面说明",            // 截图替代文本
     "caseStudy": "projects/demo.html",    // 案例详情页，可选
     "demo": "https://...",       // 在线链接，没有就删掉这行
     "code": "https://github.com/..."  // 源码链接，没有就删掉这行
   }
   ```
   想加新的分类标签？在 `index.html` 的 `.filters` 里加一个按钮，`data-filter` 的值和项目里的 `category` 保持一致即可。
3. **改首屏统计数字** —— 编辑 `data/content.js` 中的 `metrics` 数组。
4. **改配色** —— 打开 `styles.css` 最顶部的 `:root`，改 `--accent`（强调色）等变量，全站会一起变。

> 项目按数组顺序展示。要置顶新项目，把它放在 `projects` 数组第一项即可。

## 免费部署到 GitHub Pages

1. 在 GitHub 新建公开仓库 `felix-windsor.github.io`。
2. 把这个文件夹里的所有文件传上去（网页拖拽上传，或用 git）。
3. 仓库 Settings → Pages，Source 选 `main` 分支、根目录，保存。
4. 等一两分钟，访问 `https://felix-windsor.github.io`。

之后每次改完内容推送到仓库，网站会自动更新。
```
