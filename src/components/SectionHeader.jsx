import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * SectionHeader - Componente reutilizável para cabeçalhos de seção
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título da seção
 * @param {string} props.subtitle - Subtítulo opcional da seção
 * @param {string} props.className - Classes CSS adicionais (opcional)
 * @param {boolean} props.centered - Se o título deve ser centralizado (padrão: false)
 * @param {string} props.tagName - Tag HTML para o título (padrão: 'h2')
 * @param {number} props.delay - Atraso na animação (padrão: 0)
 * @param {boolean} props.animate - Se deve animar (padrão: true)
 * @param {React.ReactNode} props.children - Conteúdo adicional para o cabeçalho
 */
function SectionHeader({ 
  title, 
  subtitle, 
  className = '', 
  centered = false, 
  tagName = 'h2', 
  delay = 0,
  animate = true,
  children
}) {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, amount: 0.3 });
  
  // Configuração para animações
  const shouldAnimate = animate && inView;
  
  // Classes CSS adicionais
  const headerClass = `section-header ${className} ${centered ? 'centered' : ''}`;
  const titleClass = `${tagName === 'h2' ? 'h2 article-title' : `h${tagName.slice(1)} section-title`}`;
  
  return (
    <motion.header
      ref={headerRef}
      className={headerClass}
      initial={animate ? { opacity: 0, y: -20 } : { opacity: 1 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {tagName === 'h2' ? (
        <motion.h2
          className={titleClass}
          initial={animate ? { opacity: 0, y: -10 } : { opacity: 1 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          whileHover={{ 
            color: 'var(--matrix-green)',
            x: 3,
            transition: { duration: 0.2 }
          }}
        >
          {title}
        </motion.h2>
      ) : tagName === 'h3' ? (
        <motion.h3
          className={titleClass}
          initial={animate ? { opacity: 0, y: -10 } : { opacity: 1 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          whileHover={{ 
            color: 'var(--matrix-green)',
            x: 3,
            transition: { duration: 0.2 }
          }}
        >
          {title}
        </motion.h3>
      ) : (
        <motion.h4
          className={titleClass}
          initial={animate ? { opacity: 0, y: -10 } : { opacity: 1 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          whileHover={{ 
            color: 'var(--matrix-green)',
            x: 3,
            transition: { duration: 0.2 }
          }}
        >
          {title}
        </motion.h4>
      )}
      
      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={animate ? { opacity: 0, y: 10 } : { opacity: 1 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      {children}
    </motion.header>
  );
}

export default SectionHeader;