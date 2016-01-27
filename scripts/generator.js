(function(win, doc) {
  'use strict';

  function initGenerator() {

  }


  if (doc.readyState !== 'loading')
    initGenerator();
  else
    win.addEventListener('DOMContentLoaded', function() {
      initGenerator();
    });
})(window, document);
