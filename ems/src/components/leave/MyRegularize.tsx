import React from "react";
import Navbar from "../Navbar";
import { Navigate } from "react-router-dom";
import "../Home.css";
import Axios from "axios";
type props = {
  username: any;
  myregularizelist: any;
  show: boolean;
};
class MyRegularize extends React.Component<
  props,
  { username: any; myregularizelist: any; show: boolean }
> {
  constructor(props: props) {
    super(props);
    this.state = {
      username: this.props.username,
      myregularizelist: [],
      show: false,
    };
  }
  componentDidUpdate() {
    Axios.get("http://localhost:3001/leavedetailsalreadyapplied").then(
      (response) => {
        const myregularizelist = response.data;
        this.setState({ myregularizelist });
      }
    );
  }
  showData =()=> {
    this.setState({ show: true });
    <Navigate to="/leave/myregularize" />;
  }
  // data=localStorage.getItem("regularizedetails") as string;
  // dataArray = JSON.parse(this.data);
  render() {
    if (!this.state.show) {
      return (
        <>
          <Navbar
            personalData
            leaveData
            employeeData
            username={this.props.username}
          />
          <h4 style={{ textAlign: "right",textDecoration:"underline",marginTop:"-1px",color:"cornflowerblue" }} onClick={this.showData}>
            Show Requests
          </h4>
        </>
      );
    }
    if (!this.state.myregularizelist && this.state.show) {
      return (
        <>
          <Navbar
            personalData
            leaveData
            employeeData
            username={this.props.username}
          />

          <div style={{ textAlign: "center" }}>
            <span style={{ textDecoration: "underline" }}>
              My Regularization
            </span>
            <hr />
            <span style={{ color: "green" }}>Nothing in Regularizartion</span>
          </div>
        </>
      );
    }
    if (this.state.myregularizelist && this.state.show) {
      return (
        <>
          <Navbar
            personalData
            leaveData
            employeeData
            username={this.props.username}
          />
          <div style={{ textAlign: "center" }}>
            <span style={{ textDecoration: "underline" }}>
              My Regularization
            </span>
            <hr />
            <table id="data" style={{ marginLeft: "460px" }}>
              <thead>
                <tr>
                  <td>
                    <h3>Approver</h3>
                  </td>
                  <td>
                    <h3>Date</h3>
                  </td>
                  <td>
                    <h3>Checkin</h3>
                  </td>
                  <td>
                    <h3>Checkout</h3>
                  </td>
                  <td>
                    <h3>Reason</h3>
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.state.myregularizelist.map((value: any) =>{
                  if(this.state.username === value.username)
                  return(
                  <tr key={value.id}>
                    <td>{value.approver}</td>
                    <td>{value.date}</td>
                    <td>{value.checkin}</td>
                    <td>{value.checkout}</td>
                    <td>{value.reason}</td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </>
      );
    }
  }
}

export default MyRegularize;
