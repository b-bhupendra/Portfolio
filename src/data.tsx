import React from 'react';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BarChartIcon from '@mui/icons-material/BarChart';
import TerminalIcon from '@mui/icons-material/Terminal';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ApiIcon from '@mui/icons-material/Api';
import JavascriptIcon from '@mui/icons-material/Javascript';

export const personalInfo = {
  name: "Bhupendra Singh Rawat",
  headline: "Full Stack Engineer",
  subHeadline: "Building scalable solutions with Python, React, FastAPI, GCP, and AWS",
  location: "Delhi, India",
  email: "bhupendrasr08@gmail.com",
  phone: "6397123756",
  linkedin: "https://www.linkedin.com/in/bhupendrasinghrawat",
  github: "#",
  summary: [
    "I am a passionate Backend Engineer with a strong foundation in building robust, scalable APIs and server-side applications.",
    "While my core expertise lies in backend development using Python and FastAPI, I am also a capable partial Frontend Engineer, leveraging React to build intuitive user interfaces.",
    "I have hands-on experience deploying and managing applications across major cloud platforms, including Google Cloud Platform (GCP) and Amazon Web Services (AWS), ensuring high availability and performance."
  ]
};

export const skills = [
  { name: "Python", icon: <CodeIcon />, category: "Languages" },
  { name: "React", icon: <JavascriptIcon />, category: "Frontend" },
  { name: "FastAPI", icon: <ApiIcon />, category: "Backend" },
  { name: "GCP & AWS", icon: <CloudIcon />, category: "Cloud" },
  { name: "SQL (MySQL)", icon: <StorageIcon />, category: "Databases" },
  { name: "ETL Pipelines", icon: <TerminalIcon />, category: "Engineering" },
  { name: "Machine Learning", icon: <PsychologyIcon />, category: "Data Science" },
  { name: "Data Visualization", icon: <BarChartIcon />, category: "Analytics" }
];

export const experience = [
  {
    company: "ASPIA InfoTech",
    role: "Software Engineer",
    period: "January 2023 - Present",
    duration: "1 year 4 months",
    location: "Gurugram, Haryana, India",
    achievements: [
      "Integrated Qualys APIs using the ETL (Extract, Transform, Load) method to improve vulnerability management and data workflows.",
      "Actively contributed to the development and enhancement of the organization's Vulnerability Management (VM) module.",
      "Optimized the performance of slow-running graph APIs, significantly improving system efficiency and data visualization responsiveness.",
      "Resolved multiple critical bugs affecting overall workflow, leading to smoother processes and better user experience.",
      "Collaborated with cross-functional teams remotely to deliver high-quality solutions within deadlines."
    ]
  }
];

export const education = [
  {
    institution: "DIT UNIVERSITY",
    degree: "Bachelor of Technology - BTech, Computer Science",
    period: "July 2016 - June 2020"
  }
];

export const certifications = [
  "Back End Development and APIs",
  "JavaScript Algorithms and Data Structures",
  "Relational Database",
  "Responsive Web Design",
  "Information Security"
];

export const projects = [
  { id: 'ai-code-assistant', title: 'AI Code Assistant', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop', tools: ['React', 'TypeScript', 'OpenAI API', 'Node.js'], description: 'An intelligent code assistant that helps developers write better code faster.' },
  { id: 'crypto-trading-bot', title: 'Crypto Trading Bot', image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop', tools: ['Python', 'Pandas', 'Binance API', 'Docker'], description: 'Automated trading bot for cryptocurrency markets with advanced technical analysis.' },
  { id: 'real-estate-platform', title: 'Real Estate Platform', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop', tools: ['Next.js', 'GraphQL', 'PostgreSQL', 'Tailwind'], description: 'Modern platform for buying, selling, and renting properties with real-time updates.' },
  { id: 'health-tracking-app', title: 'Health Tracking App', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop', tools: ['React Native', 'Firebase', 'Redux', 'Jest'], description: 'Comprehensive health and fitness tracker with personalized insights.' },
  { id: 'cloud-data-pipeline', title: 'Cloud Data Pipeline', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop', tools: ['AWS S3', 'Lambda', 'Snowflake', 'Airflow'], description: 'Scalable data processing pipeline for cloud-based data warehouses.' },
  { id: 'social-media-dashboard', title: 'Social Media Dashboard', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop', tools: ['Vue.js', 'D3.js', 'Express', 'MongoDB'], description: 'Unified dashboard for monitoring social media metrics and engagement.' },
  { id: 'multiplayer-game-server', title: 'Multiplayer Game Server', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop', tools: ['Go', 'WebSockets', 'Redis', 'Kubernetes'], description: 'High-performance server for real-time multiplayer gaming experiences.' },
  { id: 'portfolio-website', title: 'Portfolio Website', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', tools: ['React', 'Framer Motion', 'MUI', 'Vite'], description: 'Personal portfolio showcasing projects and skills with interactive animations.' },
  { id: 'inventory-management', title: 'Inventory Management', image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=800&auto=format&fit=crop', tools: ['Django', 'PostgreSQL', 'Celery', 'Redis'], description: 'Robust system for tracking inventory and orders in real-time.' },
  { id: '3d-product-configurator', title: '3D Product Configurator', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', tools: ['Three.js', 'WebGL', 'React Fiber', 'GSAP'], description: 'Interactive 3D tool for customizing and visualizing products.' },
];
