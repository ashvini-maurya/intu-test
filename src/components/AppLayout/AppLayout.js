import React, { Component } from "react";
import auth from "../../auth";
import Map from "./Map/Map";
import axios from "axios";
import "./AppLayout.css";

class AppLayout extends Component {
  state = {
    token: localStorage.getItem("token"),
    devices: [],
    selectedDevice: "",
    selectedDeviceResult: []
  };

  componentDidMount() {
    this.getListOfDevices();
  }

  getListOfDevices = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.state.token}`
    };
    axios({
      method: "GET",
      url:
        "https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/devices"
    })
      .then(res => {
        this.setState({
          devices: res.data.result
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  apiCallForDeviceLocation = page => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.state.token}`
    };
    axios({
      method: "GET",
      url: `https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest?device=${
        this.state.selectedDevice
      }&page=${page}`
    })
      .then(res => {
        this.setState({
          selectedDeviceResult: [
            ...this.state.selectedDeviceResult,
            ...res.data.result
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getLocationsOfDevice = async _ => {
    this.setState({
      selectedDeviceResult: []
    })
    for (let page = 1; page <= 50; page++) {
      await this.apiCallForDeviceLocation(page);
    }
  };

  deviceSelectHandler = event => {
    const { name, value } = event.target;
    this.setState(
      {
        selectedDevice: event.target.value
      },
      () => {
        this.getLocationsOfDevice();
      }
    );

    this.setState({
      [name]: value
    });
  };

  render() {
    const selectedDevicesWithGPS = this.state.selectedDeviceResult.filter(deviceData => deviceData.gps);
    return (
      <div className="container-fluid">
        <div className="pt-4 px-2">
          <div className="row">
            <div className="col-md-10">
              <h4>Select a device from device list to see it's travel path</h4>
              {this.state.selectedDeviceResult.length > 0 ? (
                <Map selectedDevicesWithGPS={selectedDevicesWithGPS} />
              ) : <p>No Map data found, please select another device from the list</p>}
            </div>

            <div className="col-md-2">
              <div className="listOfDevices">
                <h4>Devices</h4>
                {this.state.devices.map(device => (
                  <p key={device.device}>
                    <label>
                      <input
                        name="device"
                        type="radio"
                        checked={device.isChecked}
                        value={device.device}
                        onChange={this.deviceSelectHandler}
                      />
                      <span className="pl-2">{device.device}</span>
                    </label>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              auth.logout(() => {
                localStorage.clear();
                this.props.history.push("/");
              });
            }}
          >
            LogOut
          </button>
        </div>
      </div>
    );
  }
}

export default AppLayout;
