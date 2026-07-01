import { motion, useReducedMotion } from "framer-motion";
import AutoScroll from "embla-carousel-auto-scroll";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { SiteSection } from "@/components/SiteSection";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SECTION_PROJECTS } from "@/lib/constants";
import img1 from "../1.jpg";
import img2 from "../2.jpg";
import img3 from "../3.jpg";
import img4 from "../4.jpg";

const PROJECTS = [
  {
    id: 1,
    title: "Navigation & route optimization",
    description:
      "End-to-end planning workflow for multi-stop routes under time windows, capacity, and road constraints: geocoded inputs, solver-backed optimization (cost / time / distance objectives), and operator review before dispatch. Includes map visualisation, exception handling for failed legs, and auditable run history for operations.",
    image: img1,
    category: "Mobility & logistics",
    technologies: ["Python", "Maps APIs", "OR tooling", "React"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Eco_System — environmental intelligence",
    description:
      "Unified dashboard for environmental indicators and programme KPIs: ingestion from sensors and third-party feeds, role-based views for field vs management users, scheduled reports, and threshold-based alerts.",
    image: img2,
    category: "Data & sustainability",
    technologies: ["APIs", "PostgreSQL", "ETL", "Web"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Crop Hub — crop health screening",
    description:
      "Image-based workflow for leaf uploads, model inference, and structured reporting for field teams—designed for clarity of results and auditability of predictions.",
    image: img3,
    category: "Applied ML",
    technologies: ["Python", "TensorFlow", "Flask", "HTML/CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Sentiment classification service",
    description:
      "Text-in / label-out service for opinion mining with reproducible training features, evaluation metrics, and a lightweight operator UI for batch runs.",
    image: img4,
    category: "NLP",
    technologies: ["Python", "Streamlit", "scikit-learn", "TF-IDF"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Resume review assistant",
    description:
      "Guided scoring against role templates, ATS-oriented formatting checks, and actionable suggestions—keeping human review in the loop.",
    image: img3,
    category: "Productivity AI",
    technologies: ["Python", "Streamlit", "AI/LLM"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Clinical risk scoring prototype",
    description:
      "Interpretable ML pipeline with calibrated outputs and confidence bands, focused on safe presentation of assistive—not diagnostic—information.",
    image: img4,
    category: "Healthcare ML",
    technologies: ["Python", "Flask", "ML", "HTML/CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 7,
    title: "AI Translator",
    description:
      'Multilingual translation service with configurable engines (neural + optional LLM assist), customer glossary and "do-not-translate" lists, segment-level confidence, and a review queue for low-confidence spans.',
    image: img1,
    category: "NLP / GenAI",
    technologies: ["Python", "LLM APIs", "FastAPI", "React"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 8,
    title: "AI Translator — documents & batches",
    description:
      "Long-form and high-volume translation pipeline: structured uploads (DOCX/PDF/HTML), layout-aware segmentation, translation memory reuse, and export that preserves headings, tables, and inline markup.",
    image: img2,
    category: "NLP / GenAI",
    technologies: ["Workers", "DOCX/PDF", "TM", "Python"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 9,
    title: "Finance — reporting & analytics",
    description:
      "Role-based financial workspace: multi-entity P&L and balance views, period close checklists, drill-down to transactions, cashflow projections from configurable rules, and scheduled exports (CSV/PDF).",
    image: img3,
    category: "FinTech",
    technologies: ["React", "PostgreSQL", "RBAC", "Reporting"],
    liveUrl: "#",
    githubUrl: "#",
  },
] as const;

export const ProjectsSection = () => {
  const { ref, isInView } = useAnimatedSection();
  const reduceMotion = useReducedMotion();

  const autoScrollPlugins = useMemo(
    () =>
      reduceMotion
        ? []
        : [
            AutoScroll({
              speed: 0.5,
              startDelay: 400,
              playOnInit: true,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
              stopOnFocusIn: false,
            }),
          ],
    [reduceMotion],
  );

  return (
    <SiteSection
      ref={ref}
      id="projects"
      variant="default"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden bg-background border-b border-border-subtle"
    >
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern-dark opacity-[0.15]" />

      <div className="container-custom relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {SECTION_PROJECTS.tag && (
            <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
              {SECTION_PROJECTS.tag}
            </p>
          )}
          <h2
            id="projects-heading"
            className="mx-auto mb-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
          >
            {SECTION_PROJECTS.title}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{SECTION_PROJECTS.highlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {SECTION_PROJECTS.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={autoScrollPlugins}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {PROJECTS.map((project, index) => (
                <CarouselItem
                  key={project.id}
                  className="pl-2 md:pl-4 basis-[88%] sm:basis-[75%] md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <div
                      className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-charcoal/40 hover:border-primary/45 transition-all duration-300 shadow-xl shadow-black/25"
                    >
                      <div
                        className="relative h-48 overflow-hidden border-b border-border-subtle/50"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                      </div>
                      <div className="p-5 space-y-3 pb-2 flex-grow">
                        {/* Category tag */}
                        <span
                          className="inline-block rounded px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20"
                        >
                          {project.category}
                        </span>
                        <h3 className="font-display text-lg font-bold text-white leading-snug">
                          {project.title}
                        </h3>
                        <p
                          className="text-xs leading-relaxed text-muted-foreground line-clamp-[5]"
                        >
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-col px-5 pb-5 pt-0">
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[10px] font-mono text-on-surface-variant bg-white/[0.03] border border-white/[0.06]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span
                              className="px-2 py-0.5 rounded text-[10px] font-mono text-muted-foreground bg-white/[0.02] border border-white/[0.04]"
                            >
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={
                              project.liveUrl !== "#"
                                ? project.liveUrl
                                : undefined
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                              project.liveUrl === "#"
                                ? "cursor-not-allowed opacity-40 bg-white/[0.04] text-muted-foreground border border-white/[0.06]"
                                : "bg-primary text-background hover:opacity-95"
                            }`}
                            onClick={(e) =>
                              project.liveUrl === "#" && e.preventDefault()
                            }
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Demo
                          </a>
                          <a
                            href={
                              project.githubUrl !== "#"
                                ? project.githubUrl
                                : undefined
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-border-subtle ${
                              project.githubUrl === "#"
                                ? "cursor-not-allowed opacity-40 bg-white/[0.04] text-muted-foreground"
                                : "bg-surface-charcoal text-white hover:bg-white/[0.04]"
                            }`}
                            onClick={(e) =>
                              project.githubUrl === "#" && e.preventDefault()
                            }
                          >
                            <Github className="w-3.5 h-3.5" />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious
                className="-left-4 text-white hover:text-primary transition-colors border-border-subtle bg-surface-charcoal/80"
              />
              <CarouselNext
                className="-right-4 text-white hover:text-primary transition-colors border-border-subtle bg-surface-charcoal/80"
              />
            </div>
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-12 text-center"
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors text-primary hover:text-primary-container"
          >
            Request a technical scoping call
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Section divider */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)",
        }}
      />
    </SiteSection>
  );
};
