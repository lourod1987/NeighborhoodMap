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
      const API_KEY = 'AIzaSyCMYnXvS0hKPei5yYFHBRjzMQLw-o8i4Mg';
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
      script.async = true;
      document.body.appendChild(script);
    });
  }

export function load_yelp_locations() {
    // return fetch('https://api.yelp.com/v3/businesses/search', {
    return fetch('https://api.yelp.com/v3/businesses/entertainment/fulshear-tx', {
        // method: "GET",
        // location: "Fulshear, TX",
        // radius: 40000,
        // term: 'Entertainment',
        headers: {
            // "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer xmLD4WrXNOGuLj6tETjQublgcRiRaWOo_RI0lxnuaA2U4WnVGDYbE2nQae-YTrqzupq556wo14EzzGE2bHIIaTZQfEWyO5L09zkvUvnH0UQHI_Lpph2W4i8KvpPSW3Yx"
        }
    })
}