FROM node:21

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Compile data-source.ts to JS for migrations
RUN npx tsc data-source.ts --outDir dist --module commonjs --esModuleInterop --skipLibCheck || true

RUN npm prune --production

EXPOSE 9000

CMD sh -c "npm run migration:run:prod && npm run start:prod"

