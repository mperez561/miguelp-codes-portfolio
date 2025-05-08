import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl font-bold gradient-text">
              Miguel Perez
            </Link>
            <p className="text-gray-400 mt-2 text-sm">
              Full Stack Developer based in Southern California
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/mperez561/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-highlight transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/miguel-perez-61612b184/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-highlight transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </a>
            <a 
              href="mailto:perezmiguel561@gmail.com" 
              className="text-gray-400 hover:text-highlight transition-colors"
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
            <a 
              href="tel:9096369528" 
              className="text-gray-400 hover:text-highlight transition-colors"
              aria-label="Phone"
            >
              <FiPhone size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Miguel Perez. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-gray-400 hover:text-highlight text-sm transition-colors">
              Home
            </Link>
            <Link to="/projects" className="text-gray-400 hover:text-highlight text-sm transition-colors">
              Projects
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-highlight text-sm transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-highlight text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 