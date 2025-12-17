FROM node:21

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

RUN npm prune --production

EXPOSE 9000


CMD ["npm", "run", "start:prod"]

