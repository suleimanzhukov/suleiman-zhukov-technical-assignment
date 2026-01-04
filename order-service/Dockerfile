FROM node:22

RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma db push

RUN npm run build

CMD ["npm", "run", "start"]