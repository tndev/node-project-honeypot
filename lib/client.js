const {promisify} = require('util')
const dns = require('dns')
dns.resolve4Async = promisify(dns.resolve4)

const Response = require('./response')

const apikeys = new WeakMap()

class Honeypod {
  constructor (apikey) {
    apikeys.set(this, apikey)
  }

  async query (ip) {
    let reversedIp = ip.split('.').reverse().join('.')

    try {
      var data = await dns.resolve4Async([apikeys.get(this), reversedIp, 'dnsbl.httpbl.org'].join('.'))
      return new Response(ip, data)
    } catch (err) {
      if (err.errno === 'ENOTFOUND') {
        return new Response(ip, '0.0.0.0')
      } else {
        throw err
      }
    }
  }
}

module.exports = Honeypod
