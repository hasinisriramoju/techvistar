import {
  Globe,
  TrendingUp,
  BookOpen,
  Cpu,
  Shield,
  Users,
  ClipboardCheck,
  DollarSign,
  Layers,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  FileSearch,
  Code2,
  Share2,
  Headset,
  Sparkles,
  Zap,
  Brain,
  Workflow,
  BarChart3,
  Rocket,
  Building,
  GraduationCap,
  CheckCircle2,
  ArrowUpRight,
  Target,
  Eye,
} from 'lucide-react';

import img1 from '../1.jpg';
import img2 from '../2.jpg';
import img3 from '../3.jpg';
import img4 from '../4.jpg';

/* ═══════════════════════════════════════════════════════════════
   SITE IDENTITY
═══════════════════════════════════════════════════════════════ */

export const SITE = {
  name: 'TechVistar',
  url: 'https://techvistar.com',
  tagline: 'Technology-first growth partner',
  description:
    'TechVistar is a technology-first growth partner: web systems, brand and digital presence, marketing instrumentation, automation, AI, and documentation—delivered with structured scope, measurable outcomes, and handover your team can operate.',
  email: 'support@techvistar.com',
  phone: '+91 9573157982',
  phoneTel: '+919573157982',
  location: 'Hyderabad, Telangana, India',
} as const;

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION — mega-menu structure
═══════════════════════════════════════════════════════════════ */

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Work', href: '/#projects' },
  { label: 'Talk', href: '/#contact' },
] as const;

export const NAV_STRUCTURE = {
  services: {
    label: 'Services',
    items: [
      {
        icon: Layers,
        title: 'Growth Stack Blueprint',
        description: 'End-to-end product foundations and release discipline',
        href: '/services/growth-stack-blueprint',
        color: '#8B9CF4',
      },
      {
        icon: Globe,
        title: 'Revenue Web Engine',
        description: 'High-trust conversion websites and analytics event setup',
        href: '/services/revenue-web-engine',
        color: '#22D3EE',
      },
      {
        icon: Workflow,
        title: 'Automate & Integrate',
        description: 'CRM integrations and workflow automation',
        href: '/services/automation',
        color: '#34D399',
      },
      {
        icon: TrendingUp,
        title: 'Brand & Growth Flywheel',
        description: 'Positioning, content, and pipeline programs',
        href: '/services/brand-growth',
        color: '#FB923C',
      },
      {
        icon: Brain,
        title: 'Applied AI & Decision Support',
        description: 'Applied AI, LLMs, and decision support',
        href: '/services/ai-development',
        color: '#6E7FEF',
      },
      {
        icon: BookOpen,
        title: 'Documentation & Research Desk',
        description: 'SRS, API docs, and academic programs',
        href: '/services/documentation',
        color: '#F472B6',
      },
    ],
  },
  company: {
    label: 'Company',
    items: [
      { title: 'About', description: 'Who we are and how we work', href: '/about' },
      { title: 'Process', description: 'Our VISTAR delivery framework', href: '/process' },
      { title: 'Work', description: 'Portfolio and case studies', href: '/work' },
    ],
  },
} as const;

/* ═══════════════════════════════════════════════════════════════
   HERO COPY
═══════════════════════════════════════════════════════════════ */

export const HERO_COPY = {
  badge: 'Systems Engineering · Hyderabad, India',
  headline: 'Technology-first',
  headlineAccent: 'Growth',
  headlineSuffix: 'Without the chaos.',
  tagline:
    'Engineering web, AI, and automation systems that transform business ambition into measurable growth.',
  ctaPrimary: 'Start a project',
  ctaSecondary: 'Explore services',
  cyclingWords: ['Web Systems', 'AI Solutions', 'Automation', 'Growth Stack', 'Applications'],
} as const;

/* ═══════════════════════════════════════════════════════════════
   STATS
═══════════════════════════════════════════════════════════════ */

export const TESTIMONIAL_AGGREGATE = [
  { value: '98%', label: 'On-time delivery' },
  { value: '60+', label: 'Engagements' },
  { value: '4.9/5', label: 'Satisfaction' },
] as const;

