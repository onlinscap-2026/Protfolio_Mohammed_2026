
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
  pdfData?: string; // Base64 encoded PDF data
  isFeatured: boolean;
  isVisible: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
  description?: string;
  iconUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string; // e.g., "Jan 2021 - Present"
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  description?: string;
}

export interface VisitorMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface SiteSettings {
  seoTitle: string;
  seoDescription: string;
  logoUrl?: string;
  footerText: string;
  copyrightText: string;
  designCreditText: string;
  showInteractiveElements: boolean;
  theme: 'dark' | 'light';
  adminUsername: string;
  adminPassword?: string; // Stored locally for this mock CMS
}

export interface PortfolioData {
  bio: {
    name: string;
    title: string;
    about: string;
    whoIAm: string; // "Who I Am" text
    fullBio: string;
    email: string;
    phone: string;
    location: string;
    profileImage?: string;
    resumeUrl?: string;
    socials: {
      github: string;
      linkedin: string;
      twitter?: string;
      instagram?: string;
    };
  };
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  messages: VisitorMessage[];
  settings: SiteSettings;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}
