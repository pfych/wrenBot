import { zeroWidth, platformData } from "../lib/data"
import { SongLinks } from "../lib/types/getSongLink"
import { Client } from "discord.js"
import { LinksByPlatform } from "../lib/types/platforms"

export const createEmbed = (data: SongLinks, client: Client) => {
  const metadata = data.entitiesByUniqueId[Object.keys(data.entitiesByUniqueId)
    .filter(item => 
      item.includes("SOUNDCLOUD") || 
      item.includes("SPOTIFY") || 
      item.includes("APPLE")
    )[0]]

  const linksByPlatform: LinksByPlatform = data.linksByPlatform
  const fieldsArray = Object.keys(linksByPlatform).filter(platform => Object.keys(platformData).includes(platform)).map((_: string) => {
    return {
      "name": `${zeroWidth}`,
      "value": `${client.emojis.resolve(platformData[_].emoji)} [${platformData[_].prettyName}](${linksByPlatform[_].url})`
    }
  })

  return {
    "title": `${metadata.title}`,
    "description": `By ${metadata.artistName}`,
    "thumbnail": {
      "url": `${metadata.thumbnailUrl}`
    },
    "footer": {
      "text": `Service provided by https://song.link ${data.cached ? `(Cached)` : `(Fetched)`}`
    },
    "fields": fieldsArray
  }
}