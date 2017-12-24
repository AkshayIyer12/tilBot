const {downloadAndTweet} = require('./lib/app.js')
console.log('Running now...')
downloadAndTweet()
setInterval(() => downloadAndTweet(), 14 * 60 * 60)
