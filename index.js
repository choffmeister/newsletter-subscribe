const bodyParser = require('body-parser')
const express = require('express')
const jsonWebToken = require('jsonwebtoken')
const mailgunClient = require('./src/mailgunClient')
const mailTemplate = require('./src/mailTemplate')
const webTemplates = require('./src/webTemplates')

const apiKey = process.env.API_KEY
const baseUrl = process.env.BASE_URL
const domain = process.env.DOMAIN
const from = process.env.FROM
const mailingListAddress = process.env.MAILING_LIST_ADDRESS
const tokenSecret = process.env.TOKEN_SECRET

const app = express()
app.post('/newsletter/subscribe', bodyParser.urlencoded({ extended: true }), async (req, res) => {
  try {
    const email = !!req.body && typeof req.body.email === 'string' ? req.body.email.trim() : undefined
    const name = !!req.body && typeof req.body.name === 'string' ? req.body.name.trim() : undefined
    if (email) {
      const token = jsonWebToken.sign({
        mailingListAddress,
        email,
        name,
      }, tokenSecret, {
        expiresIn: '2 days'
      })
      await mailgunClient.sendMail(domain, apiKey, from, email, 'Subscribe to newsletter', mailTemplate.mail(baseUrl, token))
      console.log(`Sent email to ${email}`)
      res.send(webTemplates.step1)
    } else {
      res.status(400).send(webTemplates.error('Bad request'))
    }
  } catch (err) {
    console.error(err.response && err.response.data || err)
    res.status(500).send(webTemplates.error('Internal server error'))
  }
})
app.get('/newsletter/subscribe', bodyParser.urlencoded({ extended: true }), async (req, res) => {
  try {
    if (req.query.token) {
      const parsed = await new Promise((res, rej) => jsonWebToken.verify(req.query.token, tokenSecret, (err, parsed) => !err ? res(parsed) : rej(err)))
      const { mailingListAddress, email, name } = parsed
      await mailgunClient.addMemberToMailingList(apiKey, mailingListAddress, email, name)
      console.log(`Subscribed ${email} to mailing list ${mailingListAddress}`)
      res.send(webTemplates.step2)
    } else {
      res.status(401).send(templates.error('Token invalid'))
    }
  } catch (err) {
    console.error('Error', err.response && err.response.data || err)
    res.status(500).send(webTemplates.error('Internal server error'))
  }
})

app.listen(8080)
