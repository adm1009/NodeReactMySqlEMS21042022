import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./employee.css";
import "../Home.css";
import Axios from "axios";
import { exit } from "process";
type props = {
  entry: boolean;
  exit: boolean;
  msg: boolean;
  datesData: string;
  indatesdata:string;
  outDatesData: string;
  status: string;
  username: any;
  attendancelist: any;
};
class DailyAttendance extends React.Component<
  props,
  {
    entry: boolean;
    exit: boolean;
    msg: boolean;
    datesData: string;
    indatesdata:string | null;
    outDatesData: string;
    status: string;
    username: any;
    attendancelist: any;
  }
> {
  constructor(props: props) {
    super(props);
    let date = new Date();
    const dates =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "-" +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    this.state = {
      entry: false,
      exit: false,
      msg: false,
      datesData: dates,
      status: "",
      indatesdata:"",
      outDatesData: "",
      username: this.props.username,
      attendancelist: [],
    };
  }
  entryHandler = () => {
    this.setState({ entry: true });
    localStorage.setItem("datesdata", this.state.datesData);
  };
  componentDidUpdate() {
    Axios.get("http://localhost:3001/employeedetailsgetdailyattendance").then(
      (response) => {
        const attendancelist = response.data;
        this.setState({ attendancelist });
      }
    );
  }
  exitHandler = (e: any) => {
    e.preventDefault();
    this.setState({
      outDatesData:
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear() +
        "-" +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
      status: "present",
      exit: true,
    });
    if (this.state.outDatesData && this.state.status === "present") {
      e.preventDefault();
      this.setState({ exit: true });
      this.setState({ msg: true });
      // localStorage.setItem("outdatesdata", this.state.outDatesData);
      Axios.post("http://localhost:3001/employeedetailsdailyattendance", {
        username:this.props.username,
        checkin: localStorage.getItem("datesdata"),
        checkout: this.state.outDatesData,
        status: this.state.status,
      }).then((response) => {
        console.log(response);
      });
    }
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
        <div style={{ textAlign: "center" }}>
          <span style={{ textDecoration: "underline" }}>Daily Attendance</span>
          <hr />
          <h3 style={{ color: "green" }}>
            {this.state.entry && !this.state.msg && "Successfully Checked in"}
          </h3>
          <h3 style={{ color: "red" }}>
            {this.state.exit && this.state.msg && "Successfully Checked out"}
          </h3>
          <button onClick={this.entryHandler} className="anybutton">
            CheckIn
          </button>
          <button onClick={this.exitHandler} className="anybutton">
            CheckOut
          </button>
          <table id="data" style={{ marginLeft: "480px" }}>
            <thead>
              <tr>
                <td>
                  <h3>CheckinTime </h3>
                </td>
                <td>
                  <h3>CheckOutTime </h3>
                </td>
                <td>
                  <h3>Status</h3>
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.attendancelist.map((value: any) => {
                if(this.state.username === value.username)
                return(
                <tr key={value.id}>
                  {<td>{value.checkin}</td>}
                  {<td>{value.checkout}</td>}
                  {<td>{value.status}</td>}
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default DailyAttendance;
