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
