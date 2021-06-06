const debug = require('debug')('incognito-fullnode-metrics-exporter:PrometheusExporterService.js');
const winston = require('winston');
const logger = winston.loggers.get('logger');
const PromClientComponent = require('../../../components/prom-client/PromClientComponent');
const axios = require('axios');
const constants = require('../../../config/constants');
const Gauge = PromClientComponent.client.Gauge;
const AlertThreshold = 2

const MetricBTCFullnodeHealth = new Gauge({
  name: `${constants.PROMETHEUS_METRICS_BTC_PREIFX}health`,
  help: 'BTC Fullnode health check',
  labelNames: [
    'type',
  ],

  async collect() {
    const externalAPIBTCBlockchainData = process.PREFETCH_EXTERNAL_API_DATA?.BTC_EXTERNAL_API_BEST_BLOCK;
    const externalBlockHeight = externalAPIBTCBlockchainData?.data
    if (!externalBlockHeight) {
      return;
    }
    debug('externalBlockHeight', externalBlockHeight);
    const btcRpcGetBlockchainInfoData = process.PREFETCH_EXTERNAL_API_DATA?.BTC_RPC_GET_BLOCKCHAIN_INFO;
    const bestBlockHeight = btcRpcGetBlockchainInfoData?.data?.result?.blocks;

    const isHealthy = (bestBlockHeight) && (btcRpcGetBlockchainInfoData?.data?.error === null) &&
                      (bestBlockHeight + AlertThreshold >= externalBlockHeight);
    debug('bestBlockHeight', bestBlockHeight);

    this.labels({
      type: 'Updated'
    }).set(isHealthy ? 1 : 0);

  }
});



module.exports = MetricBTCFullnodeHealth;
