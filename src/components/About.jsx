import { useContext } from 'react';

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

function About({ isActive, openTestimonialModal }) {
  const { about, testimonials, services, clients } = useContext(DataContext);

  return (
    <article className={`about ${isActive ? 'active' : ''}`} data-page="about">
      <header>
        <h2 className="h2 article-title">{about.title}</h2>
      </header>

      <section className="about-text">
        {about.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section className="service">
        <h3 className="h3 service-title">{services.title}</h3>

        <ul className="service-list">
          {services.items.map(service => (
            <li className="service-item" key={service.id}>
              <div className="service-icon-box">
                <img src={service.icon} alt="icon" width="40" />
              </div>

              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service.title}</h4>
                <p className="service-item-text">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="testimonials">
        <h3 className="h3 testimonials-title">Testimonials</h3>

        <div className="testimonials-swiper-container">
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
                <div
                  className="content-card testimonial-card"
                  onClick={() => openTestimonialModal(testimonial)}
                >
                  <figure className="testimonials-avatar-box">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width="60"
                      height="60"
                      style={{ objectFit: "cover" }}
                    />
                  </figure>

                  <h4 className="h4 testimonials-item-title">{testimonial.name}</h4>

                  <div className="testimonials-text">
                    <p>{testimonial.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="clients">
        <h3 className="h3 clients-title">Clients</h3>

        <div className="clients-swiper-container">
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
                <div className="clients-item">
                  <a href={client.url}><img src={client.logo} alt="logo" /></a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </article>
  );
}

export default About;