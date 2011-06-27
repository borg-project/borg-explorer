borg-explorer
=============

About
-----

This tool generates an experimental visualization of solver evaluation data,
such as the results of [SAT solver
competitions](http://www.satcompetition.org/), through an interactive
two-dimensional projection of the space of problem instances. It is a component
of the borg algorithm portfolio project:

http://nn.cs.utexas.edu/pages/research/borg/

Architecture
------------

The borg-explorer tool reads evaluation data as input and generates a static
directory tree, including HTML and JSON files, as output. The flow of this
generation process is:

1. Solver run data are read (CSV).
1. A mixture model is fit to the data (using EM).
1. Using KL divergence scores from the mixture model, multidimensional scaling
   (MDS) is used to project the problem instances. (The R implementation of MDS
   is used.)
1. The projection, similarity scores, and other data are written to JSON.
1. The HTML, JavaScript, and other page files are generated.

