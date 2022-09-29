FROM node:14.16.0

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/

RUN RUN npm i

RUN npm run build

COPY ./.output /app/.output

EXPOSE 9000

ENTRYPOINT ["npm", "run", "start"]