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
    return '[Error]: Generator not written yet';
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
