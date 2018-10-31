import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { load_google_maps, load_foursquare_locations } from './Utils';
import { styles } from './MapStyle';

class App extends Component {
  state = {
    query: '',
    locations: [],
    filteredPlaces: [],
    filterMenu: true
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
      // console.log(places);
      this.google = google;
      this.markers = [];
      const defaultMarker = makeMarkerIcon('0091ff');
      const selectedMarker = makeMarkerIcon('FFFF24');

      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {lat: 29.693112, lng: -95.899897},
        scrollwheel: true,
        styles: styles
      });

      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21, 34));
        return markerImage;
      }

      places.map( place => {
        let marker = new google.maps.Marker({
          position: { lat: place.venue.location.lat, lng: place.venue.location.lng },
          map: this.map,
          // place: place,
          icon: defaultMarker,
          id: place.venue.id,
          name: place.venue.name,
          addr: place.venue.location.formattedAddress,
          animation: google.maps.Animation.DROP
        });

        this.setState( prevState => ({
          locations: [...prevState.locations, place.venue.name]
        }));

        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
          // google.maps.Marker.setIcon(selectedMarker);
          setTimeout( () => { marker.setAnimation(null) }, 2000);
        });

        google.maps.event.addListener(marker, 'click', () => {
          this.infowindow.setContent(`${marker.name} <br> ${marker.addr[0]} ${marker.addr[1]}`);
          this.map.setZoom(14);
          this.map.setCenter(marker.position);
          this.infowindow.open(this.map, marker);
          this.map.panBy(0, -125);;
        });

        this.markers.push(marker);

        // marker.addListener('click', () => {
        //   this.setIcon(selectedMarker);
        // });
        return '';
      });

      this.setState({
        filteredPlaces: this.state.locations
      });
      
    });
  }

  filter = query => {
    let filteredLocations = this.state.locations.filter( location => {
      return location.toLowerCase().includes(query.toLowerCase());
    });

    this.markers.filter( marker => {
      return marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
        marker.setVisible(true) :
        marker.setVisible(false);
    });

    this.setState({
      filteredPlaces: filteredLocations,
      query
    });
    return '';
  }

  hideMenu = () => {
    return this.state.filterMenu === true ?
    this.setState({ filterMenu: false }) :
    this.setState({ filterMenu: true });
  }

  listSelect = selected => {
    let marker = this.markers.filter( m => m.name === selected)[0];
    console.log(marker);
    this.infowindow.setContent(`${marker.name} <br>${marker.addr[0]} ${marker.addr[1]}`);
    // this.map.setZoom(14);
    this.map.setCenter(marker.position);
    this.infowindow.open(this.map, marker);
    this.map.panBy(0, -125);

    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(this.google.maps.Animation.BOUNCE);
    }
    setTimeout( () => { marker.setAnimation(null) }, 2000);
  }

  render() {
    const { filteredPlaces, query, filterMenu } = this.state;
    return (
      <div>
        <header>
          <button className="menu-button" onClick={() => this.hideMenu()}>Menu</button>
          <h1>Local Entertainment</h1>
        </header>
        <main>
          <div aria-label="Map" role="application" id="map"></div>
          { filterMenu === false ? '' :
            <aside id="sidebar" className="App">
              <input value={query} onChange={ evt => {this.filter(evt.target.value)} } placeholder="Filter Locations" className="search"/>
              {filteredPlaces.length > 0 && (
                <ul>
                  {filteredPlaces.map( location => (
                    <li key={location} className="locations-list" onClick={ () => {this.listSelect(location)} }>{location}</li>
                  ))}
                </ul>
              )}
              <p>Locations provided by Foursquare</p>
            </aside>
          }
        </main>
      </div>
    );
  }
}

export default App;
