function Resume({ isActive }) {
  return (
    <article className={`resume ${isActive ? 'active' : ''}`} data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Education</h3>
        </div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">ESPM - Escola Superior de Propaganda e Marketing</h4>
            <span>2002 — 2006</span>
            <p className="timeline-text">
              Bachelor's degree in Advertising with specialization in Digital Media, where I developed a strong foundation in marketing, consumer psychology, and early web design principles.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">IED - Istituto Europeo di Design</h4>
            <span>2008 — 2010</span>
            <p className="timeline-text">
              Post-graduate program in Digital Experience Design, focused on interaction design, usability, and early user-centered design methodologies.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Nielsen Norman Group</h4>
            <span>2016</span>
            <p className="timeline-text">
              UX Certification program, comprehensive training in user research, information architecture, interaction design, and usability evaluation methods from the industry's leading UX research organization.
            </p>
          </li>
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="briefcase-outline"></ion-icon>
          </div>
          <h3 className="h3">Experience</h3>
        </div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Senior UX Designer at Peloton Interactive</h4>
            <span>2020 — 2023</span>
            <p className="timeline-text">
              Led UX design for Peloton's digital subscription products, designing features that increased user engagement by 35%. Established the design system that improved design consistency and development efficiency.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">UX Lead at Claro Brazil</h4>
            <span>2016 — 2020</span>
            <p className="timeline-text">
              Directed UX strategy for Claro's customer-facing digital products, including the award-winning Minha Claro app. Managed a team of 5 designers and facilitated cross-functional collaboration between design, product, and engineering.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Interactive Designer at Livelo</h4>
            <span>2012 — 2016</span>
            <p className="timeline-text">
              Designed user interfaces for Brazil's largest loyalty program platform. Conducted extensive user research and usability testing that informed the redesign of key user journeys, resulting in a 28% increase in redemption rates.
            </p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Web Designer at Pão de Açúcar</h4>
            <span>2008 — 2012</span>
            <p className="timeline-text">
              Created digital experiences for one of Brazil's largest retail groups, focusing on e-commerce interfaces and promotional campaigns. Implemented A/B testing practices that optimized conversion funnels.
            </p>
          </li>
        </ol>
      </section>

      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>
        <ul className="skills-list content-card">
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">User Research & Testing</h5>
              <data value="90">90%</data>
            </div>
            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: '90%' }}></div>
            </div>
          </li>
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Interaction Design</h5>
              <data value="85">85%</data>
            </div>
            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: '85%' }}></div>
            </div>
          </li>
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Figma & Design Tools</h5>
              <data value="95">95%</data>
            </div>
            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: '95%' }}></div>
            </div>
          </li>
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Design Systems</h5>
              <data value="80">80%</data>
            </div>
            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: '80%' }}></div>
            </div>
          </li>
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Prototyping</h5>
              <data value="90">90%</data>
            </div>
            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: '90%' }}></div>
            </div>
          </li>
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Front-end Development</h5>
              <data value="70">70%</data>
            </div>
            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: '70%' }}></div>
            </div>
          </li>
        </ul>
      </section>
    </article>
  );
}

export default Resume;