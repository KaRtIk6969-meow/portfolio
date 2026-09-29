export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kartik-portfolio.vercel.app";

export const SITE_CONFIG = {
  name: "Kartik Sharma",
  title: "Kartik Sharma | Senior Full Stack Developer & AI Engineer",
  description:
    "Futuristic developer portfolio of Kartik Sharma, Senior Full Stack Developer specializing in Next.js, React, TypeScript, and modern AI-driven web architectures.",
  url: SITE_URL,
  siteName: "Kartik Sharma Portfolio",
  author: {
    name: "Kartik Sharma",
    url: "https://github.com/KaRtIk6969-meow",
  },
  creator: "Kartik Sharma",
  publisher: "Kartik Sharma",
  keywords: [
    "Kartik Sharma",
    "Senior Full Stack Developer",
    "Full Stack Engineer",
    "AI Engineer",
    "Next.js Developer",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Web Development",
    "Software Architecture",
    "Portfolio",
  ],
  locale: "en_US",
  type: "website",
  email: "kartiksharmaa2066@gmail.com",
  github: "https://github.com/KaRtIk6969-meow",
  jobTitle: "Senior Full Stack Developer",
  company: "StellarTech",
  university: "Apex University",
} as const;

export const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_CONFIG.name,
  jobTitle: SITE_CONFIG.jobTitle,
  url: SITE_URL,
  sameAs: [SITE_CONFIG.github],
  worksFor: {
    "@type": "Organization",
    name: SITE_CONFIG.company,
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.university,
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Framer Motion",
    "PostgreSQL",
    "Full Stack Development",
    "Software Architecture",
    "Artificial Intelligence",
  ],
  email: `mailto:${SITE_CONFIG.email}`,
  description:
    "Passionate software engineer and Senior Full Stack Developer dedicated to building premium, high performance digital solutions combining robust backend logic with immersive, smooth frontend animations.",
};
