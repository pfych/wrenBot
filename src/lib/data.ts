import { SongCache } from "./types/cache"
import { PlatformData } from "./types/platforms"

export let platformData: {[key: string]: PlatformData} = {
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

export let platforms: string[] = [
  "open.spotify.com",
  "play.google.com/music/m",
  'music.apple.com',
  'soundcloud.com'
]


export let zeroWidth: string = "​"

export let cache: SongCache = []