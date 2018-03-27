This example shows a few interesting techniques with [D3](http://d3js.org/):

* Stock prices in [CSV format](https://github.com/mbostock/d3/wiki/CSV) are loaded asynchronously.
* Stock prices are [nested](https://github.com/mbostock/d3/wiki/Arrays#wiki-d3_nest) by symbol.
* The *x*-scale is the minimum and maximum across symbols. (Note Google's IPO.)
* The *y*-scale is local to each symbol; the domain is set per multiple.
* [Area](https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area) and [line](https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-line) shapes are used to fill and stroke separately.

Two alternative approaches to small multiples include using [selection.each to create a scope](/mbostock/9490313) and [binding local scales](/mbostock/9490516) to each multiple.

by[mbostock](http://bl.ocks.org/mbostock)