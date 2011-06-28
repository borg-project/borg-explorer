borg-explorer
=============

This tool generates an experimental visualization of solver evaluation data,
such as data obtained by [SAT solver
competitions](http://www.satcompetition.org/), centered around an interactive
two-dimensional projection of the space of problem instances. It is a component
of the borg algorithm portfolio project:

http://nn.cs.utexas.edu/pages/research/borg/

An example of its output can be found at:

http://www.cs.utexas.edu/~bsilvert/borgview/

Architecture
------------

The borg-explorer tool reads evaluation data as input and generates a static
directory tree, including HTML and JSON files, as output. The flow of this
generation process is:

1. Solver run data are read (CSV).
2. A mixture model is fit to the data (using EM).
3. Using KL divergence scores from the mixture model, multidimensional scaling
   is used to project the problem instances (using R's MDS implementation.)
4. The projection, similarity scores, and other data are written to JSON.
5. The HTML, JavaScript, and other page files are generated.

Installation
------------

First, install `borg` and `cargo` in a virtualenv according to the [borg
installation instructions](http://borg.readthedocs.org/en/latest/installation.html).
The portfolio calibration step is unnecessary.

With the same virtualenv active, install the borg-explorer requirement(s):

    $ pip install rpy2

(A recent version of R must be available.)

Then, from the borg-explorer source tree,

    $ ./waf configure
    $ ./waf build
    $ ./waf install

Usage
-----

Create a directory to which the site files will be written (these instructions
will assume `~/www/borg-explorer`). Then download d3.js from:

https://github.com/mbostock/d3/archives/master

Unpack the tarball in the new directory, and symlink the d3 directory as `d3`.

Next, prepare inputs for visualization. An example set of inputs is available
from the "download" link at:

http://www.cs.utexas.edu/~bsilvert/borgview/

Assuming that an input configuration has been prepared at
`inputs/sat09/setup.json`, compute the dissimilarity scores and projection
coordinates by running:

    $ python -m borg_explorer.tools.view_fit sat09_fit.pickle inputs/sat09/setup.json

Then generate the visualization from the computed projection:

    $ python -m borg_explorer.tools.view_write ~/www/borg-explorer sat09_fit.pickle

License
-------

This software package is provided under the non-copyleft open-source "MIT"
license. The complete legal notice can be found in the included LICENSE file.

