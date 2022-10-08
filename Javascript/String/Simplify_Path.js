/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    // only . refers to current level
    // only .. refers to up a level
    // multiple consecutive slashes treated as single slash '/'
    // others are treated as file/directory name
    
    // O(n) Time Complexity
    // O(n) Space Complexity
    
    // needs to start with /
    // can not end with /
    
    // The first thing that comes to my mind is a linked list
    
    let arr = [];
    
    let l = 0;
    while (l < path.length) {
        let tmp = '';
        let r = l+1;
        while (r < path.length && path[r] !== '/') {
            tmp = tmp + path[r];
            r++;
        }
        
        if (tmp.length > 0) {
            arr.push(tmp)
        }
        
        while (r+1 < path.length && path[r+1] === '/') {
            r++;
        }
        
        l = r;
    }
    
    // console.log(arr)
    
    // we start from the back and proceed to the front
    let result = ''
    let skips = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        let node = arr[i];
        if (arr[i] === '.') {
            continue;
        } else if (arr[i] === '..') {
            skips++;
            continue;
        } else {
            // a valid file/directory
            if (skips > 0) {
                skips--;
            } else {
                result = '/' + node + result;
            }
        }
    }
    
    if (result === '') {
        return "/"
    }
    
    return result;
    
    
};
