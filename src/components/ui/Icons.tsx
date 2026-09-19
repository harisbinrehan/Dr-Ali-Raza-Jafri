import type { SVGProps } from "react";

/** A small, consistent line-icon set (1.5px stroke, 24px grid). */
type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
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


export const Play = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" stroke="none" />
  </Icon>
);


export const ChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const ChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);


export const Search = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </Icon>
);


export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const Sun = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Icon>
);

export const Moon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 5h16M4 12h16M4 19h16" />
  </Icon>
);

export const Cart = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </Icon>
);

export const User = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

export const ListVideo = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 6h16M4 12h10M4 18h7" />
  </Icon>
);

export const Clock = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Icon>
);

export const BarChart = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 19v-9M12 19V5M19 19v-6" />
  </Icon>
);

export const Globe = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.3 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.3-3.8-8.5S9.5 5.8 12 3.5Z" />
  </Icon>
);

export const Award = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8.5" r="5" />
    <path d="M9 12.8 7.5 21l4.5-2.5 4.5 2.5-1.5-8.2" />
  </Icon>
);

export const InfinityIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 8.5a3.5 3.5 0 1 0 0 7c1.9 0 3.5-1.75 5-3.5s3.1-3.5 5-3.5a3.5 3.5 0 1 1 0 7c-1.9 0-3.5-1.75-5-3.5s-3.1-3.5-5-3.5Z" />
  </Icon>
);

export const Refresh = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
    <path d="M18 3v4h-4M6 21v-4h4" />
  </Icon>
);

export const Home = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6 9.8V19a1 1 0 0 0 1 1h3v-5.5h4V20h3a1 1 0 0 0 1-1V9.8" />
  </Icon>
);

export const BookOpen = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 6.5c-2-1.3-4.8-1.5-7.5-.7v12.7c2.7-.8 5.5-.6 7.5.7 2-1.3 4.8-1.5 7.5-.7V5.8c-2.7-.8-5.5-.6-7.5.7Z" />
    <path d="M12 6.5v12.7" />
  </Icon>
);
