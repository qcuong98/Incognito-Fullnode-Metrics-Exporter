const debug = require('debug')('incognito-fullnode-metrics-exporter:PrometheusExporterService.js');
const winston = require('winston');
const logger = winston.loggers.get('logger');
const PromClientComponent = require('../../../components/prom-client/PromClientComponent');
const axios = require('axios');
const constants = require('../../../config/constants');
const Gauge = PromClientComponent.client.Gauge;

const MetricHealth = new Gauge({
  name: `${constants.PROMETHEUS_METRICS_PREFIX}health`,
  help: 'Fullnode health check',
  labelNames: [
    'type',
  ],

  async collect() {
    const rpcGetBlockchainInfoData = process.PREFETCH_EXTERNAL_API_DATA?.RPC_GET_BLOCKCHAIN_INFO;

    const isHealthy = !!rpcGetBlockchainInfoData?.data?.Method && rpcGetBlockchainInfoData?.data?.Error === null;

    this.labels({
      type: 'fullnode'
    }).set(isHealthy ? 1 : 0);

  }
});



module.exports = MetricHealth;
