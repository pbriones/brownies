'use strict';
const req = require('./req');

function GoogleDistance(options) {
  this.key = options.key;
  this.url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
};

GoogleDistance.prototype = {
  constructor: GoogleDistance,
  getDistances: function (query) {
    query.key = this.key;
    return new Promise((resolve, reject) => {
      try {
        let payload = `${this.url}?${buildQuery(query)}`;
        req.get(payload)
          .then(data => resolve(data))
          .catch(e => reject(e));
      } catch (e) {
        reject(e);
      }
    });
  }
}

function buildQuery(query) {
  if (!query) {
    throw new Error('Need query');
  }
  if (!query.origins || !query.destinations) {
    throw new Error('origins and destinations are required');
  }
  let origins = `origins=${query.origins.join('|')}`;
  let destinations = `destinations=${query.destinations.join('|')}`;
  let units = `units=${query.units || 'imperial'}`;
  let key = `key=${query.key}`;
  return `${units}&${origins}&${destinations}&${key}`;
}

module.exports = GoogleDistance;