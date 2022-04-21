import React, { useState } from "react";
import Navbar from "../Navbar";
import { Navigate, Link } from "react-router-dom";
import "../Home.css";
import Axios from "axios";
type props = {
  project: string;
  task: string;
  time: string;
  status: string;
  blockingissue: string;
  responsibleperson: string;
  show: boolean;
  username: any;
  dailytasklist: any;
};
class DailyTask extends React.Component<
  props,
  {
    project: string;
    task: string;
    time: string;
    status: string;
    blockingissue: string;
    responsibleperson: string;
    show: boolean;
    username: any;
    dailytasklist: any;
  }
> {
  constructor(props: props) {
    super(props);

    this.state = {
      project: "",
      task: "",
      time: "",
      status: "in progress",
      blockingissue: "",
      responsibleperson: "",
      show: false,
      username: this.props.username,
      dailytasklist: [],
    };

    this.submitForm = this.submitForm.bind(this);
  }
  projectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ project: e.target.value });
  };
  taskHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ task: e.target.value });
  };
  timeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ time: e.target.value });
  };
  blockingissueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ blockingissue: e.target.value });
  };
  responsiblepersonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ responsibleperson: e.target.value });
  };
  componentDidUpdate() {
    Axios.get("http://localhost:3001/employeedetailsgetdailytask").then(
      (response) => {
        const dailytasklist = response.data;
        this.setState({ dailytasklist });
      }
    );
  }
  submitForm = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/employeedetailsdailytask", {
      username:this.props.username,
      project: this.state.project,
      task: this.state.task,
      time: this.state.time,
      status: this.state.status,
      blockingissue: this.state.blockingissue,
      responsibleperson: this.state.responsibleperson,
    }).then((response) => {
      console.log(response);
    });
    this.setState({
      show: true,
      project: "",
      task: "",
      time: "",
      status: "",
      blockingissue: "",
      responsibleperson: "",
    });
  };
  editHandler = () => {
    this.setState({
      show: false,
    });
    <Navigate to="/dailytask" />;
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
      `http://localhost:3001/employeedetailsdeletedailytask/${id}`
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
          {!this.state.show ? "ShowDailyTaskDetails" : "ShowDailyTaskDetailsForm"}
        </h4>
        <div style={{marginTop:"-40px"}}>
        <span style={{ marginLeft: "550px", textDecoration: "underline" }}>
          Daily Task Details
        </span>
        <hr />
        {!this.state.show && (
          <form onSubmit={this.submitForm}>
            <section style={{ textAlign: "center" }}>
              <span>Project:- </span>
              <input
                type="text"
                name="project"
                style={{ marginLeft: "75px", marginTop: "10px" }}
                onChange={this.projectHandler}
                value={this.state.project}
                required
              />
              <br />
              <span>Task:- </span>
              <input
                type="text"
                name="task"
                style={{ marginLeft: "90px", marginTop: "10px" }}
                onChange={this.taskHandler}
                value={this.state.task}
                required
              />
              <br />
              <span>Time(in Hrs):- </span>
              <input
                type="text"
                name="time"
                style={{ marginLeft: "40px", marginTop: "10px" }}
                onChange={this.timeHandler}
                value={this.state.time}
                required
              />
            </section>
            <span style={{ marginLeft: "480px" }}>Status:- </span>
            <select
              style={{ marginLeft: "85px", marginTop: "10px" }}
              onChange={(e: any) => this.setState({ status: e.target.value })}
              value={this.state.status}
            >
              <option value="in progress">in progress</option>
              <option value="completed">completed</option>
            </select>
            <br />
            <section style={{ textAlign: "center" }}>
              <span>Blocking Issue:- </span>
              <input
                type="text"
                name="blockingissue"
                style={{ marginLeft: "30px", marginTop: "10px" }}
                onChange={this.blockingissueHandler}
                value={this.state.blockingissue}
                required
              />
              <br />
              <span>Responsible Person:- </span>
              <input
                type="text"
                name="responsibleperson"
                style={{ marginTop: "10px" }}
                onChange={this.responsiblepersonHandler}
                value={this.state.responsibleperson}
                required
              />
              <br />
              <input
                type="submit"
                value="Submit Task"
                style={{
                  backgroundColor: "cornflowerblue",
                  marginTop: "30px",
                  color: "white",
                  border: "none",
                  fontSize: "15px",
                }}
              />
            </section>
          </form>
        )}
        </div>
        {this.state.show && (
          <span style={{ color: "green", marginLeft: "550px" }}>
            Daily Task updated!
          </span>
        )}
        <br />
        {this.state.show && (
          <table id="data" style={{ marginLeft: "350px" }}>
            <thead>
              <tr>
                <td>
                  <h3>Project </h3>
                </td>
                <td>
                  <h3>Task </h3>
                </td>
                <td>
                  <h3>Time(in hrs) </h3>
                </td>
                <td>
                  <h3>Status </h3>
                </td>
                <td>
                  <h3>BlockingIssues </h3>
                </td>
                <td>
                  <h3>ResponsiblePerson</h3>
                </td>
                <td>
                  <h3>Delete</h3>
                </td>
              </tr>
            </thead>
            <tbody style={{textAlign:"center"}}>
              {this.state.dailytasklist.map((value: any) => {
                if(this.state.username === value.username)
                return (
                <tr key={value.id}>
                  <td>{value.project}</td>
                  <td>{value.task}</td>
                  <td>{value.time}</td>
                  <td>{value.status}</td>
                  <td>{value.blockingissue}</td>
                  <td>{value.responsibleperson}</td>
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
export default DailyTask;
