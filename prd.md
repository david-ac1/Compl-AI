# Compl-AI: Autonomous Compliance Copilot for GitLab

## Project Description

**Compl-AI** is an autonomous, event-driven compliance agent flow built on the GitLab Duo Agent Platform that helps teams catch and fix compliance issues *before* code is merged or shipped.

While AI has dramatically accelerated code generation, compliance, security, and audit reviews remain slow, reactive, and stressful. Violations are often discovered after merges, during audits, or right before release—when fixes are expensive and morale is low.

Compl-AI shifts compliance **left** into the developer workflow. It reacts automatically when a Merge Request is opened or a pipeline completes, interprets an organization’s own compliance rules (SOC2, ISO, internal policies), analyzes the code and configuration changes, and produces a clear, human-readable compliance summary directly in GitLab.

Instead of legal jargon or opaque pass/fail checks, Compl-AI explains *what changed*, *why it matters*, and *how to fix it*. For critical violations, it can block merges, create follow-up issues, and attach audit-ready compliance reports—turning compliance from a late-stage blocker into an early, actionable signal.

Compl-AI is not a chatbot. It is a digital compliance teammate that observes events, reasons over context, and takes action inside real workflows.

---

# Product Requirements Document (PRD)

## 1. Problem Statement

Development teams increasingly rely on AI to write code quickly, but compliance processes have not kept pace. Current compliance checks are:

* Invisible until they block progress
* Discovered after merges or during audits
* Explained in legal or security language instead of developer-friendly terms
* Detached from day-to-day developer workflows

This results in delayed releases, audit stress, rework, and frustration between engineering, security, and compliance teams.

## 2. Goals

* Detect compliance risks **before merge and release**
* Translate compliance rules into **developer-readable guidance**
* Automate enforcement actions where appropriate
* Reduce audit preparation time and manual reviews
* Integrate seamlessly into existing GitLab workflows

## 3. Non-Goals

* Acting as a legal authority or replacing compliance professionals
* Automatically inventing or interpreting external laws
* Providing jurisdiction-wide legal guarantees

Compl-AI operates strictly on **organization-defined policies**.

## 4. Target Users

* Software engineers opening Merge Requests
* Tech leads and engineering managers
* Security and compliance teams
* DevOps and platform engineers

## 5. Triggers

Compl-AI activates on the following GitLab events:

* Merge Request opened or updated
* Pipeline completed

## 6. System Architecture Overview

Compl-AI is implemented as a **GitLab Flow** composed of three autonomous agents:

1. Policy Interpreter Agent
2. Diff Analyzer Agent
3. Compliance Reporter Agent

Each agent has a focused responsibility and communicates structured outputs to the next stage.

## 7. Agent Specifications

### 7.1 Policy Interpreter Agent

**Purpose**

* Convert organization-defined compliance rules into a structured, machine-readable policy map

**Inputs**

* Compliance policy files stored in the repository (YAML/Markdown)
* GitLab Wiki or designated policy directory

**Outputs**

* Structured policy schema defining:

  * Data sensitivity categories
  * Security requirements (e.g. encryption, access controls)
  * Deployment or residency constraints
  * Severity levels

---

### 7.2 Diff Analyzer Agent

**Purpose**

* Analyze Merge Request diffs and pipeline artifacts against interpreted policies

**Inputs**

* MR code diffs
* Infrastructure-as-code changes
* CI/CD configuration files
* Outputs from Policy Interpreter Agent

**Checks Include**

* Introduction of new data storage or data flows
* Changes affecting encryption or access control
* Use of external services or dependencies
* Configuration changes with compliance impact

**Outputs**

* List of policy-impacting changes
* Severity classification: informational, warning, critical
* Evidence references (file paths, line numbers)

---

### 7.3 Compliance Reporter Agent

**Purpose**

* Communicate findings clearly and take enforcement actions

**Actions**

* Post a human-readable compliance summary as a Merge Request comment
* Highlight compliant areas, risks, and blocking issues
* Suggest concrete remediation steps
* Generate a compliance report artifact for audit use
* Create GitLab issues for unresolved violations
* Block merge for critical violations (configurable)

**Output Style**

* Plain language
* No legal jargon
* Action-oriented guidance

## 8. User Experience

* Developers see compliance feedback directly in their MR
* No new dashboards or tools required
* Clear explanations tied to specific code changes
* Immediate feedback loop before merge

## 9. Success Metrics

* Reduction in post-merge compliance issues
* Faster audit preparation time
* Reduced number of manual compliance reviews
* Positive developer feedback on clarity and usability

## 10. Hackathon Scope (MVP)

For the hackathon submission, Compl-AI will:

* Support a limited set of example policies (e.g. encryption, data storage)
* Demonstrate MR-triggered analysis and reporting
* Show at least one automated enforcement action
* Produce a demo-ready compliance report artifact

## 11. Future Extensions

* Policy templates for common standards (SOC2, ISO 27001)
* Geographic data residency modules
* Sustainability and carbon-impact compliance checks
* Cross-repository compliance insights
* Organization-wide compliance dashboards

---

**Compl-AI turns compliance from a reactive burden into a proactive, developer-friendly workflow—without leaving GitLab.**