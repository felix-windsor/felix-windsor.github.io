/*
 * 作品集内容数据。
 * 使用普通 JavaScript 而不是 fetch JSON，因此直接双击 index.html 也能正常加载。
 * 新项目按展示顺序加入 projects 数组；第一项会显示在最前面。
 */
window.PORTFOLIO_DATA = {
  metrics: [
    { num: "846K+", label: "CSDN 总访问量" },
    { num: "8.6K+", label: "CSDN 粉丝" },
    { num: "3.2K+", label: "公众号关注" },
    { num: "6", label: "Merged PRs" }
  ],
  projects: [
    {
      title: "ModelGate",
      description: "面向可信主机与小型团队的自托管模型网关，把 Anthropic Messages、OpenAI-compatible Provider、Tool Use、配额与可观测性收束进一条可治理链路。",
      category: "agent",
      status: "本地可运行",
      stack: ["Rust + Axum", "React", "Protocol Adapter", "PostgreSQL"],
      image: "assets/projects/modelgate-dashboard.png",
      imageAlt: "ModelGate 模型网关运行仪表盘",
      caseStudy: "projects/modelgate.html",
      code: "https://github.com/felix-windsor/ModelGate"
    },
    {
      title: "FlowOps",
      description: "面向小型公司的现金流运营台，把经营流水、预算承诺、审批、资金账户、票据证据与人力成本连接为可追踪的经营闭环。",
      category: "backend",
      status: "全栈项目",
      stack: ["Next.js 16", "Spring Boot 4", "PostgreSQL", "MinIO"],
      image: "assets/projects/flowops-dashboard.png",
      imageAlt: "FlowOps 企业经营现金流工作台",
      caseStudy: "projects/flowops.html",
      code: "https://github.com/felix-windsor/Flowops-master"
    },
    {
      title: "Multi-Model Knowledge RAG System",
      description: "面向强合规与长期知识资产场景的企业文档 Graph RAG，把多格式解析、closed schema 抽取、置信度治理、向量/图谱存储与可复现评测连接起来。",
      category: "agent",
      status: "本地可运行",
      stack: ["FastAPI", "LightRAG", "Qdrant + Neo4j", "Graph RAG"],
      image: "assets/projects/knowledge-rag-dashboard.png",
      imageAlt: "Multi-Model Knowledge RAG 企业文档工作台",
      caseStudy: "projects/knowledge-rag.html",
      code: "https://github.com/felix-windsor/Multi-Model-Knowledge-RAG-System"
    },
    {
      title: "Obsidian Lumina MCP",
      description: "为 Obsidian 知识库提供语义向量检索的 MCP Server，结合本地 Ollama Embeddings 与 LanceDB。",
      category: "data",
      status: "开源项目",
      stack: ["TypeScript", "MCP", "LanceDB", "Ollama"],
      code: "https://github.com/felix-windsor/Obsidian-Lumina-MCP"
    },
    {
      title: "Procurement Pricing MCP",
      description: "面向采购询比价与注塑件核价的 Hermes MCP，把不可信文件、BOM 人工批准、固定行情快照、Decimal 核价、异常检测和 Excel 报告锁进受控状态链。",
      category: "data",
      status: "可复现 MVP",
      stack: ["Python", "MCP", "Pydantic", "SQLite + Excel"],
      image: "assets/projects/procurement-workflow.svg",
      imageAlt: "Procurement Pricing MCP 采购核价状态链",
      caseStudy: "projects/procurement-pricing.html",
      code: "https://github.com/felix-windsor/hermes-procurement-pricing-mcp"
    },
    {
      title: "无损视频分割工具",
      description: "面向 Telegram 普通用户的实用工具，基于 FFmpeg 将大视频无损切分为 2GB 以下片段。",
      category: "tool",
      status: "可用工具",
      stack: ["Python", "FFmpeg", "CLI"],
      code: "https://github.com/felix-windsor/video_split-below-2-GB_tools"
    }
  ]
};
