/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    // definately in the linkedlist
    
    // how should we access the head ???
    
    node.val = node.next.val
    node.next = node.next.next;
};
