import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Animation variants library
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

export const slideInFromLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -100,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      type: "spring",
      stiffness: 120,
      damping: 25
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      type: "spring",
      stiffness: 200,
      damping: 30
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  }
};

// Enhanced motion wrapper component
interface MotionWrapperProps {
  children: React.ReactNode;
  variant?: 'fadeInUp' | 'slideInFromLeft' | 'scaleIn' | 'stagger';
  delay?: number;
  duration?: number;
  className?: string;
  animate?: 'float' | 'pulse' | 'none';
  hover?: boolean;
  tap?: boolean;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  variant = 'fadeInUp',
  delay = 0,
  duration,
  className = '',
  animate = 'none',
  hover = false,
  tap = false
}) => {
  const variants = {
    fadeInUp,
    slideInFromLeft, 
    scaleIn,
    stagger: staggerContainer
  };

  const selectedVariant = variants[variant];

  // Custom animation overrides
  const customVariant = duration ? {
    ...selectedVariant,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...selectedVariant.visible.transition,
        duration,
        delay
      }
    },
    hidden: {
      ...selectedVariant.hidden,
      transition: {
        ...selectedVariant.hidden.transition,
        duration: duration * 0.5
      }
    }
  } : {
    ...selectedVariant,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...selectedVariant.visible.transition,
        delay
      }
    }
  };

  // Continuous animations
  const continuousAnimations = animate === 'float' ? floatingAnimation : 
                             animate === 'pulse' ? pulseAnimation : {};

  // Interaction animations
  const whileHover = hover ? { 
    scale: 1.05, 
    transition: { duration: 0.2 } 
  } : undefined;

  const whileTap = tap ? { 
    scale: 0.95, 
    transition: { duration: 0.1 } 
  } : undefined;

  return (
    <motion.div
      variants={customVariant}
      initial="hidden"
      animate={["visible", continuousAnimations]}
      whileHover={whileHover}
      whileTap={whileTap}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Page transition wrapper
interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Micro-interaction component for buttons
interface MicroInteractionProps {
  children: React.ReactNode;
  type?: 'button' | 'card' | 'icon';
  className?: string;
}

export const MicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  type = 'button',
  className = ''
}) => {
  const interactions = {
    button: {
      whileHover: { 
        scale: 1.02, 
        y: -2,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.2 }
      },
      whileTap: { 
        scale: 0.98, 
        y: 0,
        transition: { duration: 0.1 }
      }
    },
    card: {
      whileHover: { 
        scale: 1.02, 
        y: -5,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.3 }
      },
      whileTap: { 
        scale: 0.99,
        transition: { duration: 0.1 }
      }
    },
    icon: {
      whileHover: { 
        rotate: 360,
        scale: 1.1,
        transition: { duration: 0.4 }
      },
      whileTap: { 
        scale: 0.9,
        transition: { duration: 0.1 }
      }
    }
  };

  return (
    <motion.div
      {...interactions[type]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;