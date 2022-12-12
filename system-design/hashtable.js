const assert = require("assert");

class Node {
  constructor(key = null, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

// Time Complexity:
/*
  Methods | Worst Case | Average Case |
    Get   |    O(n)    |     O(1)     |
   Insert |    O(n)    |     O(1)     |
   Delete |    O(n)    |     O(1)     |
*/

class Hashtable {
  constructor(size = 100) {
    this.table = new Array(size);
  }

  hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i) - "a".charCodeAt(0);
    }
    return total % this.table.length;
  }

  // @param {String} key for the hashtable
  // @param {String} value for the hashtable
  // @return {void}
  insert(key, value) {
    let index = this.hash(key);
    if (this.table[index] === undefined) {
      //meaning an empty slot
      this.table[index] = new Node(key, value);
    } else {
      let curr = this.table[index];
      while (curr.next !== null) {
        // we need to check if the key has been previously stored
        if (curr.key === key) {
          curr.value = value;
          return;
        }
        curr = curr.next;
      }

      // at this step, that means we have not seen previously stored
      curr.next = new Node(key, value);
    }
  }

  // @param {String} key for the hashtable
  // @return {String} Value for the key-value pair
  get(key) {
    let index = this.hash(key);
    let curr = this.table[index];

    if (curr === undefined) {
      throw new Error("No key was found");
    } else {
      while (curr !== null) {
        if (curr.key === key) {
          return curr.value;
        }
        curr = curr.next;
      }
    }
    throw new Error("No key was found");
  }

  // @param {String} key for the hashtable
  // @return {void}
  delete(key) {
    let index = this.hash(key);
    let curr = this.table[index];

    if (curr === undefined) {
      throw new Error("No key was found");
    }

    // if the first key is the one that we want to delete
    if (curr.key === key) {
      if (curr.next === null) {
        this.table[index] = undefined;
      } else {
        this.table[index] = curr.next;
      }
      return;
    }

    while (curr.next !== null) {
      let child = curr.next;
      if (child.key === key) {
        curr.next = child.next;
        return;
      }
    }

    // if we finds nothing..
    throw new Error("No key was found");
  }
}

let ht = new Hashtable();
ht.insert("ABC", "ABC");
ht.insert("CBA", "CBA");
ht.insert("AA", "BB");

assert.strictEqual(ht.get("ABC"), "ABC");
assert.strictEqual(ht.get("CBA"), "CBA");
assert.strictEqual(ht.get("AA"), "BB");

ht.delete("ABC");
assert.throws(() => ht.get("ABC"), Error);
assert.strictEqual(ht.get("CBA"), "CBA");

