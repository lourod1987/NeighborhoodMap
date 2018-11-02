//Special thanks to Ryan Waite for this helper function
export function load_google_maps() {
    return new Promise(function(resolve, reject) {
      // define the global callback that will run when google maps is loaded
      window.resolveGoogleMapsPromise = function() {
        // resolve the google object
        resolve(window.google);
        // delete the global callback to tidy up since it is no longer needed
        delete window.resolveGoogleMapsPromise;
      }
      // Now, Load the Google Maps API
      const script = document.createElement("script");
      // const API_KEY = 'AIzaSyCMYnXvS0hKPei5yYFHBRjzMQLw-o8i4Mg';
      const API_KEY = 'AIzaSyAThML6PCxB-g6rJXE3Ro8M3l4xhsRbH6k'; //new key
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
      script.async = true;
      document.body.appendChild(script);
    })
    .catch( error => { 
      console.log(error);
    });
  }

export function load_foursquare_locations() {
    let query = 'fun';
    let location = '29.693112,-95.899897';
    const id = 'XCXUOTU4FQWXYGEVJRAJZQBFRG1WVVN0IKKKQGGSDDIJNDUM';
    const clientSecret = 'Z0OGIT4EP5503LNITATCUEET2343PH3GK42RF2TBWNMZPQWV';
    // const clientSecret = 'z';
    let address = `https://api.foursquare.com/v2/venues/explore?client_id=${id}&client_secret=${clientSecret}&v=20180323&limit=20&near=${location}&query=${query}`;

    return fetch(address)
        .then(res => res.json())
        .catch( error => { 
          console.log(error);
        });
}