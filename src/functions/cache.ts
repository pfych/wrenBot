import { cache } from "../lib/data"
import { CacheCheck } from "../lib/types/cache"

export const checkCache = (url: String): CacheCheck => {
  for (let i = 0; i < cache.length; ++i) {
    if (cache[i].url === url) {
      console.log("Returning from cache")
      return {...cache[i].data, cached: true}
    }
  }
  return false
}