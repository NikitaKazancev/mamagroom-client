FROM node:current-slim

WORKDIR /app
COPY . .
ENV NODE_ENV=production

RUN npm install -g bun@1.1.45
RUN bun install
RUN npm run build
RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

EXPOSE 80

CMD ["bun", ".next/standalone/server.js"]