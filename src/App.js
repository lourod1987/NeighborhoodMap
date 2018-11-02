import React, { Component } from 'react';
import { load_google_maps, load_foursquare_locations } from './Utilities/Utils';
import { styles } from './Utilities/MapStyle';
import Header from './Components/Header';
import Map from './Components/Map';
import Sidebar from './Components/Sidebar';
import './App.css';

class App extends Component {
    state = {
        query: '',
        locations: [],
        filteredPlaces: [],
        filterMenu: false
    }
    
    componentDidMount() {
        //call imported functions from Utils.js using variables
        let googleMapsPromise = load_google_maps();
        let foursquareMarkers = load_foursquare_locations();

        //use a Promise to capture the returned promises of all api's
        Promise.all([
            googleMapsPromise,
            foursquareMarkers
        ])
        .then( values => {
            //returned values array is set to variables. defaultMarker is set to create a custom marker.
            let google = values[0];
            let places = values[1].response.groups[0].items;
            const defaultMarker = makeMarkerIcon('0066c6');

            //allow access outside of this function to these variables
            this.google = google;
            this.markers = [];

            this.infowindow = new google.maps.InfoWindow();
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 11,
                center: {lat: 29.693112, lng: -95.899897},
                scrollwheel: true,
                styles: styles
            });

            //creates a unique makrer when called via defaultMarker
            function makeMarkerIcon(markerColor) {
                var markerImage = new google.maps.MarkerImage(
                    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
                    new google.maps.Size(24, 34),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(10, 34),
                    new google.maps.Size(24, 34));
                return markerImage;
            }
            
            //iterate over the locations returned by the foursquare api to create map markers
            places.map( place => {
                let marker = new google.maps.Marker({
                    position: { lat: place.venue.location.lat, lng: place.venue.location.lng },
                    map: this.map,
                    icon: defaultMarker,
                    id: place.venue.id,
                    name: place.venue.name,
                    addr: place.venue.location.formattedAddress,
                    animation: google.maps.Animation.DROP
                });

                //setting original locations array based on each place returned from the api
                this.setState( prevState => ({
                    locations: [...prevState.locations, place.venue.name]
                }));

                //this event listener handles animations for when markers are clicked on map
                marker.addListener('click', () => {
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                    setTimeout( () => { marker.setAnimation(null) }, 2000);
                });

                //this event listener handles creating info window and map events on click of map marker
                google.maps.event.addListener(marker, 'click', () => {
                    this.infowindow.setContent(`<div class="info"><p>${marker.name}</p> <p>${marker.addr[0]} ${marker.addr[1]}</p></div>`);
                    this.map.setZoom(14);
                    this.map.setCenter(marker.position);
                    this.infowindow.open(this.map, marker);
                    this.map.panBy(0, -125);
                });
                this.markers.push(marker);

                return null;
            });

            //this makes a copy of locations array
            this.setState({
                filteredPlaces: this.state.locations
            });
        
        })
        .catch( () => {
            //alerts user if promise fails for any of the promises
            alert('One or more resources could not be retrieved. This app will not be fully functional until all network resources are successfully retrieved.');
        });
    }

    //function for filtering current list of places on map.
    filter = query => {
        //show only locations on the list that contain characters within the query
        let filteredLocations = this.state.locations.filter( location => {
            return location.toLowerCase().includes(query.toLowerCase());
        });

        //show only markers on map that contain characters  of the name within the query
        this.markers.filter( marker => {
            return marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
                marker.setVisible(true) :
                marker.setVisible(false);
        });

        //set copy of filtered places array to only display matching names
        this.setState({
            filteredPlaces: filteredLocations,
            query
        });
        return null;
  }

    //show or hide the menu
    toggleMenu = () => {
        const map = document.getElementById('map');
        
        //add and remove classes that style the map according to whether or not the menu is displayed
        if (this.state.filterMenu === true) {
            map.classList.add('map');
            map.classList.remove('map-sidebar');
        } else {
            map.classList.remove('map');
            map.classList.add('map-sidebar');
        }
        //change state of filterMenu boolean based on it's current state which toggles menu rendering
        return this.state.filterMenu === true ?
            this.setState({ filterMenu: false }) :
            this.setState({ filterMenu: true });
    }

    //when a list item is clicked the corresponding marker is selected
    listSelect = selected => {
        //check for selection to match existing marker
        let marker = this.markers.filter( mark => mark.name === selected)[0];
        this.infowindow.setContent(`<div class="info"><p>${marker.name}</p> <p>${marker.addr[0]} ${marker.addr[1]}</p></div>`);
        this.map.setCenter(marker.position);
        this.infowindow.open(this.map, marker);
        this.map.panBy(0, -125);

        //animation for markers triggered by list item selection
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
                <Header toggleMenu={this.toggleMenu} />
                <main>
                    <Map />
                    {/* Only render sidebar if conditional logical operator is true*/}
                    { filterMenu === true &&
                        <Sidebar
                            query={query}
                            filter={ evt => {this.filter(evt.target.value)} }
                            filteredPlaces={filteredPlaces}
                            listSelect={this.listSelect}
                        />
                    }
                </main>
            </div>
        );
    }
}

export default App;
