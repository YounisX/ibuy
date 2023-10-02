
FROM node:v18.12.1
ENV NODE_ENV = production

WORKDIR /app

COPY . .

RUN npm  install 

CMD ["package.json", "package-lock.json*","./"]

EXPOSE 3000