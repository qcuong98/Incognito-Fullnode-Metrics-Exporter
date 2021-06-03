const debug = require('debug')('incognito-fullnode-metrics-exporter:PrometheusExporterService.js');
const winston = require('winston');
const logger = winston.loggers.get('logger');
const PromClientComponent = require('../../../components/prom-client/PromClientComponent');
const axios = require('axios');
const constants = require('../../../config/constants');
const Gauge = PromClientComponent.client.Gauge;

const MetricBlockchainCounter = new Gauge({
  name: `${constants.PROMETHEUS_METRICS_PREFIX}best_blocks`,
  help: 'Blockchain counter',
  labelNames: [
    'chainID',
    'type'
  ],
  async collect() {
    const rpcGetBlockchainInfoData = process.PREFETCH_EXTERNAL_API_DATA?.RPC_GET_BLOCKCHAIN_INFO;
    debug('rpcGetBlockchainInfoData', rpcGetBlockchainInfoData);
    const bestBlocksData = rpcGetBlockchainInfoData?.data?.Result?.BestBlocks;

    if (!bestBlocksData) {
      return;
    }

    debug('bestBlocksData', bestBlocksData);
    for (const [key, block] of Object.entries(bestBlocksData)) {
      this.labels({
        chainID: key,
        type: 'Height'
      }).set(block.Height);

      this.labels({
        chainID: key,
        type: 'Epoch'
      }).set(block.Epoch);

      this.labels({
        chainID: key,
        type: 'EpochBlock'
      }).set(block.EpochBlock);

      this.labels({
        chainID: key,
        type: 'TotalTxs'
      }).set(block.TotalTxs);

      this.labels({
        chainID: key,
        type: 'RemainingBlockEpoch'
      }).set(block.RemainingBlockEpoch);
    }
  }
});



module.exports = MetricBlockchainCounter;
