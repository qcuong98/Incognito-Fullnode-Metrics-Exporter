const APP_SETTINGS = {
  // 1 year in millisecond
  COOKIES: {
    // 1 year
    CLIENT_COOKIE_MAX_AGE: 365 * 24 * 60 * 60 * 1000,
    ADMIN_COOKIE_MAX_AGE: 365 * 24 * 60 * 60 * 1000
  },
  CACHING: {},
};

const EMAIL_CONFIG = {
  EMAIL_SENDER_ADDRESS: process.env.EMAIL_SENDER_ADDRESS,
  EMAIL_SENDER_NAME: process.env.EMAIL_SENDER_NAME || 'Incognito',
};

const DEFAULT_TIMEZONE = 'Asia/Ho_Chi_Minh';

const PROMETHEUS_METRICS_PREFIX = process.env.PROMETHEUS_METRICS_PREFIX || 'incognito_fullnode_';
const PROMETHEUS_METRICS_BTC_PREFIX = process.env.PROMETHEUS_METRICS_BTC_PREFIX || 'btc_fullnode_';

module.exports = {
  APP_SETTINGS,
  DEFAULT_TIMEZONE,
  EMAIL_CONFIG,
  PROMETHEUS_METRICS_PREFIX,
  PROMETHEUS_METRICS_BTC_PREFIX
};
