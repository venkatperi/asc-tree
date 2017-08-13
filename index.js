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

/**
 * Returns a ASCII visualization of a tree starting at the
 * supplied node.
 * @param {Object} node - root of tree
 * @param {Object} opts - options
 * @param {Function} opts.strings - strings to build the tree
 * @param {Function} [opts.eol=process.EOL] - end of line
 * @param {Function} opts.string - returns text representation of node
 * @param {Function} opts.children - returns node's children as array
 * @param {String} opts.prefix - private
 * @param {Boolean} [opts.isTail=true] - private
 * @returns {String} - printable tree
 */
function toAsciiTree( node, opts ) {
  opts = opts || {};
  const prefix = opts.prefix || '';
  const isTail = typeof opts.isTail === 'undefined' ?
    true : opts.isTail;
  const toString = opts.string || String;
  const children = opts.children || function ( n ) {
    return n.children || [];
  };
  const eol = opts.eol || '\n';
  const strings = opts.strings || {
    tail: '└─',
    continuation: '├─',
    prefix: {
      tail: '  ',
      continuation: '│ '
    }
  };

  return !node ? null : [
    prefix,
    isTail ? strings.tail : strings.continuation,
    toString( node ),
    eol
  ].concat( (children( node ) || []).map(
    ( c, i, arr ) => toAsciiTree( c, {
      prefix: prefix + ( isTail ?
        strings.prefix.tail :
        strings.prefix.continuation),
      isTail: i >= arr.length - 1,
      string: opts.string,
      children: opts.children,
      strings: opts.strings
    } ) ) )
    .join( '' );
}

module.exports = toAsciiTree;
