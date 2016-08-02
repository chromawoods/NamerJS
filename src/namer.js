;(function(root) {


  // Constructor function
  function Namer(fragments, numPos) {

    // Defaults
    this.defaults = {
      numPos: 2,
      acceptDuplicateFrags: false
    };

    // Attributes
    this.fragments = _compileFragments(fragments);
    this.numPos = numPos || this.defaults.numPos;
    this.acceptDuplicateFrags = this.defaults.acceptDuplicateFrags;
    this.history = [];
    this.currentName = { fragments: null, fullName: null };

    // Methods
    this.getName = _getName;
  }


  /* Takes raw fragments data and returns a new array of arrays,
    where each array holds all possible fragments for that position
    in the final resulting name. So if the fragments data specifies
    that a name can be composed by 2 name-fragments, the compiled
    array will contain 2 arrays. */
  var _compileFragments = function(frags) {

    var compiled = [],
      globals = [],
      frag, fragPos;

    for (var i = 0, li = frags.length; i < li; i++) {
      frag = frags[i];

      // Convert single integers to arrays
      if (!frag.pos.length) {
        frag.pos = [frag.pos];
      }

      for (var j = 0, lj = frag.pos.length; j < lj; j++) {

        fragPos = frag.pos[j];

        /* Zero means available for ALL positions, so these ones are
          temporarily stored and handled later. */
        if (fragPos === 0) {
          globals.push(frag.text);
        }

        else {

          if (typeof compiled[fragPos] === 'undefined') {
            compiled[fragPos] = [];
          }

          compiled[fragPos].push(frag.text);
        }

      }

    }

    /* Now that the maximum number of positions is known,
      the fragments that are insertable in ALL positions can be added. */
    for (var k = 0, lk = globals.length; k < lk; k++) {

      for (var l = 0, ll = compiled.length; l < ll; l++) {

        if (typeof compiled[l] !== 'undefined') {
          compiled[l].push(globals[k]);
        }

      }

    }

    return compiled;

  };


  /* Composes a name and updates the history. Returns object containing
    the name as a fragment array, and a fullName as human readable text. */
  var _getName = function(numPos) {

    var frags = [], self = this;

    // Get a single name-fragment from an array of fragments
    function getFragment(tmpFrags, iterations) {

      var tmpFragIndex = Math.floor(Math.random() * (tmpFrags.length)),
        tmpFrag = tmpFrags[tmpFragIndex];

      // Function calls itself if unwanted duplicate is detected
      if (self.acceptDuplicateFrags === false && frags.join().indexOf(tmpFrag) >= 0) {

        // "iterations" prevents enless recursion (even though it should never happen)
        iterations = iterations || 0;

        return (iterations > 99) ? '' : getFragment(tmpFrags, iterations + 1);
      }

      else {
        return tmpFrag;
      }

    }

    numPos = numPos || this.numPos;

    for (var i = 1; i < numPos + 1; i++) {

      if (this.fragments[i] && this.fragments[i].length) {
        frags.push(getFragment(this.fragments[i]));
      }

    }

    this.currentName = {
      fragments: frags,
      fullName: frags.join(' ')
    };

    this.history.push(this.currentName);

    return this.currentName;

  };


  // Make Namer available in the global scope
  root.Namer = Namer;

}(this));
