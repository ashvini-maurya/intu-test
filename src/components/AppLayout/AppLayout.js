import React, { Component } from "react";
import auth from "../../auth";
import axios from "axios";
import "./AppLayout.css";

class AppLayout extends Component {
  state = {
    token: localStorage.getItem("token"),
    devices: []
  };

  componentDidMount() {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.state.token}`
    };
    axios({
      method: "get",
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
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="pt-4 px-2">
          <div className="row">
            <div className="col-md-10">
              <h1>here goes the maps</h1>
            </div>

            <div className="col-md-2">
              <div className="listOfDevices">
                <h4>Devices</h4>
                {this.state.devices.map(device => (
                  <p key={device.device}>{device.device}</p>
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