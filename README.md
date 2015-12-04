# Lexicalifornia
Sorts [a-z]* lexicographically.

# Run time analysis
The sort function is (lexi)[https://github.com/MaerF0x0/lexicalifornia/blob/master/lexi.js].
It uses nodejs's underlying `Array.sort` function.

While I had difficulty finding the exact code line,
[this source](http://blog.rodneyrehm.de/archives/14-Sorting-Were-Doing-It-Wrong.html)
suggests that v8 (nodejs) uses QuickSort for Array.sort() w/ worstcase O(n^2)
[time complexity](https://en.wikipedia.org/wiki/Quicksort).
Array seemed to be a pragmatic way to go given most developer's familiarity with it, though
[this](http://blog.mgechev.com/2012/11/24/javascript-sorting-performance-quicksort-v8/)
article suggesst that implementing our own sort could be approximatly an order of
magnitude faster, because v8's implementation has to deal with sparse arrays and
we could assume packed ones.

# Running it
`node lexi.js` will run a few rudimentary tests, include a little benchmarking.
It passes benchmarks on my i7-4970k, you may need to relax it some.
