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
 * Removes a value from the AVL tree.
 */
AVL.prototype.remove = function(val) {
  this.root = remove(val, this.root);
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
 * Removes a value into the given tree.
 */
function remove(val, root) {
  if (!root) {
    return null;
  }
  if (val < root.val) {
    // Left
    root.left = remove(val, root.left);
  } else if (val > root.val) {
    // Right
    root.right = remove(val, root.right);
  } else if (root.left && root.right) {
    root.val = findMin(root.right).val;
    root.right = remove(root.val, root.right);
  } else {
    root = root.left ? root.left : root.right;
  }

  return balance(root);
};

/**
 * Finds the minimum value of a node.
 */
function findMin(node) {
  var min = node;
  while (min.left) min = min.left;
  return min;
}

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
  // Swap top node with the left node
  // So the left node becomes the top node
  // and the top node becomes the right node
  var top = node.left;
  var right = node;
  right.left = top.right;
  top.right = right;

  // Recompute heights
  right.height = Math.max(height(right.left), height(right.right)) + 1;
  top.height = Math.max(height(top.left), node.height) + 1;
  return top;
}

/**
 * Rotates a node with its right child.
 */
function rotateWithRightChild(node) {
  var top = node.right;
  var left = node;
  left.right = top.left;
  top.left = left;

  // Recompute heights
  left.height = Math.max(height(left.left), height(left.right)) + 1;
  top.height = Math.max(height(top.right), node.height) + 1;
  return top;
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
