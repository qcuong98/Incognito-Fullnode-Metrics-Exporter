FROM node:14

EXPOSE 3000
EXPOSE 3001

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
RUN npm install -g pm2
COPY . .

CMD ["pm2-runtime", "index.js"]