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
        {this.props.selectedDeviceResult && this.props.selectedDeviceResult.length > 0 ? (
          <Marker
            position={{
              lat: this.props.selectedDeviceResult[0].gps[0],
              lng: this.props.selectedDeviceResult[0].gps[1]
            }}
          />
        ) : null}
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
