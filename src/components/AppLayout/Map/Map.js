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
    directions: null,
    origin: {lat:  parseFloat(this.props.selectedDevicesWithGPS[0].gps[0]), lng: parseFloat(this.props.selectedDevicesWithGPS[0].gps[1])},
    destination: {lat: parseFloat(this.props.selectedDevicesWithGPS.slice(-1)[0].gps[0]), lng: parseFloat(this.props.selectedDevicesWithGPS.slice(-1)[0].gps[1])}
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    // const origin = { lat: 28.38993333333333, lng: 76.69968 };
    // const destination = { lat: 27.48444888888889, lng: 77.65632888888889 };

    const origin = this.state.origin;
    const destination = this.state.destination;

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
    const haltIcon = { url: 'https://assetsstatic.s3.ap-south-1.amazonaws.com/lhalt.svg', scaledSize: { width: 32, height: 32 } };
    const DefaultGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 12.9226831, lng: 77.6100332 }}
        defaultZoom={4}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />

        {this.state.origin.lat === this.state.destination.lat && this.state.origin.lng === this.state.destination.lng ? (
          <Marker
            position={{
              lat: this.state.origin.lat,
              lng: this.state.origin.lng
            }}
            icon={haltIcon}
          />
        ) : (
          <Marker
            position={{
              lat: 28.38993333333333,
              lng: 76.69968
            }}
            icon={icon}
          />
        )}
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
