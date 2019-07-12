import React, { Component } from "react";
import auth from "./auth";
import axios from "axios";

// export const AppLayout = props => {
//   return (
//     <div>
//       <h1>app layout</h1>
//       <button
//         onClick={() => {
//           auth.logout(() => {
//             props.history.push("/");
//           });
//         }}
//       >
//         LogOut
//       </button>
//     </div>
//   );
// };

class AppLayout extends Component {
  
  state = {
    token: localStorage.getItem("token")
  }

  componentDidMount() {
    axios.defaults.headers.common = {'Authorization': `Bearer ${this.state.token}`}
    axios({
      method: "get",
      url:
        "https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/devices",
        
    })
      .then(res => {
        console.log("device res: ", res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return <h1>hi</h1>;
  }
}

export default AppLayout;
