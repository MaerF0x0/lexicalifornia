# Lexicalifornia
Sorts [a-z]* lexicographically.

# Run time discussion
The sort function is (lexi)[https://github.com/MaerF0x0/lexicalifornia/blob/master/lexi.js].
It uses nodejs' underlying Array.sort function.
I had difficulty finding the exact code line, but
[this source](http://blog.rodneyrehm.de/archives/14-Sorting-Were-Doing-It-Wrong.html)
suggests that v8 (nodejs) uses QuickSort w/ worstcase O(n^2)
[time complexity](https://en.wikipedia.org/wiki/Quicksort).
This seemed to be a pragmatic way to go, though
[this](http://blog.mgechev.com/2012/11/24/javascript-sorting-performance-quicksort-v8/)
article suggest that implementing our own sort could be approximate an order of
magnitude faster, because v8's implementation has to deal with sparse arrays and
we could assume packed ones.

# Running it
`node lexi.js` will run a few rudimentary tests.
