import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data';
import { 
  Code, FileCode, Brain, Server, FileCode2, Table, LineChart, Box as BoxIcon, Globe, Network, Database, Palette, Smartphone, Flame, Layers, CheckCircle, Cloud, Zap, Snowflake, Wind, Layout, PieChart, Terminal, Activity, Boxes, Move, Clock, Monitor
} from 'lucide-react';

const toolIcons: Record<string, React.ElementType> = {
  'React': Code,
  'TypeScript': FileCode,
  'OpenAI API': Brain,
  'Node.js': Server,
  'Python': FileCode2,
  'Pandas': Table,
  'Binance API': LineChart,
  'Docker': BoxIcon,
  'Next.js': Globe,
  'GraphQL': Network,
  'PostgreSQL': Database,
  'Tailwind': Palette,
  'React Native': Smartphone,
  'Firebase': Flame,
  'Redux': Layers,
  'Jest': CheckCircle,
  'AWS S3': Cloud,
  'Lambda': Zap,
  'Snowflake': Snowflake,
  'Airflow': Wind,
  'Vue.js': Layout,
  'D3.js': PieChart,
  'Express': Server,
  'MongoDB': Database,
  'Go': Terminal,
  'WebSockets': Activity,
  'Redis': Database,
  'Kubernetes': Boxes,
  'Framer Motion': Move,
  'MUI': Palette,
  'Vite': Zap,
  'Django': Server,
  'Celery': Clock,
  'Three.js': BoxIcon,
  'WebGL': Monitor,
  'React Fiber': Code,
  'GSAP': Move,
};

const CarouselContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDown',
})<{ isDown: boolean }>(({ isDown }) => ({
  position: 'relative',
  zIndex: 1,
  height: '100vh',
  overflow: 'hidden',
  pointerEvents: 'auto',
  background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
  cursor: isDown ? 'grabbing' : 'grab',
}));

const CarouselItem = styled('div')({
  '--items': 10,
  '--width': 'clamp(240px, 60vw, 300px)',
  '--height': 'clamp(320px, 80vw, 400px)',
  '--x': 'calc(var(--active) * 800%)',
  '--y': 'calc(var(--active) * 200%)',
  '--rot': 'calc(var(--active) * 120deg)',
  '--opacity': 'calc(var(--zIndex) / var(--items) * 3 - 2)',
  overflow: 'hidden',
  position: 'absolute',
  zIndex: 'var(--zIndex)',
  width: 'var(--width)',
  height: 'var(--height)',
  margin: 'calc(var(--height) * -0.5) 0 0 calc(var(--width) * -0.5)',
  borderRadius: '16px',
  top: '45%',
  left: '50%',
  userSelect: 'none',
  transformOrigin: '0% 100%',
  boxShadow: '0 15px 50px 15px rgba(0, 0, 0, 0.4)',
  background: 'black',
  pointerEvents: 'all',
  border: '1px solid transparent',
  transform: 'translate(var(--x), var(--y)) rotate(var(--rot))',
  transition: 'transform 0.8s cubic-bezier(0, 0.02, 0, 1), box-shadow 0.3s ease, border 0.3s ease',
  '&:hover': {
    transform: 'translate(var(--x), var(--y)) rotate(var(--rot)) scale(1.05)',
    boxShadow: '0 20px 60px 20px rgba(255, 255, 255, 0.15), 0 0 20px rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  }
});

const CarouselBox = styled('div')({
  position: 'absolute',
  zIndex: 1,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: 'opacity 0.8s cubic-bezier(0, 0.02, 0, 1)',
  opacity: 'var(--opacity)',
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0.9))',
  }
});

const ItemTitle = styled('div')({
  position: 'absolute',
  zIndex: 1,
  color: '#fff',
  bottom: '30px',
  left: '24px',
  right: '24px',
  transition: 'opacity 0.8s cubic-bezier(0, 0.02, 0, 1)',
  fontSize: 'clamp(24px, 3vw, 32px)',
  textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  fontWeight: 'bold',
  lineHeight: 1.2,
});

const ItemNum = styled('div')({
  position: 'absolute',
  zIndex: 1,
  color: 'rgba(255,255,255,0.9)',
  top: '20px',
  left: '24px',
  transition: 'opacity 0.8s cubic-bezier(0, 0.02, 0, 1)',
  fontSize: 'clamp(30px, 8vw, 60px)',
  fontWeight: '900',
  textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
});

const ItemImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  pointerEvents: 'none',
});

