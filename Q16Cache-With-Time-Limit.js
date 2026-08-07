/*Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.

The class has three public methods:

set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already exists and false otherwise. Both the value and duration should be overwritten if the key already exists.

get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.

count(): returns the count of un-expired keys.*/




 class TimeLimitedCache{
    constructor(){
        this.cache= new Map(); //key -> {value, expireAt}

    }
    set(key, value, duration){
        const now = Date.now();
        const existing = this.cache.get(key);
        const exists = existing !== undefined && existing.expireAt > now;

        this.cache.set(key , { value,expireAt: now + duration});

        return exists;
    }

    get(key){
        const now = Date.now();
        const entry = this.cache.get(key);
        if (!entry || entry.expireAt <= now){
            return - 1;

        }

        return entry.value;
    }
    count() {
        const now = Date.now();
        let c = 0;
        for (const entry of this.cache.values()){
            if (entry.expireAt > now ) c++;
        }
        return c;
    }

}