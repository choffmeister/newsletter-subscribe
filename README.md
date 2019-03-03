# newsletter-subscribe

Simple double opt-in so that website visitors can subscribe to your [Mailgun](https://www.mailgun.com/) mailing lists.

```
docker run -d
  -p 8080:8080 \
  -e "API_KEY=..." \
  -e "BASE_URL=..." \
  -e "DOMAIN=..." \
  -e "FROM=..." \
  -e "MAILING_LIST_ADDRESS=..." \
  -e "TOKEN_SECRET=..." \
  choffmeister/newsletter-subscribe:latest
```
