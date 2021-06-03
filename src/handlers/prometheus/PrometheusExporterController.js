const debug = require('debug')('incognito-fullnode-metrics-exporter:PrometheusExporterController');
const winston = require('winston');
const logger = winston.loggers.get('logger');
const PrometheusExporterService = new (require('./PrometheusExporterService'));
const HttpStatusCodes = require('http-status-codes');

const {
  ERROR_CODES,
} = require('../../common/errors');


/**
 * Get country list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function IndexHandler(req, res) {
  try {
    const responseDto = await PrometheusExporterService.getIndexMetrics(req, res);
    res.status(responseDto.statusCode);
    res.send(responseDto.body);
  } catch (err) {
    debug(err);
    logger.error('Error getting index handler', err);
    res.status(err.httpStatusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({
      errorCode: err.code || ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: err.message
    })
  }
}


module.exports = {
  IndexHandler,
};
