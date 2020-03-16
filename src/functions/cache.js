const config = require("../lib/data")

const checkCache = (url) => {
  for (let i = 0; i < config.cache.length; ++i) {
    if (config.cache[i].url === url) {
      console.log("Returning from cache")
      return {...config.cache[i].data, cached: true}
    } else {
      return false
    }
  }
}

module.exports = checkCache