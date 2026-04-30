export interface Step {
  title: string;
  explanation: string;
  pattern?: string;
  nodes: string[];
  edges: [string, string][];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: Step[];
}

export const scenarios: Scenario[] = [
  {
    id: "document-compliance",
    title: "Document Compliance Check",
    description:
      "Automatically assess whether a document meets regulatory requirements (EU AI Act, GDPR, etc.)",
    icon: "[doc]→[classify]→[verdict]",
    steps: [
      {
        title: "User uploads a document",
        explanation:
          "The user submits a policy document, AI system card, or technical documentation that needs compliance assessment. The system needs to understand the content and check it against complex, evolving regulations.",
        nodes: ["User", "Document Ingestion"],
        edges: [["User", "Document Ingestion"]],
      },
      {
        title: "Document chunking & embedding",
        explanation:
          "Large documents are split into semantic chunks and converted to vector embeddings. This allows precise retrieval later — we don't want to feed 200 pages to an LLM when only 3 paragraphs are relevant to a specific requirement.",
        pattern: "Chunking Strategy",
        nodes: ["User", "Document Ingestion", "Chunker", "Vector DB"],
        edges: [
          ["User", "Document Ingestion"],
          ["Document Ingestion", "Chunker"],
          ["Chunker", "Vector DB"],
        ],
      },
      {
        title: "Regulation knowledge base",
        explanation:
          "The regulatory framework (EU AI Act articles, GDPR clauses) is pre-processed and stored as embeddings in the same vector store. This becomes the 'ground truth' the system reasons against — not the LLM's training data.",
        pattern: "RAG (Retrieval-Augmented Generation)",
        nodes: ["User", "Document Ingestion", "Chunker", "Vector DB", "Regulation KB"],
        edges: [
          ["User", "Document Ingestion"],
          ["Document Ingestion", "Chunker"],
          ["Chunker", "Vector DB"],
          ["Regulation KB", "Vector DB"],
        ],
      },
      {
        title: "Compliance reasoning agent",
        explanation:
          "An LLM agent retrieves relevant document chunks AND regulation clauses, then reasons about whether requirements are met. It produces structured assessments with citations back to both the document and the regulation.",
        pattern: "Agentic RAG",
        nodes: ["User", "Document Ingestion", "Chunker", "Vector DB", "Regulation KB", "Compliance Agent", "LLM"],
        edges: [
          ["User", "Document Ingestion"],
          ["Document Ingestion", "Chunker"],
          ["Chunker", "Vector DB"],
          ["Regulation KB", "Vector DB"],
          ["Compliance Agent", "Vector DB"],
          ["Compliance Agent", "LLM"],
        ],
      },
      {
        title: "Structured compliance report",
        explanation:
          "The agent outputs a structured report: requirement-by-requirement assessment, risk scores, gaps identified, and recommended remediation — all with citations. In regulated industries, traceability isn't optional.",
        pattern: "Structured Output",
        nodes: ["User", "Document Ingestion", "Chunker", "Vector DB", "Regulation KB", "Compliance Agent", "LLM", "Report"],
        edges: [
          ["User", "Document Ingestion"],
          ["Document Ingestion", "Chunker"],
          ["Chunker", "Vector DB"],
          ["Regulation KB", "Vector DB"],
          ["Compliance Agent", "Vector DB"],
          ["Compliance Agent", "LLM"],
          ["Compliance Agent", "Report"],
          ["Report", "User"],
        ],
      },
    ],
  },
  {
    id: "multi-agent-research",
    title: "Multi-Agent Research System",
    description:
      "Multiple AI agents collaborate to research, analyze, and synthesize information from diverse sources.",
    icon: "[orch]→[res][anl][syn]→[out]",
    steps: [
      {
        title: "User submits a research query",
        explanation:
          "A complex question that requires gathering information from multiple sources, cross-referencing facts, and producing a synthesized answer. Too complex for a single LLM call.",
        nodes: ["User", "Orchestrator"],
        edges: [["User", "Orchestrator"]],
      },
      {
        title: "Orchestrator decomposes the task",
        explanation:
          "The orchestrator agent breaks the query into sub-tasks and assigns them to specialist agents. This is where multi-agent systems beat single prompts — each agent has focused context and tools.",
        pattern: "Task Decomposition",
        nodes: ["User", "Orchestrator", "Research Agent", "Analysis Agent", "Synthesis Agent"],
        edges: [
          ["User", "Orchestrator"],
          ["Orchestrator", "Research Agent"],
          ["Orchestrator", "Analysis Agent"],
          ["Orchestrator", "Synthesis Agent"],
        ],
      },
      {
        title: "Research agent gathers sources",
        explanation:
          "The research agent searches knowledge bases, APIs, and document stores. It returns raw findings with source attribution. Running this in parallel with other agents reduces total latency.",
        pattern: "Tool-Augmented Agent",
        nodes: ["User", "Orchestrator", "Research Agent", "Analysis Agent", "Synthesis Agent", "Knowledge Base", "External APIs"],
        edges: [
          ["User", "Orchestrator"],
          ["Orchestrator", "Research Agent"],
          ["Orchestrator", "Analysis Agent"],
          ["Orchestrator", "Synthesis Agent"],
          ["Research Agent", "Knowledge Base"],
          ["Research Agent", "External APIs"],
        ],
      },
      {
        title: "Analysis agent validates & cross-references",
        explanation:
          "The analysis agent takes research findings and cross-references them, checks for contradictions, and scores confidence levels. In regulated industries, you can't serve unvalidated information.",
        pattern: "Validation Pipeline",
        nodes: ["User", "Orchestrator", "Research Agent", "Analysis Agent", "Synthesis Agent", "Knowledge Base", "External APIs"],
        edges: [
          ["User", "Orchestrator"],
          ["Orchestrator", "Research Agent"],
          ["Orchestrator", "Analysis Agent"],
          ["Orchestrator", "Synthesis Agent"],
          ["Research Agent", "Knowledge Base"],
          ["Research Agent", "External APIs"],
          ["Research Agent", "Analysis Agent"],
        ],
      },
      {
        title: "Synthesis agent produces final output",
        explanation:
          "The synthesis agent combines validated findings into a coherent, structured response. The orchestrator reviews it for completeness before returning to the user. Multi-agent = separation of concerns applied to AI.",
        pattern: "Multi-Agent Orchestration",
        nodes: ["User", "Orchestrator", "Research Agent", "Analysis Agent", "Synthesis Agent", "Knowledge Base", "External APIs", "Final Report"],
        edges: [
          ["User", "Orchestrator"],
          ["Orchestrator", "Research Agent"],
          ["Orchestrator", "Analysis Agent"],
          ["Orchestrator", "Synthesis Agent"],
          ["Research Agent", "Knowledge Base"],
          ["Research Agent", "External APIs"],
          ["Research Agent", "Analysis Agent"],
          ["Analysis Agent", "Synthesis Agent"],
          ["Synthesis Agent", "Final Report"],
          ["Final Report", "Orchestrator"],
          ["Orchestrator", "User"],
        ],
      },
    ],
  },
  {
    id: "intelligent-classification",
    title: "Intelligent Document Classification",
    description:
      "Automatically classify and route incoming documents to the right workflow based on content analysis.",
    icon: "[in]→[parse]→[route]→[a|b|c]",
    steps: [
      {
        title: "Documents arrive from multiple channels",
        explanation:
          "Documents come in via email, API uploads, or scanned images. The system needs to handle varied formats and determine what each document is, regardless of how it arrives.",
        nodes: ["Email", "API", "Scanner", "Ingestion Layer"],
        edges: [
          ["Email", "Ingestion Layer"],
          ["API", "Ingestion Layer"],
          ["Scanner", "Ingestion Layer"],
        ],
      },
      {
        title: "Content extraction & normalization",
        explanation:
          "OCR for scanned docs, parsing for structured files, text extraction for everything else. All documents become normalized text + metadata. This pipeline handles the messy reality of enterprise data.",
        pattern: "ETL Pipeline",
        nodes: ["Email", "API", "Scanner", "Ingestion Layer", "OCR/Parser", "Normalized Store"],
        edges: [
          ["Email", "Ingestion Layer"],
          ["API", "Ingestion Layer"],
          ["Scanner", "Ingestion Layer"],
          ["Ingestion Layer", "OCR/Parser"],
          ["OCR/Parser", "Normalized Store"],
        ],
      },
      {
        title: "Embedding-based classification",
        explanation:
          "Document embeddings are compared against pre-computed category centroids. This gives fast, cost-effective initial classification without calling an LLM for every document. Reserve expensive reasoning for edge cases.",
        pattern: "Embedding Similarity",
        nodes: ["Email", "API", "Scanner", "Ingestion Layer", "OCR/Parser", "Normalized Store", "Classifier", "Category Centroids"],
        edges: [
          ["Email", "Ingestion Layer"],
          ["API", "Ingestion Layer"],
          ["Scanner", "Ingestion Layer"],
          ["Ingestion Layer", "OCR/Parser"],
          ["OCR/Parser", "Normalized Store"],
          ["Normalized Store", "Classifier"],
          ["Category Centroids", "Classifier"],
        ],
      },
      {
        title: "LLM fallback for ambiguous cases",
        explanation:
          "When embedding similarity scores are below threshold (ambiguous documents), an LLM is called with few-shot examples to make the final classification decision. This tiered approach keeps costs low while maintaining accuracy.",
        pattern: "Tiered Inference",
        nodes: ["Email", "API", "Scanner", "Ingestion Layer", "OCR/Parser", "Normalized Store", "Classifier", "Category Centroids", "LLM Fallback"],
        edges: [
          ["Email", "Ingestion Layer"],
          ["API", "Ingestion Layer"],
          ["Scanner", "Ingestion Layer"],
          ["Ingestion Layer", "OCR/Parser"],
          ["OCR/Parser", "Normalized Store"],
          ["Normalized Store", "Classifier"],
          ["Category Centroids", "Classifier"],
          ["Classifier", "LLM Fallback"],
        ],
      },
      {
        title: "Routing to downstream workflows",
        explanation:
          "Classified documents are routed to the appropriate workflow: invoices to finance, contracts to legal, compliance docs to the regulatory team. Event-driven architecture ensures loose coupling and scalability.",
        pattern: "Event-Driven Architecture",
        nodes: ["Email", "API", "Scanner", "Ingestion Layer", "OCR/Parser", "Normalized Store", "Classifier", "Category Centroids", "LLM Fallback", "Event Bus", "Finance", "Legal", "Compliance"],
        edges: [
          ["Email", "Ingestion Layer"],
          ["API", "Ingestion Layer"],
          ["Scanner", "Ingestion Layer"],
          ["Ingestion Layer", "OCR/Parser"],
          ["OCR/Parser", "Normalized Store"],
          ["Normalized Store", "Classifier"],
          ["Category Centroids", "Classifier"],
          ["Classifier", "LLM Fallback"],
          ["Classifier", "Event Bus"],
          ["LLM Fallback", "Event Bus"],
          ["Event Bus", "Finance"],
          ["Event Bus", "Legal"],
          ["Event Bus", "Compliance"],
        ],
      },
    ],
  },
  {
    id: "conversational-assistant",
    title: "Enterprise Knowledge Assistant",
    description:
      "A conversational AI that answers questions grounded in company documentation with source attribution.",
    icon: "[q]→[retrieve]→[llm]→[cite]",
    steps: [
      {
        title: "User asks a question",
        explanation:
          "An employee asks a natural language question about company policies, procedures, or technical documentation. The system must answer accurately and cite its sources — hallucinations are unacceptable in enterprise settings.",
        nodes: ["User", "Chat Interface"],
        edges: [["User", "Chat Interface"]],
      },
      {
        title: "Query understanding & rewriting",
        explanation:
          "The query is analyzed for intent and rewritten for optimal retrieval. Conversational context from previous messages is incorporated. A vague 'what about the deadline?' becomes a specific retrieval query.",
        pattern: "Query Rewriting",
        nodes: ["User", "Chat Interface", "Query Engine"],
        edges: [
          ["User", "Chat Interface"],
          ["Chat Interface", "Query Engine"],
        ],
      },
      {
        title: "Hybrid retrieval",
        explanation:
          "Both semantic search (embeddings) and keyword search (BM25) are used in parallel. Results are fused with Reciprocal Rank Fusion. This catches both conceptually similar and exact-match content that either method alone would miss.",
        pattern: "Hybrid Search + RRF",
        nodes: ["User", "Chat Interface", "Query Engine", "Vector Search", "Keyword Search", "Rank Fusion"],
        edges: [
          ["User", "Chat Interface"],
          ["Chat Interface", "Query Engine"],
          ["Query Engine", "Vector Search"],
          ["Query Engine", "Keyword Search"],
          ["Vector Search", "Rank Fusion"],
          ["Keyword Search", "Rank Fusion"],
        ],
      },
      {
        title: "Context assembly & generation",
        explanation:
          "Retrieved chunks are assembled into a context window with source metadata preserved. The LLM generates an answer constrained to the provided context, with inline citations. The system prompt enforces 'say I don't know' when context is insufficient.",
        pattern: "Grounded Generation",
        nodes: ["User", "Chat Interface", "Query Engine", "Vector Search", "Keyword Search", "Rank Fusion", "Context Builder", "LLM"],
        edges: [
          ["User", "Chat Interface"],
          ["Chat Interface", "Query Engine"],
          ["Query Engine", "Vector Search"],
          ["Query Engine", "Keyword Search"],
          ["Vector Search", "Rank Fusion"],
          ["Keyword Search", "Rank Fusion"],
          ["Rank Fusion", "Context Builder"],
          ["Context Builder", "LLM"],
        ],
      },
      {
        title: "Response with citations",
        explanation:
          "The answer is returned with clickable source citations linking to the original documents. Confidence scoring flags low-confidence answers for human review. Every response is traceable — essential for enterprise trust.",
        pattern: "Cited Response + Confidence Scoring",
        nodes: ["User", "Chat Interface", "Query Engine", "Vector Search", "Keyword Search", "Rank Fusion", "Context Builder", "LLM", "Citation Engine"],
        edges: [
          ["User", "Chat Interface"],
          ["Chat Interface", "Query Engine"],
          ["Query Engine", "Vector Search"],
          ["Query Engine", "Keyword Search"],
          ["Vector Search", "Rank Fusion"],
          ["Keyword Search", "Rank Fusion"],
          ["Rank Fusion", "Context Builder"],
          ["Context Builder", "LLM"],
          ["LLM", "Citation Engine"],
          ["Citation Engine", "Chat Interface"],
        ],
      },
    ],
  },
  {
    id: "cost-optimization",
    title: "LLM Cost Optimization Pipeline",
    description:
      "Reduce AI inference costs by 60%+ through intelligent routing, caching, and model selection.",
    icon: "[req]→[cache|route]→[$|$$|$$$]",
    steps: [
      {
        title: "Requests arrive at the AI gateway",
        explanation:
          "All LLM requests flow through a central gateway rather than hitting models directly. This gives you a single point for routing, caching, monitoring, and cost control — the same pattern I used to achieve 60% cost reduction at Vialto.",
        nodes: ["Applications", "AI Gateway"],
        edges: [["Applications", "AI Gateway"]],
      },
      {
        title: "Semantic cache check",
        explanation:
          "Before calling any model, check if a semantically similar query was recently answered. Embedding similarity above threshold = cache hit. For repetitive enterprise queries, this alone can eliminate 30-40% of LLM calls.",
        pattern: "Semantic Caching",
        nodes: ["Applications", "AI Gateway", "Semantic Cache"],
        edges: [
          ["Applications", "AI Gateway"],
          ["AI Gateway", "Semantic Cache"],
        ],
      },
      {
        title: "Complexity-based model routing",
        explanation:
          "A lightweight classifier scores query complexity. Simple queries (summarization, extraction) route to smaller/cheaper models. Complex reasoning routes to capable models. Don't use GPT-4 for what GPT-4o-mini can handle.",
        pattern: "Model Router",
        nodes: ["Applications", "AI Gateway", "Semantic Cache", "Complexity Classifier", "Small Model", "Large Model"],
        edges: [
          ["Applications", "AI Gateway"],
          ["AI Gateway", "Semantic Cache"],
          ["AI Gateway", "Complexity Classifier"],
          ["Complexity Classifier", "Small Model"],
          ["Complexity Classifier", "Large Model"],
        ],
      },
      {
        title: "Prompt optimization layer",
        explanation:
          "Prompts are automatically compressed: removing redundant instructions, optimizing few-shot examples, and using reference IDs instead of repeating context. Fewer tokens in = lower cost + faster response.",
        pattern: "Prompt Compression",
        nodes: ["Applications", "AI Gateway", "Semantic Cache", "Complexity Classifier", "Prompt Optimizer", "Small Model", "Large Model"],
        edges: [
          ["Applications", "AI Gateway"],
          ["AI Gateway", "Semantic Cache"],
          ["AI Gateway", "Complexity Classifier"],
          ["Complexity Classifier", "Prompt Optimizer"],
          ["Prompt Optimizer", "Small Model"],
          ["Prompt Optimizer", "Large Model"],
        ],
      },
      {
        title: "Monitoring & feedback loop",
        explanation:
          "Every request is logged with cost, latency, quality score, and model used. Dashboards surface optimization opportunities. Quality regressions trigger alerts. The system continuously learns which routing decisions work best.",
        pattern: "Observability & Continuous Optimization",
        nodes: ["Applications", "AI Gateway", "Semantic Cache", "Complexity Classifier", "Prompt Optimizer", "Small Model", "Large Model", "Monitor", "Dashboard"],
        edges: [
          ["Applications", "AI Gateway"],
          ["AI Gateway", "Semantic Cache"],
          ["AI Gateway", "Complexity Classifier"],
          ["Complexity Classifier", "Prompt Optimizer"],
          ["Prompt Optimizer", "Small Model"],
          ["Prompt Optimizer", "Large Model"],
          ["Small Model", "Monitor"],
          ["Large Model", "Monitor"],
          ["Monitor", "Dashboard"],
          ["Monitor", "AI Gateway"],
        ],
      },
    ],
  },
  {
    id: "safety-guardrails",
    title: "AI Safety & Guardrails",
    description:
      "Build a robust safety layer that prevents harmful outputs, enforces policies, and maintains compliance.",
    icon: "[in]→[gate]→[llm]→[gate]→[out]",
    steps: [
      {
        title: "User input arrives",
        explanation:
          "Every user input must be validated before reaching the LLM. In regulated industries, you can't rely on the model's training to prevent policy violations — you need deterministic guardrails.",
        nodes: ["User Input", "Input Gate"],
        edges: [["User Input", "Input Gate"]],
      },
      {
        title: "Input classification & filtering",
        explanation:
          "A fast classifier checks for prompt injection attempts, PII exposure, off-topic requests, and policy-violating content. Blocked requests get informative rejection messages. This layer must be fast — <50ms latency budget.",
        pattern: "Input Guardrails",
        nodes: ["User Input", "Input Gate", "Injection Detector", "PII Scanner", "Policy Classifier"],
        edges: [
          ["User Input", "Input Gate"],
          ["Input Gate", "Injection Detector"],
          ["Input Gate", "PII Scanner"],
          ["Input Gate", "Policy Classifier"],
        ],
      },
      {
        title: "Constrained generation",
        explanation:
          "The LLM operates within a tightly scoped system prompt with explicit boundaries. Output format is constrained (structured JSON where possible). The model is told exactly what it can and cannot discuss.",
        pattern: "Constrained System Prompt",
        nodes: ["User Input", "Input Gate", "Injection Detector", "PII Scanner", "Policy Classifier", "LLM", "System Prompt"],
        edges: [
          ["User Input", "Input Gate"],
          ["Input Gate", "Injection Detector"],
          ["Input Gate", "PII Scanner"],
          ["Input Gate", "Policy Classifier"],
          ["Input Gate", "LLM"],
          ["System Prompt", "LLM"],
        ],
      },
      {
        title: "Output validation",
        explanation:
          "LLM output is checked before reaching the user: factual grounding verification, PII redaction, toxicity scoring, and format validation. If any check fails, the response is regenerated or blocked. Defense in depth.",
        pattern: "Output Guardrails",
        nodes: ["User Input", "Input Gate", "Injection Detector", "PII Scanner", "Policy Classifier", "LLM", "System Prompt", "Output Gate", "Fact Checker", "PII Redactor"],
        edges: [
          ["User Input", "Input Gate"],
          ["Input Gate", "Injection Detector"],
          ["Input Gate", "PII Scanner"],
          ["Input Gate", "Policy Classifier"],
          ["Input Gate", "LLM"],
          ["System Prompt", "LLM"],
          ["LLM", "Output Gate"],
          ["Output Gate", "Fact Checker"],
          ["Output Gate", "PII Redactor"],
        ],
      },
      {
        title: "Audit trail & human escalation",
        explanation:
          "Every interaction is logged immutably with full context for compliance audits. Low-confidence or flagged responses are escalated to human reviewers. The system maintains a feedback loop to improve guardrails over time.",
        pattern: "Audit Logging & Human-in-the-Loop",
        nodes: ["User Input", "Input Gate", "Injection Detector", "PII Scanner", "Policy Classifier", "LLM", "System Prompt", "Output Gate", "Fact Checker", "PII Redactor", "Audit Log", "Human Review", "User"],
        edges: [
          ["User Input", "Input Gate"],
          ["Input Gate", "Injection Detector"],
          ["Input Gate", "PII Scanner"],
          ["Input Gate", "Policy Classifier"],
          ["Input Gate", "LLM"],
          ["System Prompt", "LLM"],
          ["LLM", "Output Gate"],
          ["Output Gate", "Fact Checker"],
          ["Output Gate", "PII Redactor"],
          ["Output Gate", "Audit Log"],
          ["Output Gate", "Human Review"],
          ["Output Gate", "User"],
        ],
      },
    ],
  },
];
