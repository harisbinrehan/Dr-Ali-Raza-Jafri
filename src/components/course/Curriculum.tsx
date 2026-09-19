"use client";

import { useState } from "react";
import type { Section } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { formatDuration, lessonTypeLabel, plural } from "@/lib/format";
import { Disclosure } from "@/components/ui/Disclosure";
import { CardsLesson, Play, QuizLesson, VideoLesson } from "@/components/ui/Icons";
import { openPreview } from "@/components/course/PreviewDialog";

function LessonIcon({ type, className }: { type: string; className?: string }) {
  if (type === "QUIZ") return <QuizLesson className={className} />;
  if (type === "FLASHCARDS") return <CardsLesson className={className} />;
  return <VideoLesson className={className} />;
}

export function Curriculum({ sections, totalSeconds }: { sections: Section[]; totalSeconds: number }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(sections[0] ? [sections[0].id] : []));
  const lessonCount = sections.reduce((n, s) => n + s.lessons.length, 0);
  const allOpen = open.size === sections.length;
  const total = formatDuration(totalSeconds);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
          {[plural(sections.length, "section"), plural(lessonCount, "lesson"), total].filter(Boolean).join(" · ")}
        </p>
        {sections.length > 1 && (
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(sections.map((s) => s.id)))}
            className="py-2 text-sm font-medium text-accent-deep underline decoration-accent-deep/30 underline-offset-4 hover:decoration-accent-deep"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        )}
      </div>

      <ol className="mt-6 border-t border-line">
        {sections.map((section, index) => {
          const sectionSeconds = section.lessons.reduce((n, l) => n + l.durationSeconds, 0);
          return (
            <li key={section.id}>
              <Disclosure
                open={open.has(section.id)}
                onToggle={() => toggle(section.id)}
                summary={
                  <span className="flex items-baseline gap-4">
                    <span className="w-6 shrink-0 font-mono text-xs tabular-nums text-accent-deep">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[1.3125rem] leading-snug sm:text-[1.4375rem]">{section.title}</span>
                  </span>
                }
                meta={
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {[plural(section.lessons.length, "lesson"), formatDuration(sectionSeconds)].filter(Boolean).join(" · ")}
                  </span>
                }
                panelClassName="pb-5 sm:pl-10"
              >
                <ul className="divide-y divide-line/70 rounded-md border border-line bg-card">
                  {section.lessons.map((lesson) => {
                    const previewAssetId = lesson.previewAssetId;
                    const duration = formatDuration(lesson.durationSeconds);
                    const content = (
                      <>
                        <LessonIcon type={lesson.type} className={cn("size-[1.125rem] shrink-0", previewAssetId ? "text-accent-deep" : "text-muted")} />
                        <span className="min-w-0 flex-1 text-[0.9375rem] leading-snug text-ink/90">
                          {lesson.title}
                          <span className="sr-only"> ({lessonTypeLabel(lesson.type)})</span>
                        </span>
                        {lesson.isFreePreview && (
                          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-accent-deep">
                            {previewAssetId && <Play className="size-3" />}
                            {previewAssetId ? "Watch free" : "Preview"}
                          </span>
                        )}
                        {duration && <span className="w-12 shrink-0 text-right font-mono text-xs tabular-nums text-muted">{duration}</span>}
                      </>
                    );
                    return (
                      <li key={lesson.id}>
                        {previewAssetId ? (
                          <button
                            type="button"
                            onClick={() => openPreview({ id: lesson.id, title: lesson.title, previewAssetId })}
                            className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-accent-soft/40"
                          >
                            {content}
                          </button>
                        ) : (
                          <div className="flex items-center gap-3.5 px-4 py-3.5">{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Disclosure>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
