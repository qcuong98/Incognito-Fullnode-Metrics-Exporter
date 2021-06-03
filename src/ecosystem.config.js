module.exports = {
  apps: [{
    name: 'IncognitoFullnodeMetricsExporter-prod',
    script: 'index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 1,
    exec_mode: "cluster",
    autorestart: true,
    watch: false,
    max_memory_restart: '4G',
    combine_logs: true,
    instance_var: 'INSTANCE_ID',
    env: {
      NODE_ENV: 'production',
      APP_ENV: 'production'
    }
  }]
};
