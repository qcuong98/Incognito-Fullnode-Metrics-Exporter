# Incognito-Fullnode-Metrics-Exporter
Prometheus metrics exporter for Incognito Fullnode

## Requirements:
- NodeJS LTS (14.x recommended)
- How to install multiple node versions with nvm: https://github.com/nvm-sh/nvm

## Getting Started
- Copy `template.env` to `.env`
- Edit configuration in `.env`
- Install required package with: `npm install`
- Start in development: `npm start`

## Production Deployment
1. Deploy with pm2:
- Install pm2: `npm install -g pm2`
- Enable pm2 run on startup: `pm2 startup`
- Edit pm2 config in `ecosystem.config.js`
- Start pm2 app: `pm2 start ecosystem.config.js`

2. Deploy with Docker:
Build and run Docker 
