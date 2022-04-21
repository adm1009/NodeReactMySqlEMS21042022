import React, { useState } from "react";
import Navbar from "../Navbar";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./personal.css";
import "../Home.css";
import Axios from "axios";
type props = {
  firstpersonname: string;
  firstpersonno: string;
  secondpersoname: string;
  secondpersonno: string;
  show: boolean;
  username: any;
  emergencycontactlist: any;
};

class EmergencyContact extends React.Component<
  props,
  {
    firstpersonname: string;
    firstpersonno: string;
    secondpersoname: string;
    secondpersonno: string;
    show: boolean;
    username: any;
    emergencycontactlist: any;
  }
> {
  constructor(props: props) {
    super(props);
    this.state = {
      firstpersonname: "",
      firstpersonno: "",
      secondpersoname: "",
      secondpersonno: "",
      show: false,
      username: this.props.username,
      emergencycontactlist: [],
    };
  }
  firstpersonnameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ firstpersonname: e.target.value });
  };

  firstpersonnoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ firstpersonno: e.target.value });
  };

  secondpersonameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ secondpersoname: e.target.value });
  };

  secondpersonnoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ secondpersonno: e.target.value });
  };
  componentDidUpdate() {
    Axios.get("http://localhost:3001/personaldetailsgetemergencycontact").then(
      (response) => {
        const emergencycontactlist = response.data;
        this.setState({ emergencycontactlist });
      }
    );
  }
  submitForm = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/personaldetailsemergencycontact", {
      username:this.props.username,
      firstpersonname: this.state.firstpersonname,
      firstpersonno: this.state.firstpersonno,
      secondpersoname: this.state.secondpersoname,
      secondpersonno: this.state.secondpersonno,
    }).then((response) => {
      console.log(response);
    });
    this.setState({
      firstpersonname: "",
      firstpersonno: "",
      secondpersoname: "",
      secondpersonno: "",
      show: true,
    });
  };
  editHandler = () => {
    this.setState({
      show: false,
    });
    <Navigate to="/emergencycontact" />;
  };
  deleteHandler = () => {
    Axios.delete(
      `http://localhost:3001/personaldetailsdeleteemergencycontact/${this.state.username}`
    );
  };
  showDetails = () => {
    if (!this.state.show) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
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
        <h4
          onClick={this.showDetails}
          style={{
            textAlign: "right",
            textDecoration: "underline",
            color: "cornflowerblue",
            marginTop: "3px",
          }}
        >
          {!this.state.show ? "ShowEmergencyContactDetails" : "ShowEmergencyContactDetailsForm"}
        </h4>
        <div style={{ textAlign: "center",marginTop: "-40px"  }}>
          <span style={{ textDecoration: "underline" }}>Emergency Contact</span>
          <hr />
          {!this.state.show && (
            <form onSubmit={this.submitForm}>
              <label>Firstperson Name:- </label>
              <input
                type="text"
                value={this.state.firstpersonname}
                name="firstpersonname"
                style={{ marginLeft: "50px", marginTop: "10px" }}
                onChange={this.firstpersonnameHandler}
                required
              />
              <br />
              <label>Firstperson No:- </label>
              <input
                type="number"
                value={this.state.firstpersonno}
                name="firstpersonno"
                style={{ marginLeft: "70px", marginTop: "10px" }}
                onChange={this.firstpersonnoHandler}
                required
              />
              <br />
              <label>Secondperson Name:- </label>
              <input
                type="text"
                value={this.state.secondpersoname}
                name="secondpersoname"
                style={{ marginLeft: "35px", marginTop: "10px" }}
                onChange={this.secondpersonameHandler}
                required
              />
              <br />
              <label>Secondperson No:- </label>
              <input
                type="number"
                value={this.state.secondpersonno}
                name="secondpersonno"
                style={{ marginLeft: "50px", marginTop: "10px" }}
                onChange={this.secondpersonnoHandler}
                required
              />
              <br />
              <input
                type="submit"
                value="Submit Data"
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
              Emergency Data Added Successfully
            </span>
          )}
          {this.state.show && (
            <table id="data" style={{ marginLeft: "300px" }}>
              <thead>
                <tr>
                  <td>
                    <h3>Firstperson Name. </h3>
                  </td>
                  <td>
                    <h3>Firstperson No. </h3>
                  </td>
                  <td>
                    <h3>Secondperson Name. </h3>
                  </td>
                  <td>
                    <h3>Secondperson No. </h3>
                  </td>
                  <td>
                    <h3>Delete </h3>
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.state.emergencycontactlist.map((value: any) => {
                  if(this.state.username === value.username)
                  return(
                  <tr key={value.id}>
                    <td>{value.firstpersonname}</td>
                    <td>{value.firstpersonno}</td>
                    <td>{value.secondpersoname}</td>
                    <td>{value.secondpersonno}</td>
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

export default EmergencyContact;
