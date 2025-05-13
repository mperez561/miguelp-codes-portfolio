import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Replace these with your own EmailJS service ID, template ID and public key
    const serviceId = 'service_1c12k6o';
    const templateId = 'template_iv37che';
    const publicKey = 'Ra0oTlWs_12b8O4YR';
    
    // Check if the form reference exists
    if (!formRef.current) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }
    
    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setIsSubmitting(false);
        setSubmitStatus('success');
        
        // Reset form after successful submission
        setFormData({
          user_name: '',
          user_email: '',
          subject: '',
          message: ''
        });
        
        // Reset status after a few seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        setIsSubmitting(false);
        setSubmitStatus('error');
      });
  };
  
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
  
  const slideInLeftVariant = {
    hidden: { 
      opacity: 0,
      x: -20 
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const slideInRightVariant = {
    hidden: { 
      opacity: 0,
      x: 20 
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
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
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Get In Touch</h1>
          <p className="text-text-secondary max-w-3xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={slideInLeftVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <div className="glass-effect rounded-xl p-6 backdrop-blur-lg border border-white/5 h-full">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-accent/20 p-3 rounded-full mr-4">
                    <FiMail className="text-highlight" size={20} />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-medium mb-1">Email</h3>
                    <a 
                      href="mailto:perezmiguel561@gmail.com" 
                      className="text-text-secondary hover:text-highlight transition-colors"
                    >
                      perezmiguel561@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent/20 p-3 rounded-full mr-4">
                    <FiLinkedin className="text-highlight" size={20} />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-medium mb-1">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/in/miguel-perez-61612b184/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-text-secondary hover:text-highlight transition-colors"
                    >
                      miguel-perez-61612b184
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent/20 p-3 rounded-full mr-4">
                    <FiGithub className="text-highlight" size={20} />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-medium mb-1">GitHub</h3>
                    <a 
                      href="https://github.com/mperez561/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-text-secondary hover:text-highlight transition-colors"
                    >
                      mperez561
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4 text-highlight">Location</h3>
                <p className="text-text-primary">Based in Southern California</p>
                <p className="text-text-secondary mt-2">
                  Available for remote work and local opportunities
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            variants={slideInRightVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            <div className="glass-effect rounded-xl p-6 backdrop-blur-lg border border-white/5">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Send Me a Message</h2>
              
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6"
                >
                  <p className="text-green-400">
                    Your message has been sent successfully! I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : submitStatus === 'error' ? (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-400">
                    There was an error sending your message. Please try again or contact me directly via email at perezmiguel561@gmail.com.
                  </p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="user_name" className="block text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      required
                      className="w-full bg-secondary/60 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-highlight/50"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="user_email" className="block text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleChange}
                      required
                      className="w-full bg-secondary/60 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-highlight/50"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-secondary/60 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-highlight/50"
                    placeholder="Subject of your message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-secondary/60 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-highlight/50"
                    placeholder="Your message"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message <FiSend className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 