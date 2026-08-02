/* ============================================================
   交互脚本 script.js
   ------------------------------------------------------------
   做四件事：
     1. 读取 data/content.js，把项目和统计数字渲染到页面
     2. 项目筛选（点标签过滤卡片）
     3. 手机菜单开关 + 滚动高亮当前导航
     4. 点邮箱复制到剪贴板
   都是原生 JS，没有任何框架。
   ============================================================ */

/* ---------- 1a. 渲染统计数字 ---------- */
function renderStats() {
  const box = document.querySelector("[data-profile-stats]");
  if (!box) return;
  try {
    const metrics = window.PORTFOLIO_DATA?.metrics;
    if (!Array.isArray(metrics)) throw new Error("缺少 metrics 数据");
    box.innerHTML = metrics
      .map(
        (m) => `
        <li>
          <span class="num">${m.num}</span>
          <span class="label">${m.label}</span>
        </li>`
      )
      .join("");
  } catch (e) {
    console.error(e);
  }
}

/* ---------- 1b. 渲染项目卡片 ---------- */
function renderProjects() {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;
  try {
    const projects = window.PORTFOLIO_DATA?.projects;
    if (!Array.isArray(projects)) throw new Error("缺少 projects 数据");
    grid.innerHTML = projects
      .map((p) => {
        // 拼接项目上的链接（案例、demo、code 均按需显示）
        const links = [];
        if (p.caseStudy) links.push(`<a class="case-link" href="${p.caseStudy}">案例详情 →</a>`);
        if (p.demo) links.push(`<a href="${p.demo}" target="_blank" rel="noopener">在线预览 →</a>`);
        if (p.code) links.push(`<a href="${p.code}" target="_blank" rel="noopener">源码 →</a>`);
        const stack = Array.isArray(p.stack)
          ? `<ul class="card-stack">${p.stack.map((item) => `<li>${item}</li>`).join("")}</ul>`
          : "";
        const visual = p.image
          ? `<a class="card-visual" href="${p.caseStudy || p.code || "#"}"${p.caseStudy ? "" : ' target="_blank" rel="noopener"'}>
              <img src="${p.image}" alt="${p.imageAlt || p.title}" loading="lazy" />
            </a>`
          : "";

        // data-category 给筛选功能用
        return `
          <article class="card" data-category="${p.category}">
            ${visual}
            <div class="card-body">
            <div class="card-top">
              <span class="card-cat">${p.category}</span>
              <span class="card-status">${p.status || ""}</span>
            </div>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            ${stack}
            <div class="card-links">${links.join("")}</div>
            </div>
          </article>`;
      })
      .join("");
  } catch (e) {
    console.error(e);
    grid.innerHTML = `<p style="color:var(--muted)">项目加载失败，请检查 data/content.js 是否存在且格式正确。</p>`;
  }
}

/* ---------- 2. 项目筛选 ---------- */
function initFilters() {
  const filterBar = document.getElementById("filters");
  if (!filterBar) return;

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;

    // 切换按钮高亮
    filterBar.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    // 显示/隐藏卡片
    const want = btn.dataset.filter;
    document.querySelectorAll(".project-grid .card").forEach((card) => {
      const match = want === "all" || card.dataset.category === want;
      card.classList.toggle("is-hidden", !match);
    });
  });
}

/* ---------- 3a. 手机菜单开关 ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // 点了某个链接后自动收起菜单
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- 3b. 滚动时高亮当前区块对应的导航 ---------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav a[data-nav]");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) =>
            link.classList.toggle("is-active", link.dataset.nav === id)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" } // 区块进入视口中部时才算「当前」
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---------- 4. 点击复制邮箱 ---------- */
function initCopy() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        const original = btn.textContent;
        btn.textContent = "已复制 ✓";
        setTimeout(() => (btn.textContent = original), 1500);
      } catch {
        // 复制失败就退回到打开邮件客户端
        window.location.href = "mailto:" + value;
      }
    });
  });
}

/* ---------- 页脚年份 ---------- */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

/* ---------- 启动 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderProjects();
  initFilters();
  initMobileMenu();
  initScrollSpy();
  initCopy();
  setYear();
});
