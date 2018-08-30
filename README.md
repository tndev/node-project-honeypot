# Project Honeypot

This npm module will allow you to query and consume the Project Honeypot API. Query it with an IP, and an Object will be sent back with relevent metadata regarding that IP.

## Installation

    npm install @tn-dev/project-honeypot

## Usage

1. Register for an account at [Project Honeypot](https://www.projecthoneypot.org).
2. Enable API access and receive an access key.
3. Use this code:

``` js
    const Honeypot = require('project-honeypot')
    
    let pod = new Honeypot('YOUR-ACCESS-KEY')

    // ...

    let response = await honeypot.query(ip)
```

## Result


- If the IP address was not found, `response.found` is `false`.
- Otherwise, if `response.found` is `true` it will contain the following additional fields:

``` javascript
{
  ip: '127.1.1.5',
  found: true,
  lastSeenDays: 1,
  threatScore: 1,
  type: {
    searchEngine: false,
    suspicious: true,
    harvester: false,
    commentSpammer: true
  }
}
```

**Note**: Certain ip addresses in the `127.*.*.*` range are test addresses, `127.1.1.5` being one of them. It returns a result record corresponding to a IP address flagged as both `suspicious` and `comment spammer`. [View the full list here](https://www.projecthoneypot.org/httpbl_api.php).

## Tests

``` bash
$ npm i
$ npm test
```

## License

[BSD 3-Clause](https://opensource.org/licenses/BSD-3-Clause)
