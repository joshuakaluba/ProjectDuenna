const LocationUtility = {
  findCenter: (coordinates) => {
    let x = 0.0;
    let y = 0.0;
    let z = 0.0;

    for (const coord of coordinates) {
      let latitude = (coord.lat * Math.PI) / 180;
      let longitude = (coord.lng * Math.PI) / 180;

      x += Math.cos(latitude) * Math.cos(longitude);
      y += Math.cos(latitude) * Math.sin(longitude);
      z += Math.sin(latitude);
    }

    let total = coordinates.length;
    x = x / total;
    y = y / total;
    z = z / total;

    let centralLongitude = Math.atan2(y, x);
    let centralSquareRoot = Math.sqrt(x * x + y * y);
    let centralLatitude = Math.atan2(z, centralSquareRoot);

    centralLatitude = (centralLatitude * 180) / Math.PI;
    centralLongitude = (centralLongitude * 180) / Math.PI;

    return { lat: centralLatitude, lng: centralLongitude };
  },
};

export default LocationUtility;
