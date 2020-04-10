import * as Discord from 'discord.js';
import { createEmbed } from './functions/createEmbed'
import { getSongLink } from './functions/getSongLink'

const config = require("./lib/data")
const client = new Discord.Client()

client.on("message", async (msg: Discord.Message) => {
  if(msg.author.bot) return;
  if(new RegExp(config.platforms.join("|")).test(msg.content)) {
    let services = msg.content.match(/\bhttps?:\/\/\S+/gi)
    services?.forEach(async (service) => {
      let embed = createEmbed(await getSongLink(service), client)
      msg.channel.send({ embed })
    })
  }
})

client.on('ready', () => {
  console.log(`
    Logged in as ${client.user?.tag}!\n
    invite with https://discordapp.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=8&scope=bot`)
})

export function login() {
  console.info(`Logging in with ${process.env.api ? `api key` : `no api key`}`)
  client.login(process.env.key)
    .catch(e => console.log(e))
}

login()