import type { SVGProps } from "react";

/** A small, consistent line-icon set (1.5px stroke, 24px grid). */
type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Icon>
);

export const ArrowUpRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
);

export const Play = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" stroke="none" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </Icon>
);

export const ChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const Plus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const Search = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 8h16M4 16h16" />
  </Icon>
);

export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const VideoLesson = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m10.5 9.5 4 2.5-4 2.5v-5Z" />
  </Icon>
);

export const QuizLesson = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
    <path d="M9.5 9.2a2.5 2.5 0 1 1 3.2 2.4c-.5.2-.7.6-.7 1.1v.4M12 16.5h.01" />
  </Icon>
);

export const CardsLesson = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="7.5" width="13" height="12" rx="2" />
    <path d="M7.5 4.5h11a2 2 0 0 1 2 2v9" />
  </Icon>
);

export const Clock = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Icon>
);

export const Infinity = (p: IconProps) => (
  <Icon {...p}>
    <path d="M18.2 8.2c2.4 0 3.8 1.7 3.8 3.8s-1.4 3.8-3.8 3.8C14.5 15.8 9.5 8.2 5.8 8.2 3.4 8.2 2 9.9 2 12s1.4 3.8 3.8 3.8c3.7 0 8.7-7.6 12.4-7.6Z" />
  </Icon>
);

export const Refund = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 9h11.5a4.5 4.5 0 0 1 0 9H9" />
    <path d="m8 5-4 4 4 4" />
  </Icon>
);

export const Certificate = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="9.5" r="5" />
    <path d="m9 13.8-1.5 6.7L12 18l4.5 2.5-1.5-6.7" />
  </Icon>
);

export const Level = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 19v-5M12 19V9M19 19V5" />
  </Icon>
);

export const Language = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5Z" />
  </Icon>
);

export const MapPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10" r="2.3" />
  </Icon>
);

export const Phone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  </Icon>
);

export const Mail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Icon>
);

export const Lock = (p: IconProps) => (
  <Icon {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </Icon>
);
