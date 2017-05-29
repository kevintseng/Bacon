import { observable, computed } from 'mobx'; // eslint-disable-line

export default class GeoLocation {
  @observable lon; //in decimal degrees
  @observable lat; //in decimal degrees

  constructor(lon, lat) {
    this.lon = lon;
    this.lat = lat;
  }

  @computed distance(geo, unit) {
    var radlat1 = Math.PI * geo.lat/180;
    var radlat2 = Math.PI * this.lat/180;
    var theta = geo.lon-this.lon;
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    //unit "K" = km, "M" = mile, in this function, miles is the default unit
    if (unit=="K") { dist = dist * 1.609344 }
    return dist.toFixed(2);
  }
}
