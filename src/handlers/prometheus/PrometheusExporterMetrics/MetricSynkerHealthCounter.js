const debug = require('debug')('incognito-fullnode-metrics-exporter:PrometheusExporterService.js');
const winston = require('winston');
const logger = winston.loggers.get('logger');
const PromClientComponent = require('../../../components/prom-client/PromClientComponent');
const axios = require('axios');
const constants = require('../../../config/constants');
const Gauge = PromClientComponent.client.Gauge;

const MetricSynkerHealth = new Gauge({
  name: `${constants.PROMETHEUS_METRICS_PREFIX}counter`,
  help: 'Synker health check',
  labelNames: [
    'chainID',
    'type'
  ],
  async collect() {
    const rpcGetBlockchainInfoData = process.PREFETCH_EXTERNAL_API_DATA?.RPC_GET_BLOCKCHAIN_INFO;

    if (!healthCheckSynkerResult?.data) {
      return;
    }
    for (let chainId in healthCheckSynkerResult?.data?.chain) {
      if (!healthCheckSynkerResult?.data?.chain.hasOwnProperty(chainId) || chainId === '-1') {
        continue;
      }

      const [
        coinHeight,
        height,
        chainHeight
      ] = healthCheckSynkerResult?.data?.chain[chainId]?.split('|');

      this.labels({
        chainID: chainId,
        type: 'coinHeight'
      }).set(parseFloat(coinHeight));

      this.labels({
        chainID: chainId,
        type: 'height'
      }).set(parseFloat(height));

      this.labels({
        chainID: chainId,
        type: 'chainHeight'
      }).set(parseFloat(chainHeight));
    }

    this.labels({
      chainID: '-1',
      type: 'chainHeight'
    }).set(parseFloat(healthCheckSynkerResult?.data?.chain[-1]));
  }
});



module.exports = MetricSynkerHealth;
