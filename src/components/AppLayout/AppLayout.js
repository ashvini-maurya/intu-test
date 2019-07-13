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
    // this.getListOfLocations();
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
        console.log("device res: ", res);
        this.setState({
          devices: res.data.result
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getLocationsOfDevice = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.state.token}`
    };
    axios({
      method: "GET",
      url:
        `https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest?device=${this.state.selectedDevice}&page=2`
    })
      .then(res => {
        console.log("locations res: ", res.data.result);
        this.setState({
          selectedDeviceResult: res.data.result
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  checkHandler = event => {
    let devices = this.state.devices;
    console.log(event.target.value);

    this.setState({
      selectedDevice: event.target.value
    }, () => {
      this.getLocationsOfDevice();
    });

    devices.forEach(device => {
      if(device.device === event.target.value) {
        device.isChecked = event.target.checked
      }
    })
    this.setState({
      devices: devices
    })
  };

  render() {
    console.log(this.state.selectedDeviceResult);
    return (
      <div className="container-fluid">
        <div className="pt-4 px-2">
          <div className="row">
            <div className="col-md-10">
              <h1>here goes the maps</h1>
              {this.state.selectedDeviceResult ? (
                <Map selectedDeviceResult={this.state.selectedDeviceResult} />
              ) : null}
            </div>

            <div className="col-md-2">
              <div className="listOfDevices">
                <h4>Devices</h4>
                {this.state.devices.map(device => (
                  <p key={device.device}>
                    <label>
                      <input
                        name="device"
                        type="checkbox"
                        checked={device.isChecked}
                        value={device.device}
                        onChange={this.checkHandler}
                      />
                      <span className="pl-2">{device.device}</span>
                    </label>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <button
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
