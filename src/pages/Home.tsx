import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiCode, FiDatabase, FiBarChart2, FiZap, FiCommand } from 'react-icons/fi';
import { useRef, useEffect, useState } from 'react';

// Generate random stars for the background
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      animationDuration: Math.random() * 4 + 2,
    });
  }
  return stars;
};

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars] = useState(generateStars(100));
  const [activeSection, setActiveSection] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Parallax values for background elements
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "40%"]);
  const strengthsY = useTransform(scrollYProgress, [0.1, 0.4], ["30%", "0%"]);
  const projectsY = useTransform(scrollYProgress, [0.3, 0.6], ["30%", "0%"]);
  const expertiseY = useTransform(scrollYProgress, [0.5, 0.8], ["30%", "0%"]);
  const ctaY = useTransform(scrollYProgress, [0.7, 1], ["30%", "0%"]);
  
  // Floating background elements
  const bgBlob1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const bgBlob2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgBlob3 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Monitor scroll position to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.body.offsetHeight;
      const scrollFraction = scrollPosition / (totalHeight - windowHeight);
      
      // Determine active section based on scroll position
      if (scrollFraction < 0.2) setActiveSection(0);
      else if (scrollFraction < 0.4) setActiveSection(1);
      else if (scrollFraction < 0.6) setActiveSection(2);
      else if (scrollFraction < 0.8) setActiveSection(3);
      else setActiveSection(4);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const strengthsData = [
    {
      title: "ERP System Expertise",
      description: "Hands-on experience configuring Microsoft Dynamics Business Central and SAP Business ByDesign for sales, inventory, and automation workflows.",
      icon: <FiDatabase className="text-highlight text-2xl" />
    },
    {
      title: "AI & Software Engineering",
      description: "Led a university team to build an AI-powered inventory management system with natural language processing and database interaction.",
      icon: <FiCommand className="text-highlight text-2xl" />
    },
    {
      title: "Full Stack Development",
      description: "Built modern web and mobile applications using technologies like Flutter, Firebase, Node.js, and Streamlit.",
      icon: <FiCode className="text-highlight text-2xl" />
    },
    {
      title: "Power Automate Workflows",
      description: "Automated reporting and communication using Microsoft Power Platform tools, including mass email and PDF generation.",
      icon: <FiZap className="text-highlight text-2xl" />
    },
    {
      title: "Data Visualization",
      description: "Created dashboards and reporting tools for internal business intelligence and decision-making.",
      icon: <FiBarChart2 className="text-highlight text-2xl" />
    }
  ];
  
  const projects = [
    {
      title: "SureCost Budget App",
      description: "A real-time budgeting app built with Flutter and Firebase, providing you with an intuitive interface that helps you create detailed purchase plans, estimate costs accurately including tax and tip, and stay firmly within your budget.",
      image: "/images/surecost.jpg",
      link: "/projects",
      technologies: ["Flutter", "Firebase", "UI/UX"]
    },
    {
      title: "Shipping Optimization Tool",
      description: "Designed a 3D visualization and optimization system for shipping containers using Python and Streamlit to replace legacy Excel models.",
      image: "/images/shipping.jpg",
      link: "/projects",
      technologies: ["Python", "Streamlit", "Data Viz"]
    }
  ];

  // Animation settings for section content
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Staggered animations for cards
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren"
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="relative text-text-primary overflow-hidden">
      {/* Star Background */}
      <div className="fixed inset-0 -z-20 bg-primary overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDuration: `${star.animationDuration}s`
            }}
          />
        ))}
      </div>
      
      {/* Background Blobs */}
      <motion.div 
        style={{ y: bgBlob1 }}
        className="fixed top-0 -right-20 w-1/2 h-screen bg-gradient-radial from-accent/10 to-transparent opacity-40 -z-10"
      />
      <motion.div 
        style={{ y: bgBlob2 }}
        className="fixed -left-20 top-1/4 w-1/3 h-screen bg-gradient-radial from-highlight/10 to-transparent opacity-30 -z-10"
      />
      <motion.div 
        style={{ y: bgBlob3 }}
        className="fixed -right-40 bottom-0 w-2/3 h-screen bg-gradient-radial from-highlight_alt/10 to-transparent opacity-30 -z-10"
      />
      
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {[0, 1, 2, 3, 4].map((section) => (
            <button
              key={section}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section 
                  ? 'bg-highlight h-5' 
                  : 'bg-gray-400 opacity-50 hover:opacity-75'
              }`}
              onClick={() => {
                const sectionOffsets = [0, 0.2, 0.4, 0.6, 0.8];
                const offsetTop = sectionOffsets[section] * (document.body.offsetHeight - window.innerHeight);
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Hero Section */}
      <motion.section 
        style={{ 
          y: heroY
        }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
      >
        <div className="container-custom px-4 lg:px-8 relative z-10">
          <motion.div 
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="gradient-text">Miguel Perez</span>
              <br />
              <span className="text-text-primary">Full Stack Developer</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto"
            >
              Creating modern, intuitive applications with a focus on user experience and business value.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <Link to="/projects" className="btn-primary text-lg px-8 py-4">
                View Projects
              </Link>
              
              <div className="flex space-x-4 mt-6 sm:mt-0">
                <a 
                  href="https://github.com/mperez561/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-effect p-3 rounded-full text-text-primary hover:bg-accent/20 transition-all flex items-center justify-center w-12 h-12"
                  aria-label="GitHub"
                >
                  <FiGithub size={24} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/miguel-perez-61612b184/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-effect p-3 rounded-full text-text-primary hover:bg-accent/20 transition-all flex items-center justify-center w-12 h-12"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={24} />
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Move scroll indicator to the side to avoid overlap */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="fixed right-8 bottom-12 z-40 hidden md:block"
          >
            <div className="animate-bounce flex items-center justify-center">
              <div className="w-5 h-10 rounded-full border-2 border-text-secondary flex items-start justify-center p-1">
                <div className="w-1 h-2 bg-text-secondary rounded-full animate-bounce"></div>
              </div>
            </div>
            <p className="text-text-secondary text-sm mt-2 text-center">Scroll</p>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Strengths Section */}
      <motion.section 
        style={{ 
          y: strengthsY
        }}
        className="min-h-screen flex items-center relative overflow-hidden py-20"
      >
        <div className="container-custom relative z-10">
          <motion.div 
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px 0px", amount: 0.4 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading">My Strengths</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Leveraging technical expertise and business acumen to deliver impactful solutions.
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px 0px", amount: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {strengthsData.map((strength, index) => (
              <motion.div 
                key={index}
                variants={itemVariant}
                whileHover={{ y: -4, boxShadow: '0 4px 20px rgba(14, 165, 233, 0.1)' }}
                className="glass-effect rounded-xl p-6 backdrop-blur-md"
              >
                <div className="mb-4">{strength.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-highlight font-heading">{strength.title}</h3>
                <p className="text-text-secondary">{strength.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Project Highlights */}
      <motion.section 
        style={{ 
          y: projectsY
        }}
        className="min-h-screen flex items-center relative overflow-hidden py-20"
      >
        <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-b from-accent/5 to-transparent opacity-50 blur-3xl -z-10"></div>
        <div className="container-custom relative z-10">
          <motion.div 
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px 0px" }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading">Project Highlights</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Delivering innovative solutions to real-world problems.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px 0px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass-effect rounded-xl overflow-hidden group relative"
              >
                <div className="h-64 bg-gradient-to-r from-secondary to-accent/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link to={project.link} className="px-6 py-3 bg-highlight/90 text-white rounded-md transform translate-y-10 group-hover:translate-y-0 transition-transform">
                      View Project
                    </Link>
                  </div>
                  <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white font-heading z-10">{project.title}</h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-text-secondary mb-4">{project.description}</p>
                  <Link to={project.link} className="inline-flex items-center text-highlight hover:underline">
                    Learn more
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Link to="/projects" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              View All Projects
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Expertise Section */}
      <motion.section 
        style={{ 
          y: expertiseY
        }}
        className="min-h-screen flex items-center relative overflow-hidden py-20"
      >
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-highlight_alt/5 to-transparent opacity-50 blur-3xl -z-10"></div>
        <div className="container-custom relative z-10">
          <motion.div 
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px 0px" }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading">Technical Versatility</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              From low-level programming to high-level business solutions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px 0px" }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-6 text-highlight font-heading">System & Code</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-text-secondary">Low-level programming & debugging experience in multiple environments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-text-secondary">ERP configuration for enterprise workflows & automation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-text-secondary">Cross-platform development across web, mobile, and desktop</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-text-secondary">Hardware installation and network configuration</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px 0px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-effect rounded-xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-6 text-highlight font-heading">Design & Strategy</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-text-secondary">Visual asset creation blending marketing and brand compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-text-secondary">Technical leadership bridging business goals with implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-text-secondary">UI/UX design focused on user needs and business objectives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-text-secondary">Process optimization and workflow automation</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <motion.section 
        style={{ 
          y: ctaY
        }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
      >
        <div className="absolute inset-0 bg-gradient-radial from-secondary/50 to-primary opacity-80 -z-10"></div>
        <div className="container-custom relative z-10">
          <motion.div 
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px 0px" }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-block"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-highlight to-highlight_alt rounded-full flex items-center justify-center mx-auto">
                <FiCode className="text-white text-4xl md:text-5xl" />
              </div>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Ready to work together?</h2>
            <p className="text-text-secondary mb-10 text-lg">
              Let's discuss how my technical expertise and creative problem-solving abilities can help bring your project to life.
            </p>
            <Link to="/contact" className="btn-primary text-lg px-10 py-4 inline-block">
              Get in touch
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home; 