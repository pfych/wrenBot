const LastfmAPI = require("lastfm-node-client");

const fm = new LastfmAPI(process.env.keyfm, process.env.secretfm);
const limit = 5;

const fmEmbed = async function (msg) {
  let topAlbum = (
    await fm.userGetTopAlbums({
      user: "Puffycheeses",
      limit: limit,
      period: "7day",
    })
  ).topalbums.album[Math.floor(Math.random() * (limit - 1))];
  console.log(topAlbum);
  const embed = {
    // Key                      Value
    title: topAlbum.name,
    description: `**Artist:** ${topAlbum.artist.name}\n**Track Play-count:** ${topAlbum.playcount}`,
    url: topAlbum.url,
    color: 11011009,
    footer: {
      icon_url: "https://www.iconsdb.com/icons/preview/red/lastfm-2-xxl.png",
      text: "Data provided by last.fm",
    },
    thumbnail: {
      url: topAlbum.image[3]["#text"],
    },
  };
  console.log("sending");
  msg.channel.send("According to my last.fm habits this albums pretty good", {
    embed,
  });
};

module.exports = fmEmbed;
