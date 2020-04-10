const songLink = require("songlink-api");

const checkCache = require("./cache");

const config = require("../lib/data");

const getSongLink = async (url) => {
  let check = checkCache(url);
  if (check) return check;

  let data = await songLink.getLinks({ url: url, apiKey: process.env.api });
  console.log("Pushing to cache");
  config.cache.push({ url: url, data: data });
  return { ...data, cached: false };
};

module.exports = getSongLink;
