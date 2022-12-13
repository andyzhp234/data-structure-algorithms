// What is a miniURL?
// A web service that takes in an long url
// and return a shortend url

// Use case
// Input URL
// Output an Shortend URL

class MiniURL {
  constructor() {
    this.current = 0;
    this.shortToLong = {};
    this.longToShort = {};
  }

  // use a good hash function such as SHA-256
  hash(url) {}

  // this function will shortend the url and return a hashed version of url
  shorten(url) {
    if (this.current > 100000) {
      throw new Error("database is full");
    }

    let shortenURL = `https://localhost:5000/${this.current}`;
    this.shortToLong[shortenURL] = url;
    this.longToShort[url] = shortenURL;
    this.current++;
    return shortenURL;
  }

  // this function will convert the hashed url back to original url
  lookup(longURL) {
    return this.shortToLong[longURL];
  }
}

let mini = new MiniURL();
console.log(mini.shorten("https://www.youtube.com/watch?v=RDzsrmMl48I"));
console.log(mini.shorten("https://www.youtube.com/watch?v=RDzsrmMl48I"));
console.log(mini.shorten("https://www.youtube.com/watch?v=RDzsrmMl48I"));
console.log(mini.lookup("https://localhost:5000/2"));
console.log(mini.lookup("https://localhost:5000/3"));