export const ABOUT_STATS = [
  { value: '2022', label: 'Founded' },
  { value: '60+', label: 'Engagements completed' },
  { value: '98%', label: 'On-time milestone delivery' },
  { value: '4.9/5', label: 'Post-project satisfaction' },
] as const;

/* ═══════════════════════════════════════════════════════════════
   TRUST BAR
═══════════════════════════════════════════════════════════════ */

export const TRUST_ITEMS = [
  'Startups', 'B2B SaaS', 'Ed-Tech', 'Fintech', 'Health-Tech',
  'Logistics', 'Manufacturing SMEs', 'Professional Services',
  'Academic Programs', 'Local Businesses', 'NGOs',
] as const;

/* ═══════════════════════════════════════════════════════════════
   SERVICES — core catalog
═══════════════════════════════════════════════════════════════ */

export const SERVICES = [
  {
    slug: 'growth-stack-blueprint',
    icon: Layers,
    color: '#8B9CF4',
    title: 'Growth Stack Blueprint',
    shortTitle: 'Growth Foundations',
    description:
      'End-to-end product foundations: web and mobile applications, APIs, and integrations—scoped as one coherent system so marketing, sales, and ops see the same data and release cadence.',
    deliverables: [
      'Roadmap & milestone plan',
      'Web / mobile / API delivery',
      'Environments & release discipline',
      'Acceptance & sign-off',
    ],
    technologies: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'Docker', 'APIs'],
    problems: [
      'Ambiguous development roadmaps',
      'Lack of environments and release discipline',
      'Disconnected web, mobile, and API systems',
      'Poor development-to-operations handover',
    ],
  },
  {
    slug: 'revenue-web-engine',
    icon: Globe,
    color: '#22D3EE',
    title: 'Revenue Web Engine',
    shortTitle: 'Revenue Web',
    description:
      'High-trust websites and conversion paths with analytics and goal design—so leadership sees demand, conversion, and channel truth, not vanity metrics.',
    deliverables: [
      'UX & performance baseline',
      'Measurement plan & events',
      'CRM / form integrations',
      'SEO & content structure',
    ],
    technologies: ['Next.js', 'TypeScript', 'HubSpot', 'GA4', 'TailwindCSS', 'Vercel'],
    problems: [
      'Website not converting visitors into leads',
      'No clear analytics or conversion tracking',
      'Slow, outdated, or hard-to-maintain codebase',
      'Poor mobile experience',
    ],
  },
  {
    slug: 'automation',
    icon: Workflow,
    color: '#34D399',
    title: 'Automate & Integrate',
    shortTitle: 'Automation',
    description:
      'Connect CRM, ops tools, and data flows; replace fragile spreadsheets with observable workflows, alerts, and audit-friendly handoffs between teams.',
    deliverables: [
      'Integration map & APIs',
      'Workflow automation',
      'Error handling & monitoring',
      'Runbooks for operators',
    ],
    technologies: ['n8n', 'Zapier', 'REST APIs', 'Python', 'Webhooks', 'PostgreSQL'],
    problems: [
      'Manual data entry between systems',
      'Fragile spreadsheet-driven operations',
      'No visibility into workflow errors',
      'Disconnected CRM and sales tools',
    ],
  },
  {
    slug: 'brand-growth',
    icon: TrendingUp,
    color: '#FB923C',
    title: 'Brand & Growth Flywheel',
    shortTitle: 'Brand & Growth',
    description:
      'Positioning, content, and campaigns wired to pipeline and reporting—consistent creative, measurable experiments, and clear ownership between marketing and sales.',
    deliverables: [
      'Messaging & asset system',
      'Organic & paid programs',
      'Funnel & attribution hygiene',
      'Reporting cadence',
    ],
    technologies: ['Google Analytics', 'HubSpot', 'Figma', 'Webflow', 'Mailchimp'],
    problems: [
      'Brand inconsistency across channels',
      'Marketing not tied to pipeline metrics',
      'No clear attribution for campaigns',
      'Content without clear audience alignment',
    ],
  },
  {
    slug: 'ai-development',
    icon: Brain,
    color: '#6E7FEF',
    title: 'Applied AI & Decision Support',
    shortTitle: 'AI Development',
    description:
      'Practical AI features—classification, assistants, retrieval—deployed with evaluation, guardrails, and governance suited to your data sensitivity and brand risk.',
    deliverables: [
      'Use-case & success metrics',
      'Model / RAG architecture',
      'Safety & evaluation harness',
      'Rollout & owner training',
    ],
    technologies: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI', 'PostgreSQL'],
    problems: [
      'Manual processes that should be automated',
      'Unstructured data that needs to be made useful',
      'Customer support bottlenecks',
      'Decision-making without data insights',
    ],
  },
  {
    slug: 'documentation',
    icon: BookOpen,
    color: '#F472B6',
    title: 'Documentation & Research Desk',
    shortTitle: 'Documentation',
    description:
      'SRS, architecture notes, API docs, and runbooks alongside the build; plus structured academic and research-adjacent support with reproducible artefacts where applicable.',
    deliverables: [
      'SRS & ADRs',
      'API & ops documentation',
      'Academic / capstone support',
      'Submission-ready packaging',
    ],
    technologies: ['Notion', 'Confluence', 'GitHub Wiki', 'Swagger', 'LaTeX'],
    problems: [
      'Knowledge locked in individuals, not systems',
      'Teams unable to operate systems post-handover',
      'Academic projects without proper documentation',
      'No audit trail for technical decisions',
    ],
  },
] as const;

