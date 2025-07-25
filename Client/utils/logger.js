const console = {
  log: (...args) => {
    if (import.meta.env.MODE !== 'production') {
      console.log(...args);
    }
  },
  error: (...args) => {
    console.error(...args);
  },
  warn: (...args) => {
    console.warn(...args);
  },
  info: (...args) => {
    if (import.meta.env.MODE !== 'production') {
      console.info(...args);
    }
  },
};

export default console;