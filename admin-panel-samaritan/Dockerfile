FROM node:19-alpine
WORKDIR /app
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=4096
ARG VITE_BASE_URL
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm i
RUN npm i -g serve
RUN set > .env
RUN npm run build
CMD ["serve","-s", "dist/"]