export const SERVICE_GROUPS = [
  {
    title: 'Growth Foundations',
    services: [SERVICES[0], SERVICES[1]],
  },
  {
    title: 'Growth & Automation',
    services: [SERVICES[2], SERVICES[3]],
  },
  {
    title: 'Scale & Intelligence',
    services: [SERVICES[4]],
  },
] as const;

/* ═══════════════════════════════════════════════════════════════
   PROCESS
═══════════════════════════════════════════════════════════════ */

export const SECTION_PROCESS = {
  tag: 'Delivery process',
  title: 'Vision to results,',
  highlight: 'without guesswork',
  description:
    'A four-phase VISTAR-style framework: align on vision and insight, lock strategy and build, ship technology with integration discipline, then accelerate with support and measurable optimization.',
} as const;

export const PROCESS_PILLARS = ['Vision', 'Insight', 'Strategy', 'Results'] as const;

export const PROCESS_STEPS = [
  {
    step: '01',
    phase: 'Vision',
    title: 'Vision & Scope',
    description:
      'We align on goals, constraints, funnel truth, and success criteria—then produce a written scope, milestone plan, and risk register.',
    icon: FileSearch,
    deliverables: [
      'Scope, milestones, and assumptions in writing',
      'Risk register and dependency map',
      'Agreed demo, analytics, and reporting cadence',
    ] as const,
    duration: '1-2 weeks',
  },
  {
    step: '02',
    phase: 'Insight',
    title: 'Insight & Build',
    description:
      'Iterative delivery with demos, code review, and test evidence. You see product and metrics on a steady cadence—not a black box.',
    icon: Code2,
    deliverables: [
      'Incremental builds with review checkpoints',
      'Automated tests matched to critical paths',
      'Traceable backlog and release notes',
    ] as const,
    duration: 'Ongoing sprints',
  },
  {
    step: '03',
    phase: 'Strategy',
    title: 'Strategy & Integration',
    description:
      'Deployment to your environments, integrations with CRM and ops tools, runbooks, and knowledge transfer so your team can operate and extend what we ship.',
    icon: Share2,
    deliverables: [
      'Environment-specific deploy and rollback paths',
      'Integration tests and data contracts',
      'Handover sessions and documentation',
    ] as const,
    duration: '1-2 weeks',
  },
  {
    step: '04',
    phase: 'Results',
    title: 'Technology & Acceleration',
    description:
      'Post-launch fixes, enhancements, performance and cost tuning—with SLAs, escalation paths, and optimization tied to agreed KPIs.',
    icon: Headset,
    deliverables: [
      'Defined response times and escalation',
      'Triage for defects vs enhancements',
      'Ongoing performance, funnel, and cost visibility',
    ] as const,
    duration: 'Ongoing',
  },
] as const;

