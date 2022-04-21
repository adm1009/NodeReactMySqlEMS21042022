import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import "../Home.css";
import Axios from "axios";
type props = {
  pancardno: string;
  accountno: string;
  bankname: string;
  show: boolean;
  bank: string;
  username: any;
  banklist: any;
};

class BankDetails extends React.Component<
  props,
  {
    pancardno: string;
    accountno: string;
    bankname: string;
    show: boolean;
    username: any;
    banklist: any;
  }
> {
  constructor(props: props) {
    super(props);

    this.state = {
      pancardno: "",
      accountno: "",
      bankname: "",
      show: false,
      username: this.props.username,
      banklist: [],
    };
    this.submitForm = this.submitForm.bind(this);
  }
  pancardnoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ pancardno: e.target.value });
  };
  accountnoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ accountno: e.target.value });
  };
  banknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ bankname: e.target.value });
  };
  componentDidUpdate() {
    Axios.get("http://localhost:3001/personaldetailsgetbankdetails").then(
      (response) => {
        const banklist = response.data;
        this.setState({ banklist });
      }
    );
  }
  showDetails = () => {
    if (!this.state.show) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  };
  submitForm = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/personaldetailsbankdetails", {
      username:this.props.username,
      pancardno: this.state.pancardno,
      accountno: this.state.accountno,
      bankname: this.state.bankname,
    }).then((response) => {
      console.log(response);
    });
    this.setState({ pancardno: "", accountno: "", bankname: "", show: true });
  };

  editHandler = (id: any) => {
    // Axios.put("http://localhost:3001/personaldetailseditbankdetails",{pancardno: this.state.pancardno,
    // accountno: this.state.accountno,
    // bankname: this.state.bankname,id:id}).then((response)=>{
    //   this.setState(this.state.banklist.map((value:any)=>{
    //     return value.id === id ? {id:value.id,pancardno:value.pancardno,accountno:value.accountno,bankname:value.bankname}:value
    // }
    // ))
    // })
    this.setState({
      show: false,
    });
    <Navigate to="/bankdetails" />;
  };
  deleteHandler = () => {
    Axios.delete(
      `http://localhost:3001/personaldetailsdeletebankdetails/${this.state.username}`
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
          {!this.state.show ? "ShowBankDetails" : "ShowBankDetailsForm"}
        </h4>
        <div style={{ textAlign: "center", marginTop: "-40px" }}>
          <span style={{ textDecoration: "underline" }}>Bank Details</span>
          <hr />
          {!this.state.show && (
            <form onSubmit={this.submitForm}>
              <span>Pancard No:- </span>
              <input
                type="text"
                value={this.state.pancardno}
                onChange={this.pancardnoHandler}
                name="pancardno"
                style={{ marginLeft: "40px", marginTop: "10px" }}
                required
              />
              <br />
              <span>Account No:- </span>
              <input
                type="text"
                value={this.state.accountno}
                onChange={this.accountnoHandler}
                name="accountno"
                style={{ marginLeft: "40px", marginTop: "10px" }}
                required
              />
              <br />
              <span>Bank Name:- </span>
              <input
                type="text"
                value={this.state.bankname}
                onChange={this.banknameHandler}
                name="bankname"
                style={{ marginLeft: "40px", marginTop: "10px" }}
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
              Bank Details Added Successfully
            </span>
          )}
          <br />
          {/* {this.state.show && this.state.banklist === [] && <h5>Nothing in banklist</h5>} */}
          {this.state.show && (
            <table id="data" style={{ marginLeft: "450px" }}>
              <thead>
                <tr>
                  <td>
                    <h3>Pancard No</h3>
                  </td>
                  <td>
                    <h3>Account No</h3>
                  </td>
                  <td>
                    <h3>Bank Name</h3>
                  </td>
                  <td>
                    <h3>Delete </h3>
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.state.banklist.map((value: any) => { 
                if(this.state.username === value.username)
                return (
                  <tr key={value.id}>
                    <td>{value.pancardno}</td>
                    <td>{value.accountno}</td>
                    <td>{value.bankname}</td>
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
                )})
                        }
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  }
}
export default BankDetails;
