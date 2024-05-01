FROM node:18

RUN apt-get update && apt-get install -y

RUN mkdir /code

COPY /frontend /code/frontend
ADD tsconfig.json package.json /code/

WORKDIR /code
RUN npm install

WORKDIR /code/frontend
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]