export const navVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 8,
      mass: 0.5,
      stiffness: 50,
      ease: "easeInOut",
      delay: 0.2,
      duration: 0.5,
    },
  },
};

export const homeVariants = {
  hidden: {
    opacity: 0,
    y: 75,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeIn",
      delay: 1,
      duration: 0.5,
      type: "spring",
      mass: 4,
      damping: 25,
      when: "beforeChildren",
    },
  },
  exit: {
    x: "100vw",
    opacity: 0,
    transition: {
      ease: "easeOut",
      duration: 1,
    },
  },
};
export const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 75,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeIn",
      delay: 1.2,
      duration: 0.5,
      type: "spring",
      mass: 4,
      damping: 25,
      // when: "beforeChildren",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      delay: 0.1,
      duration: 0.2,
    },
  },
};

export const linksVariants = {
  hidden: {
    opacity: 0,
    x: -150,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeInOut",
      delay: 0.3,
      duration: 0.8,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    ease: "easeInOut",
    x: "100vw",
  },
};
export const loadingVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      repeat: Infinity,
      duration: 1.5,
    },
  },
};

export const listItemVariants = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },

  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.8, duration: 0.8 },
  }),
  exit: {
    x: "100vw",
    opacity: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};
export const addSuccessVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
      type: "spring",
      mass: 4,
      damping: 25,
    },
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};
