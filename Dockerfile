FROM node:16

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3333
CMD [ "npm", "run", "dev" ]
