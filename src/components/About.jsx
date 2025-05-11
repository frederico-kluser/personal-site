import { useState, useEffect } from 'react';

function About({ isActive }) {
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
  
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTestimonialModal = (testimonial) => {
    setActiveTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const closeTestimonialModal = () => {
    setIsModalOpen(false);
  };

  // Handle testimonials drag scrolling
  useEffect(() => {
    if (!isActive) return;
    
    const testimonialsList = document.querySelector('.testimonials-list');
    if (!testimonialsList) return;

    let isDragging = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDragging = true;
      testimonialsList.classList.add('grabbing');
      startX = e.pageX - testimonialsList.offsetLeft;
      scrollLeft = testimonialsList.scrollLeft;
    };

    const handleMouseUp = () => {
      isDragging = false;
      testimonialsList.classList.remove('grabbing');
    };

    const handleMouseLeave = () => {
      isDragging = false;
      testimonialsList.classList.remove('grabbing');
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - testimonialsList.offsetLeft;
      const walk = (x - startX) * 2;
      testimonialsList.scrollLeft = scrollLeft - walk;
    };

    testimonialsList.addEventListener('mousedown', handleMouseDown);
    testimonialsList.addEventListener('mouseup', handleMouseUp);
    testimonialsList.addEventListener('mouseleave', handleMouseLeave);
    testimonialsList.addEventListener('mousemove', handleMouseMove);

    return () => {
      testimonialsList.removeEventListener('mousedown', handleMouseDown);
      testimonialsList.removeEventListener('mouseup', handleMouseUp);
      testimonialsList.removeEventListener('mouseleave', handleMouseLeave);
      testimonialsList.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

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

        <ul className="testimonials-list has-scrollbar">
          {testimonials.map(testimonial => (
            <li className="testimonials-item" key={testimonial.id}>
              <div 
                className="content-card" 
                onClick={() => openTestimonialModal(testimonial)}
              >
                <figure className="testimonials-avatar-box">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width="60" 
                  />
                </figure>

                <h4 className="h4 testimonials-item-title">{testimonial.name}</h4>

                <div className="testimonials-text">
                  <p>{testimonial.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className={`modal-container ${isModalOpen ? 'active' : ''}`}>
        <div className={`overlay ${isModalOpen ? 'active' : ''}`} onClick={closeTestimonialModal}></div>

        <section className="testimonials-modal">
          <button className="modal-close-btn" onClick={closeTestimonialModal}>
            <ion-icon name="close-outline"></ion-icon>
          </button>

          {activeTestimonial && (
            <>
              <div className="modal-img-wrapper">
                <figure className="modal-avatar-box">
                  <img src={activeTestimonial.avatar} alt={activeTestimonial.name} width="80" />
                </figure>

                <img src="https://i.postimg.cc/mZ00RwX7/icon-quote.png" alt="quote icon" />
              </div>

              <div className="modal-content">
                <h4 className="h3 modal-title">{activeTestimonial.name}</h4>
                <time dateTime="2023-06-14">14 June, 2023</time>

                <div className="modal-text">
                  <p>{activeTestimonial.text}</p>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      <section className="clients">
        <h3 className="h3 clients-title">Clients</h3>

        <div className="clients-list-container">
          <ul className="clients-list has-scrollbar">
            <li className="clients-item">
              <a href="#"><img src="https://i.postimg.cc/YqfKyG66/logo-1-color.png" alt="logo" /></a>
            </li>

            <li className="clients-item">
              <a href="#"><img src="https://i.postimg.cc/fWm6JtgG/logo-2-color.png" alt="logo" /></a>
            </li>

            <li className="clients-item">
              <a href="#"><img src="https://i.postimg.cc/Bb07xpwd/logo-3-color.png" alt="logo" /></a>
            </li>

            <li className="clients-item">
              <a href="#"><img src="https://i.postimg.cc/hv1yMmkh/logo-4-color.png" alt="logo" /></a>
            </li>

            <li className="clients-item">
              <a href="#"><img src="https://i.postimg.cc/ry1P86Dc/logo-5-color.png" alt="logo" /></a>
            </li>

            <li className="clients-item">
              <a href="#"><img src="https://i.postimg.cc/SsWDN8NV/logo-6-color.png" alt="logo" /></a>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}

export default About;