const duration = 0.2;

export const signupHeadingAnimation = () => {
    return {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          duration: duration,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: duration,
        },
      },
    };
}

