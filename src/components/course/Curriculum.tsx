"use client";

import { useState } from "react";
import type { Section } from "@/lib/catalog";
import { formatDuration, lessonTypeLabel, plural } from "@/lib/format";
import { Disclosure } from "@/components/ui/Disclosure";
import { Play } from "@/components/ui/Icons";
import { openPreview } from "@/components/course/PreviewDialog";

/**
 * The syllabus as an academic outline: numbered parts in display type, each
 * opening onto its lessons with type and length. Free previews play in place.
 */
export function Curriculum({ sections: allSections, totalSeconds }: { sections: Section[]; totalSeconds: number }) {
  // A section with no lessons has nothing to open; leave it out of the outline.
  const sections = allSections.filter((s) => s.lessons.length > 0);
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
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-5">
        <p className="text-[0.875rem] text-muted">{[plural(sections.length, "section"), plural(lessonCount, "lesson"), total].filter(Boolean).join(" · ")}</p>
        {sections.length > 1 && (
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(sections.map((s) => s.id)))}
            className="link-quiet py-1 text-[0.875rem] font-semibold text-ink"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        )}
      </div>

      <ol>
        {sections.map((section, index) => {
          const sectionSeconds = section.lessons.reduce((n, l) => n + l.durationSeconds, 0);
          const sectionMeta = [plural(section.lessons.length, "lesson"), formatDuration(sectionSeconds)].filter(Boolean).join(" · ");
          return (
            <li key={section.id}>
              <Disclosure
                open={open.has(section.id)}
                onToggle={() => toggle(section.id)}
                summary={
                  <span className="grid grid-cols-[3rem_1fr] items-baseline gap-x-4 sm:grid-cols-[4.5rem_1fr]">
                    <span className="font-display text-[1.5rem] leading-none tabular-nums text-accent sm:text-[1.875rem]">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-display text-h4 text-ink">{section.title}</span>
                      <span className="mt-1.5 block text-[0.8125rem] text-muted">{sectionMeta}</span>
                    </span>
                  </span>
                }
                panelClassName="sm:pl-[5.5rem]"
              >
                <ol className="border-t border-line">
                  {section.lessons.map((lesson, li) => {
                    const previewAssetId = lesson.previewAssetId;
                    const duration = formatDuration(lesson.durationSeconds);
                    return (
                      <li key={lesson.id} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 gap-y-1.5 border-b border-line py-4 last:border-b-0 sm:flex sm:gap-x-5">
                        <span className="w-8 shrink-0 text-[0.8125rem] tabular-nums text-muted">
                          {index + 1}.{li + 1}
                        </span>
                        <span className="min-w-0 flex-1 text-[0.9375rem] leading-snug text-ink">{lesson.title}</span>
                        <span className="col-start-2 flex shrink-0 items-baseline gap-5 text-[0.8125rem] text-muted">
                          {previewAssetId ? (
                            <button
                              type="button"
                              onClick={() => openPreview({ id: lesson.id, title: lesson.title, previewAssetId })}
                              className="group -my-1.5 inline-flex items-center gap-1.5 py-1.5 font-semibold text-accent"
                            >
                              <Play className="size-3" />
                              <span className="link-line">Watch free</span>
                              <span className="sr-only">: {lesson.title}</span>
                            </button>
                          ) : (
                            lesson.isFreePreview && <span className="text-accent">Preview</span>
                          )}
                          <span>{lessonTypeLabel(lesson.type)}</span>
                          {duration && <span className="tabular-nums sm:w-12 sm:text-right">{duration}</span>}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </Disclosure>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
