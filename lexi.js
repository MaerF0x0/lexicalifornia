_ = require('underscore')
assert = require('assert')

/**
 * Lexi is a lexigraphical sorter w/ arbitrary ordering
 *
 * @param string[] the strings to be sorted
 * @param char[] the ordering of codepoints
 * @return string[] the lexigraphical sorted string array (non-stable)
 */
module.exports.lexi = lexi = function lexi(strings, ordering) {
  /**
   * charCompare returns comparison of chars based on ordering closure
   *
   * @param char leftChar
   * @param char rightChar
   * @return number 1 if left is greater, 0 if equal, -1 if lessthan
   */
  function charCompare(leftChar, rightChar) {
    var leftIndex = _.indexOf(ordering, leftChar);
    var rightIndex = _.indexOf(ordering, rightChar);
    return leftIndex - rightIndex;
  };

  /**
   * wordSort will decide if a word should come before or after another
   *
   * @param string leftWord
   * @param string rightWord
   * @return 1 if left is greater, 0 if equal, -1 if lessthan
   */
  function wordSort(leftWord, rightWord) {
    for (var i=0; i< leftWord.length;  i++) {
      comparison = charCompare(leftWord[i], rightWord[i]);

      if (comparison > 0 ) { // Left greater than right
        return 1 // leftWord > rightWord>
      } else if (comparison < 0) {
        return -1
      } else {
       // If equal, lets check the next char
       continue;
      }
    }
  };

  // Use built in Array.prototype.sort function w/ comparison function
  return strings.sort(wordSort)
}


if (require.main === module) {
  // Below is just testing code, could of used mocha/expect
  var test_cases = [
    {
      strings:["acb", "abc", "bca"],
      ordering:"abc",
      expected:["abc","acb","bca"],
      caseName: "example1"
    },
    {
      strings:["acb", "abc", "bca"],
      ordering:"cba",
      expected:["bca", "acb", "abc"],
      caseName: "example2"
    },
    {
      strings:["aaa","aa",""],
      ordering:"a",
      expected: ["", "aa", "aaa"],
      caseName: "example3"
    },
    {
      strings: [""],
      ordering: "abcdef",
      expected: [""],
      caseName: "empty string"
    },
    {
      strings: ["f", "ff","fe","fd"],
      ordering: "abcdef",
      expected: ["f", "fd","fe","ff"],
      caseName: "subsequent chars"
    },
    {
      strings: ['lexicalifornia', 'apple','aapl', 'aardvark','aaron', 'banana', 'banananana', 'lexi', 'lexical'],
      ordering: "abcdefghijklmnopqrstuvwxyz",
      expected: ['aapl', 'aardvark', 'aaron', 'apple', 'banana', 'banananana', 'lexi', 'lexical', 'lexicalifornia'],
      caseName: "lots of stuff"
    },
  ];

  // Run through standard test cases
  test_cases.forEach(function(tcase) {
    assert.deepEqual(lexi(tcase.strings, tcase.ordering), tcase.expected)
    console.log("[✓ ]", tcase.caseName)
  });


  // Generate a massive test for performance fun
  var alphabet = 'abcdefghijklmnopqrstuvwxyz'
  var biglist = []
  for (var n = 0; n < 26; n ++) {
    for (var i = (n*n*n) +1; i>0; i--) { // do words from this set
      biglist.push(_.reduce(_.sample(alphabet, n), function(word, c) { return word + c}));
    }
  }
  _.shuffle(biglist);
  var startTime = new Date().valueOf()
  lexi_result = lexi(biglist, alphabet);
  var endTime = new Date().valueOf()
  var wordsPerSecond = biglist.length * 1000 / (endTime -startTime)
  assert(_.isArray(lexi_result))
  console.log("[✓ ] biglist: returned array")

  assert.equal(lexi_result.length, biglist.length);
  console.log("[✓ ] biglist: lengths match (" + biglist.length +")")
  assert(wordsPerSecond > 100000, 'Expected sort speed > 100000, (actual = ' + wordsPerSecond + ")")
  console.log("[✓ ] biglist: speed " + wordsPerSecond + " words per second ("
    + biglist.length + " words in " + (endTime-startTime)/1000 + " seconds)")
}
