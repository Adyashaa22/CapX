class LRU {
    constructor() {
      this.accessOrder = [];
    }
  
    evict(cache) {
      const lruKey = this.accessOrder.shift();
      cache.delete(lruKey);
    }
  
    access(key) {
      const index = this.accessOrder.indexOf(key);
      if (index !== -1) {
        this.accessOrder.splice(index, 1);
      }
      this.accessOrder.push(key);
    }
  }
  
  class LFU {
    constructor() {
      this.accessCount = new Map();
    }
  
    evict(cache) {
      const lfuKey = Array.from(this.accessCount.entries()).sort((a, b) => a[1] - b[1])[0][0];
      cache.delete(lfuKey);
    }
  
    access(key) {
      const count = this.accessCount.get(key) || 0;
      this.accessCount.set(key, count + 1);
    }
  }
  
  class CacheLevel {
    constructor(size, evictionPolicy) {
      this.size = size;
      this.evictionPolicy = evictionPolicy;
      this.cache = new Map();
      this.evictionPolicyInstance = evictionPolicy === 'LRU' ? new LRU() : new LFU();
    }
  
    evict() {
      this.evictionPolicyInstance.evict(this.cache);
    }
  
    access(key) {
      this.evictionPolicyInstance.access(key);
    }
  }
  
  class MultilevelCache {
    constructor() {
      this.cacheLevels = [];
    }
  
    addCacheLevel(size, evictionPolicy) {
      const cacheLevel = new CacheLevel(size, evictionPolicy);
      this.cacheLevels.push(cacheLevel);
    }
  
    removeCacheLevel(level) {
      this.cacheLevels.splice(level - 1, 1);
    }
  
    displayCache() {
      for (let i = 0; i < this.cacheLevels.length; i++) {
        console.log(`L${i + 1} Cache: ${Array.from(this.cacheLevels[i].cache.entries()).map(([key, value]) => `${key}: ${value}`).join(', ')}`);
      }
    }
  
    get(key) {
      for (let i = 0; i < this.cacheLevels.length; i++) {
        if (this.cacheLevels[i].cache.has(key)) {
          const value = this.cacheLevels[i].cache.get(key);
          this.promote(key, value, i);
          this.cacheLevels[i].access(key);
          return value;
        }
      }
      return null;
    }
  
    put(key, value) {
      if (this.cacheLevels[0].cache.has(key)) {
        this.cacheLevels[0].cache.set(key, value);
      } else {
        this.cacheLevels[0].cache.set(key, value);
        if (this.cacheLevels[0].cache.size > this.cacheLevels[0].size) {
          this.evict(0);
        }
      }
    }
  
    promote(key, value, level) {
      for (let i = level; i > 0; i--) {
        this.cacheLevels[i - 1].cache.set(key, value);
        this.cacheLevels[i].cache.delete(key);
      }
    }
  
    evict(level) {
      this.cacheLevels[level].evict();
    }
  }
  
  // Test the implementation
  const cache = new MultilevelCache();
  cache.addCacheLevel(3, 'LRU');
  cache.addCacheLevel(2, 'LFU');
  cache.put("A", "1");
  cache.put("B", "2");
  cache.put("C", "3");
  console.log(cache.get("A")); // Returns "1" from L1
  cache.put("D", "4"); // L1 is full, evicts least recently used
  console.log(cache.get("C")); // Fetches from L2 and promotes to L1
  cache.displayCache();