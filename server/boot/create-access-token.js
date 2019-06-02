const Promise = require('bluebird')

module.exports = function(app, cb) {
  const {
    User,
    AccessToken
  } = app.models

  const email = 'admin@example.com'
  const password = 'helloworld123'
  const accessToken = 'helloworld123'

  return Promise
    .resolve()
    .then(() => User.findOne({
      where: {
        email
      }
    }))
    .then(user => (user ? user : User.create({
      email,
      password
    })))
    .then(user => AccessToken.upsert({
      id: accessToken,
      userId: user.id
    }))
    .then(token => {
      console.log(`access token: ${token.id}`)
    })
    .asCallback(cb)
}
