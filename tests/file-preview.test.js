const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const statsBox = { innerHTML: "" };
const projectGrid = { innerHTML: "" };
let onReady;

const document = {
  querySelector(selector) {
    if (selector === "[data-profile-stats]") return statsBox;
    if (selector === "[data-project-grid]") return projectGrid;
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  addEventListener(event, callback) {
    if (event === "DOMContentLoaded") onReady = callback;
  }
};

const context = {
  console,
  document,
  navigator: {},
  setTimeout,
  clearTimeout
};
context.window = context;

vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "data/content.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(root, "script.js"), "utf8"), context);

assert.equal(typeof onReady, "function", "页面启动函数应注册 DOMContentLoaded");
onReady();

assert.match(statsBox.innerHTML, /846K\+/);
assert.match(projectGrid.innerHTML, /ModelGate/);
assert.match(projectGrid.innerHTML, /FlowOps/);
assert.match(projectGrid.innerHTML, /projects\/modelgate\.html/);
assert.match(projectGrid.innerHTML, /projects\/flowops\.html/);
assert.match(projectGrid.innerHTML, /案例详情/);
assert.ok(
  projectGrid.innerHTML.indexOf("ModelGate") < projectGrid.innerHTML.indexOf("FlowOps"),
  "ModelGate 应排在 FlowOps 前面"
);
assert.doesNotMatch(projectGrid.innerHTML, /项目加载失败/);

console.log("file preview data rendering: ok");
