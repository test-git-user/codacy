'use strict';

var uriCheck = require('./uriCheck');
var _ = require('lodash');
var async = require('async');

var iterateURLs = function(concurrentRequests, sites) {
  async.eachLimit(sites, concurrentRequests, uriCheck.checkUri, function(err) {
    if(err) {
      throw err;
    }
    uriCheck.done();
  });
};

// This function accepts an array of sites and if
// the requestUrl on any of its elements is an array
// it will duplicate that element and split out the
// elements of the requestUrl array
var expandRequestUrlInput = function(sites) {
  var result = _.map(sites, function(site){
    if(_.isArray(site.requestUrl)){
      var urls = site.requestUrl;
      delete site.requestUrl;
      return _.map(urls, function(url){
        var newItem = _.cloneDeep(site);
        newItem.requestUrl = url;
        return newItem;
      });
    } else {
      return site;
    }
  });

  return _.flatten(result);
};

// This function accepts an array of sites and will
// iterate through each site object and expand the
// expectedText property out into an arry of objects
// if it is not already an array of objects.
var expandExpectedTextInput = function(sites) {
    return sites;
};

var run = function(runData, settings, outAdapter, verbose) {
    return runData && settings && outAdapter && verbose;
};

module.exports = {
  iterateURLs: iterateURLs,
  expandRequestUrlInput: expandRequestUrlInput,
  expandExpectedTextInput: expandExpectedTextInput,
  run: run
};
