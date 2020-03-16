const songLink = require("songlink-api")

const config = require("../lib/data")

const getSongLink = async (url) => {
  for (let i = 0; i < config.cache.length; ++i) {
    if (config.cache[i].url === url) {
      console.log("Returning from cache")
      return {...config.cache[i].data, cached: true}
    }
  }

  let data = await songLink.getLinks({url: url, apiKey: process.env.api})
  console.log("Pushing to cache")
  config.cache.push({url: url, data: data})
  return {...data, cached: false}
}

module.exports = getSongLink