import { getLinks } from 'songlink-api'
import { SongLinks } from '../lib/types/getSongLink'

import { checkCache } from "./cache"
import { cache } from '../lib/data'
import { SonglinkResponse } from 'songlink-api/lib/types/Response'
import { CacheCheck } from '../lib/types/cache'

export const getSongLink = async (url: string): Promise<SongLinks> => {
  let check: CacheCheck = checkCache(url)
  if (check) return check

  let data: SonglinkResponse = await getLinks(
    { userCountry: "AU", url: url }, 
    { apiKey: process.env.apiKey }
  ) 

  console.log("Pushing to cache")
  cache.push({url: url, data: data})

  return {...data, cached: false}
}