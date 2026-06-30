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
      style={{ backgroundColor: "#E1EBF0" }}
    >
      <div className="container-custom relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#6CD99C]">
            {SECTION_PROJECTS.tag}
          </p>
          <h2
            id="projects-heading"
            className="mx-auto mb-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-[#13263A] sm:text-5xl"
          >
            {SECTION_PROJECTS.title}{'\u0020'}
            <span className="text-[#6CD99C]">{SECTION_PROJECTS.highlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#475569]">
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
                      className="group h-full flex flex-col overflow-hidden rounded-2xl transition-all duration-300"
                      style={{
                        background: "#f4f6f8ff",
                        border: "1px solid #C9D7E3",
                        boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          "rgba(108,217,156,0.30)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          "#223547";
                      }}
                    >
                      <div
                        className="relative h-48 overflow-hidden"
                        style={{ borderBottom: "1px solid #D6E2EA" }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-5 space-y-3 pb-2">
                        {/* Category tag */}
                        <span
                          className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                          style={{
                            background: "rgba(108,217,156,0.12)",
                            color: "#13263A",
                            border: "1px solid rgba(108,217,156,0.35)",
                          }}
                        >
                          {project.category}
                        </span>
                        <h3 className="font-display text-xl font-bold text-[#13263A] leading-snug">
                          {project.title}
                        </h3>
                        <p
                          className="text-base leading-relaxed line-clamp-[6]"
                          style={{ color: '#475569' }}
                        >
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-col flex-grow px-5 pb-5 pt-0">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 rounded-md text-xs font-medium"
                              style={{
  background: 'rgba(108,217,156,0.10)',
  color: '#6CD99C',
  border: '1px solid #C6EAD9'
}}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span
                              className="px-2 py-1 rounded-md text-xs font-medium"
                              style={{
  background: '#F3F6F8',
  color: '#64748B',
  border: '1px solid #D6E2EA'
}}
                            >
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-3 mt-auto">
                          <a
                            href={
                              project.liveUrl !== "#"
                                ? project.liveUrl
                                : undefined
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                              project.liveUrl === "#"
                                ? "cursor-not-allowed opacity-40"
                                : ""
                            }`}
                            style={{
  background: '#FFFFFF',
  border: '1px solid #031021ff',
  color: '#05090eff'
}}
                            onClick={(e) =>
                              project.liveUrl === "#" && e.preventDefault()
                            }
                          >
                            <ExternalLink className="w-4 h-4" />
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
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                              project.githubUrl === "#"
                                ? "cursor-not-allowed opacity-40"
                                : ""
                            }`}
                           style={{
  background: '#FFFFFF',
  border: '1px solid #000204ff',
  color: '#334155'
}}
                            onClick={(e) =>
                              project.githubUrl === "#" && e.preventDefault()
                            }
                          >
                            <Github className="w-4 h-4" />
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
  className="-left-4 text-white/70 hover:text-[#80E4AA] transition-colors"
  style={{
    background: '#13263A',
    border: '1px solid #1E3A56',
  }}
/>
              <CarouselNext
                className="-right-4 text-white/70 hover:text-[#6CD99C] transition-colors"
                style={{ background: "#15222E", border: "1px solid #223547" }}
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
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#6CD99C' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#80E4AA';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#6CD99C";
            }}
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
          position: 'absolute',
          bottom: 0,
          left: '5%',
          right: '5%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(19,38,58,0.14) 20%, rgba(19,38,58,0.14) 80%, transparent)',
        }}
      />
    </SiteSection>
  );
};