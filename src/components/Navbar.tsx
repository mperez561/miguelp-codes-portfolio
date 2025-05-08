import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll events for changing navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Disable scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      {/* Gradient background with conditional opacity */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 -z-10 ${
          scrolled ? 'opacity-90' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 backdrop-blur-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"></div>
        {/* Subtle bottom border that won't create a white line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5"></div>
      </div>
      
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center group relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <span className="gradient-text text-2xl font-bold">Miguel Perez</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-highlight to-highlight_alt group-hover:w-full transition-all duration-300"></span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <Link 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-highlight ${
                  location.pathname === link.path ? 'text-highlight' : 'text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-highlight to-highlight_alt transition-all duration-300 
                  ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}>
                </span>
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/Miguel_Perez_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center relative overflow-hidden group transition-all duration-300"
            >
              <span className="relative z-10">Résumé</span>
              <span className="absolute inset-0 bg-gradient-to-r from-highlight to-highlight_alt opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none relative z-50" 
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className={`p-3 rounded-md ${isOpen ? 'bg-highlight' : 'glass-effect hover:bg-secondary/60'} transition-all duration-300`}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
        </button>
      </div>

      {/* Mobile Menu - Fixed position with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-primary/95 backdrop-blur-lg overflow-y-auto"
          >
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center min-h-screen w-full px-6 py-20"
            >
              <div className="flex flex-col items-center justify-center gap-6 w-full max-w-sm">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="w-full"
                  >
                    <Link 
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-xl font-medium py-4 px-6 rounded-md block text-center transition-all ${
                        location.pathname === link.path 
                          ? 'bg-gradient-to-r from-highlight to-highlight_alt text-white shadow-lg shadow-highlight/20' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                  className="w-full mt-6"
                >
                  <a
                    href="/Miguel_Perez_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-medium py-4 px-6 bg-gradient-to-r from-highlight to-highlight_alt text-white rounded-md block text-center shadow-lg shadow-highlight/20"
                    onClick={() => setIsOpen(false)}
                  >
                    Resume
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 