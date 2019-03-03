const axios = require("axios");

async function sendMail(domain, apiKey, from, to, subject, html) {
  const data = new URLSearchParams();
  data.append("from", from);
  data.append("to", to);
  data.append("subject", subject);
  data.append("html", html);
  return await axios.post(
    `https://api.mailgun.net/v3/${domain}/messages`,
    data,
    {
      auth: {
        username: "api",
        password: apiKey
      }
    }
  );
}

async function addMemberToMailingList(apiKey, mailingListAddress, email, name) {
  const data = new URLSearchParams();
  data.append("address", email);
  if (name) data.append("name", name);
  data.append("upsert", "yes");
  return await axios.post(
    `https://api.mailgun.net/v3/lists/${encodeURI(mailingListAddress)}/members`,
    data,
    {
      auth: {
        username: "api",
        password: apiKey
      }
    }
  );
}

module.exports = {
  sendMail,
  addMemberToMailingList
};
