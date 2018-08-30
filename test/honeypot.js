const should = require('should')
const Honeypot = require('../index')

describe('honeypot', function () {
  it('honeypot object should be initialized', function () {
    let pot = new Honeypot('api_key')
    should(pot).be.ok
  })

  it('should return NXDOMAIN for 127.0.0.1', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.0.0.1')
    response.listed.should.equal(false)
  })

  it('should return 127.1.1.0 as listed', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.1.1.0')
    response.listed.should.equal(true)
  })

  it('should have a thread level of 10', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.1.10.1')
    response.threatScore.should.equal(10)
  })

  it('should have a thread level of 20', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.1.20.1')
    response.threatScore.should.equal(20)
  })

  it('should have a thread level of 40', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.1.40.1')
    response.threatScore.should.equal(40)
  })

  it('should have a recency of 10', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.10.1.1')
    response.lastSeenDays.should.equal(10)
  })

  it('should have a recency of 20', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.20.1.1')
    response.lastSeenDays.should.equal(20)
  })

  it('should return searchengine for 127.1.1.0', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.1.1.0')
    response.type.should.deepEqual({
      searchEngine: true,
      suspicious: false,
      harvester: false,
      commentSpammer: false
    })
  })

  it('should return suspicious for 127.1.1.1', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.1.1.1')
    response.type.should.deepEqual({
      searchEngine: false,
      suspicious: true,
      harvester: false,
      commentSpammer: false
    })
  })

  it('should return harvester for 127.1.1.2', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.1.1.2')
    response.type.should.deepEqual({
      searchEngine: false,
      suspicious: false,
      harvester: true,
      commentSpammer: false
    })
  })

  it('should return suspicious,harvester for 127.1.1.3', async function () {
    let pot = new Honeypot('api_key')
    let response = await pot.query('127.1.1.3')
    response.type.should.deepEqual({
      searchEngine: false,
      suspicious: true,
      harvester: true,
      commentSpammer: false
    })
  })

  it('should fail for wrong api key', async function () {
    let pot = new Honeypot('....')
    let response
    try {
      response = await pot.query('127.1.1.3')
    } catch (err) {}
    should(response).equal(undefined)
  })
})
