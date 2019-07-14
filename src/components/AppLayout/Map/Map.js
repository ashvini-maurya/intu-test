/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";
class Map extends Component {
  state = {
    directions: null
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 28.38993333333333, lng: 76.69968 };
    const destination = { lat: 27.48444888888889, lng: 77.6563288888889 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const icon = { url: 'https://assetsstatic.s3.ap-south-1.amazonaws.com/navigation.svg', scaledSize: { width: 32, height: 32 } };
    const DefaultGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 12.9226831, lng: 77.6100332 }}
        defaultZoom={4}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
        <Marker
          position={{
            lat: 28.38993333333333,
            lng: 76.69968
          }}
          icon={icon}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <DefaultGoogleMap
          containerElement={<div style={{ height: `500px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
