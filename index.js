const fetch = require('node-fetch')
const Twitter = require('twitter')
const { config } = require('./config')
const client = new Twitter(config)

fetch('http://www.reddit.com/r/todayilearnt/new.json?sort=hot')
.then(v => v.json())
.then(v => reduceToObject(v.data.children))
.then(arr => arr.forEach(v => {
  let status = { status: v.title + ' ' + v.url }
  client.post('statuses/update', status)
  .then(tweet => tweet)
  .catch(err => {
    console.log(err[0].message)
  })
}))
.catch(err => {
  console.log(err[0].message)
})

const reduceToObject = arr => {
  return arr.reduce((a, v) => {
    let data = v.data
    let obj = {}
    obj.id = data.subreddit_id
    obj.title = data.title
    obj.url = data.url
    a.push(obj)
    return a
  }, [])
}
