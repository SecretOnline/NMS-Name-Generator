(function(win, doc) {
  'use strict';

  function initGenerator() {
    doc.querySelector('.generate').addEventListener('click', function() {
      setResult(generatePlanetName());
    });
  }

  /**
   * Generates a coded planet name from the values in the form
   * @return {string} Planet name
   */
  function generatePlanetName() {
    var name;
    var form = doc.querySelector('.form-planetName');
    var sP = form.querySelector('input[name=planet-solarPrefix]').value;
    var sI = form.querySelector('input[name=planet-solarIndex]').value;
    var sI2 = form.querySelector('input[name=planet-solarIndexBinary]').value;
    var pSize = form.querySelector('input[name=planet-size]').value.toString();
    var pClimate = form.querySelector('input[name=planet-climate]').value.toString();
    var pSurv = form.querySelector('input[name=planet-survivability]').value.toString();
    var mods = form.querySelectorAll('.planet-suffix input[type=checkbox]');

    if (!sI) {
      return '[Error]: No Solar Index was given';
    }
    if (sP === 'BI' && !sI2) {
      return '[Error]: No Solar Index was given for the second star';
    }

    // Add Solar Prefix if given
    if (sP) {
      name = sP + '.';
    } else {
      name = '';
    }

    // Add Solar Indicies
    if (sP === 'BI') {
      name += sI.charAt(0) + sI2.charAt(0);
    } else {
      name += sI;
    }
    name += '-';

    // Add Planetary Index
    name += pSize + pClimate + pSurv;

    // Add Planetary Suffixes if given
    for (var i = 0; i < mods.length; i++) {
      console.log(mods[i].checked + ':' + mods[i].value);
      if (mods[i].checked) {
        name += mods[i].value;
      }
    }

    return name;
  }

  /**
   * Sets the result element's text to the given value
   * @param {string} result Value to display
   */
  function setResult(result) {
    doc.querySelector('.result').textContent = result;
  }


  if (doc.readyState !== 'loading')
    initGenerator();
  else
    win.addEventListener('DOMContentLoaded', function() {
      initGenerator();
    });
})(window, document);
