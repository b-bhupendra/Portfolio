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
  headline: "Data Science & Analytics | Python, SQL, Machine Learning",
  subHeadline: "Building End-to-End Data Solutions on GCP & AWS",
  location: "Delhi, India",
  email: "alphaparty08@gmail.com",
  phone: "9634169371",
  linkedin: "https://www.linkedin.com/in/bhupendrasinghrawat",
  github: "#",
  summary: [
    "I thrive at the intersection of Mathematics, Programming, and Storytelling.",
    "My journey into Data Science began with a curiosity for how raw numbers can predict trends and solve real-world problems. Today, I specialize in transforming messy datasets into clear, visual narratives that help stakeholders make informed decisions.",
    "I bridge the gap between technical complexity and business value, presenting insights in an engaging way for both technical and non-technical audiences."
  ]
};

export const skills = [
  { name: "Python (Pandas, NumPy)", icon: <CodeIcon />, category: "Languages" },
  { name: "SQL (MySQL)", icon: <StorageIcon />, category: "Databases" },
  { name: "AWS", icon: <CloudIcon />, category: "Cloud" },
  { name: "Data Visualization", icon: <BarChartIcon />, category: "Analytics" },
  { name: "ETL Pipelines", icon: <TerminalIcon />, category: "Engineering" },
  { name: "Machine Learning", icon: <PsychologyIcon />, category: "Data Science" },
  { name: "Qualys APIs", icon: <ApiIcon />, category: "API" },
  { name: "JavaScript", icon: <JavascriptIcon />, category: "Languages" }
];

export const experience = [
  {
    company: "ASPIA InfoTech",
    role: "Software Engineer",
    period: "January 2023 - April 2024",
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
