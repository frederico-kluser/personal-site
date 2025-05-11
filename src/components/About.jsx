import { useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

function About({ isActive, openTestimonialModal }) {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Daniel Lewis',
      avatar: 'https://i.postimg.cc/zGDHfn3G/avatar-1.png',
      text: "Richard was hired to create a corporate identity. It's modern, clean and with a beautiful design that got a lot of praises from colleagues and visitors. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of client."
    },
    {
      id: 2,
      name: 'Jessica Miller',
      avatar: 'https://i.postimg.cc/DwY0yHtx/avatar-2.png',
      text: "Working with Richard has been an absolute pleasure. I was impressed with his attention to detail, his web design skills and his professional approach to our timelines and processes."
    },
    {
      id: 3,
      name: 'Emily Evans',
      avatar: 'https://i.postimg.cc/fRFWhX9F/avatar-3.png',
      text: "I couldn't be happier with the website that Richard created for us. His attention to detail and creativity is unmatched. Our clients frequently compliment the design, and it has significantly improved our brand image."
    },
    {
      id: 4,
      name: 'Henry Williams',
      avatar: 'https://i.postimg.cc/zXv1Xv81/avatar-4.png',
      text: "I was overwhelmed with the thought of redesigning my online store, but Richard made the process seamless. The site is not only visually appealing but also optimized for conversions. I've seen a 50% increase in traffic since the launch!"
    }
  ]);

  return (
    <article className={`about ${isActive ? 'active' : ''}`} data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        <p>Como Desenvolvedor de IA no Grupo Fleury, crio e mantenho ferramentas de software de alta qualidade que utilizam inteligência artificial para aprimorar os serviços e operações da empresa. Trabalho com uma equipe de profissionais talentosos no desenvolvimento de chatbots, sistemas de análise de dados e interfaces amigáveis que atendem às necessidades e expectativas de clientes internos e externos.</p>
        <p>Tenho uma sólida formação em engenharia de software, com graduação incompleta em Ciência da Computação pela Universidade do Oeste de Santa Catarina e várias certificações da Microsoft. Tenho experiência no desenvolvimento de aplicações web e mobile para diversos domínios, como e-commerce, marketing e educação, utilizando tecnologias como Javascript, CSS, Git, Ionic, React, React Native, NodeJs, Express e MongoDB. Sou proficiente em HTML5, Angular e MySQL, e possuo um entendimento sólido de estruturas de dados, algoritmos, padrões de design, concorrência, multitarefa, escalabilidade e arquitetura corporativa. Sou apaixonado por criar soluções e métodos inovadores que resolvam problemas e melhorem a qualidade e o desempenho dos produtos de software. Também sou fluente em português, inglês e espanhol.</p>
      </section>

      <section className="service">
        <h3 className="h3 service-title">What I'm doing</h3>

        <ul className="service-list">
          <li className="service-item">
            <div className="service-icon-box">
              <img src="https://i.postimg.cc/4389jZkP/icon-design.png" alt="icon" width="40" />
            </div>

            <div className="service-content-box">
              <h4 className="h4 service-item-title">Web Design</h4>
              <p className="service-item-text">The most modern and high-quality design made at a professional level.</p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-icon-box">
              <img src="https://i.postimg.cc/ZqgqrqzG/icon-dev.png" alt="icon" width="40" />
            </div>

            <div className="service-content-box">
              <h4 className="h4 service-item-title">Web development</h4>
              <p className="service-item-text">High-quality development of sites at the professional level.</p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-icon-box">
              <img src="https://i.postimg.cc/xjLdzYxZ/icon-app.png" alt="icon" width="40" />
            </div>

            <div className="service-content-box">
              <h4 className="h4 service-item-title">Mobile apps</h4>
              <p className="service-item-text">Professional development of applications for iOS and Android.</p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-icon-box">
              <img src="https://i.postimg.cc/0NL8zHpx/icon-photo.png" alt="icon" width="40" />
            </div>

            <div className="service-content-box">
              <h4 className="h4 service-item-title">Photography</h4>
              <p className="service-item-text">I make high-quality photos of any category at a professional level.</p>
            </div>
          </li>
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
            <SwiperSlide>
              <div className="clients-item">
                <a href="#"><img src="https://i.postimg.cc/YqfKyG66/logo-1-color.png" alt="logo" /></a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="clients-item">
                <a href="#"><img src="https://i.postimg.cc/fWm6JtgG/logo-2-color.png" alt="logo" /></a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="clients-item">
                <a href="#"><img src="https://i.postimg.cc/Bb07xpwd/logo-3-color.png" alt="logo" /></a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="clients-item">
                <a href="#"><img src="https://i.postimg.cc/hv1yMmkh/logo-4-color.png" alt="logo" /></a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="clients-item">
                <a href="#"><img src="https://i.postimg.cc/ry1P86Dc/logo-5-color.png" alt="logo" /></a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="clients-item">
                <a href="#"><img src="https://i.postimg.cc/SsWDN8NV/logo-6-color.png" alt="logo" /></a>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </article>
  );
}

export default About;