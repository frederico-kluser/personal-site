import { useContext, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';

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
import { aboutTransitions } from '../animations/pageTransitions';

// Import reusable animated components
import SectionHeader from './SectionHeader';
import AnimatedSection from './AnimatedSection';
import AnimatedList from './AnimatedList';

function About({ isActive, openTestimonialModal }) {
  const { about, testimonials, services, clients } = useContext(DataContext);
  const { t } = useTranslation();

  // Scroll progress for parallax effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Custom renderer for service items
  const renderServiceItem = (service, index, animationProps) => (
    <motion.li
      className="service-item"
      key={service.id}
      {...animationProps}
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
  );

  return (
    <motion.article
      className={`about ${isActive ? 'active' : ''}`}
      data-page="about"
      initial="initial"
      animate={isActive ? "animate" : "initial"}
      exit="exit"
      variants={aboutTransitions}
    >
      {/* About Header */}
      <SectionHeader
        title={about.title}
        delay={0}
      />

      {/* About Text */}
      <AnimatedSection
        className="about-text"
        delay={0.2}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
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
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection
        className="service"
        delay={0.3}
      >
        <SectionHeader
          title={services.title}
          tagName="h3"
          delay={0.1}
        />

        <AnimatedList
          className="service-list"
          tag="ul"
          itemTag="li"
          delay={0.2}
          staggerDelay={0.1}
          itemInitial={{ opacity: 0, y: 20 }}
          itemAnimate={{ opacity: 1, y: 0 }}
          renderItem={renderServiceItem}
          items={services.items}
        />
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection
        className="testimonials"
        delay={0.4}
      >
        <SectionHeader
          title="Testimonials"
          tagName="h3"
          delay={0.1}
        />

        <motion.div
          className="testimonials-swiper-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
                  layoutId={`testimonial-card-${testimonial.id}`}
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
                      layoutId={`testimonial-avatar-${testimonial.id}`}
                    />
                  </figure>

                  <motion.h4
                    className="h4 testimonials-item-title"
                    layoutId={`testimonial-name-${testimonial.id}`}
                  >
                    {testimonial.name}
                  </motion.h4>

                  <div className="testimonials-text">
                    <motion.p layoutId={`testimonial-text-${testimonial.id}`}>
                      {testimonial.text}
                    </motion.p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </AnimatedSection>

      {/* Clients Section */}
      <AnimatedSection
        className="clients"
        delay={0.5}
      >
        <SectionHeader
          title="Clients"
          tagName="h3"
          delay={0.1}
        />

        <motion.div
          className="clients-swiper-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
      </AnimatedSection>

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