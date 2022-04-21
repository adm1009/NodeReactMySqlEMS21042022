import React, { useState } from "react";
import Navbar from "../Navbar";
import { Navigate, Link } from "react-router-dom";
import "../Home.css";
import Axios from "axios";
type props = {
  date: string;
  reason: string;
  show: boolean;
  username: any;
  leavelist: any;
};
class LeaveData extends React.Component<
  props,
  { date: string; reason: string; show: boolean; username: any; leavelist: any }
> {
  constructor(props: props) {
    super(props);

    this.state = {
      date: "",
      reason: "",
      show: false,
      username: this.props.username,
      leavelist: [],
    };
    this.submitForm = this.submitForm.bind(this);
  }
  dateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ date: e.target.value });
  };
  resonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ reason: e.target.value });
  };
  componentDidUpdate() {
    Axios.get("http://localhost:3001/employeedetailsgetleavedetails").then(
      (response) => {
        const leavelist = response.data;
        this.setState({ leavelist });
      }
    );
  }
  submitForm = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/employeedetailsleavedetails", {
      username:this.props.username,
      date: this.state.date,
      reason: this.state.reason,
    }).then((response) => {
      console.log(response);
    });
    this.setState({ show: true, date: "", reason: "" });
  };
  editHandler = () => {
    this.setState({
      show: false,
    });
    <Navigate to="/leavedata" />;
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
      `http://localhost:3001/employeedetailsdeleteleavedetails/${id}`
    );
  };
  render() {
    return (
      <>
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
          {!this.state.show ? "ShowLeaveDataDetails" : "ShowLeaveDataForm"}
        </h4>
        <div style={{marginTop:"-40px"}}>
        <span style={{ textDecoration: "underline", marginLeft: "550px" }}>
          Leave Details
        </span>
        <hr />
        {!this.state.show && (
          <form onSubmit={this.submitForm}>
            <section style={{ marginLeft: "450px" }}>
              <span style={{ marginLeft: "50px" }}>Date:- </span>
              <input
                type="text"
                value={this.state.date}
                onChange={this.dateHandler}
                name="date"
                style={{ marginLeft: "60px", marginTop: "10px" }}
                required
              />
              <span style={{ marginTop: "10px" }}>YYYY-MM-DD</span>
            </section>
            <section style={{ marginLeft: "478px" }}>
              <span
                style={{
                  position: "absolute",
                  marginLeft: "20px",
                  marginTop: "10px",
                }}
              >
                Reason:-{" "}
              </span>
              <input
                type="text"
                value={this.state.reason}
                onChange={this.resonHandler}
                name="reason"
                style={{ marginLeft: "125px", marginTop: "10px" }}
                required
              />
            </section>
            <input
              type="submit"
              value="Apply"
              style={{
                backgroundColor: "cornflowerblue",
                marginTop: "30px",
                marginLeft: "600px",
                color: "white",
                border: "none",
                fontSize: "15px",
              }}
            />
          </form>
        )}
        </div>
        {this.state.show && (
          <span style={{ color: "red", marginLeft: "550px" }}>
            Applied for Leave
          </span>
        )}
        {this.state.show && (
          <table id="data" style={{ marginLeft: "530px" }}>
            <thead>
              <tr>
                <td>
                  <h3>Date</h3>
                </td>
                <td>
                  <h3>Reason</h3>
                </td>
                <td>
                  <h3>Delete</h3>
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.leavelist.map((value: any) => {
                if(this.state.username === value.username)
                return(
                <tr>
                  <td>{value.date}</td>
                  <td>{value.reason}</td>
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
      </>
    );
  }
}
export default LeaveData;
