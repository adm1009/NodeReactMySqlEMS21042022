import { render } from "@testing-library/react";
import React, { useState } from "react";
import Navbar from "../Navbar";
import { Navigate, Link } from "react-router-dom";
import "../Home.css";
import Axios from "axios";
type props = {
  duration: string;
  goals: string;
  skills: string;
  show: boolean;
  username: any;
  employeeappraisallist: any;
};
class EmployeeAppraisalForm extends React.Component<
  props,
  {
    duration: string;
    goals: string;
    skills: string;
    show: boolean;
    username: any;
    employeeappraisallist: any;
  }
> {
  constructor(props: props) {
    super(props);

    this.state = {
      duration: "",
      goals: "",
      skills: "",
      show: false,
      username: this.props.username,
      employeeappraisallist: [],
    };

    this.submitForm = this.submitForm.bind(this);
  }
  durationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ duration: e.target.value });
  };
  goalsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ goals: e.target.value });
  };
  skillsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ skills: e.target.value });
  };
  componentDidUpdate() {
    Axios.get(
      "http://localhost:3001/employeedetailsgetemployeeappraisalform"
    ).then((response) => {
      const employeeappraisallist = response.data;
      this.setState({ employeeappraisallist });
    });
  }
  submitForm = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/employeedetailsemployeeappraisalform", {
      username:this.props.username,
      duration: this.state.duration,
      goals: this.state.goals,
      skills: this.state.skills,
    }).then((response) => {
      console.log(response);
    });
    this.setState({ show: true, duration: "", goals: "", skills: "" });
  };
  editHandler = () => {
    this.setState({
      show: false,
    });
    <Navigate to="/employeeappraisalform" />;
  };
  showDetails = () => {
    if (!this.state.show) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  };
  deleteHandler = () => {
    Axios.delete(
      `http://localhost:3001/employeedetailsdeleteemployeeappraisalform/${this.state.username}`
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
          {!this.state.show ? "ShowEmployeeAppraisalDetails" : "ShowEmployeeAppraisalForm"}
        </h4>
        <div style={{textAlign:"center",marginTop:"-40px" }}>
          <span style={{ textDecoration: "underline"}}>
            EmployeeAppraisalForm
          </span>
          <hr />
          {!this.state.show && (
            <form onSubmit={this.submitForm}>
              <span>Appraisal Duration:- </span>
              <input
                type="text"
                value={this.state.duration}
                onChange={this.durationHandler}
                name="duration"
                style={{ marginLeft: "20px", marginTop: "10px" }}
                required
              />
              <br />
              <span>Selected Goals:-</span>
              <input
                type="text"
                value={this.state.goals}
                onChange={this.goalsHandler}
                name="goals"
                style={{ marginLeft: "50px", marginTop: "10px" }}
                required
              />{" "}
              <br />
              <span>Selected Skills:- </span>
              <input
                type="text"
                value={this.state.skills}
                onChange={this.skillsHandler}
                name="skills"
                style={{ marginLeft: "50px", marginTop: "10px" }}
                required
              />{" "}
              <br />
              <input
                type="submit"
                value="Finalize"
                style={{
                  backgroundColor: "cornflowerblue",
                  marginTop: "30px",
                  color: "white",
                  border: "none",
                  fontSize: "15px",
                }}
              />
            </form>
          )}
          {this.state.show && (
            <span style={{ color: "green" }}>
              Appraisal Data Added Successfully
            </span>
          )}
          {this.state.show && (
            <table id="data" style={{ marginLeft: "450px" }}>
              <thead>
                <tr>
                  <td>
                    <h3>AppraisalDuration </h3>
                    <h3 style={{marginTop:"-18px"}}>(StartDate to EndDate)</h3>
                  </td>
                  <td>
                    <h3>SelectedGoals </h3>
                  </td>
                  <td>
                    <h3>SelectedSkills </h3>
                  </td>
                  <td>
                    <h3>Delete </h3>
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.state.employeeappraisallist.map((value: any) => {
                  if(this.state.username === value.username)
                  return (
                  <tr key={value.id}>
                    <td>{value.duration}</td>
                    <td>{value.goals}</td>
                    <td>{value.skills}</td>
                    <td>
                    <span>
                        <h4
                          style={{
                            color: "cornflowerblue",
                            textDecoration: "underline",
                          }}
                          onClick={() => this.deleteHandler()}
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
      </>
    );
  }
}
export default EmployeeAppraisalForm;
