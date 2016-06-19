var util = require('util')

var myAnimeList = require('../')({
  username: 'angry_unicorn'
})

// 1 = watching
myAnimeList.getAnimeList(1, (err, resp) => {
  if (err) console.error(err)
  console.log(util.inspect(resp, false, null))
})
