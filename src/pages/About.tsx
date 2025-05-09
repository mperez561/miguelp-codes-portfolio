import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

const About = () => {
  const skills = [
    {
      category: 'Programming Languages',
      items: ['Java', 'C++', 'Python', 'Dart', 'SQL', 'HTML/CSS']
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React', 'Flutter', 'Node.js', 'Express', 'Streamlit', 'Tailwind CSS']
    },
    {
      category: 'Cloud & Databases',
      items: ['Firebase', 'SQL Server']
    },
    {
      category: 'Microsoft Suite',
      items: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'Teams', 'SharePoint', 'OneDrive']
    },
    {
      category: 'Business Tools',
      items: ['Microsoft Dynamics Business Central', 'SAP Business ByDesign', 'Power BI', 'Power Automate', 'Power Query']
    },
    {
      category: 'Design & Collaboration',
      items: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Adobe Acrobat', 'Adobe Premiere', 'Git', 'Agile/Scrum']
    }
  ];
  
  const education = [
    {
      degree: 'B.S. in Computer Science',
      institution: 'Cal Poly Pomona',
      duration: '2025',
      description: 'Focused on software engineering, machine learning, artificial intelligence, and database systems.'
    }
  ];

  // Animation settings without any flashing effect
  const fadeInVariant = {
    initial: { 
      opacity: 0,
      y: 20 
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        type: "tween"
      }
    }
  };
  
  // Container variant for staggered animations
  const containerVariant = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren"
      }
    }
  };
  
  return (
    <div className="bg-primary min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 -right-20 w-1/2 h-screen bg-gradient-radial from-accent/10 to-transparent opacity-40 -z-10"></div>
      <div className="absolute -left-20 top-1/4 w-1/3 h-screen bg-gradient-radial from-highlight/10 to-transparent opacity-30 -z-10"></div>
      <div className="absolute -right-40 bottom-0 w-2/3 h-screen bg-gradient-radial from-highlight_alt/10 to-transparent opacity-30 -z-10"></div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInVariant}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">About Me</h1>
          <p className="text-text-secondary max-w-3xl mx-auto">
            A full stack developer with a passion for creating efficient, user-friendly solutions to complex problems.
          </p>
        </motion.div>
        
        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Profile Image */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInVariant}
            className="col-span-1"
          >
            <div className="glass-effect rounded-xl overflow-hidden">
              <div className="p-8 flex items-center justify-center bg-gradient-to-r from-highlight to-highlight_alt">
                <div className="w-48 h-48 rounded-full border-4 border-white/20 overflow-hidden flex items-center justify-center bg-secondary">
                  {/* Try both paths to see which one works */}
                  <img 
                    src="/images/profile.png" 
                    alt="Miguel Perez" 
                    className="w-full h-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = '/profile.png';
                    }}
                  />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-text-primary">Miguel Perez</h2>
                <p className="text-text-secondary mb-4">Full Stack Developer</p>
                <div className="text-sm text-text-secondary">
                  <p className="mb-2">Location: Southern California</p>
                  <p className="mb-2">Email: perezmiguel561@gmail.com</p>
                  <p className="mb-2">Phone: (909) 636-9528</p>
                </div>
                <a
                  href="/resume.pdf"
                  download="Miguel_Perez_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center mt-4"
                >
                  <span className="flex items-center justify-center">
                    <FiDownload className="mr-2" /> Download Résumé
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - About Text */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInVariant}
            className="col-span-1 lg:col-span-2"
          >
            <div className="card h-full">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Professional Summary</h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                I'm a full stack developer with a strong mix of technical and business skills.  
                  My experience spans across enterprise resource planning (ERP) systems, web and mobile application 
                  development, data visualization, and automated workflows that save time and reduce friction in day-to-day operations.
                </p>
                <p>
                  With a background in computer science from Cal Poly Pomona, I've developed a strong foundation in 
                  software engineering principles while maintaining a focus on practical business applications. 
                  This dual perspective allows me to create technical solutions that directly address business needs 
                  and enhance operational efficiency.
                </p>
                <p>
                I'm comfortable working at all levels of the tech stack, whether its developing a bespoke piece of software or using 
                tools like the Microsoft Power Platform to build quick, no-code solutions. I've worked with systems like Microsoft 
                Dynamics Business Central and SAP Business ByDesign.
                </p>
                <p>
                I enjoy creating things that are both useful and easy to use. Whether it's building an app, visualizing data, or 
                automating a workflow, I aim for solutions that are efficient, reliable, and built to last.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Skills Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariant}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center gradient-text">Technical Skills</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariant}
          >
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                variants={fadeInVariant}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 4px 20px rgba(14, 165, 233, 0.1)',
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="glass-effect rounded-xl p-6 backdrop-blur-lg border border-white/5"
              >
                <h3 className="text-xl font-semibold mb-4 text-highlight">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span key={skill} className="bg-accent/20 text-accent px-3 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Education Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariant}
        >
          <h2 className="text-2xl font-bold mb-8 text-center gradient-text">Education</h2>
          <motion.div 
            className="max-w-3xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariant}
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={fadeInVariant}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 4px 20px rgba(14, 165, 233, 0.1)',
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="glass-effect rounded-xl p-6 backdrop-blur-lg border border-white/5 mb-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <h3 className="text-xl font-semibold text-highlight">{edu.degree}</h3>
                  <span className="text-text-secondary text-sm mt-1 md:mt-0">{edu.duration}</span>
                </div>
                <p className="text-text-primary mb-2">{edu.institution}</p>
                <p className="text-text-secondary">{edu.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 