/* ═══════════════════════════════════════════════════════════════
   BENEFITS
═══════════════════════════════════════════════════════════════ */

export const BENEFITS = [
  {
    icon: Cpu,
    title: 'Engineering discipline',
    description:
      'Version control, environments that mirror production, and repeatable releases—so deploys are boring in the right way.',
  },
  {
    icon: Shield,
    title: 'Security & reliability',
    description:
      'Threat-aware design, sensible defaults, and testing matched to your risk profile, data sensitivity, and compliance needs.',
  },
  {
    icon: Users,
    title: 'Revenue alignment',
    description:
      'Shared truth on backlog, demos, funnel metrics, and documentation so sales, marketing, and product agree on what "done" means.',
  },
  {
    icon: ClipboardCheck,
    title: 'Quality & handover',
    description:
      'Test evidence, runbooks, and training so your internal team owns the system after go-live.',
  },
  {
    icon: DollarSign,
    title: 'Transparent commercial terms',
    description:
      'Effort-based or milestone billing with written assumptions—no surprise line items without prior approval.',
  },
  {
    icon: Layers,
    title: 'Full-stack continuity',
    description:
      'One partner for UI, APIs, data, automation, and docs reduces integration risk and speeds root-cause resolution.',
  },
] as const;

/* ═══════════════════════════════════════════════════════════════
   WORK / PORTFOLIO
═══════════════════════════════════════════════════════════════ */

export const WORK_PROJECTS = [
  {
    id: 'route-optimization',
    category: 'Automation',
    industry: 'Mobility & logistics',
    title: 'Navigation & Route Optimization',
    description:
      'End-to-end planning workflow for multi-stop routes under time windows, capacity, and road constraints: geocoded inputs, solver-backed optimization (cost / time / distance objectives), and operator review before dispatch. Includes map visualisation, exception handling for failed legs, and auditable run history for operations.',
    image: img1,
    outcome: 'Solver-backed route planning',
    stack: ['Python', 'Maps APIs', 'OR tooling', 'React'],
  },
  {
    id: 'eco-system',
    category: 'Web',
    industry: 'Data & sustainability',
    title: 'Eco_System — Environmental Intelligence',
    description:
      'Unified dashboard for environmental indicators and programme KPIs: ingestion from sensors and third-party feeds, role-based views for field vs management users, scheduled reports, and threshold-based alerts.',
    image: img2,
    outcome: 'Ingested sensor & KPI alerts',
    stack: ['APIs', 'PostgreSQL', 'ETL', 'Web'],
  },
  {
    id: 'crop-hub',
    category: 'AI',
    industry: 'Applied ML',
    title: 'Crop Hub — Crop Health Screening',
    description:
      'Image-based workflow for leaf uploads, model inference, and structured reporting for field teams—designed for clarity of results and auditability of predictions.',
    image: img3,
    outcome: 'Leaf image-based ML audit',
    stack: ['Python', 'TensorFlow', 'Flask', 'HTML/CSS'],
  },
  {
    id: 'sentiment-classification',
    category: 'AI',
    industry: 'NLP',
    title: 'Sentiment Classification Service',
    description:
      'Text-in / label-out service for opinion mining with reproducible training features, evaluation metrics, and a lightweight operator UI for batch runs.',
    image: img4,
    outcome: 'Reproducible sentiment ML',
    stack: ['Python', 'Streamlit', 'scikit-learn', 'TF-IDF'],
  },
  {
    id: 'resume-review',
    category: 'AI',
    industry: 'Productivity AI',
    title: 'Resume Review Assistant',
    description:
      'Guided scoring against role templates, ATS-oriented formatting checks, and actionable suggestions—keeping human review in the loop.',
    image: img3,
    outcome: 'Human-in-the-loop scoring',
    stack: ['Python', 'Streamlit', 'AI/LLM'],
  },
  {
    id: 'clinical-risk',
    category: 'AI',
    industry: 'Healthcare ML',
    title: 'Clinical Risk Scoring Prototype',
    description:
      'Interpretable ML pipeline with calibrated outputs and confidence bands, focused on safe presentation of assistive—not diagnostic—information.',
    image: img4,
    outcome: 'Calibrated Risk inference',
    stack: ['Python', 'Flask', 'ML', 'HTML/CSS'],
  },
  {
    id: 'ai-translator',
    category: 'AI',
    industry: 'NLP / GenAI',
    title: 'AI Translator',
    description:
      'Multilingual translation service with configurable engines (neural + optional LLM assist), customer glossary and "do-not-translate" lists, segment-level confidence, and a review queue for low-confidence spans.',
    image: img1,
    outcome: 'Neural & glossary lookup',
    stack: ['Python', 'LLM APIs', 'FastAPI', 'React'],
  },
  {
    id: 'ai-translator-documents',
    category: 'AI',
    industry: 'NLP / GenAI',
    title: 'AI Translator — Documents & Batches',
    description:
      'Long-form and high-volume translation pipeline: structured uploads (DOCX/PDF/HTML), layout-aware segmentation, translation memory reuse, and export that preserves headings, tables, and inline markup.',
    image: img2,
    outcome: 'Batch document segmenting',
    stack: ['Workers', 'DOCX/PDF', 'TM', 'Python'],
  },
  {
    id: 'finance-reporting',
    category: 'Web',
    industry: 'FinTech',
    title: 'Finance — Reporting & Analytics',
    description:
      'Role-based financial workspace: multi-entity P&L and balance views, period close checklists, drill-down to transactions, cashflow projections from configurable rules, and scheduled exports (CSV/PDF).',
    image: img3,
    outcome: 'Accounting drilldown & audit',
    stack: ['React', 'PostgreSQL', 'RBAC', 'Reporting'],
  },
] as const;

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════════ */

