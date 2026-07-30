import { site } from './site';
import { socials } from './content';

/** Person + WebSite JSON-LD for rich results. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: site.url,
    address: { '@type': 'PostalAddress', addressCountry: 'NL' },
    sameAs: socials.filter((s) => /^https?:/.test(s.href)).map((s) => s.href),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${site.name}, Portfolio`,
    url: site.url,
  };
}
