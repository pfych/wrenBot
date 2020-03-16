const Discord = require("discord.js")
const songLink = require("songlink-api")

const createEmbed = require("./functions/createEmbed")
const config = require("./lib/data")

const client = new Discord.Client()

client.on("message", async msg => {
  if (msg.author.bot) return;
  if(new RegExp(config.platforms.join("|")).test(msg)) {
    let services = msg.content.match(/\bhttps?:\/\/\S+/gi)
    services.forEach(async (service) => {
      let embed = createEmbed(await getSongLink(service), client)
      msg.channel.send({ embed })
    })
  }
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!\ninvite with https://discordapp.com/api/oauth2/authorize?client_id=686462477956808742&permissions=8&scope=bot`)
});

async function getSongLink(url) {
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

function login() {
  console.info(`logging in with ${process.env.api ? `api key` : `no api key`}`)
  client.login(process.env.key)
    .catch(e => console.log(e))
}

login()