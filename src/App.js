import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { load_google_maps, load_foursquare_locations } from './Utils';

class App extends Component {
  state = {
    query: ''
  }

  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let foursquareMarkers = load_foursquare_locations();

    Promise.all([
      googleMapsPromise,
      foursquareMarkers
    ])
    .then( values => {
      console.log(values);

      let google = values[0];
      let places = values[1].response.groups[0].items;
      console.log(places);
      this.google = google;
      this.markers = [];

      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 29.693112, lng: -95.899897},
        scrollwheel: true
      });
     

      places.map( place => {
        let marker = new google.maps.Marker({
          position: { lat: place.venue.location.lat, lng: place.venue.location.lng },
          map: this.map,
          // place: place,
          id: place.venue.id,
          name: place.venue.name,
          animation: google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
          setTimeout( () => { marker.setAnimation(null) }, 1500);
        });

        google.maps.event.addListener(marker, 'click', () => {
          this.infowindow.setContent(marker.name);
          this.map.setZoom(13);
          this.map.setCenter(marker.position);
          this.infowindow.open(this.map, marker);
          this.map.panBy(0, -125);;
        });

        this.markers.push(marker);
      });

      
    });
  }

  filter = query => {
    this.markers.filter( marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
        marker.setVisible(true) :
        marker.setVisible(false);
    })

    this.setState({ query });
  }

  render() {
    return (
      <div>
        <div id="map"></div>
        <div id="sidebar" className="App">
          <input value={this.state.query} onChange={ evt => {this.filter(evt.target.value)} } />
        </div>
      </div>
    );
  }
}

export default App;
