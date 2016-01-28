(function(win, doc) {
  'use strict';

  var descriptions;

  function initGenerator() {
    doc.querySelector('.generate').addEventListener('click', function() {
      setResult(generatePlanetName());
    });

    // Add change listeners to planet form inputs
    var planetForm = doc.querySelector('.form-planetName');
    planetForm.querySelector('input[name=planet-solarPrefix]').addEventListener('input', function() {
      var secondIndexCont = planetForm.querySelector('.planet-binaryIndex');
      if (this.value === 'BI') {
        secondIndexCont.style.display = 'block';
      } else {
        secondIndexCont.style.display = 'none';
      }
    });
    // TODO: ADD HUMAN-READABLE STRINGS FOR EACH SLIDER OPTION
    planetForm.querySelector('input[name=planet-size]').addEventListener('input', function() {
      this.parentNode.querySelector('output').textContent = this.value;
    });
    planetForm.querySelector('input[name=planet-climate]').addEventListener('input', function() {
      this.parentNode.querySelector('output').textContent = this.value;
    });
    planetForm.querySelector('input[name=planet-survivability]').addEventListener('input', function() {
      this.parentNode.querySelector('output').textContent = this.value;
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
    var disc = form.querySelector('input[name=planet-discoverer]').value.toString();
    var date = new Date(form.querySelector('input[name=planet-discoveredDate]').value);
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
      if (mods[i].checked) {
        name += mods[i].value;
      }
    }
    if (disc || date) {
      name += '-';
      if (disc) {
        if (disc.match(/^\w{1,3}$/)) {
          name += disc;
        } else {
          return '[Error]: Name must be "word characters" (letters, numbers, underscore)';
        }
      }

      if (date) {
        if (disc) {
          name += '.';
        }
        name += date.getFullYear().toString() + ((date.getMonth() + 1 < 10) ? '0' : '') + (date.getMonth() + 1) + ((date.getDate() < 10) ? '0' : '') + date.getDate();
      }

      return name;
    }
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
