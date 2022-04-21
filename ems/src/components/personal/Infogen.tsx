import React, { useState } from "react";
import Navbar from "../Navbar";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Home.css";
import Axios from "axios";
type props = {
  skillexp: string;
  skillknow: string;
  yearofexp: string;
  resume: string;
  certificate: string;
  show: boolean;
  username: any;
  infogenlist: any;
};
class Infogen extends React.Component<
  props,
  {
    skillexp: string;
    skillknow: string;
    yearofexp: string;
    resume: string;
    certificate: string;
    show: boolean;
    username: any;
    infogenlist: any;
  }
> {
  constructor(props: props) {
    super(props);

    this.state = {
      skillexp: "",
      skillknow: "",
      yearofexp: "",
      resume: "",
      certificate: "",
      show: false,
      username: this.props.username,
      infogenlist: [],
    };
    this.submitForm = this.submitForm.bind(this);
  }
  skillexpHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ skillexp: e.target.value });
  };
  skillknowHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ skillknow: e.target.value });
  };
  yearofexpHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ yearofexp: e.target.value });
  };
  resumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ resume: e.target.value });
  };
  certificateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ certificate: e.target.value });
  };
  componentDidUpdate() {
    Axios.get("http://localhost:3001/personaldetailsgetinfogendetails").then(
      (response) => {
        const infogenlist = response.data;
        this.setState({ infogenlist });
      }
    );
  }
  submitForm = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/personaldetailsinfogendetails", {
      username:this.props.username,
      skillexp: this.state.skillexp,
      skillknow: this.state.skillknow,
      yearofexp: this.state.yearofexp,
      certificate: this.state.certificate,
    }).then((response) => {
      console.log(response);
    });
    this.setState({
      skillexp: "",
      skillknow: "",
      yearofexp: "",
      certificate: "",
      show: true,
    });
    // localStorage.setItem("infogendetails", JSON.stringify(this.state));
    // this.setState({
    //   show:true
    // })
  };
  editHandler = () => {
    this.setState({
      show: false,
    });
    <Navigate to="/infogen" />;
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
      `http://localhost:3001/personaldetailsdeleteinfogendetails/${this.state.username}`
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
          {!this.state.show ? "ShowInfogenDetails" : "ShowInfogenDetailsForm"}
        </h4>
        <div style={{marginTop:"-40px"}}>
        <span style={{ marginLeft: "550px", textDecoration: "underline"}}>
          Infogen Details
        </span>
        <hr />
        {!this.state.show && (
          <form onSubmit={this.submitForm}>
            <div style={{ textAlign: "center" }}>
              <span>Skill(Experience):- </span>
              <input
                type="text"
                name="skillexp"
                style={{ marginLeft: "100px", marginTop: "10px" }}
                value={this.state.skillexp}
                onChange={this.skillexpHandler}
                required
              />
              <br />
              <span>Skill(Knowledge):- </span>
              <input
                type="text"
                name="skillknow"
                style={{ marginLeft: "100px", marginTop: "10px" }}
                value={this.state.skillknow}
                onChange={this.skillknowHandler}
                required
              />
              <br />
              <span>Years Of Experience:- </span>
              <input
                type="text"
                name="yearofexp"
                style={{ marginLeft: "80px", marginTop: "10px" }}
                value={this.state.yearofexp}
                onChange={this.yearofexpHandler}
                required
              />
              <br />
            </div>
            <section style={{ marginLeft: "440px" }}>
              <span>Resume:- </span>
              <input
                type="file"
                name="resume"
                accept="application/pdf"
                style={{ marginLeft: "155px", marginTop: "10px" }}
                value={this.state.resume}
                onChange={this.resumeHandler}
              />
            </section>
            <section style={{ marginLeft: "430px" }}>
              <span>Certification(Course Name:Date):- </span>
              <input
                type="text"
                name="certificate"
                style={{ margin: "10px" }}
                value={this.state.certificate}
                onChange={this.certificateHandler}
                required
              />
            </section>
            <br />
            <input
              type="submit"
              value="Submit Data"
              style={{
                backgroundColor: "cornflowerblue",
                marginTop: "20px",
                marginLeft: "600px",
                color: "white",
                border: "none",
                fontSize: "15px",
              }}
            />
            <br />
          </form>
        )}
        </div>
        {this.state.show && (
          <span style={{ color: "green", marginLeft: "500px" }}>
            Infogen data added successfully
          </span>
        )}
        {this.state.show && (
          <table id="data" style={{ marginLeft: "380px" }}>
            <thead>
              <tr>
                <td>
                  <h3>Skill Experience </h3>
                </td>
                <td>
                  <h3>Skill knowledge </h3>
                </td>
                <td>
                  <h3>Year Of Experience </h3>
                </td>
                <td>
                  <h3>Certificate </h3>
                </td>
                <td>
                  <h3>Delete </h3>
                </td>
              </tr>
            </thead>
            <tbody style={{textAlign:"center"}}>
              {this.state.infogenlist.map((value: any) => {
                if(this.state.username === value.username)
                return(
                <tr>
                  <td>{value.skillexp}</td>
                  <td>{value.skillknow}</td>
                  <td>{value.yearofexp}</td>
                  <td>{value.certificate}</td>
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
    );
  }
}
export default Infogen;
