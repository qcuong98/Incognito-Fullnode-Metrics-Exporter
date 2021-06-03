const client = require('prom-client');
const constants = require('../../config/constants');
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
const prefix = constants.PROMETHEUS_METRICS_PREFIX;

if (process.env.PROMETHEUS_COLLECT_DEFAULT_METRICS === 'true') {
  collectDefaultMetrics({
    register,
    prefix
  });
}

module.exports = {
  client: client,
  register: register
}
