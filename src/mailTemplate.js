const style = `<style>
  a.button {
    display: inline-block;
    padding: 20px 40px;
    border-radius: 4px;
    background-color: #4c96d6;
    color: white;
    font-family: sans-serif;
    font-weight: bold;
    text-decoration: none;
  }
</style>`;

const head = `<head>
  <title>Newsletter subscription</title>
  ${style}
</head>`;

const mail = (baseUrl, token) => `<html>
  ${head}
  <body>
    <a class="button" href="${baseUrl}/newsletter/subscribe?token=${token}">Subscribe to newsletter</a>
  </body>
</html>`;

module.exports = {
  mail
};