export const TESTIMONIALS = [
  {
    name: 'Surender G.',
    role: 'Founder',
    company: 'Early-stage product company',
    content:
      'TechVistar translated an ambiguous brief into a shippable mobile release. Written scope, demo cadence, and documentation made stakeholder alignment straightforward from sprint one to store submission.',
    rating: 5,
  },
  {
    name: 'Shailaja Swamy',
    role: 'Marketing Lead',
    company: 'B2B services firm',
    content:
      'Our web rebuild and analytics instrumentation finally gave leadership a clear view of conversion paths. Communication was crisp, milestones landed on time, and handover did not leave us dependent on tacit knowledge.',
    rating: 5,
  },
  {
    name: 'Pavan Reddy',
    role: 'Graduate student',
    company: 'Engineering programme',
    content:
      'Structured support on my capstone—from problem statement through implementation and final report—meant I could defend the work with evidence, not slides alone.',
    rating: 5,
  },
  {
    name: 'Rajesh G.',
    role: 'Owner',
    company: 'Local services business',
    content:
      'A pragmatic site and enquiry funnel our front desk can update without calling a developer. Training and written handover matched what we were promised at kickoff.',
    rating: 5,
  },
  {
    name: 'Ananya Krishnan',
    role: 'Product Manager',
    company: 'Health-tech SaaS',
    content:
      'They integrated with our existing backlog and release train instead of inventing a parallel process. API work, QA notes, and release checklists were audit-ready for our ISO prep.',
    rating: 5,
  },
  {
    name: 'Vikram S.',
    role: 'CTO',
    company: 'Logistics scale-up',
    content:
      'We needed a partner who could read our runbooks and improve them. Delivery included environment-specific deploy paths and rollback steps—not just "it works on my machine."',
    rating: 5,
  },
  {
    name: 'Meera Iyer',
    role: 'Operations Director',
    company: 'Professional services group',
    content:
      'Internal tooling for approvals and reporting replaced a fragile spreadsheet stack. Change requests were quoted before build, which kept finance and IT aligned.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Engineering Lead',
    company: 'Fintech team',
    content:
      'Security expectations were taken seriously from day one: threat modeling notes, test evidence for critical paths, and sensible secrets handling. Rare in mid-size vendor engagements.',
    rating: 5,
  },
  {
    name: 'Deepa N.',
    role: 'Programme Head',
    company: 'Ed-tech nonprofit',
    content:
      'Content workflows and a modest LMS integration shipped on the agreed date for our intake cycle. Their documentation made volunteer developers productive within a week.',
    rating: 5,
  },
  {
    name: 'Karthik M.',
    role: 'IT Manager',
    company: 'Manufacturing SME',
    content:
      'Vendor onboarding and SSO were painful internally; TechVistar adapted to our IdP constraints and produced integration notes our infra team could sign off without rework.',
    rating: 5,
  },
] as const;

