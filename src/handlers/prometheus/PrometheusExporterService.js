const debug = require('debug')('incognito-fullnode-metrics-exporter:PrometheusExporterService.js');
const Joi = require('joi');
const fs = require('fs');
const constants = require('../../config/constants');
const winston = require('winston');
const logger = winston.loggers.get('logger');
const HttpStatusCodes = require('http-status-codes');
const moment = require('moment');
const util = require('util');
const axios = require('axios');
const Promise = require('bluebird');
const PromClientComponent = require('../../components/prom-client/PromClientComponent');
const PrometheusExporterMetrics = require('./PrometheusExporterMetrics');

const {
  ERROR_CODES,
  validateInputSchema,
  responseError
} = require('../../common/errors');

const Gauge = PromClientComponent.client.Gauge;

function registerMetrics() {
  console.log('registerMetrics');
  PromClientComponent.register.registerMetric(PrometheusExporterMetrics.MetricHealth);
  PromClientComponent.register.registerMetric(PrometheusExporterMetrics.MetricBlockchainCounter);

}

/**
 * Should return 200 ok. Used for "Test connection" on the datasource config page
 * @param req
 * @param res
 * @returns {Promise<{body: {}, statusCode: number}>}
 */
async function getIndexMetrics(req, res) {
  const responseDto = {
    statusCode: 200,
    body: {}
  };

  responseDto.statusCode = 200;
  await _updateIncognitoFullnodeHealthCheckAPIData();

  responseDto.body = await PromClientComponent.register.metrics();

  return responseDto;
}

/**
 * Fetch api data once before extracting the metrics
 * @returns {Promise<void>}
 * @private
 */
async function _updateIncognitoFullnodeHealthCheckAPIData() {
  const externalAPIMetricsPromiseObj = {};

  externalAPIMetricsPromiseObj.RPC_GET_BLOCKCHAIN_INFO = axios({
    url: `${process.env.INCOGNITO_FULLNODE_URL}`,
    method: 'POST',
    data: {
      "jsonrpc": "1.0",
      "method": "getblockchaininfo",
      "params": "",
      "id": 1
    }
  }).catch(function (err) {
    //
    logger.error('Error fetching RPC_GET_BLOCKCHAIN_INFO', err);
    return null;
  });


  process.PREFETCH_EXTERNAL_API_DATA = await Promise.props(externalAPIMetricsPromiseObj);
}


function PrometheusExporterService() {
  registerMetrics();
}

PrometheusExporterService.prototype = {
  getIndexMetrics: getIndexMetrics,
};

module.exports = PrometheusExporterService;
