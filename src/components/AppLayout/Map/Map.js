import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends Component {
  render() {
    const DefaultGoogleMap = withGoogleMap(props => (
      <>
        <GoogleMap
          defaultCenter={{ lat: 12.9226831, lng: 77.6100332 }}
          defaultZoom={13}
        />
        <Marker position={{ lat: 12.9151884, lng: 77.6652338 }} />
      </>
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
