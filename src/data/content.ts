// ✏️ EDIT YOUR PERSONAL DETAILS HERE — no other file needs to change.
export const content = {
  name: "Prince Gour",
  role: "CREATIVE DEVELOPER",
  headline: "Building digital experiences that people remember.",
  tagline: "Full-stack developer focused on scalable banking applications, interactive experiences and modern digital products.",
  email: "gourprince631@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/princegour" },
    { label: "GitHub", href: "https://github.com/gourprince222" },
    { label: "Instagram", href: "https://instagram.com/prince" },
  ],
  // Hero 360° frames: put files at public/frames/desktop/f_0001.webp … f_0120.webp
  hero: { path: "/frames/desktop/f_", ext: "jpg", count: 150, scrollDistance: "400%" },
  about: "I build digital experiences that combine engineering, design and interaction. As a Java full-stack developer at Tata Consultancy Services, I work on banking and financial applications with Spring Boot microservices, REST APIs, Oracle SQL and React.js.",
  stats: [
    { value: "3+", label: "Years in banking & finance" },
    { value: "8.5", label: "B.Tech CGPA" },
    { value: "2024", label: "TCS On-the-Spot Star Performer" },
    { value: "Mumbai", label: "Based in" },
  ],
  marquee: ["FULL-STACK DEVELOPMENT", "JAVA & SPRING BOOT", "REACT", "WEB DESIGN", "INTERACTIVE EXPERIENCES"],
  projects: [
    { title: "Project One", category: "CATEGORY", tech: "Spring Boot · React · Oracle", description: "Replace with a real project: what it does, your role and the result.", href: "#", image: "" },
    { title: "Project Two", category: "CATEGORY", tech: "Tech stack", description: "Replace with a real project.", href: "#", image: "" },
    { title: "Project Three", category: "CATEGORY", tech: "Tech stack", description: "Replace with a real project.", href: "#", image: "" },
  ],
  skills: [
    { group: "BACKEND", items: ["Java", "Spring Boot", "Microservices", "REST APIs"] },
    { group: "FRONTEND", items: ["React.js", "TypeScript", "JavaScript", "HTML", "CSS"] },
    { group: "DATABASE", items: ["Oracle SQL", "Query Optimization"] },
  ],
  services: [
    { title: "Portfolio Websites", text: "Editorial, motion-led personal sites. React · GSAP" },
    { title: "Business Websites", text: "Fast, responsive and on-brand. React" },
    { title: "Landing Pages", text: "Built to convert. HTML · CSS · JS" },
    { title: "Full-Stack Applications", text: "APIs, databases and UI end to end. Spring Boot · React" },
  ],
  why: ["Design + Development", "Built around your brand", "Responsive by default", "Performance focused", "Interactive when it matters"],
  // Add REAL testimonials only; the section hides itself when empty.
  testimonials: [] as { quote: string; author: string }[],
};
