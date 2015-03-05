// Adelson-Velsky and Landis's tree
// Self-balancing binary search tree
var AVL = module.exports = function() {
  this.root = null;
};

/**
 * Inserts a value into the AVL tree.
 */
AVL.prototype.insert = function(val) {
  this.root = insert(val, this.root);
};

/**
 * Prints the contents of this AVL. (In-order);
 */
AVL.prototype.print = function() {
  function printNode(node, depth) {
    if (!node) return;
    if (!depth) depth = 0;
    var space = '';
    for (var i = 0; i < depth; i++) {
      space += '  ';
    }

    printNode(node.left, depth + 1);
    console.log(space + node.val);
    printNode(node.right, depth + 1);
  }

  printNode(this.root);
};

/**
 * Inserts a value into the given tree.
 */
function insert(val, root) {
  if (!root) {
    return {
      val: val,
      height: 0
    };
  }
  if (val < root.val) {
    // Left
    root.left = insert(val, root.left);
  } else if (val > root.val) {
    // Right
    root.right = insert(val, root.right);
  } else {
    // Duplicate -- ignore
  }

  return balance(root);
};

/**
 * Balances a node.
 */
function balance(node) {
  if (!node) return node;

  var diff = height(node.left) - height(node.right);
  if (diff > 1) {
    if (height(node.left.left) >= height(node.left.right)) {
      node = rotateWithLeftChild(node);
    } else {
      node = doubleWithLeftChild(node);
    }
  } else if (diff < -1) {
    if (height(node.right.right) >= height(node.right.left)) {
      node = rotateWithRightChild(node);
    } else {
      node = doubleWithRightChild(node);
    }
  }

  node.height = Math.max(height(node.left), height(node.right)) + 1;

  return node;
}

/**
 * Rotates a node with its left child.
 */
function rotateWithLeftChild(node) {
  // Make the left node the top node
  var a = node.left;
  // and make the current top node's left node the left node's right node
  node.left = a.right;
  // and make the current top node the right node
  a.right = node;

  // Recompute heights
  node.height = Math.max(height(node.left), height(node.right)) + 1;
  a.height = Math.max(height(a.left), node.height) + 1;
  return a;
}

/**
 * Rotates a node with its right child.
 */
function rotateWithRightChild(node) {
  // Make the right node the top node
  var a = node.right;
  // and make the current top node's right node the right node's left node
  node.right = a.left;
  // and make the current top node the left node
  a.left = node;

  // Recompute heights
  node.height = Math.max(height(node.left), height(node.right)) + 1;
  a.height = Math.max(height(a.right), node.height) + 1;
  return a;
}

/**
 * Doubly rotates a node with a left child.
 */
function doubleWithLeftChild(node) {
  node.left = rotateWithRightChild(node.left);
  return rotateWithLeftChild(node);
}

/**
 * Doubly rotates a node with a right child.
 */
function doubleWithRightChild(node) {
  node.right = rotateWithLeftChild(node.right);
  return rotateWithRightChild(node);
}

/**
 * Gets the height of a node.
 */
function height(node) {
  return node ? node.height : -1;
}

