import { useContext, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import data store
import { DataContext } from '../context/DataContext';

// Import animation variants
import { pageTransitions, staggerContainer, fadeInUpItem } from '../animations/pageTransitions';

function About({ isActive, openTestimonialModal }) {
  const { about, testimonials, services, clients } = useContext(DataContext);

  // Refs for scroll animations
  const serviceRef = useRef(null);
  const serviceInView = useInView(serviceRef, { once: true, amount: 0.3 });

  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });

  const clientsRef = useRef(null);
  const clientsInView = useInView(clientsRef, { once: true, amount: 0.3 });

  // Scroll progress for parallax effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.article
      className={`about ${isActive ? 'active' : ''}`}
      data-page="about"
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
        <h2 className="h2 article-title">{about.title}</h2>
      </motion.header>

      <motion.section className="about-text">
        {about.description.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + (index * 0.1),
              duration: 0.5
            }}
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.section>

      <motion.section
        className="service"
        ref={serviceRef}
        style={{ opacity: serviceInView ? 1 : 0, y: serviceInView ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3
          className="h3 service-title"
          initial={{ opacity: 0, y: 20 }}
          animate={serviceInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {services.title}
        </motion.h3>

        <motion.ul
          className="service-list"
          variants={staggerContainer}
          initial="initial"
          animate={serviceInView ? "animate" : "initial"}
        >
          {services.items.map((service, index) => (
            <motion.li
              className="service-item"
              key={service.id}
              variants={fadeInUpItem}
              custom={index}
              transition={{
                delay: index * 0.1,
                duration: 0.5
              }}
            >
              <motion.div
                className="service-icon-box"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: 'spring', stiffness: 300, damping: 10 }
                }}
              >
                <img src={service.icon} alt="icon" width="40" />
              </motion.div>

              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service.title}</h4>
                <p className="service-item-text">{service.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        className="testimonials"
        ref={testimonialsRef}
        style={{ opacity: testimonialsInView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3
          className="h3 testimonials-title"
          initial={{ opacity: 0, y: 20 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Testimonials
        </motion.h3>

        <motion.div
          className="testimonials-swiper-container"
          initial={{ opacity: 0, y: 30 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
                centeredSlides: false,
              }
            }}
            className="testimonials-swiper"
          >
            {testimonials.map(testimonial => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  className="content-card testimonial-card"
                  onClick={() => openTestimonialModal(testimonial)}
                  whileHover={{
                    y: -10,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.19)',
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                >
                  <figure className="testimonials-avatar-box">
                    <motion.img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width="60"
                      height="60"
                      style={{ objectFit: "cover" }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </figure>

                  <h4 className="h4 testimonials-item-title">{testimonial.name}</h4>

                  <div className="testimonials-text">
                    <p>{testimonial.text}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </motion.section>

      <motion.section
        className="clients"
        ref={clientsRef}
        style={{ opacity: clientsInView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3
          className="h3 clients-title"
          initial={{ opacity: 0, y: 20 }}
          animate={clientsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Clients
        </motion.h3>

        <motion.div
          className="clients-swiper-container"
          initial={{ opacity: 0, y: 30 }}
          animate={clientsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            centeredSlides={false}
            allowTouchMove={true}
            watchSlidesProgress={true}
            breakpoints={{
              580: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              }
            }}
            className="clients-swiper"
          >
            {clients.map(client => (
              <SwiperSlide key={client.id}>
                <motion.div
                  className="clients-item"
                  whileHover={{
                    scale: 1.1,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                >
                  <a href={client.url}>
                    <motion.img
                      src={client.logo}
                      alt="logo"
                      initial={{ filter: 'grayscale(100%)' }}
                      whileHover={{
                        filter: 'grayscale(0%)',
                        transition: { duration: 0.3 }
                      }}
                    />
                  </a>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </motion.section>

      {/* Parallax background element */}
      <motion.div
        style={{
          y,
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(3, 160, 98, 0.2) 0%, rgba(3, 160, 98, 0) 70%)',
          borderRadius: '50%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
    </motion.article>
  );
}

export default About;