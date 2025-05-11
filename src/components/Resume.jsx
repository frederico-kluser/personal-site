import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { pageTransitions } from '../animations/pageTransitions';

function Resume({ isActive }) {
  // Refs for scroll animations
  const educationRef = useRef(null);
  const educationInView = useInView(educationRef, { once: true, amount: 0.3 });

  const experienceRef = useRef(null);
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.3 });

  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.3 });

  // Progress line animation for timelines
  const { scrollYProgress } = useScroll();
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.article
      className={`resume ${isActive ? 'active' : ''}`}
      data-page="resume"
      initial="initial"
      animate={isActive ? "animate" : "initial"}
      exit="exit"
      variants={pageTransitions}
    >
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="h2 article-title">Resume</h2>
      </motion.header>

      <motion.section
        className="timeline"
        ref={educationRef}
        initial={{ opacity: 0 }}
        animate={educationInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="title-wrapper"
          initial={{ opacity: 0, x: -30 }}
          animate={educationInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="icon-box"
            whileHover={{
              rotate: 10,
              scale: 1.1,
              boxShadow: '0 0 10px rgba(3, 160, 98, 0.5)',
              transition: { type: 'spring', stiffness: 400, damping: 10 }
            }}
          >
            <ion-icon name="book-outline"></ion-icon>
          </motion.div>
          <h3 className="h3">Education</h3>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Timeline connecting line with animation */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '7px',
              width: '2px',
              background: 'var(--matrix-green)',
              transformOrigin: 'top',
              scaleY: educationInView ? 1 : 0
            }}
            transition={{ duration: 1.5 }}
          />

          <ol className="timeline-list">
            {[
              {
                title: "ESPM - Escola Superior de Propaganda e Marketing",
                period: "2002 — 2006",
                text: "Bachelor's degree in Advertising with specialization in Digital Media, where I developed a strong foundation in marketing, consumer psychology, and early web design principles."
              },
              {
                title: "IED - Istituto Europeo di Design",
                period: "2008 — 2010",
                text: "Post-graduate program in Digital Experience Design, focused on interaction design, usability, and early user-centered design methodologies."
              },
              {
                title: "Nielsen Norman Group",
                period: "2016",
                text: "UX Certification program, comprehensive training in user research, information architecture, interaction design, and usability evaluation methods from the industry's leading UX research organization."
              }
            ].map((item, index) => (
              <motion.li
                className="timeline-item"
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={educationInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.2) }}
                whileHover={{
                  x: 5,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
              >
                <motion.h4
                  className="h4 timeline-item-title"
                  initial={{ color: "#fff" }}
                  whileHover={{ color: "var(--matrix-green)" }}
                >
                  {item.title}
                </motion.h4>
                <motion.span
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.period}
                </motion.span>
                <motion.p
                  className="timeline-text"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.text}
                </motion.p>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.section>

      <motion.section
        className="timeline"
        ref={experienceRef}
        initial={{ opacity: 0 }}
        animate={experienceInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="title-wrapper"
          initial={{ opacity: 0, x: -30 }}
          animate={experienceInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="icon-box"
            whileHover={{
              rotate: 10,
              scale: 1.1,
              boxShadow: '0 0 10px rgba(3, 160, 98, 0.5)',
              transition: { type: 'spring', stiffness: 400, damping: 10 }
            }}
          >
            <ion-icon name="briefcase-outline"></ion-icon>
          </motion.div>
          <h3 className="h3">Experience</h3>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Timeline connecting line with animation */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '7px',
              width: '2px',
              background: 'var(--matrix-green)',
              transformOrigin: 'top',
              scaleY: experienceInView ? 1 : 0
            }}
            transition={{ duration: 2 }}
          />

          <ol className="timeline-list">
            {[
              {
                title: "Senior UX Designer at Peloton Interactive",
                period: "2020 — 2023",
                text: "Led UX design for Peloton's digital subscription products, designing features that increased user engagement by 35%. Established the design system that improved design consistency and development efficiency."
              },
              {
                title: "UX Lead at Claro Brazil",
                period: "2016 — 2020",
                text: "Directed UX strategy for Claro's customer-facing digital products, including the award-winning Minha Claro app. Managed a team of 5 designers and facilitated cross-functional collaboration between design, product, and engineering."
              },
              {
                title: "Interactive Designer at Livelo",
                period: "2012 — 2016",
                text: "Designed user interfaces for Brazil's largest loyalty program platform. Conducted extensive user research and usability testing that informed the redesign of key user journeys, resulting in a 28% increase in redemption rates."
              },
              {
                title: "Web Designer at Pão de Açúcar",
                period: "2008 — 2012",
                text: "Created digital experiences for one of Brazil's largest retail groups, focusing on e-commerce interfaces and promotional campaigns. Implemented A/B testing practices that optimized conversion funnels."
              }
            ].map((item, index) => (
              <motion.li
                className="timeline-item"
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={experienceInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.15) }}
                whileHover={{
                  x: 5,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
              >
                <motion.h4
                  className="h4 timeline-item-title"
                  initial={{ color: "#fff" }}
                  whileHover={{ color: "var(--matrix-green)" }}
                >
                  {item.title}
                </motion.h4>
                <motion.span
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.period}
                </motion.span>
                <motion.p
                  className="timeline-text"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.text}
                </motion.p>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.section>

      <motion.section
        className="skill"
        ref={skillsRef}
        initial={{ opacity: 0, y: 30 }}
        animate={skillsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <motion.h3
          className="h3 skills-title"
          initial={{ opacity: 0, y: 20 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My skills
        </motion.h3>

        <motion.ul
          className="skills-list content-card"
          initial={{ opacity: 0, y: 20 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { name: "User Research & Testing", value: 90 },
            { name: "Interaction Design", value: 85 },
            { name: "Figma & Design Tools", value: 95 },
            { name: "Design Systems", value: 80 },
            { name: "Prototyping", value: 90 },
            { name: "Front-end Development", value: 70 }
          ].map((skill, index) => (
            <motion.li
              className="skills-item"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              whileHover={{
                y: -5,
                transition: { type: 'spring', stiffness: 300, damping: 10 }
              }}
            >
              <div className="title-wrapper">
                <motion.h5
                  className="h5"
                  whileHover={{ color: 'var(--matrix-green)', x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.name}
                </motion.h5>
                <motion.data
                  value={skill.value}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.value}%
                </motion.data>
              </div>
              <div className="skills-progress-bg">
                <motion.div
                  className="skills-progress-fill"
                  initial={{ width: 0 }}
                  animate={skillsInView ? { width: `${skill.value}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  whileHover={{
                    backgroundColor: 'var(--matrix-green-light)',
                    transition: { duration: 0.2 }
                  }}
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* Background decoration */}
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(3, 160, 98, 0.1) 0%, rgba(3, 160, 98, 0) 70%)',
          borderRadius: '50%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.article>
  );
}

export default Resume;