/* ═══════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════ */

export const ABOUT_COPY = {
  tag: 'About us',
  subtitle:
    'A technology-first growth partner: we connect engineering, marketing operations, and automation so digital investments produce pipeline, efficiency, and clarity—not one-off deliverables.',
  summary:
    'We are a Hyderabad-based team partnering with startups, SMEs, and institutions to ship digital products and operating systems. Engagements are scoped in writing, demonstrated on a steady cadence, and signed off with documentation your stakeholders can audit.',
  mission: {
    title: 'Mission',
    text: 'Deliver secure, maintainable technology and clear guidance so every investment in digital, data, and AI is understandable, measurable, and ownable by your organization.',
  },
  vision: {
    title: 'Vision',
    text: 'Be the partner teams call when they need accountable delivery across applications, automation, and growth—not disconnected campaigns or undocumented handoffs.',
  },
  locationLine: 'Hyderabad, Telangana, India',
  closing:
    'We favour clarity, knowledge transfer, and steady communication over heroics, vanity metrics, and tacit-only knowledge.',
} as const;

export const ABOUT_PAGE = {
  hero: {
    eyebrow: 'Company',
    title: 'About TechVistar',
    lead: 'TechVistar is a technology-first growth partner. We help organizations design and run digital systems—web, brand presence, marketing instrumentation, automation, AI, and documentation—with the discipline of a product team and the language of business outcomes.',
  },
  overview: {
    title: 'Who we are',
    paragraphs: [
      'We are a Hyderabad-based team partnering with startups, SMEs, and institutions to ship digital products and operating systems. Engagements are scoped in writing, demonstrated on a steady cadence, and signed off with documentation your stakeholders can audit.',
      'Across engagements we align engineering, marketing operations, and data reality: security and testing expectations, funnel truth, stakeholder review cycles, and handover artefacts are agreed in writing—not assumed. That keeps delivery predictable for your teams and credible for leadership.',
    ] as const,
  },
  focusAreas: [
    {
      icon: Globe,
      title: 'Product & Platforms',
      description: 'Customer-facing and internal applications, APIs, and integrations—scoped with milestones, demos, acceptance criteria, and release discipline.',
    },
    {
      icon: BarChart3,
      title: 'Revenue Web & Conversion',
      description: 'High-trust web experiences with analytics and goal design so marketing and sales see the same truth about demand and conversion.',
    },
    {
      icon: TrendingUp,
      title: 'Brand, Content & Growth',
      description: 'Positioning and assets that stay consistent across channels—paired to measurable goals, not activity for its own sake.',
    },
    {
      icon: Workflow,
      title: 'Automation & Integration',
      description: 'Connect CRM, ops tools, and data flows; reduce manual work, errors, and "spreadsheet risk" with observable workflows.',
    },
    {
      icon: Brain,
      title: 'Applied AI & Decision Support',
      description: 'Practical AI features—classification, assistants, retrieval—deployed with evaluation, guardrails, and governance appropriate to your risk profile.',
    },
    {
      icon: BookOpen,
      title: 'Documentation & Research',
      description: 'SRS and runbooks alongside builds; structured academic and research-adjacent support with reproducible artefacts where applicable.',
    },
  ] as const,
  principles: [
    'Scope, assumptions, and exclusions are captured before build-heavy work begins; changes flow through an agreed change path.',
    'You see working software and measurable signals on a predictable rhythm—no surprise "big reveals" at the deadline.',
    'Security, testing, and observability match the sensitivity of your data, brand, and deployment environment.',
    'Handover includes what your team needs to operate and extend the system: docs, access patterns, training, and transition checkpoints.',
  ] as const,
  principlesIntro:
    'These principles show up in statements of work, demo agendas, analytics reviews, and sign-off—so delivery stays understandable at every stage.',
} as const;

