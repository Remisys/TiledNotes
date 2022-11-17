FROM node:14.21.1-bullseye
WORKDIR /app
COPY package*.json ./
COPY postcss.config.js ./
COPY next.config.js ./
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run","dev"]


