/* eslint-disable global-require,import/no-dynamic-require */
// Copyright 2017, Venkat Peri.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


const asciiTree = require( '..' );
const assert = require( 'assert' );

class Node {
  constructor( name, parent ) {
    this.name = name;
    this.children = []
    if ( parent ) {
      this._parent = parent;
      parent.addChild( this );
    }
  }

  // eslint-disable-next-line no-shadow
  addChild( node ) {
    this.children.push( node );
  }

  toString() {
    return this.name;
  }
}

function node( name, parent ) {
  return new Node( name, parent );
}

let tree = null;

describe( 'ascii tree', () => {
  it( 'root node', () => {
    tree = node( 'root' );
    assert( asciiTree( tree ) === '└─root\n' );
  } );

  it( 'two levels', () => {
    tree = node( 'root' );
    node( 'a', tree );
    node( 'b', tree );
    assert( asciiTree( tree ) === '└─root\n  ├─a\n  └─b\n' )
  } );
} );
