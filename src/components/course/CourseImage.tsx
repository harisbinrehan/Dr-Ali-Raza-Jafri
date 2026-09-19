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
 * 16:9 course artwork. Thumbnails come from the platform; YouTube's 4:3
 * `hqdefault` frames are letterboxed, and cropping to 16:9 removes exactly the bars.
 */
export function CourseImage({ src, title, sizes, preload, className, imageClassName }: CourseImageProps) {
  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-md bg-ink-2", className)}>
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          preload={preload}
          fetchPriority={preload ? "high" : undefined}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center p-6 text-center font-display text-2xl text-white/80">
          {title}
        </div>
      )}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/8" />
    </div>
  );
}
