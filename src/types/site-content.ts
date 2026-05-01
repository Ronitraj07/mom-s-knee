/**
 * Strongly-typed shapes for every key stored in the `site_content` table.
 * Using these instead of `any` gives compile-time safety when reading/writing CMS data.
 */

export type HeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
};

export type MottoContent = {
  text: string;
};

export type AboutContent = {
  title: string;
  body: string;
};

export type SocialsContent = {
  instagram: string;
  facebook: string;
  tiktok: string;
  email: string;
};

export type ImagesContent = {
  hero: string;
  product: string;
  lifestyle: string;
};

/** Union of all possible value shapes in site_content */
export type SiteContentValue =
  | HeroContent
  | MottoContent
  | AboutContent
  | SocialsContent
  | ImagesContent
  | Record<string, string>; // fallback for future keys

/** Typed map returned by useSiteContent */
export type SiteContentMap = {
  hero?: HeroContent;
  motto?: MottoContent;
  about?: AboutContent;
  socials?: SocialsContent;
  images?: ImagesContent;
  [key: string]: Record<string, string> | undefined;
};
