import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projectCategories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'data', name: 'Data & Analytics' },
    { id: 'erp', name: 'ERP & Business Systems' },
  ];
  
  const projects = [
    {
      id: 1,
      title: 'SureCost Budget App',
      description: 'A real-time budgeting app built with Flutter and Firebase, providing you with an intuitive interface that helps you create detailed purchase plans, estimate costs accurately, and stay firmly within your budget.',
      technologies: ['Flutter', 'Firebase', 'Dart', 'Authentication'],
      image: '/images/surecost.jpg',
      category: 'mobile',
      links: {
        github: null,
        live: 'https://apps.apple.com/us/app/surecost-budget/id6744754844'
      }
    },
    {
      id: 2,
      title: 'Shipping Optimization Tool',
      description: 'A 3D visualization and optimization system for shipping containers using Python and Streamlit, replacing legacy Excel models with an interactive application that improves packing efficiency.',
      technologies: ['Python', 'Streamlit', 'Matplotlib', 'Pandas'],
      image: '/images/shipping.jpg',
      category: 'data',
      links: {
        github: 'https://github.com/mperez561/shipping-optimizer',
        live: null
      }
    },
    {
      id: 3,
      title: 'ERP Automation Workflows',
      description: 'Developed custom automation workflows for Microsoft Dynamics Business Central and SAP Business ByDesign, streamlining sales processes, inventory management, and reporting.',
      technologies: ['Dynamics BC', 'SAP', 'Power Automate', 'SQL'],
      image: '/images/erp-automation.jpg',
      category: 'erp',
      links: {
        github: null,
        live: null
      }
    },
    {
      id: 4,
      title: 'Business Intelligence Dashboard',
      description: 'Created interactive dashboards for internal business intelligence using Power BI and Excel, providing real-time insights into sales performance, inventory levels, and customer data.',
      technologies: ['Power BI', 'Excel', 'Power Query', 'DAX'],
      image: '/images/bi-dashboard.jpg',
      category: 'data',
      links: {
        github: null,
        live: null
      }
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and TailwindCSS to showcase projects. This very site!',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
      image: '/images/portfolio.jpg',
      category: 'web',
      links: {
        github: null,
        live: '#'
      }
    },
    {
      id: 6,
      title: 'AI Inventory Management System',
      description: 'Led a university team to build an AI-powered inventory management system with natural language processing and database interaction capabilities.',
      technologies: ['Python', 'NLP', 'SQL', 'React'],
      image: '/images/ai-inventory.jpg',
      category: 'web',
      links: {
        github: null,
        live: null
      }
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  // Animation variants without flashing
  const fadeInVariant = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Category button variants
  const categoryVariant = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: (index: number) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
        type: "tween"
      }
    })
  };
  
  // Project card variants
  const projectVariant = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: (index: number) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
        type: "tween"
      }
    })
  };
  
  return (
    <div className="bg-primary min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 -right-20 w-1/2 h-screen bg-gradient-radial from-accent/10 to-transparent opacity-40 -z-10"></div>
      <div className="absolute -left-20 top-1/4 w-1/3 h-screen bg-gradient-radial from-highlight/10 to-transparent opacity-30 -z-10"></div>
      <div className="absolute -right-40 bottom-0 w-2/3 h-screen bg-gradient-radial from-highlight_alt/10 to-transparent opacity-30 -z-10"></div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">My Projects</h1>
          <p className="text-text-secondary max-w-3xl mx-auto">
            A showcase of my technical work across web development, mobile applications, data visualization, and business systems.
          </p>
        </motion.div>
        
        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projectCategories.map((category, index) => (
            <motion.button
              key={category.id}
              custom={index}
              variants={categoryVariant}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === category.id 
                  ? 'bg-highlight text-white shadow-lg shadow-highlight/20' 
                  : 'glass-effect text-text-secondary'
              }`}
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={projectVariant}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                y: -8, 
                boxShadow: '0 10px 25px rgba(14, 165, 233, 0.15)',
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-secondary/60 backdrop-blur-lg rounded-xl p-6 border border-white/5 shadow-xl overflow-hidden group"
              layout
            >
              <div className="h-48 bg-secondary/30 mb-4 rounded-lg overflow-hidden">
                <motion.div 
                  className="w-full h-full bg-gradient-to-r from-highlight/40 to-highlight_alt/40 backdrop-blur-sm flex items-center justify-center"
                  initial={{ backdropFilter: "blur(12px)" }}
                  whileHover={{ backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </motion.div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-text-primary">{project.title}</h3>
              <p className="text-text-secondary mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-accent/20 text-accent text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                {project.links.github && (
                  <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-highlight transition-colors flex items-center text-sm"
                  >
                    <FiGithub className="mr-1" /> GitHub
                  </a>
                )}
                {project.links.live && (
                  <a 
                    href={project.links.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-highlight transition-colors flex items-center text-sm"
                  >
                    <FiExternalLink className="mr-1" /> {project.links.live.includes('apps.apple.com') ? 'App Store' : 'View Live'}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* No Projects Found */}
        {filteredProjects.length === 0 && (
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
            className="text-center py-12 glass-effect rounded-xl p-6"
          >
            <p className="text-text-secondary">No projects found in this category. Please check back later.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects; 