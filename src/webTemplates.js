const style = `<style>
  body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .message {
    padding: 20px 40px;
    border-radius: 4px;
    color: white;
    font-family: sans-serif;
    font-weight: bold;
  }

  .success {
    background-color: #6dae00;
  }

  .error {
    background-color: #d5511d;
  }
</style>`;

const head = `<head>
  <title>Newsletter subscription</title>
  ${style}
</head>`;

const step1 = `<html>
  ${head}
  <body>
    <div class="message success">You will receive an email with a link to finish the subscription.</div>
  </body>
</html>`;

const step2 = `<html>
  ${head}
  <body>
    <div class="message success">You have successfully subscribed!</div>
  </body>
</html>`;

const error = message => `<html>
  ${head}
  <body>
    <div class="message error">${message}</div>
  </body>
</html>`;

module.exports = {
  step1,
  step2,
  error
};
