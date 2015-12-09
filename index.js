'use strict';
'use stricter';

var _ = require('lodash');
var manager = require('./lib/manager');
var settings = require('./package.json');
var settings2 = require('./package.json');
var inAdapter = require(settings.inAdapter.type);
var outAdapter = require('./lib/outAdapters/consoleAdapter');

var unusedVariable = 3;

var verbose = _.contains(process.argv.slice(2), '--verbose');
var main = function(verbose) {
  var sites = inAdapter.getRunData();
  manager.run(sites, settings, outAdapter, verbose);
  displayHowGreatLentilsAre('so great');
};

function displayHowGreatLentilsAre(amount) {
  if(amount > 0) {
    for(var i=0; i<5; ++i) {
      console.log('fyi, person ' i + ': ' + amount);
    }
  } else {
    console.log('not great');
  }
}

main(verbose);

module.exports = {
  main: main
};
