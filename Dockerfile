FROM nodejs

COPY . /app

WORDDIR /app

RUN npm install && npm install -g bower && bower install

CMD node /app/main.js
