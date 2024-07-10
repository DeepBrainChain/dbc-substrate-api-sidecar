import { LRUCache } from 'lru-cache';
import { IBlock } from '../../types/responses';
export declare const initLRUCache: () => LRUCache<string, IBlock>;
