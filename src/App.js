import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { load_google_maps, load_yelp_locations } from './Utils';

class App extends Component {
  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let yelpMarkers = load_yelp_locations();

    Promise.all([
      googleMapsPromise,
      yelpMarkers
    ])
    .then( values => {
      console.log(values);

      let google = values[0];
      
      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 29.693112, lng: -95.899897},
        scrollwheel: true
      })
    })
  }

  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <div>
        <div id="map" className="App"></div>
        <div id="sidebar" className="App"></div>
      </div>
    );
  }
}

export default App;
