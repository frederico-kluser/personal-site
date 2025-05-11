function Resume({ isActive }) {
  return (
    <article className={`resume ${isActive ? 'active' : ''}`} data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box"><ion-icon name="book-outline"></ion-icon></div>
          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Grupo Fleury</h4>
            <span>Janeiro 2023 - Presente (2 anos 5 meses)</span>
            <p className="timeline-text">Artificial Intelligence Developer - Criação de ferramentas com IA, manutenção de código, desenvolvimento de chat bots e implementação de servidores MCP.</p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">huu</h4>
            <span>Janeiro 2015 - Presente (10 anos 5 meses)</span>
            <p className="timeline-text">Founder - Definição de arquitetura, controle de estado, estilização, envio para lojas, design de assets e construção de layout.</p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Peloton Interactive</h4>
            <span>Março 2022 - Outubro 2022 (8 meses)</span>
            <p className="timeline-text">Tech Lead - Manutenção de código, controle de estado, correção de código semântico e compressão de assets.</p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Abril</h4>
            <span>Julho 2020 - Julho 2021 (1 ano 1 mês)</span>
            <p className="timeline-text">Desenvolvedor Front-end - Manutenção de código legado, criação de animação, atuação nos sites: Veja, Guia 4 Rodas, Capricho, Super Interessante. Criação do site: GoRead.</p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Claro Brasil</h4>
            <span>Janeiro 2020 - Agosto 2020 (8 meses)</span>
            <p className="timeline-text">Desenvolvedor Mobile - Manutenção de código legado, controle de estado e estilização.</p>
          </li>
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box"><ion-icon name="book-outline"></ion-icon></div>
          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Universidade do Oeste de Santa Catarina</h4>
            <span>2015 (Incompleto)</span>
            <p className="timeline-text">Ciência da Computação - Durante o curso, estudei fundamentos de programação, arquitetura de computadores, sistemas operacionais, bancos de dados, engenharia de software, resolução de problemas e habilidades de comunicação e colaboração.</p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Certificações</h4>
            <span>Diversas</span>
            <p className="timeline-text">JavaScript: Best Practices for Functions and Classes, Learn React Course, Learning TensorFlow with JavaScript, React: Working with APIs, Advanced CSS3 Course - Responsive Web Project.</p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Premiações</h4>
            <span>Reconhecimento</span>
            <p className="timeline-text">Expositor na VII Feira estadual de Ciencias e Tecnologia da Educacao Basica.</p>
          </li>
        </ol>
      </section>

      <section className="skill">
        <h3 className="h3 skills-title">My Skills</h3>

        <ul className="skills-list content-card">
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">LLM</h5>
              <data value="90">90%</data>
            </div>

            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: '90%' }}></div>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">React & React Native</h5>
              <data value="85">85%</data>
            </div>

            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: '85%' }}></div>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Chrome Extensions</h5>
              <data value="80">80%</data>
            </div>

            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: '80%' }}></div>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Start-up Leadership</h5>
              <data value="75">75%</data>
            </div>

            <div className="skills-progress-bg">
              <div className="skills-progress-fill" style={{ width: '75%' }}></div>
            </div>
          </li>
        </ul>
      </section>
    </article>
  );
}

export default Resume;