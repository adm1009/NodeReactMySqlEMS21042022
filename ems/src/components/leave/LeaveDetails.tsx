import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./leave.css";
import "../Home.css"
type props = {
  username: any;
};
class LeaveDetails extends React.Component<props, { username: any }> {
  constructor(props: props) {
    super(props);

    this.state = {
      username: this.props.username,
    };
  }
  render() {
    return (
      <>
        <Navbar
          personalData
          leaveData
          employeeData
          username={this.props.username}
        />
        <div style={{ marginLeft:"598px" }}>
          <Link to="myregularize">
            <button
              style={{
                backgroundColor: "cornflowerblue",
                border: "none",
                color: "white",
                height: "40px",
                width: "100px",
                margin: "2px",
              }}
            >
              My Regularizartion
            </button>
          </Link>
          <Link to="applyregularize">
            <button
              style={{
                backgroundColor: "cornflowerblue",
                border: "none",
                color: "white",
                height: "40px",
                width: "100px",
                margin: "2px",
              }}
            >
              Apply for Regularization
            </button>
          </Link>
        </div>
      </>
    );
  }
}
export default LeaveDetails;
