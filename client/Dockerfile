FROM node:14.15.0

WORKDIR /code

ENV PATH /code/node_modules/.bin:$PATH

COPY package.json /code/package.json
RUN npm install
RUN npm install -g @angular/cli@10.2.0

COPY . /code

CMD npm run serve

