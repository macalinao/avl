var expect = require('chai').expect;
var AVL = require('./');

describe('avl', function() {
  it('should act like an AVL tree', function() {
    var avl = new AVL();
    avl.insert(1);
    avl.insert(2);
    avl.insert(3);
    avl.insert(4);
    avl.insert(5);
    avl.insert(6);
    avl.insert(-1);
    avl.insert(-2);
    avl.insert(-3);

    avl.print();
  });
});
