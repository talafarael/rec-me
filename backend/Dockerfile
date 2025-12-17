FROM node:21

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

RUN npm prune --production

EXPOSE 9000

CMD sh -c "npm run migration:run && npm run start:prod"