const ToolItem = ({ tool }: { tool: string }) => {
  const [displayText, setDisplayText] = useState(tool);
  const [isScrambling, setIsScrambling] = useState(false);
  const Icon = toolIcons[tool] || Code;

  useEffect(() => {
    setIsScrambling(true);
    let iterations = 0;
    const maxIterations = 15;
    const interval = setInterval(() => {
      setDisplayText(
        tool.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (iterations >= maxIterations) return tool[index];
          const chars = '01!@#$%^&*<>?';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      iterations++;
      if (iterations > maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [tool]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 25,
        layout: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileHover={{ scale: 1.1, y: -5 }}
      style={{
        background: isScrambling ? 'rgba(0, 255, 65, 0.15)' : 'rgba(255,255,255,0.1)',
        padding: '8px 16px',
        borderRadius: '20px',
        color: isScrambling ? '#00ff41' : 'white',
        fontFamily: isScrambling ? '"JetBrains Mono", monospace' : 'inherit',
        fontWeight: 600,
        fontSize: '0.9rem',
        cursor: 'pointer',
        boxShadow: isScrambling ? '0 0 15px rgba(0,255,65,0.4)' : '0 4px 12px rgba(0,0,0,0.1)',
        border: isScrambling ? '1px solid rgba(0,255,65,0.5)' : '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        whiteSpace: 'nowrap',
        minWidth: `${tool.length * 0.6 + 3}rem`, 
        margin: '6px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <motion.div
        animate={{ 
          rotate: isScrambling ? [0, -10, 10, -10, 10, 0] : 0,
          scale: isScrambling ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Icon size={16} color={isScrambling ? '#00ff41' : 'white'} />
      </motion.div>
      {displayText}
    </motion.div>
  );
};

export default function SkillsSection() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(50);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showHeading, setShowHeading] = useState(true);

  const speedWheel = 0.07;
  const speedDrag = -0.25;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const getZindex = (arrayLength: number, activeIndex: number, index: number) => {
    return activeIndex === index ? arrayLength : arrayLength - Math.abs(activeIndex - index);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const wheelProgress = e.deltaY * speedWheel;
    setProgress((prev) => Math.max(0, Math.min(prev + wheelProgress, 100)));
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDown) return;
    const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const mouseProgress = (x - startX) * speedDrag;
    setProgress((prev) => Math.max(0, Math.min(prev + mouseProgress, 100)));
    setStartX(x);
  };

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    setIsDown(true);
    setStartX('touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel as any, { passive: false });
    container.addEventListener('mousedown', handleMouseDown as any);
    window.addEventListener('mousemove', handleMouseMove as any);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleMouseDown as any, { passive: false });
    window.addEventListener('touchmove', handleMouseMove as any, { passive: false });
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      container.removeEventListener('wheel', handleWheel as any);
      container.removeEventListener('mousedown', handleMouseDown as any);
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleMouseDown as any);
      window.removeEventListener('touchmove', handleMouseMove as any);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDown, startX]);

  const active = Math.floor((progress / 100) * (projects.length - 1));

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Title Overlay */}
      <AnimatePresence>
        {showHeading && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '12%', left: 0, width: '100%', textAlign: 'center', zIndex: 2, pointerEvents: 'none' }}
          >
            <Typography variant="h2" sx={{ 
              color: 'white', 
              textShadow: '0 4px 10px rgba(0,0,0,0.5)',
              fontSize: { xs: '2.5rem', md: '3.75rem' }
            }}>PROJECTS</Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>Scroll or drag to explore</Typography>
          </motion.div>
        )}
      </AnimatePresence>

      <CarouselContainer ref={containerRef} isDown={isDown}>
        {projects.map((project, index) => {
          const zIndex = getZindex(projects.length, active, index);
          const activeVal = (index - active) / projects.length;

          return (
            <CarouselItem
              key={index}
              style={{
                '--zIndex': zIndex,
                '--active': activeVal,
                '--items': projects.length,
              } as React.CSSProperties}
              onClick={() => {
                if (active === index) {
                  navigate(`/projects/${project.id}`);
                } else {
                  setProgress((index / (projects.length - 1)) * 100);
                }
              }}
            >
              <CarouselBox>
                <ItemTitle>{project.title}</ItemTitle>
                <ItemNum>{String(index + 1).padStart(2, '0')}</ItemNum>
                <ItemImage src={project.image} alt={project.title} referrerPolicy="no-referrer" />
              </CarouselBox>
            </CarouselItem>
          );
        })}
      </CarouselContainer>

      {/* Mac-like Dock for Tools */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: { xs: 20, md: 40 }, 
          left: 0,
          right: 0,
          zIndex: 10, 
          pointerEvents: 'auto',
          display: 'flex',
          justifyContent: 'center',
          px: 2
        }}
      >
        <motion.div
          layout
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '8px 16px',
            borderRadius: '32px',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100%',
          }}
        >
          {projects[active].tools.map((tool, index) => (
            <ToolItem key={index} tool={tool} />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}

