class Node {
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * @param {number} capacity
 */
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = {}; // map to the link list
        this.counter = 0;
        // double linkedlist
        this.left = new Node(0, 0);
        this.right = new Node(0, 0);
        this.left.next = this.right;
        this.right.prev = this.left;
    };


// delete node from the list;
    remove = function(node) {
        // node is the node to be deleted
        let prev = node.prev;
        let next = node.next;
        prev.next = next;
        next.prev = prev;
    };

// insert key to the right of the list;
    insert = function(node) {
        let next = this.right;
        let prev = this.right.prev;
        node.prev = prev;
        node.next = next;
        prev.next = node;
        next.prev = node;
    };

/** 
 * @param {number} key
 * @return {number}
 */
    get = function(key) {
        if (this.cache[key] !== undefined) {
            this.remove(this.cache[key]);
            this.insert(this.cache[key]);
            return this.cache[key].value;
        }
        return -1;
    };

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
    put = function(key, value) {
        // update if we have
        if (this.cache[key] !== undefined) {
            this.remove(this.cache[key]);
            this.counter--;
        }

        this.cache[key] = new Node(key, value);
        this.insert(this.cache[key]);
        this.counter++;
        // delete is needed
        if (this.counter > this.capacity) {
            let lru = this.left.next;
            this.remove(lru);
            delete this.cache[lru.key]
            this.counter--;
        }
    };
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
