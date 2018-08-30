
var searchEngine = {
  0: 'Undocumented',
  1: 'AltaVista',
  2: 'Ask',
  3: 'Baidu',
  4: 'Excite',
  5: 'Google',
  6: 'Looksmart',
  7: 'Lycos',
  8: 'MSN',
  9: 'Yahoo',
  10: 'Cuil',
  11: 'InfoSeek',
  12: 'Miscellaneous'
}

const visitorType = {
  searchEngine: 0,
  suspicious: 1,
  harvester: 2,
  commentSpammer: 4
}

class Response {
  constructor (ip, info) {
    info = info.toString().split('.').map(Number)

    // parse the response
    this.listed = info[0] === 127
    this.ip = ip
    if (this.listed) {
      this.type = {
        searchEngine: info[3] === visitorType.searchEngine,
        suspicious: !!(info[3] & visitorType.suspicious),
        harvester: !!(info[3] & visitorType.harvester),
        commentSpammer: !!(info[3] & visitorType.commentSpammer)
      }
      this.threatScore = info[2]
      this.lastSeenDays = info[1]
    }

    return false
  }
}

module.exports = Response
