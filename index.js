const Discord = require("discord.js")
const songLink = require("songlink-api")

const client = new Discord.Client()

const platforms = [
  "open.spotify.com",
  "play.google.com/music/m",
  'music.apple.com',
  'soundcloud.com'
]

const platformData = {
  "spotify": {
    emoji: "686481957730779146",
    prettyName: "Spotify"
  },
  "soundcloud": {
    emoji: "686481619405766706",
    prettyName: "Soundcloud"
  },
  "google": {
    emoji: "686482178464284674",
    prettyName: "Google Play"
  },
  "appleMusic": {
    emoji: "686482030120140886",
    prettyName: "Apple Music"
  },
  "youtube": {
    emoji: "689044959290196020",
    prettyName: "Youtube"
  }
}
const zeroWidth = "​"
let cache = []

client.on("message", async msg => {
  if (msg.author.bot) return;
  if(new RegExp(platforms.join("|")).test(msg)) {
    let services = msg.content.match(/\bhttps?:\/\/\S+/gi)
    services.forEach(async (service) => {
      let embed = createEmbed(await getSongLink(service))
      msg.channel.send({ embed })
    })
  }
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!\ninvite with https://discordapp.com/api/oauth2/authorize?client_id=686462477956808742&permissions=8&scope=bot`)
});

async function getSongLink(url) {
  for (let i = 0; i < cache.length; ++i) {
    if (cache[i].url === url) {
      console.log("Returning from cache")
      return {...cache[i].data, cached: true}
    }
  }

  let data = await songLink.getLinks({url: url, apiKey: process.env.api})
  console.log("Pushing to cache")
  cache.push({url: url, data: data})
  return {...data, cached: false}
}

function createEmbed(data) {
  console.log(data)
  const itunesData = data.entitiesByUniqueId[Object.keys(data.entitiesByUniqueId).filter(item => item.includes("SOUNDCLOUD") | item.includes("SPOTIFY") | item.includes("APPLE"))[0]]
  const linksByPlatform = data.linksByPlatform

  const fieldsArray = Object.keys(linksByPlatform).filter(platform => Object.keys(platformData).includes(platform)).map(_ => {
    return {
      "name": `${zeroWidth}`,
      "value": `${client.emojis.resolve(platformData[_].emoji)} [${platformData[_].prettyName}](${linksByPlatform[_].url})`
    }
  })

  return {
    "title": `${itunesData.title}`,
    "description": `By ${itunesData.artistName}`,
    "thumbnail": {
      "url": `${itunesData.thumbnailUrl}`
    },
    "footer": {
      "text": `Service provided by https://song.link ${data.cached ? `(Cached)` : `(Fetched)`}`
    },
    "fields": fieldsArray
  }
}

function login() {
  console.info(`logging in with ${process.env.api ? `api key` : `no api key`}`)
  client.login(process.env.key)
    .catch(e => console.log(e))
}

login()