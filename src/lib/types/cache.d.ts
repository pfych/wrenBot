import { SongLinks } from './getSongLink'
import { SonglinkResponse } from 'songlink-api/lib/types/Response';

export declare type SongCache = SongCacheItem[];
export declare type SongCacheItem = { url: String, data: SonglinkResponse }
export declare type CacheCheck = SongLinks | false