FROM nikolaik/python-nodejs:latest
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot
COPY ["package.json", "npm-shrinkwrap.json*", "./"] /usr/src/bot
RUN npm install
COPY . /usr/src/bot
EXPOSE 3000
USER pn
CMD ["node", "index.js"]
