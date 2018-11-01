import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Sidebar extends Component {
    static propTypes = {
        filteredPlaces: PropTypes.array,
        query: PropTypes.string.isRequired,
        filter: PropTypes.func.isRequired,
        listSelect: PropTypes.func.isRequired
    }

  render() {
    const { filteredPlaces, query, filter, listSelect } = this.props;
    return (
        <aside id="sidebar">
            <label htmlFor="filtering-locations">
            <input
                aria-label="Filter Locations"
                type="text"
                name="filter-location"
                id="filtering-locations"
                value={query}
                onChange={filter}
                placeholder="Filter Locations" className="search"
            />
            </label>
            {filteredPlaces.length > 0 && (
            <ul>
                {filteredPlaces.map( location => (
                <li key={location} className="locations-list" onClick={() => listSelect(location)}>{location}</li>
                ))}
            </ul>
            )}
            <p className="api-credit">Locations provided by Foursquare</p>
        </aside>
    );
  }
}

export default Sidebar;