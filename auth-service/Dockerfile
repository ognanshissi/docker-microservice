FROM node:alpine

ENV PORT 3000

EXPOSE 3000

COPY package.json package.json
RUN npm install -g typescript \ 
    npm install


COPY . .
RUN npm run build

CMD ["npm", "run", "start:dev"]