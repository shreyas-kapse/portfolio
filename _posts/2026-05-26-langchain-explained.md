---
category: AI
date: 2026-05-26
excerpt: LangChain Explained - Building LLM Applications the Right Way
layout: post
read_time: 4
subtitle: Understand langchain and core compoments of langchain, building blocks of langchain
tags: [AI, langchain, interviews]
title: LangChain Explained - Building LLM Applications the Right Way
---
# LangChain Explained: Building LLM Applications the Right Way

If you've been exploring the world of large language models, you've probably hit the same wall I did — raw API calls get messy fast. You need memory, retrieval, tool usage, dynamic prompts, and suddenly you're duct-taping everything together. That's exactly the problem **LangChain** was built to solve.

This post breaks down everything you need to know — from core concepts to advanced patterns like LCEL and RAG — based on my hands-on learning notes.

---

## What Is LangChain?

LangChain is an open-source framework for building LLM-powered applications. It gives you modular components and end-to-end tooling to build things like:

- Chatbots with memory
- Question-answering systems
- RAG (Retrieval-Augmented Generation) pipelines
- Autonomous agents

The core value prop: **model-agnostic development**. You write your business logic once, swap the underlying LLM, and it still works.

---

## Core Components

### 1. Models

LangChain standardizes how you talk to AI models. There are two types:

- **LLMs** — text in, text out. General-purpose generation.
- **Embedding Models** — text in, vector out. Used for semantic search and retrieval.

### 2. Prompts

Static strings are fine for demos. Real applications need dynamic, reusable prompts.

LangChain's `PromptTemplate` solves this. Why use it over a plain f-string?

- Built-in validation (catches missing placeholders)
- Reusable across the codebase
- Plays well with the rest of the LangChain ecosystem

You can also do **few-shot prompting** — show the model examples before asking your question, which significantly improves output quality on structured tasks.

**Message types** in chat models:
- `SystemMessage` — sets the assistant's persona/role
- `HumanMessage` — the user's input
- `AIMessage` — the model's response

### 3. Memory

Every LLM API call is stateless by default. Each request knows nothing about the previous one. Memory fixes this.

| Type | What it does |
|---|---|
| **Conversation Buffer Memory** | Stores full transcript. Simple, but grows large. Most commonly used. |
| **Buffer Window Memory** | Keeps only the last N interactions to control token usage. |
| **Summary Memory** | Periodically compresses older messages into summaries. |
| **Custom Memory** | Store arbitrary state — user preferences, key facts, session data. |

### 4. Indexes (External Knowledge)

This is the foundation of RAG. LangChain gives you a pipeline to connect your app to external documents:

1. **Document Loaders** — ingest PDFs, websites, databases
2. **Text Splitters** — chunk documents into manageable pieces
3. **Vector Stores** — store and search embeddings
4. **Retrievers** — fetch the most relevant chunks at query time

### 5. Agents

Agents are the next level: a chatbot with the ability to take actions on its own. They decide which tools to call, in what order, based on the user's query — without being hardcoded to a fixed flow.

---

## Temperature: Controlling Randomness

Temperature is a parameter you'll tune constantly.

- **Low (0.0–0.3)** → Deterministic, predictable. Good for factual tasks, structured output, code generation.
- **High (0.7–1.5)** → Creative, diverse, unpredictable. Good for brainstorming, creative writing.

At temperature `0`, you get the same output every time. As you increase it, outputs diverge.

---

## Structured Output

Sometimes you don't want a natural language response — you want JSON, a typed object, something another system can parse. LangChain handles this via **output parsers**, which work even with models that don't natively support structured output.

A pattern I use often: define a `TypedDict` to specify the exact keys and value types the model should return, then wire it into an output parser. Think of it like a schema — similar to defining a class in Java.

---

## Runnables and LCEL

This is where LangChain's architecture gets elegant.

Older LangChain used `Chain` objects — `LLMChain`, `SequentialChain`, `RouterChain`. They worked, but they were rigid, hard to compose, and awkward for parallel or async execution.

**Runnables** replaced all of that. Every component — prompt, LLM, parser, retriever, function — now implements the same interface:

```python
runnable.invoke(input)
runnable.batch([input1, input2])
runnable.stream(input)
```

Because they share a common interface, you can chain them together using the pipe operator (`|`). This is **LCEL** — LangChain Expression Language.

```python
chain = prompt | llm | output_parser
result = chain.invoke({"question": "What is RAG?"})
```

### Runnable Primitives

| Primitive | Purpose |
|---|---|
| `RunnableSequence` | Run steps in order, passing output to the next step |
| `RunnableParallel` | Run multiple steps on the same input simultaneously |
| `RunnablePassthrough` | Pass input through unchanged (useful for injecting context) |
| `RunnableLambda` | Wrap any Python function as a runnable (preprocessing, filtering, API calls) |
| `RunnableBranch` | Conditional routing — like if/else for your pipeline |

Think of runnables as LEGO blocks. Each piece has the same interface, so they compose cleanly into any shape your workflow needs.

---

## RAG: Retrieval-Augmented Generation

RAG is the pattern for giving an LLM access to your own documents without retraining it.

**Why RAG over fine-tuning?**
- Works with up-to-date information
- Better privacy — your data doesn't leave your infrastructure
- No token limit on document size (chunking handles this)
- No training cost or time

**The RAG pipeline:**

```
User Query
    ↓
Embed the query → search vector store
    ↓
Retrieve top-k relevant chunks
    ↓
Inject chunks into prompt context
    ↓
LLM generates a grounded answer
```

**Components you need:**
1. Document Loader → ingests your source
2. Text Splitter → chunks the document
3. Embedding Model → converts chunks to vectors
4. Vector Store → persists and indexes vectors
5. Retriever → finds relevant chunks at query time

**Semantic search** powers the retrieval step — your query is embedded into the same vector space as the documents, and the closest matches are returned.

---

## Open Source Models

You're not locked into OpenAI. The open-source ecosystem (hosted primarily on **Hugging Face**) gives you models you can download, fine-tune, and self-host without restrictions. LangChain supports these seamlessly — swap the model object and everything else stays the same.

---

## Putting It Together

LangChain's real power shows when you combine these pieces:

- A `PromptTemplate` that formats user input
- A `ChatOpenAI` (or local Ollama) model
- A `Retriever` pulling from a vector store
- A `RunnableParallel` that fetches documents and passes the question through simultaneously
- An output parser that formats the final answer

That's a production-grade RAG pipeline — and with LCEL, it's readable in under 20 lines.

---

## Takeaways

If you're building anything serious on top of LLMs:

1. Use **Runnables + LCEL** — not the old Chain classes
2. Use **PromptTemplates** — not raw f-strings
3. Add **Memory** if you need conversational context
4. Use **RAG** before reaching for fine-tuning
5. Think in **pipelines** — modular blocks you can swap, extend, and test independently

LangChain gives you the scaffolding. The architecture decisions are still yours.

---

*If you're working on LLM applications or have questions about any of these patterns, feel free to reach out.*