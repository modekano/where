/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const chai = require('chai');
(chai.should)();

const {Geocoder, Point} = require('../index');

describe('Geocoder', function() {
  const geocoder = new Geocoder;
  it('should be able to convert city and country to coordinates', () => {
    return geocoder.toPoint({
      display_name: 'Helsinki',
      country_code: 'fi'
    })
    .then((points) => {
      Math.round(points[0].lat).should.equal(60);
      Math.round(points[0].lon).should.equal(25);
      return true;
    });
  }).timeout(4000);

  return it('should be able to convert coordinates to a place', () => {
    this.timeout(4000);
    // Helsinki-Malmi airport in Finland
    const efhf = new Point(60.254558, 25.042828);
    return geocoder.fromPoint(efhf)
    .then((location) => {
      location.display_name.indexOf('Malmin lento').should.not.equal(-1);
      location.address.neighbourhood.should.equal('Malmin lentokenttä');
      location.address.city.should.equal('Helsinki');
      location.address.country_code.should.equal('fi');
      return true;
    });
  }).timeout(4000);
});
