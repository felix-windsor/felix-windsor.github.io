/* ModelGate 案例页的展示动效：滚动进入 + 请求生命周期演示。 */
(function () {
  "use strict";

  const reducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initCaseReveal() {
    const targets = document.querySelectorAll(
      ".hero-visual, .case-section .section-heading, .case-section .panel, " +
      ".case-section .gallery figure, .number-card, .decision, .boundary, .evidence"
    );
    if (!targets.length) return;

    targets.forEach((target) => target.setAttribute("data-case-reveal", ""));
    document.documentElement.classList.add("case-motion-ready");

    if (reducedMotion || typeof IntersectionObserver !== "function") {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((target) => observer.observe(target));
  }

  function initRequestLifecycle() {
    const demo = document.querySelector("[data-flow-demo]");
    if (!demo) return;

    const steps = Array.from(demo.querySelectorAll("[data-flow-step]"));
    const status = demo.querySelector("[data-flow-status]");
    const latency = demo.querySelector("[data-flow-latency]");
    const summary = demo.querySelector(".flow-summary");
    const replay = demo.querySelector("[data-flow-replay]");
    const stageLabels = [
      "请求已进入 Client Edge",
      "正在校验身份、策略与额度",
      "已生成确定性 Provider 路由",
      "正在转换协议并建立 SSE 流",
      "正在写入观测与费用证据"
    ];
    const stageLatency = ["18 ms", "43 ms", "71 ms", "126 ms", "420 ms"];
    let timers = [];

    const clearTimers = () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers = [];
    };

    const showCompletedState = () => {
      steps.forEach((step) => {
        step.classList.remove("is-active");
        step.classList.add("is-complete");
      });
      demo.style.setProperty("--flow-progress", "100%");
      if (status) status.textContent = "请求完成，证据已提交";
      if (latency) latency.textContent = stageLatency[stageLatency.length - 1];
      summary?.classList.add("is-visible");
    };

    const play = () => {
      clearTimers();
      steps.forEach((step) => step.classList.remove("is-active", "is-complete"));
      summary?.classList.remove("is-visible");
      demo.style.setProperty("--flow-progress", "0%");
      if (status) status.textContent = "等待请求进入网关";
      if (latency) latency.textContent = "0 ms";

      if (reducedMotion) {
        showCompletedState();
        return;
      }

      steps.forEach((step, index) => {
        timers.push(setTimeout(() => {
          steps.forEach((item, itemIndex) => {
            item.classList.toggle("is-active", itemIndex === index);
            item.classList.toggle("is-complete", itemIndex < index);
          });
          demo.style.setProperty("--flow-progress", `${((index + 1) / steps.length) * 100}%`);
          if (status) status.textContent = stageLabels[index];
          if (latency) latency.textContent = stageLatency[index];
        }, 220 + index * 760));
      });

      timers.push(setTimeout(showCompletedState, 220 + steps.length * 760));
    };

    replay?.addEventListener("click", play);

    if (reducedMotion || typeof IntersectionObserver !== "function") {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        play();
        observer.disconnect();
      },
      { threshold: 0.28 }
    );
    observer.observe(demo);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCaseReveal();
    initRequestLifecycle();
  });
})();
