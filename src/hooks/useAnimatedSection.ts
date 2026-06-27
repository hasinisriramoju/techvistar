import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const useAnimatedSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px -100px 0px' });
  
  return { ref, isInView };
};
