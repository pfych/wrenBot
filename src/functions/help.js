const Message = `
Link music in a channel I can see and I'll find it on other platforms!~\n
**Supported Platforms:**
- Spotify
- Google Music
- Apple Music
- Soundcloud
- Deezer
- Youtube (prepend links with \`?\`)\n

Please create an issue on Github if you'd like to make a suggestion:
<https://github.com/Puffycheeses/wrenBot/>
Invite to your own server:
<https://discordapp.com/api/oauth2/authorize?client_id=686462477956808742&permissions=8&scope=bot>
`;

const help = (msg) => {
  msg.channel.send(Message);
};

module.exports = help;
