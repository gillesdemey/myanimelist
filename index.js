var _filter = require('lodash.filter')
var request = require('request')
var xmljs = require('xml2js')

var MAL_APPINFO_BASE = 'http://myanimelist.net/malappinfo.php'

var xmlParser = new xmljs.Parser({
  explicitArray: false
})

function MyAnimeList (opts) {
  this._appinfoBaseURL = MAL_APPINFO_BASE

  this.username = opts.username
}

MyAnimeList.prototype.getAnimeList = function (status, cb) {
  if (typeof status === 'function') {
    cb = status
    status = 'all'
  }
  request({
    url: this._appinfoBaseURL,
    qs: {
      u: this.username,
      status: status,
      type: 'anime'
    }
  }, (err, result) => {
    if (err) return cb(err)
    else return parseResult(result, status)
  })

  function parseResult (result, status) {
    xmlParser.parseString(result.body, (err, res) => {
      if (err) return cb(err)

      var anime = filterStatus(res.myanimelist.anime, status)
      return cb(null, anime)
    })
  }
}

function filterStatus (animes, status) {
  return _filter(animes, anime => {
    return anime.my_status === status.toString()
  })
}

module.exports = function (opts) {
  return new MyAnimeList(opts)
}
