const express = require('express');
const router = express.Router();
const winston = require('winston');
const logger = winston.loggers.get('logger');
const PrometheusExporterController = require('./PrometheusExporterController');

/**
 * Ref: https://github.com/grafana/simple-json-datasource
 * These routes are required by Grafana Simple JSON Datasource Plugin
 */
router.all('/', PrometheusExporterController.IndexHandler);

module.exports = router;
