// The Wall. award: '1st' → gold neon trophy · 'finalist' → gold medal · 'none' → grey bug.
export const HACKATHONS = [
  {
    slug: 'trialfind',
    name: 'TrialFind',
    hackathon: 'O1 Summit Hackathon',
    award: '1st',
    awardLabel: 'TinyFish Stack - 1st Place',
    logo3d: 'trialfind',
    github: 'https://github.com/Eshwar-R-97/TrialFindO1',
    description:
      'Automatically matches patients to recruiting clinical trials: it extracts a medical profile from a PDF, searches ClinicalTrials.gov, NCI, and Mayo Clinic in parallel, and scores compatibility with AI — results streamed in real time. React + Flask, Featherless AI for extraction, TinyFish browser automation, and Server-Sent Events.',
  },
  {
    slug: 'physical-ide',
    name: 'Physical-IDE',
    hackathon: 'Google I/O — Build with AI × Google Cloud Labs',
    award: 'finalist',
    awardLabel: 'Finalist',
    logo3d: 'physicalide',
    github: 'https://github.com/adilarya/Physical-IDE',
    description:
      'A real-time hardware verification system that catches breadboard wiring mistakes before power-on. A webcam feeds the Gemini Live API, which analyzes the circuit and gives immediate audio feedback; MediaPipe hand-detection triggers scans at the right moment. React + FastAPI over a single WebSocket.',
  },
  {
    slug: 'quorum',
    name: 'Quorum',
    hackathon: 'Agentic AI Hackathon — SF',
    award: 'none',
    logo3d: 'quorum',
    awardLabel: null,
    github: 'https://github.com/adilarya/Quorum',
    description:
      'A Slack agent that detects and resolves conflicting team decisions in real time — it spots contradictions in a channel and prompts the team to reconcile them, persisting decisions for later. Modular across Photon Spectrum (messaging), RocketRide (extraction), XTrace (memory), and Butterbase (backend), with swappable input providers.',
  },
  {
    slug: 'synapse',
    name: 'Synapse',
    hackathon: 'XTrace × Stanford — Build Agents That Remember',
    award: 'none',
    logo3d: 'synapse',
    awardLabel: null,
    github: 'https://github.com/adilarya/Synapse',
    description:
      'A shared-memory platform that lets AI agents from different providers (OpenAI, Claude) collaborate with consistent context. A unified memory layer (XTrace) ends the fragmented-context problem across tools; Next.js split-screen chat per agent, with memory search/ingest routes and an in-memory fallback.',
  },
  {
    slug: 'agentfirewall',
    name: 'AgentFirewall',
    hackathon: 'Production Agents — MCP Mini Hack',
    award: 'none',
    logo3d: 'agentfirewall',
    awardLabel: null,
    github: 'https://github.com/adilarya/AgentFirewall',
    description:
      'A runtime policy-enforcement layer that intercepts an LLM agent’s tool calls before they execute — allow, block, rewrite, or escalate — with full audit logging, sitting at the TrueFoundry MCP Gateway as the single egress point for downstream tools (Slack, Stripe). Next.js + TypeScript, shown with simulated scenarios and replay testing.',
  },
  {
    slug: 'baymax',
    name: 'Baymax',
    hackathon: 'CalHacks',
    award: 'none',
    logo3d: 'baymax',
    awardLabel: null,
    github: 'https://github.com/AdvaitaG/Calhacks',
    description:
      'A humanoid guide robot that safely walks a blindfolded person through the world — perceiving hazards, planning a path, and steering with gentle hand signals. A biologically-inspired multi-agent “nervous system” maps eight concurrent agents (vision, threat, spine, safety…) to brain regions, running a slow cortical planning path alongside a fast reflex path that bypasses deliberation for emergencies. Python on the Band multi-agent framework with LangGraph, Gemini 2.5 Flash, and LiveKit + OpenCV perception, driving a Booster T1 humanoid in Webots.',
  },
]
