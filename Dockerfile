FROM node:alpine

WORKDIR /newsletter-subscribe
COPY . /newsletter-subscribe
RUN ls -al
RUN yarn install --pure-lockfile

CMD ["node", "/newsletter-subscribe/index.js"]
EXPOSE 8080
