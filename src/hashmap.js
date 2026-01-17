class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    if (this.buckets[index] === null) {
      this.buckets[index] = [{ key, value }];
      this.size++;
    } else {
      for (let pair of this.buckets[index]) {
        if (pair.key === key) {
          pair.value = value;
          return;
        }
      }

      this.buckets[index].push({ key, value });
      this.size++;
    }

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    const bucket = this.buckets[index];

    if (bucket === null) {
      return null;
    }

    for (const pair of bucket) {
      if (pair.key === key) {
        return pair.value;
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    const bucket = this.buckets[index];

    if (!bucket) return false;

    for (const pair of bucket) {
      if (pair.key === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    const bucket = this.buckets[index];

    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys() {
    let keys = [];

    for (let bucket of this.buckets) {
      if (bucket !== null)
        for (let pair of bucket) {
          keys.push(pair.key);
        }
    }

    return keys;
  }

  values() {
    let values = [];

    for (let bucket of this.buckets) {
      if (bucket !== null)
        for (let pair of bucket) {
          values.push(pair.value);
        }
    }

    return values;
  }

  entries() {
    const entries = [];

    for (let bucket of this.buckets) {
      if (bucket !== null)
        for (let pair of bucket) {
          entries.push([pair.key, pair.value]);
        }
    }

    return entries;
  }

  resize() {
    const oldBuckets = this.buckets;

    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;

    for (const bucket of oldBuckets) {
      if (!bucket) continue;

      for (const { key, value } of bucket) {
        this.set(key, value);
      }
    }
  }
}

export default HashMap;