/* ═══════════════════════════════════════════════════════════════
   INTERNSHIP PROGRAM
═══════════════════════════════════════════════════════════════ */

export const INTERNSHIP_PROGRAM = {
  eyebrow: 'Professional program · Limited seats',
  title: '3-Month AI & Python',
  titleAccent: 'Program',
  subtitle:
    'A structured, twelve-week pathway from Python fundamentals through applied AI and generative systems—delivered with weekly learning outcomes, guided practice, and a capstone project suitable for your portfolio.',
  summaryStats: [
    { label: 'Duration', value: '3 months' },
    { label: 'Curriculum', value: '12 weeks' },
    { label: 'Daily cadence', value: '~1 hour' },
    { label: 'Format', value: 'Live + projects' },
  ],
  phases: [
    {
      key: 'phase-1',
      monthLabel: 'Month 1',
      title: 'Python Programming Foundation',
      weeks: [
        { label: 'Week 1', detail: 'Python setup, variables, and data types' },
        { label: 'Week 2', detail: 'Input handling and operators' },
        { label: 'Week 3', detail: 'Control flow statements' },
        { label: 'Week 4', detail: 'Functions and parameters' },
      ],
    },
    {
      key: 'phase-2',
      monthLabel: 'Month 2',
      title: 'Advanced Python & OOP',
      weeks: [
        { label: 'Week 5', detail: 'Classes, methods, and modules' },
        { label: 'Week 6', detail: 'Object-oriented programming concepts' },
        { label: 'Week 7', detail: 'File handling and exception handling' },
        { label: 'Week 8', detail: 'Introduction to Artificial Intelligence' },
      ],
    },
    {
      key: 'phase-3',
      monthLabel: 'Month 3',
      title: 'Generative AI & Final Project',
      weeks: [
        { label: 'Week 9', detail: 'Large Language Models (LLMs) and RAG' },
        { label: 'Week 10', detail: 'Transformers, embeddings, and vector databases' },
        { label: 'Week 11', detail: 'Fine-tuning and prompt engineering' },
        { label: 'Week 12', detail: 'Final industry-level project development' },
      ],
    },
  ],
  highlights: [
    '1 hour daily structured training',
    'Guest lectures on alternate weeks',
    'Program certificate on completion',
    'Real-time project experience',
  ],
  audience: [
    'B.Tech / degree students',
    'Diploma students',
    'Final-year students',
    'Beginners interested in AI',
    'Job seekers switching to tech',
  ],
  faqs: [
    {
      q: 'Do I need prior programming experience?',
      a: 'No. The program starts from the very basics of Python setup and data types. Complete beginners are welcome.',
    },
    {
      q: 'What is the daily time commitment?',
      a: 'Approximately 1 hour per day of structured training, plus practice time. The curriculum is designed to fit alongside college or work schedules.',
    },
    {
      q: 'Will I get a certificate?',
      a: 'Yes. Participants who complete all 12 weeks and the capstone project receive a program certificate from TechVistar.',
    },
    {
      q: 'What happens after the program?',
      a: 'Graduates receive a portfolio-ready capstone project, a completion certificate, and access to our alumni network for continued learning and opportunities.',
    },
    {
      q: 'How do I register?',
      a: 'Call or WhatsApp us at +91 9573157982, or email support@techvistar.com. Seats are limited per batch.',
    },
  ],
  cta: {
    urgent: 'Limited seats available — register now',
    phoneDisplay: '+91 9573157982',
    phoneTel: '+919573157982',
    website: 'https://www.techvistar.com',
  },
} as const;

