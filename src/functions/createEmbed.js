const config = require("../lib/data")

const createEmbed = (data, client) => {
  const metadata = data.entitiesByUniqueId[Object.keys(data.entitiesByUniqueId).filter(item => item.includes("SOUNDCLOUD") | item.includes("SPOTIFY") | item.includes("APPLE") | item.includes("ITUNES"))[0]]
  const linksByPlatform = data.linksByPlatform

  const fieldsArray = Object.keys(linksByPlatform).filter(platform => Object.keys(config.platformData).includes(platform)).map(_ => {
    return {
      "name": `${config.zeroWidth}`,
      "value": `${client.emojis.resolve(config.platformData[_].emoji)} [${config.platformData[_].prettyName}](${linksByPlatform[_].url})`
    }
  })

  return {
    "title": `${metadata.title}`,
    "description": `By ${metadata.artistName}`,
    "thumbnail": {
      "url": `${metadata.thumbnailUrl}`
    },
    "footer": {
      "text": `Service provided by https://song.link ${data.cached ? `(Cached)` : `(Fetched)`}${Object.keys(fieldsArray).includes('spotify') ? `` : `\n\nThe API seems to of left out spotify\nClick "More" to view all services`}`
    },
    "fields": [
      ...fieldsArray, 
      {
        "name": `${config.zeroWidth}`,
        'value': `🎵 [More](${data.pageUrl})`
      }
    ]
  }
}

module.exports = createEmbed