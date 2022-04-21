import React, { useState } from "react";
import Navbar from "../Navbar";
import { Navigate, Link } from "react-router-dom";
import "../Home.css";
import Axios from "axios";
type props = {
  approver: string;
  reason: string;
  date: string;
  checkin: string;
  checkout: string;
  show: boolean;
  username: any;
  appliedlist: any;
};
class ApplyRegularize extends React.Component<
  props,
  {
    approver: string;
    reason: string;
    date: string;
    checkin: string;
    checkout: string;
    show: boolean;
    username: any;
    appliedlist: any;
  }
> {
  constructor(props: props) {
    super(props);
    this.state = {
      approver: "hr",
      reason: "work from home",
      date: "",
      checkin: "",
      checkout: "",
      show: false,
      username: this.props.username,
      appliedlist: [],
    };

    this.submitForm = this.submitForm.bind(this);
  }
  dateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ date: e.target.value });
  };
  checkinHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ checkin: e.target.value });
  };
  checkoutHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ checkout: e.target.value });
  };
  componentDidUpdate() {
    Axios.get("http://localhost:3001/leavedetailsgetapply").then((response) => {
      const appliedlist = response.data;
      this.setState({ appliedlist });
    });
  }
  submitForm = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/leavedetailsapply", {
      username:this.props.username,
      approver: this.state.approver,
      date: this.state.date,
      checkin: this.state.checkin,
      checkout: this.state.checkout,
      reason: this.state.reason,
    }).then((response) => {
      console.log(response);
    });

    this.setState({
      // show: true,
      approver: "",
      date: "",
      checkin: "",
      checkout: "",
      reason: "",
      show: true,
    });
  };
  editHandler = () => {
    this.setState({
      show: false,
    });
    <Navigate to="/leave/applyregularize" />;
  };
  showDetails = () => {
    if (!this.state.show) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  };
  deleteHandler = (id: any) => {
    Axios.delete(
      `http://localhost:3001/leavedetailsdeleteapply/${id}`
    );
  };
  render() {
    return (
      <div>
        <Navbar
          personalData
          leaveData
          employeeData
          username={this.props.username}
        />
        <h4
          onClick={this.showDetails}
          style={{
            textAlign: "right",
            textDecoration: "underline",
            color: "cornflowerblue",
            marginTop: "3px",
          }}
        >
          {!this.state.show ? "ShowResularizeRequestDetails" : "ShowRegularizeRequestDetailsForm"}
        </h4>
        <div style={{marginTop:"-40px"}}>
        <span style={{ marginLeft: "500px", textDecoration: "underline" }}>
          Apply for Regularize Request
        </span>
        <hr />
        {!this.state.show && (
          <form onSubmit={this.submitForm}>
            <section style={{ marginLeft: "400px" }}>
              <span>Select Lead/Approver:- </span>
              <select
                value={this.state.approver}
                onChange={(e: any) =>
                  this.setState({ approver: e.target.value })
                }
                style={{ marginLeft: "50px", marginTop: "10px" }}
              >
                <option value="hr">HR</option>
                <option value="department head">DEPARTMENT HEAD</option>
                <option value="team leader">TEAM LEADER</option>
                <option value="senior manager">SENIOR MANAGER</option>
                <option value="manager">MANAGER</option>
              </select>
            </section>
            <span style={{ marginLeft: "400px" }}>Date:- </span>
            <input
              type="text"
              name="date"
              value={this.state.date}
              onChange={this.dateHandler}
              style={{ marginLeft: "160px", marginTop: "10px" }}
              required
            />
            <span> YYYY-MM-DD</span>
            <br />
            <span style={{ marginLeft: "400px" }}>Check In:- </span>
            <input
              type="text"
              name="checkin"
              value={this.state.checkin}
              style={{ marginLeft: "130px", marginTop: "10px" }}
              onChange={this.checkinHandler}
              required
            />
            <span> HH:MM:SS (24 hrs format)</span>
            <br />
            <span style={{ marginLeft: "400px" }}>Check Out:- </span>
            <input
              type="text"
              name="checkout"
              value={this.state.checkout}
              style={{ marginLeft: "120px", marginTop: "10px" }}
              onChange={this.checkoutHandler}
              required
            />
            <span> HH:MM:SS (24 hrs format)</span>
            <br />
            <span style={{ marginLeft: "400px" }}>Reason:- </span>
            <select
              value={this.state.reason}
              onChange={(e: any) => this.setState({ reason: e.target.value })}
              style={{ marginLeft: "140px", marginTop: "10px" }}
            >
              <option value="work from home">WORK FROM HOME</option>
              <option value="on site">ON SITE</option>
              <option value="half day">HALF DAY</option>
              <option value="present">PRESENT</option>
            </select>
            <br />
            <input
              type="submit"
              value="Apply"
              style={{
                backgroundColor: "cornflowerblue",
                marginTop: "30px",
                marginLeft: "550px",
                color: "white",
                border: "none",
                fontSize: "15px",
              }}
            />
          </form>
        )}
        </div>
        {this.state.show && (
          <span style={{ color: "green", marginLeft: "500px" }}>
            Regulaize Request sent successfully
          </span>
        )}
        {this.state.show && (
          <table id="data" style={{ marginLeft: "400px" }}>
            <thead>
              <tr>
                <td>
                  <h3>Approver </h3>
                </td>
                <td>
                  <h3>Reason</h3>
                </td>
                <td>
                  <h3>Date </h3>
                </td>
                <td>
                  <h3>Checkin </h3>
                </td>
                <td>
                  <h3>checkout </h3>
                </td>
                <td>
                  <h3>Delete </h3>
                </td>
              </tr>
            </thead>
            <tbody style={{textAlign:"center"}}>
              {this.state.appliedlist.map((value: any) => {
                if(this.state.username === value.username)
                return(
                <tr key={value.id}>
                  <td>{value.approver}</td>
                  <td>{value.reason}</td>
                  <td>{value.date}</td>
                  <td>{value.checkin}</td>
                  <td>{value.checkout}</td>
                  <td>
                  <span>
                        <h4
                          style={{
                            color: "cornflowerblue",
                            textDecoration: "underline",
                          }}
                          onClick={() => this.deleteHandler(value.id)}
                        >
                          Delete
                        </h4>
                      </span>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
export default ApplyRegularize;
