// Careers data. These are PLACEHOLDER jobs. Replace them with real openings before going live.
// To add a job, copy one object, give it a unique slug and edit the fields.

export type Workplace = "Remote" | "On-site" | "Hybrid";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type Job = {
  slug: string;
  title: string;
  department: "Engineering" | "Content" | "Marketing" | "Design";
  workplace: Workplace;
  type: JobType;
  location: string;
  experience: string;
  posted: string; // YYYY-MM-DD
  summary: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  skills: string[];
};

export const PERKS = [
  "Flexible working hours",
  "Paid time off and public holidays",
  "Learning budget for courses and books",
  "Modern laptop and equipment",
  "Clear growth path and regular reviews",
  "Friendly, supportive team",
];

export const JOBS: Job[] = [
  {
    slug: "react-developer",
    title: "React Developer",
    department: "Engineering",
    workplace: "Remote",
    type: "Full-time",
    location: "Anywhere",
    experience: "2+ years",
    posted: "2026-10-28",
    summary: "Build fast, accessible interfaces in React and TypeScript for our learning platform.",
    about: "You will work with designers and backend developers to turn designs into clean, reusable React components. You care about performance, accessibility and code that other developers enjoy reading.",
    responsibilities: [
      "Build and maintain React components and pages",
      "Turn Figma designs into responsive, pixel-accurate UI",
      "Manage state with hooks and context, and fetch data from REST APIs",
      "Write unit tests and take part in code reviews",
      "Improve performance and accessibility across the site",
    ],
    requirements: [
      "2+ years of professional React experience",
      "Strong JavaScript (ES6+) and working TypeScript knowledge",
      "Good understanding of HTML, CSS and responsive design",
      "Experience with Git and pull request workflows",
    ],
    niceToHave: ["Next.js experience", "Testing with Jest and React Testing Library", "Tailwind CSS"],
    skills: ["React", "TypeScript", "Hooks", "REST APIs", "Git"],
  },
  {
    slug: "javascript-developer",
    title: "JavaScript Developer",
    department: "Engineering",
    workplace: "Hybrid",
    type: "Full-time",
    location: "Lahore, Pakistan",
    experience: "1–3 years",
    posted: "2026-10-26",
    summary: "Write clean, modern JavaScript for interactive features, tools and code examples.",
    about: "You will build interactive features across the site, such as quizzes and code playgrounds, and help keep our code examples correct and easy to follow.",
    responsibilities: [
      "Develop interactive features in modern JavaScript",
      "Debug and fix issues across browsers",
      "Review and test the code examples in our articles",
      "Work with the team to plan and estimate tasks",
    ],
    requirements: [
      "Solid knowledge of JavaScript, the DOM and browser APIs",
      "Understanding of closures, promises, async/await and the event loop",
      "Experience with HTML and CSS",
      "Good communication in English",
    ],
    niceToHave: ["Experience with a framework such as React or Vue", "Node.js basics"],
    skills: ["JavaScript", "DOM", "Async", "HTML", "CSS"],
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    workplace: "On-site",
    type: "Full-time",
    location: "Lahore, Pakistan",
    experience: "2+ years",
    posted: "2026-10-24",
    summary: "Craft responsive, polished interfaces with Next.js, Tailwind CSS and smooth animations.",
    about: "You will own the look and feel of our pages, from layout and typography to animation, making sure everything works on every screen size.",
    responsibilities: [
      "Build responsive pages with Next.js and Tailwind CSS",
      "Add animations with GSAP or Framer Motion",
      "Keep Core Web Vitals and Lighthouse scores high",
      "Work closely with the design and SEO teams",
    ],
    requirements: [
      "2+ years building production frontends",
      "Strong CSS skills, including Flexbox and Grid",
      "Experience with React or Next.js",
      "An eye for detail and good design sense",
    ],
    niceToHave: ["GSAP or Framer Motion experience", "Basic SEO knowledge"],
    skills: ["Next.js", "Tailwind CSS", "GSAP", "Responsive design"],
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    department: "Engineering",
    workplace: "Hybrid",
    type: "Full-time",
    location: "Lahore, Pakistan",
    experience: "3+ years",
    posted: "2026-10-22",
    summary: "Ship features end to end with Next.js, Node.js and a SQL or NoSQL database.",
    about: "You will design APIs, build interfaces and deploy features from start to finish. You are comfortable moving between the frontend, the backend and the database.",
    responsibilities: [
      "Design and build REST or GraphQL APIs with Node.js",
      "Build frontend features in React and Next.js",
      "Design database schemas and write efficient queries",
      "Set up deployments and monitor production",
    ],
    requirements: [
      "3+ years of full stack development experience",
      "Strong skills in React, Node.js and TypeScript",
      "Experience with PostgreSQL, MySQL or MongoDB",
      "Understanding of authentication, security and caching",
    ],
    niceToHave: ["Docker and CI/CD", "Cloud platforms such as AWS or Vercel"],
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "MongoDB"],
  },
  {
    slug: "nextjs-developer",
    title: "Next.js Developer",
    department: "Engineering",
    workplace: "Remote",
    type: "Contract",
    location: "Anywhere",
    experience: "2+ years",
    posted: "2026-10-20",
    summary: "Build SEO-friendly pages with the Next.js App Router, server components and static generation.",
    about: "You will help us grow the site with fast, search-friendly pages, using the App Router, metadata APIs and the right rendering strategy for each page.",
    responsibilities: [
      "Build pages with the Next.js App Router",
      "Choose between SSR, SSG and ISR for each page",
      "Implement metadata, sitemaps and structured data",
      "Optimise images, fonts and bundle size",
    ],
    requirements: [
      "2+ years with Next.js in production",
      "Strong React and TypeScript skills",
      "Understanding of server and client components",
    ],
    niceToHave: ["Experience with headless CMS tools", "Technical SEO knowledge"],
    skills: ["Next.js", "App Router", "SSR", "SEO", "TypeScript"],
  },
  {
    slug: "technical-content-writer",
    title: "Technical Content Writer",
    department: "Content",
    workplace: "Remote",
    type: "Part-time",
    location: "Anywhere",
    experience: "1+ years",
    posted: "2026-10-27",
    summary: "Write clear interview guides and tutorials about React, JavaScript and web development.",
    about: "You will write and update blog articles that help developers prepare for interviews. You can explain technical ideas simply and back them with working code.",
    responsibilities: [
      "Research and write 4–6 technical articles a month",
      "Write short, accurate answers with runnable code examples",
      "Update older articles when tools and APIs change",
      "Work with the SEO team on topics and keywords",
    ],
    requirements: [
      "Published writing about web development (please share samples)",
      "Working knowledge of JavaScript and React",
      "Excellent written English",
    ],
    niceToHave: ["Experience as a developer", "Familiarity with Markdown and Git"],
    skills: ["Technical writing", "JavaScript", "React", "Markdown"],
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    department: "Marketing",
    workplace: "Hybrid",
    type: "Full-time",
    location: "Lahore, Pakistan",
    experience: "2+ years",
    posted: "2026-10-25",
    summary: "Grow organic traffic with keyword research, technical SEO and content strategy.",
    about: "You will plan what we write, make sure search engines understand our pages and track how our traffic grows.",
    responsibilities: [
      "Do keyword research and plan the content calendar",
      "Run technical SEO audits and fix issues with developers",
      "Improve on-page SEO, internal links and structured data",
      "Report on traffic and rankings with Search Console and Analytics",
    ],
    requirements: [
      "2+ years of SEO experience, ideally for a content site",
      "Hands-on experience with Google Search Console and GA4",
      "Experience with tools such as Ahrefs or Semrush",
    ],
    niceToHave: ["Basic HTML knowledge", "Experience with tech or developer audiences"],
    skills: ["Keyword research", "Technical SEO", "GA4", "Search Console"],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    workplace: "On-site",
    type: "Full-time",
    location: "Lahore, Pakistan",
    experience: "2+ years",
    posted: "2026-10-18",
    summary: "Design simple, accessible user experiences for web pages and learning tools.",
    about: "You will design new pages and features, build our design system and test ideas with real users.",
    responsibilities: [
      "Design wireframes, mockups and prototypes in Figma",
      "Maintain and grow the design system",
      "Run usability tests and improve designs from feedback",
      "Hand off clear specs to developers",
    ],
    requirements: [
      "2+ years of product or web design experience",
      "Strong Figma skills and a portfolio",
      "Understanding of accessibility and responsive design",
    ],
    niceToHave: ["Basic HTML and CSS", "Motion design skills"],
    skills: ["Figma", "UI design", "UX research", "Design systems"],
  },
  {
    slug: "frontend-developer-intern",
    title: "Frontend Developer Intern",
    department: "Engineering",
    workplace: "On-site",
    type: "Internship",
    location: "Lahore, Pakistan",
    experience: "Fresh graduates",
    posted: "2026-10-29",
    summary: "Learn by building real features with HTML, CSS, JavaScript and React alongside senior developers.",
    about: "A three-month internship for students and fresh graduates who want hands-on experience. You will be paired with a mentor and work on real tasks.",
    responsibilities: [
      "Build small UI features and fix bugs",
      "Learn our codebase, tools and review process",
      "Pair with senior developers every week",
    ],
    requirements: [
      "Basic knowledge of HTML, CSS and JavaScript",
      "Some experience with React through projects or courses",
      "Eagerness to learn and take feedback",
    ],
    niceToHave: ["A GitHub profile with personal projects"],
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
];

export const getJob = (slug: string) => JOBS.find((j) => j.slug === slug);

export const workplaceStyle: Record<Workplace, string> = {
  Remote: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "On-site": "bg-sky-50 text-sky-700 ring-sky-600/20",
  Hybrid: "bg-amber-50 text-amber-800 ring-amber-600/25",
};

export const postedOn = (date: string) => new Date(date).toLocaleDateString("en-US", { dateStyle: "medium", timeZone: "UTC" });

