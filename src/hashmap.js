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
}
