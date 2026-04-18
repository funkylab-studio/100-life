export interface Episode {
  number: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeLive?: boolean;
  duration: string;
  date: string;
  image?: string;
  embed: string;
  height?: number;
}

export interface Series {
  roman: string;
  tag: string;
  title: string;
  desc: string;
}

export interface Platform {
  name: string;
  latin: string;
  url: string;
}

export interface SiteContent {
  lastUpdate: string;
  status: string;
  ctaUrl: string;
  marquee: string;
  coverImage: string;
  coverCaption: string;
  intro: {
    zhLead: string;
    zhDetail: string;
    enSupport: string;
  };
  stats: {
    totalEpisodes: string;
  };
  episodes: Episode[];
  upcoming: Series[];
  platforms: Platform[];
  bigCta: {
    zhTitle: string;
    enTitle: string;
    zhBody: string;
    enBody: string;
    buttonLabel: string;
  };
}
