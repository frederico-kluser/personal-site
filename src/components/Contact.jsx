import { useState, useRef } from 'react';
import { motion, useAnimate, useInView } from 'motion/react';
import { contactTransitions } from '../animations/pageTransitions';

function Contact({ isActive }) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  });

  const [formValid, setFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Refs for animations
  const mapRef = useRef(null);
  const mapInView = useInView(mapRef, { once: true, amount: 0.3 });

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, amount: 0.3 });

  // Animation for submit button
  const [scope, animate] = useAnimate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Check if all fields have values
    const updatedData = { ...formData, [name]: value };
    const isValid = Object.values(updatedData).every(val => val.trim() !== '');
    setFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, you would send the form data to a server here
    setIsSubmitting(false);
    setIsComplete(true);

    // Checkmark animation
    animate([
      ['.checkmark', { opacity: 1, pathLength: 1 }, { duration: 0.5 }]
    ]);

    // Reset form after showing success message
    setTimeout(() => {
      setIsComplete(false);
      setFormData({
        fullname: '',
        email: '',
        message: ''
      });
      setFormValid(false);

      // Reset checkmark
      animate([
        ['.checkmark', { opacity: 0, pathLength: 0 }, { duration: 0 }]
      ]);
    }, 2000);
  };

  // Input focus animations
  const handleFocus = (e) => {
    animate([
      [e.target, { scale: 1.01, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }, { duration: 0.2 }]
    ]);
  };

  const handleBlur = (e) => {
    animate([
      [e.target, { scale: 1, boxShadow: 'none' }, { duration: 0.2 }]
    ]);
  };

  return (
    <motion.article
      className={`contact ${isActive ? 'active' : ''}`}
      data-page="contact"
      initial="initial"
      animate={isActive ? "animate" : "initial"}
      exit="exit"
      variants={contactTransitions}
    >
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="h2 article-title">Contact</h2>
      </motion.header>

      <motion.section
        className="mapbox"
        data-mapbox
        ref={mapRef}
        initial={{ opacity: 0, y: 30 }}
        animate={mapInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <motion.figure
          whileHover={{
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            transition: { type: 'spring', stiffness: 200, damping: 30 }
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30971078.57173514!2d-43.17207635!3d-15.7934039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c59c7ebcc28cf%3A0x295a1506f2293e63!2sBrazil!5e0!3m2!1sen!2sbr!4v1649961504399!5m2!1sen!2sbr"
            width="400"
            height="300"
            loading="lazy"
            title="Digital Nomad - Working from anywhere"
            style={{ pointerEvents: 'none' }}
          ></iframe>
        </motion.figure>
        <motion.div
          className="digital-nomad-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            transition: { type: 'spring', stiffness: 300, damping: 10 }
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <ion-icon name="globe-outline"></ion-icon>
          </motion.div>
          <span>Digital Nomad - Working from anywhere</span>
        </motion.div>
      </motion.section>

      <motion.section
        className="contact-form"
        ref={formRef}
        initial={{ opacity: 0, y: 30 }}
        animate={formInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.h3
          className="h3 form-title"
          initial={{ opacity: 0, x: -30 }}
          animate={formInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Contact Form
        </motion.h3>

        <motion.form
          className="form"
          onSubmit={handleSubmit}
          ref={scope}
        >
          <div className="input-wrapper">
            <motion.input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              value={formData.fullname}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileFocus={{ borderColor: '#03A062' }}
            />
            <motion.input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileFocus={{ borderColor: '#03A062' }}
            />
          </div>

          <motion.textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileFocus={{ borderColor: '#03A062' }}
          ></motion.textarea>

          <motion.button
            className="form-btn"
            type="submit"
            disabled={!formValid || isSubmitting}
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={!isSubmitting && !isComplete ? {
              scale: 1.05,
              boxShadow: '0 5px 15px rgba(3, 160, 98, 0.3)',
              transition: { type: 'spring', stiffness: 400, damping: 10 }
            } : {}}
            whileTap={!isSubmitting && !isComplete ? { scale: 0.95 } : {}}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ display: 'inline-block', marginRight: '8px' }}
              >
                <ion-icon name="sync-outline"></ion-icon>
              </motion.div>
            ) : isComplete ? (
              <motion.svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                style={{ display: 'inline-block', marginRight: '8px' }}
              >
                <motion.path
                  className="checkmark"
                  d="M3,12 L9,18 L21,6"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                  initial={{ opacity: 0, pathLength: 0 }}
                />
              </motion.svg>
            ) : (
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <ion-icon name="paper-plane"></ion-icon>
              </motion.div>
            )}
            <span>{isSubmitting ? 'Sending...' : isComplete ? 'Sent!' : 'Send Message'}</span>
          </motion.button>
        </motion.form>
      </motion.section>

      {/* Background decoration */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(3, 160, 98, 0.1) 0%, rgba(3, 160, 98, 0) 70%)',
          borderRadius: '50%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.article>
  );
}

export default Contact;