/* ═══════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════ */

export const CONTACT_INFO = [
  { icon: MapPin, title: 'Office', details: 'Hyderabad, Telangana, India' },
  { icon: Mail, title: 'Business inquiries', details: 'support@techvistar.com' },
  { icon: Phone, title: 'Phone', details: '+91 9573157982' },
] as const;

export const SECTION_CONTACT = {
  tag: '',
  title: 'Start a',
  highlight: 'growth conversation',
  description:
    'Share goals, timeline, budget band, and constraints. We reply with clarifying questions, a suggested approach, and—where appropriate—a proposal or statement of work aligned to measurable outcomes.',
} as const;

export const CONTACT_SIDEBAR = {
  title: 'Business & project inquiries',
  lead: 'For RFPs, vendor onboarding, or kickoff, use the form. We route messages to the right practice lead within one business day.',
  slaTitle: 'First response',
  slaBody:
    'We acknowledge new business inquiries within one business day (IST). For urgent production issues from existing clients, please call and reference your engagement ID.',
} as const;

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */

export const FOOTER_DESCRIPTION =
  'TechVistar is a technology-first growth partner: web and mobile systems, brand and digital presence, automation, applied AI, and documentation—structured delivery, clear communication, and handover your team can operate.';

export const FOOTER_LINKS = {
  services: [
    { label: 'Growth Stack Blueprint', href: '/services/growth-stack-blueprint' },
    { label: 'Revenue Web Engine', href: '/services/revenue-web-engine' },
    { label: 'Automate & Integrate', href: '/services/automation' },
    { label: 'Brand & Growth Flywheel', href: '/services/brand-growth' },
    { label: 'Applied AI & Decision Support', href: '/services/ai-development' },
    { label: 'Documentation & Research Desk', href: '/services/documentation' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Process', href: '/process' },
    { label: 'Work', href: '/work' },
    { label: 'Contact', href: '/contact' },
  ],
  social: [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/techvistar', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/tech_vistar?igsh=MThpMTJnZ2ZlcWVvcw==', label: 'Instagram' },
    { icon: Mail, href: 'mailto:support@techvistar.com', label: 'Email' },
  ],
} as const;

/* ═══════════════════════════════════════════════════════════════
   SECTION COPY (legacy compat)
═══════════════════════════════════════════════════════════════ */

export const SECTION_SERVICES = {
  tag: '',
  title: 'Productized growth',
  highlight: 'you can scope and measure',
  description:
    'Six offers—from full-stack delivery to automation and applied AI—each with defined outcomes, written assumptions, and handover your team can run.',
  cta: 'Request a scoped proposal or SOW discussion',
} as const;

export const SECTION_BENEFITS = {
  tag: '',
  title: 'Why teams choose',
  highlight: 'technology-first growth',
  description:
    'Clear scope, disciplined engineering, marketing and ops alignment, and communication leadership can audit—so pipeline, efficiency, and delivery stay aligned.',
} as const;

export const SECTION_PROJECTS = {
  tag: '',
  title: 'Representative work',
  highlight: 'across stacks',
  description:
    'Samples span routing, NLP/ML, finance, and internal tooling—illustrative of how we scope, integrate, and hand over production-minded software.',
} as const;

export const SECTION_TESTIMONIALS = {
  tag: 'Client references',
  title: 'What leaders and teams',
  highlight: 'say about delivery',
  description:
    'Post-engagement feedback from product, engineering, operations, and academic clients.',
} as const;

export const INTERNSHIP_MARQUEE_SEGMENTS = [
  'New batch open — 3-Month AI & Python Program',
  'Limited seats — register now',
  '1 hour daily training · Guest lectures · Certificate · Real-time projects',
  'Call +91 9573157982 · techvistar.com',
] as const;
