import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * AnimatedSection - Componente reutilizável para seções animadas
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.className - Classes CSS adicionais (opcional)
 * @param {boolean} props.inViewOnce - Se a animação deve ocorrer apenas uma vez (padrão: true)
 * @param {number} props.amount - Quantidade do elemento que deve estar visível para disparar a animação (padrão: 0.2)
 * @param {number} props.delay - Atraso na animação (padrão: 0)
 * @param {Object} props.initial - Estado inicial da animação (opcional)
 * @param {Object} props.animate - Estado final da animação (opcional)
 * @param {Object} props.exit - Estado de saída da animação (opcional)
 * @param {Object} props.transition - Configurações de transição (opcional)
 * @param {Function} props.onViewEnter - Callback quando o elemento entra na viewport (opcional)
 * @param {Function} props.onViewLeave - Callback quando o elemento sai da viewport (opcional)
 * @param {React.ReactNode} props.children - Conteúdo da seção
 */
function AnimatedSection({
  className = '',
  inViewOnce = true,
  amount = 0.2,
  delay = 0,
  initial = { opacity: 0, y: 30 },
  animate = { opacity: 1, y: 0 },
  exit,
  transition = { duration: 0.7, delay },
  onViewEnter,
  onViewLeave,
  children,
  ...otherProps
}) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: inViewOnce, amount });
  
  // Chamar callbacks se fornecidos
  if (inView && onViewEnter) {
    onViewEnter();
  } else if (!inView && onViewLeave) {
    onViewLeave();
  }
  
  return (
    <motion.section
      ref={sectionRef}
      className={className}
      initial={initial}
      animate={inView ? animate : initial}
      exit={exit}
      transition={transition}
      {...otherProps}
    >
      {children}
    </motion.section>
  );
}

export default AnimatedSection;