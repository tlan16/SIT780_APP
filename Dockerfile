FROM node:9.11.1-alpine

WORKDIR /src
ADD . .

RUN npm install --quiet --loglevel=error

EXPOSE 8080

RUN ["npm", "run", "build"]

CMD ["npm", "run", "serve"]
