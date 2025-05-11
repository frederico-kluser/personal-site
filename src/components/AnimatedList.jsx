import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * AnimatedList - Componente reutilizável para listas animadas com efeito staggered
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.className - Classes CSS adicionais (opcional)
 * @param {boolean} props.inViewOnce - Se a animação deve ocorrer apenas uma vez (padrão: true)
 * @param {number} props.amount - Quantidade do elemento que deve estar visível para disparar a animação (padrão: 0.2)
 * @param {number} props.delay - Atraso inicial antes de iniciar a sequência (padrão: 0)
 * @param {number} props.staggerDelay - Atraso entre cada item (padrão: 0.1)
 * @param {Object} props.itemInitial - Estado inicial dos itens (padrão: { opacity: 0, y: 20 })
 * @param {Object} props.itemAnimate - Estado final dos itens (padrão: { opacity: 1, y: 0 })
 * @param {Object} props.itemTransition - Configurações de transição dos itens (opcional)
 * @param {Object} props.itemProps - Props adicionais a serem aplicados a cada item (opcional)
 * @param {string} props.tag - Tag HTML para a lista (padrão: 'ul')
 * @param {string} props.itemTag - Tag HTML para os itens (padrão: 'li')
 * @param {Array} props.items - Array de itens a serem renderizados (cada item pode ser string ou objeto)
 * @param {Function} props.renderItem - Função personalizada para renderizar cada item (opcional)
 */
function AnimatedList({
  className = '',
  inViewOnce = true,
  amount = 0.2,
  delay = 0,
  staggerDelay = 0.1,
  itemInitial = { opacity: 0, y: 20 },
  itemAnimate = { opacity: 1, y: 0 },
  itemTransition,
  itemProps = {},
  tag = 'ul',
  itemTag = 'li',
  items = [],
  renderItem,
  children,
  ...otherProps
}) {
  const listRef = useRef(null);
  const inView = useInView(listRef, { once: inViewOnce, amount });
  
  // Container component (ul ou ol)
  const Container = motion[tag];
  
  // Item component (li ou outro)
  const Item = motion[itemTag];
  
  return (
    <Container
      ref={listRef}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
      {...otherProps}
    >
      {items.length > 0 ? (
        items.map((item, index) => {
          // Configurar transição com delay incremental
          const itemTrans = itemTransition || {
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: delay + (index * staggerDelay)
          };
          
          // Renderização customizada ou padrão
          if (renderItem) {
            return renderItem(item, index, {
              initial: itemInitial,
              animate: inView ? itemAnimate : itemInitial,
              transition: itemTrans,
              ...itemProps
            });
          }
          
          return (
            <Item
              key={index}
              variants={{
                hidden: itemInitial,
                visible: itemAnimate
              }}
              transition={itemTrans}
              {...itemProps}
            >
              {typeof item === 'string' ? item : JSON.stringify(item)}
            </Item>
          );
        })
      ) : (
        children
      )}
    </Container>
  );
}

export default AnimatedList;