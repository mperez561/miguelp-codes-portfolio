import { useState, useRef, useEffect } from 'react';
import { FiDownload, FiExternalLink, FiChevronRight, FiCode, FiUser, FiBriefcase, FiAward, FiBox } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Resume data (assuming it's the same as previously provided)
const resumeData = {
  name: "Miguel Perez",
  title: "Computer Science Student | Developer | ERP Specialist",
  contact: {
    email: "perezmiguel561@gmail.com",
    location: "Inland Empire, CA, USA",
    portfolio: "www.miguelp.codes",
    linkedin: "linkedin.com/in/miguel-perez-61612b184"
  },
  summary: "Driven and versatile Computer Science student at Cal Poly Pomona (Graduating August 2025) with a 3.8 GPA and a hands-on approach to solving technical and operational problems. Strong foundation in backend and systems programming with Java, C/C++, and Python. Experienced in building intelligent developer tools, managing ERP systems (Microsoft Dynamics 365 Business Central & SAP ByDesign), and creating full-stack web and mobile apps. Project manager for software engineering teams, with a track record of leading innovative, AI-powered solutions from concept to delivery. Passionate about emerging technologies, intuitive UI/UX, and automation that bridges business and tech.",
  technicalSkills: {
    languages: [
      { name: "Java", level: 90 }, { name: "C", level: 60 }, { name: "C++", level: 80 },
      { name: "Python", level: 95 }, { name: "C#", level: 70 }, { name: "SQL", level: 85 },
      { name: "HTML/CSS", level: 80 }
    ],
    frameworksAndTools: [
      { name: "React", level: 80 }, { name: "Flutter", level: 90 }, { name: "Streamlit", level: 80 },
      { name: "Git", level: 85 }, { name: "Firebase", level: 80 }, { name: "Unity", level: 75 }
    ],
    systemsAndPlatforms: [
      { name: "MS Dynamics 365 BC", level: 90 }, { name: "SAP ByDesign", level: 80 },
      { name: "Linux", level: 80 }, { name: "macOS", level: 95 }, { name: "Windows", level: 95 },
      { name: "Power Automate", level: 90 },
      { name: "Power BI", level: 85 }, { name: "Power Query", level: 80 }
    ],
    competencies: [
      { name: "AI Integration", level: 90 }, { name: "ERP Admin", level: 95 },
      { name: "Data Viz", level: 85 }, { name: "Automation", level: 90 },
      { name: "API Design", level: 80 }, { name: "Hardware Setup", level: 70 },
      { name: "Documentation", level: 85 }, { name: "Project Mgmt", level: 90 }
    ]
  },
  professionalExperience: [
    {
      role: "Technical Lead ERP Systems Developer",
      company: "Universal Lighting Systems",
      duration: "August 2019 – Present",
      location: "Jurupa Valley, CA",
      points: [
        "Lead technical efforts in ERP configuration (Microsoft Dynamics 365 BC & SAP ByDesign), optimizing workflows for credit memos, prepayments, and customer orders.",
        "Created Excel and PDF reports for sales, backorders, and pricing logic using Python and Power Automate.",
        "Developed internal tools for commission calculation, product categorization, and automated emailing.",
        "Managed hardware deployment, security camera systems, and new computer setups for staff.",
        "Acted as primary project contact for IT operations, reporting, and system integrations."
      ]
    }
  ],
  projects: [
    {
      title: "AI Inventory Agent",
      details: "Personal Project / Coursework | Python, SQLite, OpenAI API, Matplotlib",
      image: "/images/projects/inventory-agent.png", // Ensure this path is correct or use a placeholder
      points: [
        "Built a natural-language-based AI agent interacting with inventory data via a Python backend and SQLite.",
        "Designed functional specs, ER diagrams, and sequence diagrams as project manager.",
        "Enabled flexible querying of products, sales, and backorders through OpenAI-powered NLP.",
        "Created visualizations using Matplotlib and automated Excel/PDF reporting tools."
      ]
    },
    {
      title: "SureCost Budget App",
      details: "Personal Project / Coursework | Flutter, Firebase",
      image: "/images/projects/surecost.png", // Ensure this path is correct or use a placeholder
      points: [
        "Developed a real-time budget planner with Flutter and Firebase.",
        "Designed an intuitive mobile UI for itemized planning, live calculations, and tip/tax logic.",
        "Integrated Firestore for real-time storage and user authentication with email/password login.",
        "Built automation for syncing data, managing offline mode, and updating plan states."
      ]
    },
    {
      title: "Shipping Container Optimization Tool",
      details: "Personal Project / Coursework | Python, Streamlit, Pandas, NumPy",
      image: "/images/projects/shipping-tool.png", // Ensure this path is correct or use a placeholder
      points: [
        "Created a Python tool to optimize shipping container packing, migrated from Excel to Streamlit.",
        "Implemented logic for weight-based prioritization and item constraints using pandas and NumPy.",
        "Created a slider-based interface for users to define priorities like volume, weight, and fragility.",
        "Added database integration for inventory lookup and persistent configurations."
      ]
    }
  ],
  education: {
    degree: "B.S. in Computer Science",
    institution: "California State Polytechnic University, Pomona",
    graduationDate: "August 2025",
    location: "Pomona, CA",
    gpa: "GPA: 3.8",
    relevantCoursework: "Relevant Coursework: Backend Web Development, Systems Programming, Artificial Intelligence, Database Management, Software Engineering"
  }
};

// Animation variants
const fadeInVariant = {
  initial: { 
    opacity: 0
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      type: "tween"
    }
  },
  exit: { 
    opacity: 0, 
    transition: { 
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
      type: "tween"
    } 
  }
};

