const debug = require('debug')('incognito-fullnode-metrics-exporter:PrometheusExporterService.js');
const winston = require('winston');
const logger = winston.loggers.get('logger');
const PromClientComponent = require('../../../components/prom-client/PromClientComponent');
const axios = require('axios');
const constants = require('../../../config/constants');
const Gauge = PromClientComponent.client.Gauge;

const MetricBTCFullnodeBlockCounter = new Gauge({
  name: `${constants.PROMETHEUS_METRICS_BTC_PREFIX}best_blocks`,
  help: 'BTC Fullnode block counter',
  labelNames: [
    'type'
  ],
  async collect() {
    const btcRpcGetBlockchainInfoData = process.PREFETCH_EXTERNAL_API_DATA?.BTC_RPC_GET_BLOCKCHAIN_INFO;
    debug('btcRpcGetBlockchainInfoData', btcRpcGetBlockchainInfoData);
    const bestBlockHeight = btcRpcGetBlockchainInfoData?.data?.result?.blocks;
    const headerBlockHeight = btcRpcGetBlockchainInfoData?.data?.result?.headers;
    if (!bestBlockHeight ||!headerBlockHeight) {
      return;
    }

    const externalAPIBTCBlockchainData = process.PREFETCH_EXTERNAL_API_DATA?.BTC_EXTERNAL_API_BEST_BLOCK;
    const externalBlockHeight = externalAPIBTCBlockchainData?.data
    if (!externalBlockHeight) {
      return;
    }

    debug('bestBlockHeight', bestBlockHeight);
    debug('headerBlockHeight', headerBlockHeight);
    debug('externalBlockHeight', externalBlockHeight);
    
    this.labels({
      type: 'BestBlockHeight'
    }).set(bestBlockHeight);

    this.labels({
      type: 'HeaderBlockHeight'
    }).set(headerBlockHeight);

    this.labels({
      type: 'ExternalBlockHeight'
    }).set(externalBlockHeight);
  }
});



module.exports = MetricBTCFullnodeBlockCounter;
