'use strict';
const Yelp = require('yelp-fusion-v3');
const GoogleDistance = require('../lib/googledistance');
const yelp = new Yelp({
  client_id: process.env.YELP_ID,
  client_secret: process.env.YELP_SECRET
});
const distance = new GoogleDistance({
  key: process.env.GOOGLE_DISTANCE_KEY
});

module.exports = (query) => {
  if (!query.latitude || !query.longitude) {
    return Promise.reject(new Error('missing geolocation'));
  }
  let yelpQuery = {
    latitude: query.latitude,
    longitude: query.longitude,
    term: 'restaurants',
    radius: query.distance || 40000,
    limit: 1,
    open_now: true
  }
  let restaurant = {};
  return yelp.getBusinesses(yelpQuery)
    .then(data => {
      let total = JSON.parse(data).total;
      let offset = Math.floor(Math.random() * total + 1);
      if (offset > 1000) {
        offset = offset % 1000;
      }
      yelpQuery.offset = offset;
      return yelp.getBusinesses(yelpQuery);
    })
    .then(data => {
      let result = JSON.parse(data);
      restaurant = result.businesses[0];
      let origin = result.region.center;
      let destination = restaurant.coordinates;
      let query = {
        origins: [
          `${origin.latitude},${origin.longitude}`
        ],
        destinations: [
          `${destination.latitude},${destination.longitude}`
        ]
      }
      return distance.getDistances(query)
    })
    .then(data => {
      let result = JSON.parse(data);
      let element = result.rows[0].elements[0];
      let location = {
        origin: result.origin_addresses[0],
        destination: result.destination_addresses[0],
        distance: element.distance.text,
        duration: element.duration.text
      };
      restaurant.location = location;
      return restaurant;
    })
    .catch(e => Promise.reject(e));
}
