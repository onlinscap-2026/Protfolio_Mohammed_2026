
import { PortfolioData } from './types';

export const DEFAULT_DATA: PortfolioData = {
  bio: {
    name: 'Mohammed Rashed',
    title: 'Senior Frontend Architect',
    about: 'Crafting high-performance, accessible, and beautiful web experiences.',
    whoIAm: 'A developer passionate about clean code and user-centric design.',
    fullBio: 'I specialize in building complex React ecosystems and exploring the intersection of AI and user interfaces. With over 8 years of experience in the industry, I have led teams at Fortune 500 companies and startups alike to deliver scalable, pixel-perfect solutions.',
    email: 'onlinscap@gamil.com',
    phone: '+7 (780) 093-979',
    location: 'Sana\'a, Yemen',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  },
  projects: [
    {
      id: '1',
      title: 'Nexus AI Platform',
      description: 'A full-stack collaborative platform for LLM prompt engineering and workflow automation.',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      link: '#',
      github: '#',
      isFeatured: true,
      isVisible: true
    },
    {
      id: '2',
      title: 'Quantum Dashboard',
      description: 'Real-time financial analytics engine with advanced WebGL visualizations.',
      tags: ['React', 'Three.js', 'Redux', 'D3.js'],
      image: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80&w=800',
      link: '#',
      github: '#',
      isFeatured: true,
      isVisible: true
    }
  ],
  skills: [
    { id: 's1', name: 'React / Next.js', level: 98, category: 'Frontend', description: 'Advanced component architecture and server-side rendering.' },
    { id: 's2', name: 'TypeScript', level: 95, category: 'Frontend', description: 'Strong typing and complex generic patterns.' },
    { id: 's3', name: 'Node.js', level: 88, category: 'Backend', description: 'Scalable API development and microservices.' },
    { id: 's4', name: 'UI/UX Design', level: 90, category: 'Soft Skills', description: 'User-centered design principles and prototyping.' },
    { id: 's5', name: 'System Design', level: 85, category: 'Tools', description: 'Cloud architecture and performance optimization.' }
  ],
  experience: [
    {
      id: 'e1',
      company: 'TechFlow Systems',
      role: 'Senior Frontend Architect',
      period: 'Jan 2021 - Present',
      location: 'Sanaa, Al-Andalus University, Dar es Salaam',
      type: 'Full-time',
      description: [
        'Architected a modular micro-frontend ecosystem using Module Federation, reducing build times by 60%.',
        'Led a team of 12 engineers to ship the flagship SaaS product, resulting in a 35% increase in user retention.',
        'Established engineering standards for accessibility (WCAG 2.1) and performance across the organization.'
      ]
    },
    {
      id: 'e2',
      company: 'Innovate Digital',
      role: 'Full Stack Engineer',
      period: 'Jun 2018 - Dec 2020',
      location: 'Sanaa/Khawlan/Al-Gharas,',
      type: 'Full-time',
      description: [
        'Developed real-time collaboration features using WebSockets and CRDTs for a design tool.',
        'Optimized database queries in PostgreSQL, improving API response times by 45%.',
        'Built and maintained a custom internal component library used by 5 different product teams.'
      ]
    }
  ],
  education: [
    {
      id: 'edu1',
      institution: 'University of Andalusia',
      degree: 'Master of Science',
      field: 'Computer Information Technology',
      period: '2018 - 2022',
      location: 'sanaa, darsaalm'
    },
    {
      id: 'edu2',
      institution: 'Khalid Bin Al-Walid School',
      degree: 'Distinction',
      field: 'General Secondary Education',
      period: '2015 - 2016',
      location: 'Khawlan L-Ghars'
    }
  ],
  messages: [],
  settings: {
    seoTitle: 'Mohammed Rashed | Senior Frontend Architect',
    seoDescription: 'Professional Portfolio of Mohammed Rashid, specializing in high-performance web applications and AI interfaces.',
    footerText: 'Crafted with precision using modern web standards.',
    copyrightText: 'Mohammed Rashed 2026',
    designCreditText: 'Premium Developer Portfolio',
    showInteractiveElements: true,
    theme: 'dark',
    adminUsername: 'user',
    adminPassword: 'password'
  }
};

export const STORAGE_KEY = 'portfolio_cms_data_v3';

export const loadPortfolioData = (): PortfolioData => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_DATA, ...parsed }; 
    } catch (e) {
      console.error("Failed to parse saved data", e);
    }
  }
  return DEFAULT_DATA;
};

export const savePortfolioData = (data: PortfolioData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const BIO = DEFAULT_DATA.bio;
export const PROJECTS = DEFAULT_DATA.projects;
export const SKILLS = DEFAULT_DATA.skills;
export const EXPERIENCE = DEFAULT_DATA.experience;