const staggerContainer = {
  initial: { opacity: 0 }, // Or opacity: 1 if children handle their own fade
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.2, // Duration for the container itself, if any, or for stagger effect
      ease: [0.4, 0, 0.2, 1],
      when: "beforeChildren", // Or "afterChildren" depending on desired effect
      type: "tween"
    }
  }
  // No exit variant defined here, typically handled by parent AnimatePresence
};

const scaleUpVariant = {
  initial: { scale: 0.98, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      type: "tween"
    } 
  },
  exit: { 
    scale: 0.98, 
    opacity: 0, 
    transition: { 
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
      type: "tween" 
    } 
  }
};

const simpleFadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1], type: "tween" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1], type: "tween" } }
};

// Tab type definition
type TabType = 'about' | 'skills' | 'experience' | 'projects' | 'education';

const ResumePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('languages');
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector('.active-tab');
      if (activeTabElement) {
        activeTabElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }, [activeTab]);

  const toggleProject = (projectTitle: string) => {
    setExpandedProject(prev => prev === projectTitle ? null : projectTitle);
  };

  const renderSkillBars = (skills: any[], category: string) => (
    <motion.div 
      // Key added to ensure re-animation when category changes, if not handled by parent AnimatePresence properly
      key={`skill-bars-${category}`} 
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      // No exit here, parent AnimatePresence handles category switch
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          variants={scaleUpVariant}
          // whileHover={{ y: -5, transition: { duration: 0.2 } }} // Keep if desired
          className="glass-effect backdrop-blur-sm p-4 rounded-xl"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-text-primary">{skill.name}</span>
            <span className="text-xs text-highlight_alt">{skill.level}%</span>
          </div>
          <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-highlight to-highlight_alt rounded-full"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderTimeline = () => (
    // This is a list, consider wrapping with a motion.div using stagger variants for children
    <motion.div 
        className="relative mt-8"
        variants={staggerContainer} // Apply stagger to the parent of timeline items
        initial="initial"
        animate="animate"
    >
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-highlight to-highlight_alt/30"></div>
      {resumeData.professionalExperience.map((exp, index) => (
        <motion.div
          // initial={{ opacity: 0, y: 50 }} // Replaced by variants
          // animate={{ opacity: 1, y: 0 }}   // Replaced by variants
          // transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger handles delay
          variants={scaleUpVariant} // Use a consistent item animation variant
          key={index} // Consider a more stable key if data can change, e.g., exp.role + exp.company
          className="relative mb-12"
        >
          <div className="absolute left-[-8px] md:left-1/2 md:ml-[-8px] top-0 w-4 h-4 rounded-full bg-highlight shadow-glow-sm"></div>
          <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 ml-8 md:ml-0' : 'md:pl-12 ml-8 md:ml-auto'}`}>
            <div className="glass-effect rounded-xl p-6 backdrop-blur-sm hover:shadow-glow-sm transition-all duration-300">
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-text-primary">{exp.role}</h3>
                <p className="text-highlight_alt font-medium">{exp.company}</p>
                <p className="text-sm text-text-secondary">{exp.location} | {exp.duration}</p>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <FiChevronRight className="text-highlight mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderProjects = () => (
    <motion.div 
      layout // Grid container layout
      variants={staggerContainer} // Apply stagger to the parent of project cards
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
    >
      {resumeData.projects.map((project) => (
        <motion.div
          key={project.title}
          layout // Individual card layout (for col-span change)
          variants={scaleUpVariant} // Use a consistent item animation variant
          // initial, animate, exit, transition are handled by variants
          className={`glass-effect rounded-xl overflow-hidden ${ // Removed transition-all
            expandedProject === project.title ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''
          }`}
        >
          <div 
            className="cursor-pointer"
            onClick={() => toggleProject(project.title)}
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{project.details}</p>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {expandedProject === project.title && (
              <motion.div
                layout // For height animation of expanded content
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="p-5 pt-0"
              >
                <div className="grid grid-cols-1 gap-6"> {/* Changed md:grid-cols-2 to grid-cols-1 */}
                  <div>
                    <h4 className="text-md font-medium text-highlight mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {project.points.map((point, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="flex items-start"
                        >
                          <FiChevronRight className="text-highlight mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    // Assuming Tailwind is set up with these custom colors/fonts in tailwind.config.js
    // primary, secondary, accent, highlight, highlight_alt, text-primary, text-secondary
    // font-heading, font-body
    // glass-effect, shadow-glow-sm, btn-primary, container-custom, card
    // For this example, I'll use generic Tailwind colors if custom ones aren't standard.
    <div className="bg-slate-900 min-h-screen pt-20 pb-16 text-slate-100 font-sans"> {/* Replaced custom 'primary' and 'text-primary' */}
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", type: "tween" }}}
        className="relative py-12 mb-10 overflow-hidden"
      >
        {/* Background elements - replace custom colors with Tailwind defaults or ensure they are defined */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 via-sky-500/10 to-slate-800/20 z-0"></div>
        <div className="absolute inset-0 backdrop-blur-sm z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> {/* Replaced 'container-custom' */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
            <div className="text-center md:text-left w-full md:w-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeOut", type: "tween" }}}
                className="text-4xl md:text-5xl font-bold mb-2 break-words text-slate-50" /* Replaced font-heading */
              >
                {resumeData.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3, ease: "easeOut", type: "tween" }}}
                className="text-lg md:text-xl text-slate-300 mb-4" /* Replaced text-secondary */
              >
                {resumeData.title}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4, ease: "easeOut", type: "tween" }}}
                className="flex flex-wrap justify-center md:justify-start gap-4 text-sm"
              >
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-400"> {/* Replaced accent */}
                  {resumeData.contact.email}
                </span>
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-400"> {/* Replaced accent */}
                  {resumeData.contact.location}
                </span>
                <a 
                  href={`https://${resumeData.contact.portfolio}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 flex items-center gap-1 hover:bg-sky-500/30 transition-colors" /* Replaced highlight */
                >
                  {resumeData.contact.portfolio}
                  <FiExternalLink size={14} />
                </a>
                <a 
                  href={`https://${resumeData.contact.linkedin}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 flex items-center gap-1 hover:bg-sky-500/30 transition-colors" /* Replaced highlight */
                >
                  LinkedIn
                  <FiExternalLink size={14} />
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5, ease: "easeOut", type: "tween" }}}
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut", type: "tween" }}}
              whileTap={{ scale: 0.95, transition: { duration: 0.3, ease: "easeOut", type: "tween" }}}
              className="md:flex-shrink-0"
            >
              <a
                href="/resume.pdf" // Make sure this file exists in your public folder
                download="Miguel_Perez_Resume.pdf"
                // Basic button styling, replace btn-primary if it's custom
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                <FiDownload className="mr-2 inline-block align-middle" /> 
                <span className="inline-block align-middle">Download Resume PDF</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main content area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Replaced 'container-custom' */}
        {/* Tab navigation */}
        <div 
          className="mb-8 overflow-x-auto hide-scrollbar" // hide-scrollbar might need a custom CSS class if not from Tailwind plugin
          ref={tabsRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // CSS for hiding scrollbar
        >
          <div className="flex space-x-2 min-w-max pb-2"> {/* Added pb-2 for scrollbar space if visible */}
            <TabButton isActive={activeTab === 'about'} onClick={() => setActiveTab('about')} icon={<FiUser />} label="About"/>
            <TabButton isActive={activeTab === 'skills'} onClick={() => setActiveTab('skills')} icon={<FiCode />} label="Skills"/>
            <TabButton isActive={activeTab === 'experience'} onClick={() => setActiveTab('experience')} icon={<FiBriefcase />} label="Experience"/>
            <TabButton isActive={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={<FiBox />} label="Projects"/>
            <TabButton isActive={activeTab === 'education'} onClick={() => setActiveTab('education')} icon={<FiAward />} label="Education"/>
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // This key is crucial for AnimatePresence to detect changes
            variants={simpleFadeVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mt-8" // This class applies to the shell that fades in/out
          >
            {activeTab === 'about' && (
              // About section content
              <motion.div 
                // Using fadeInVariant for consistency, but could be simpler if only opacity
                initial={{ opacity: 1 }} // Start visible as parent (simpleFadeVariant) handles fade
                animate={{ opacity: 1 }}
                exit={fadeInVariant.exit}
                transition={fadeInVariant.animate.transition}
                className="bg-slate-800/50 p-6 rounded-xl shadow-lg" // Example 'card' styling
                layout // Add layout for consistency with other sections
              >
                <h2 className="text-2xl font-semibold mb-4 text-sky-400">About Me</h2> {/* Replaced highlight */}
                <p className="text-slate-300 leading-relaxed">{resumeData.summary}</p> {/* Replaced text-secondary */}
              </motion.div>
            )}

            {activeTab === 'skills' && (
              // Skills section - this was working well, keep its structure
              <motion.div 
                variants={fadeInVariant} // Skills section was fine with this
                initial="initial" 
                animate="animate" 
                exit="exit" 
                className="bg-slate-800/50 p-6 rounded-xl shadow-lg" // Example 'card' styling
                layout
              >
                <h2 className="text-2xl font-semibold mb-6 text-sky-400">Technical Skills</h2> {/* Replaced highlight */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <SkillCategoryButton isActive={selectedSkillCategory === 'languages'} onClick={() => setSelectedSkillCategory('languages')} label="Languages"/>
                  <SkillCategoryButton isActive={selectedSkillCategory === 'frameworksAndTools'} onClick={() => setSelectedSkillCategory('frameworksAndTools')} label="Frameworks & Tools"/>
                  <SkillCategoryButton isActive={selectedSkillCategory === 'systemsAndPlatforms'} onClick={() => setSelectedSkillCategory('systemsAndPlatforms')} label="Systems & Platforms"/>
                  <SkillCategoryButton isActive={selectedSkillCategory === 'competencies'} onClick={() => setSelectedSkillCategory('competencies')} label="Competencies"/>
                </div>
                <AnimatePresence mode="wait">
                  {/* Conditional rendering for skill categories */}
                  {/* Each category wrapper should have a key and animation variants */}
                  {selectedSkillCategory === 'languages' && (
                    <motion.div key="languages" variants={fadeInVariant} initial="initial" animate="animate" exit="exit" layout>
                      {renderSkillBars(resumeData.technicalSkills.languages, 'languages')}
                    </motion.div>
                  )}
                  {selectedSkillCategory === 'frameworksAndTools' && (
                     <motion.div key="frameworksAndTools" variants={fadeInVariant} initial="initial" animate="animate" exit="exit" layout>
                      {renderSkillBars(resumeData.technicalSkills.frameworksAndTools, 'frameworksAndTools')}
                    </motion.div>
                  )}
                  {selectedSkillCategory === 'systemsAndPlatforms' && (
                     <motion.div key="systemsAndPlatforms" variants={fadeInVariant} initial="initial" animate="animate" exit="exit" layout>
                      {renderSkillBars(resumeData.technicalSkills.systemsAndPlatforms, 'systemsAndPlatforms')}
                    </motion.div>
                  )}
                  {selectedSkillCategory === 'competencies' && (
                     <motion.div key="competencies" variants={fadeInVariant} initial="initial" animate="animate" exit="exit" layout>
                      {renderSkillBars(resumeData.technicalSkills.competencies, 'competencies')}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              // ***** PHASE 1 FLICKER TEST - EXPERIENCE *****
              <motion.div 
                initial={{ opacity: 1 }} // Start fully opaque relative to parent (simpleFadeVariant)
                animate={{ opacity: 1 }} // Stay fully opaque
                exit={fadeInVariant.exit} // Use exit from fadeInVariant
                transition={fadeInVariant.animate.transition} // Use transition from fadeInVariant for consistency
                className="bg-slate-800/50 p-6 rounded-xl shadow-lg" // Example 'card' styling
                layout // CRITICAL: Ensure layout prop is present
              >
                <h2 className="text-2xl font-semibold mb-6 text-sky-400">Professional Experience</h2> {/* Replaced highlight */}
                {renderTimeline()}
              </motion.div>
            )}

            {activeTab === 'projects' && (
              // ***** PHASE 1 FLICKER TEST - PROJECTS *****
              <motion.div 
                initial={{ opacity: 1 }} // Start fully opaque relative to parent
                animate={{ opacity: 1 }} // Stay fully opaque
                exit={fadeInVariant.exit}
                transition={fadeInVariant.animate.transition}
                className="bg-slate-800/50 p-6 rounded-xl shadow-lg" // Example 'card' styling
                layout // CRITICAL: Ensure layout prop is present
              >
                <h2 className="text-2xl font-semibold mb-4 text-sky-400">Projects & Initiatives</h2> {/* Replaced highlight */}
                <p className="text-slate-300 mb-4">Click on a project to see more details</p> {/* Replaced text-secondary */}
                {renderProjects()}
              </motion.div>
            )}

            {activeTab === 'education' && (
              // ***** PHASE 1 FLICKER TEST - EDUCATION *****
              <motion.div 
                initial={{ opacity: 1 }} // Start fully opaque relative to parent
                animate={{ opacity: 1 }} // Stay fully opaque
                exit={fadeInVariant.exit}
                transition={fadeInVariant.animate.transition}
                className="bg-slate-800/50 p-6 rounded-xl shadow-lg" // Example 'card' styling
                layout // CRITICAL: Ensure layout prop is present
              >
                <h2 className="text-2xl font-semibold mb-6 text-sky-400">Education</h2> {/* Replaced highlight */}
                {/* Education content - original structure was a div inside a motion.div.
                    The outer motion.div is now handling the main card animation.
                    The inner content can be simpler or have its own subtle animation if needed.
                */}
                <div className="glass-effect rounded-xl p-6 backdrop-blur-sm bg-slate-700/30"> {/* Adjusted styling */}
                  <motion.div // This inner motion.div can have its own animation if desired, e.g. content slide-in
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.1 }} // Slight delay after card appears
                    // layout // Only if its own content changes dynamically causing size change
                  >
                    <h3 className="text-xl font-medium text-slate-100">{resumeData.education.degree}</h3> {/* Replaced text-primary */}
                    <p className="text-md font-semibold text-sky-300 mb-2">{resumeData.education.institution}</p> {/* Replaced highlight_alt */}
                    <p className="text-slate-300"><span className="text-sky-300">{resumeData.education.location}</span> • Expected graduation: {resumeData.education.graduationDate}</p>
                    <p className="text-slate-100 font-medium mt-4">{resumeData.education.gpa}</p>
                    <div className="mt-4 p-4 rounded-lg bg-slate-700/50"> {/* Replaced secondary/10 */}
                      <h4 className="text-md font-medium mb-2 text-slate-200">Coursework</h4>
                      <p className="text-sm text-slate-300">{resumeData.education.relevantCoursework.replace('Relevant Coursework: ', '')}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Tab button component
interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, icon, label }) => (
  <button
    className={`px-5 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 whitespace-nowrap ${
      isActive 
        ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg active-tab' // Replaced highlight, shadow-glow-sm
        : 'bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-600/70' // Replaced glass-effect, secondary/30
    }`}
    onClick={onClick}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </button>
);

// Skill category button component
interface SkillCategoryButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const SkillCategoryButton: React.FC<SkillCategoryButtonProps> = ({ isActive, onClick, label }) => (
  <button
    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
      isActive 
        ? 'bg-sky-500 text-white' // Replaced highlight
        : 'bg-slate-600/50 text-slate-300 hover:bg-slate-500/70' // Replaced secondary/20, text-secondary
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default ResumePage;
