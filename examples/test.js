async function main () {
  const Honeypod = require('../index')
  var pot = new Honeypod('api_key')
  var response = await pot.query('127.1.1.5')
  console.dir(response)
}

main()
