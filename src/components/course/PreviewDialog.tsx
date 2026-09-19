"use client";

import { useEffect, useRef, useState } from "react";
import { Close } from "@/components/ui/Icons";
import { endVideoSession } from "@/lib/enrolment";

export type PreviewLesson = { id: string; title: string; previewAssetId: string };

const EVENT = "academy:preview";

/** Opens the preview player from anywhere on the page (enrol card, curriculum rows). */
export function openPreview(lesson: PreviewLesson) {
  window.dispatchEvent(new CustomEvent<PreviewLesson>(EVENT, { detail: lesson }));
}

type Session = { sessionId: string; masterUrl: string; watermark?: string };

/**
 * Free-preview player. Uses the platform's own preview endpoint and streaming
 * (HLS, each segment authorised), so previews behave exactly as before.
 * hls.js is only downloaded when a preview is opened, and never on Safari,
 * which plays HLS natively.
 */
export function PreviewDialog({ courseTitle, lessons }: { courseTitle: string; lessons: PreviewLesson[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lesson, setLesson] = useState<PreviewLesson | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectLesson = (next: PreviewLesson) => {
    setSession(null);
    setError(null);
    setLesson(next);
  };

  useEffect(() => {
    const onOpen = (e: Event) => {
      selectLesson((e as CustomEvent<PreviewLesson>).detail);
      dialogRef.current?.showModal();
    };
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  // Start a preview session for the chosen lesson.
  useEffect(() => {
    if (!lesson) return;
    const controller = new AbortController();
    fetch(`/api/videos/${lesson.previewAssetId}/preview`, {
      method: "POST",
      headers: { Accept: "application/json" },
      credentials: "include",
      signal: controller.signal,
    })
      .then(async (res) => {
        const body = await res.json().catch(() => null);
        if (!res.ok) throw new Error(body?.error?.message ?? "This video could not be loaded.");
        setSession(body.data as Session);
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setError(err.message || "This video could not be loaded.");
      });
    return () => controller.abort();
  }, [lesson]);

  // End the session when it is replaced, the dialog closes or the page is left.
  useEffect(() => {
    if (!session) return;
    const end = () => endVideoSession(session.sessionId);
    window.addEventListener("pagehide", end);
    return () => {
      window.removeEventListener("pagehide", end);
      end();
    };
  }, [session]);

  // Attach the stream.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !session) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = session.masterUrl;
      return () => video.removeAttribute("src");
    }
    let destroyed = false;
    let hls: import("hls.js").default | null = null;
    import("hls.js").then(({ default: Hls }) => {
      if (destroyed) return;
      if (!Hls.isSupported()) {
        setError("This browser cannot play protected video. Try a recent Chrome, Firefox or Safari.");
        return;
      }
      hls = new Hls({ manifestLoadingMaxRetry: 2, levelLoadingMaxRetry: 2, fragLoadingMaxRetry: 3, maxBufferLength: 120 });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls?.startLoad();
        else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls?.recoverMediaError();
        else {
          setError("Playback stopped unexpectedly. Reload to try again.");
          hls?.destroy();
        }
      });
      hls.loadSource(session.masterUrl);
      hls.attachMedia(video);
    });
    return () => {
      destroyed = true;
      hls?.destroy();
    };
  }, [session]);

  const onClosed = () => {
    videoRef.current?.pause();
    setLesson(null);
    setSession(null);
  };
  const close = () => {
    dialogRef.current?.close();
    onClosed();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClosed}
      onClick={(e) => e.target === dialogRef.current && close()}
      aria-labelledby="preview-title"
      className="m-auto w-[min(68rem,calc(100vw-2rem))] max-w-none overflow-hidden bg-[#0a0b0d] p-0 text-[#ece7de]"
    >
      <div className="flex items-center gap-4 border-b border-white/10 px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="label text-[#7cc4b8]">Free preview · {courseTitle}</p>
          <h2 id="preview-title" className="mt-1.5 truncate font-display text-[1.375rem] leading-tight">
            {lesson?.title}
          </h2>
        </div>
        <button type="button" onClick={close} aria-label="Close preview" className="grid size-10 shrink-0 place-items-center text-white/70 transition-colors hover:text-white">
          <Close className="size-5" />
        </button>
      </div>

      <div className="relative aspect-video bg-black">
        {error ? (
          <p role="alert" className="absolute inset-0 grid place-items-center px-8 text-center text-sm text-white/75">
            {error}
          </p>
        ) : (
          <>
            {!session && lesson && (
              <p className="absolute inset-0 grid place-items-center text-sm text-white/60" role="status">
                Loading video…
              </p>
            )}
            {lesson && (
              <video
                ref={videoRef}
                className="size-full"
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                onError={() => session && setError("This video could not be loaded.")}
                title={lesson.title}
              />
            )}
            {session?.watermark && (
              <span aria-hidden="true" className="pointer-events-none absolute bottom-14 right-3 select-none rounded bg-black/30 px-1.5 py-0.5 text-[10px] tracking-wider tabular-nums text-white/40">
                {session.watermark}
              </span>
            )}
          </>
        )}
      </div>

      {lessons.length > 1 && (
        <nav aria-label="Other free previews" className="max-h-56 overflow-y-auto border-t border-white/10">
          <ul>
            {lessons.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => selectLesson(l)}
                  aria-current={l.id === lesson?.id ? "true" : undefined}
                  className="flex w-full items-center gap-3 border-b border-white/5 px-6 py-3.5 text-left text-sm text-white/70 transition-colors hover:text-white aria-[current=true]:text-[#7cc4b8]"
                >
                  <span aria-hidden="true" className="h-px w-3 shrink-0 bg-current" />
                  {l.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </dialog>
  );
}
