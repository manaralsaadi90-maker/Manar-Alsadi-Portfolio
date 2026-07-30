/**
 * Global site configuration. Edit these values to update SEO,
 * navigation and the person behind the portfolio in one place.
 */
export const site = {
  name: 'Manar Alsadi',
  role: 'Product Marketing & Business Analyst',
  // Short bio used for SEO/meta descriptions.
  shortBio:
    'Product Marketing & Business Analyst with 11+ years across telecom, turning product, revenue and market data into clear, actionable recommendations. MBA-qualified, now based in the Netherlands.',
  // Longer hero subheadline shown under the animated headline.
  heroSubline:
    "Product Marketing & Business Analyst, MBA, 11 years across B2B & B2C. I connect data, customers and strategy, and I'm sharpening digital & UX skills at Fontys.",
  location: 'Eindhoven, Netherlands',
  // Where the person is open to working (shown in Contact).
  openTo: 'Open to roles in Eindhoven, Amsterdam & Rotterdam, and remote across the Netherlands.',
  email: 'manar.alsaadi90@gmail.com',
  // Update this to your live domain before deploying.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://manaralsadi.com',
  cvPath: '/documents/Manar-Alsadi-CV.pdf',
  ogImage: '/images/og/og-default.jpg',
  // Formspree endpoint - contact form submissions go to your Formspree inbox + email.
  formEndpoint: 'https://formspree.io/f/mjgndggq',
  themeColor: '#08090c',
} as const;

export const nav = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Work', href: '/#projects' },
  { label: 'Recommendations', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
] as const;
