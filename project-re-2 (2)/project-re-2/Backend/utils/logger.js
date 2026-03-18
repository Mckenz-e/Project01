const log = (level, message, data = '') => {
  const now = new Date().toISOString();
  console.log(`[${now}] [${level.toUpperCase()}] ${message}`, data);
};

const info = (message, data) => log('info', message, data);
const error = (message, data) => log('error', message, data);
const warn = (message, data) => log('warn', message, data);

module.exports = { info, error, warn };
