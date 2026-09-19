import Image from "next/image";
import { cn } from "@/lib/cn";

type CourseImageProps = {
  src: string | null;
  title: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  imageClassName?: string;
};

/**
 * 16:9 course artwork, square-cornered. Thumbnails come from the platform;
 * YouTube's 4:3 `hqdefault` frames are letterboxed, and a 16:9 crop removes
 * exactly the bars.
 */
export function CourseImage({ src, title, sizes, preload, className, imageClassName }: CourseImageProps) {
  return (
    <div className={cn("relative aspect-video overflow-hidden bg-canvas-alt", className)}>
      {src ? (
        <Image src={src} alt="" fill sizes={sizes} preload={preload} fetchPriority={preload ? "high" : undefined} className={cn("object-cover", imageClassName)} />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center p-6 text-center font-display text-2xl text-muted">
          {title}
        </div>
      )}
    </div>
  );
}
