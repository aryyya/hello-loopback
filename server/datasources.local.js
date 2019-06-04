const { MONGODB_URL } = process.env

if (MONGODB_URL) {
  console.log(`using mongodb url ${MONGODB_URL}`)

  const dataSources = {
    db: {
      name: 'db',
      connector: 'mongodb',
      url: MONGODB_URL
    }
  }

  module.exports = dataSources
}
