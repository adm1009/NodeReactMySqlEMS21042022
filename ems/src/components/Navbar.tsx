import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./Navbar.css";
import Auth from "./Auth";
import {AiFillCaretRight} from "react-icons/ai";
type props = {
  personalData: boolean;
  leaveData: boolean;
  employeeData: boolean;
  username:string
};

class Navbar extends React.Component<
  props,
  { personalData: boolean; leaveData: boolean; employeeData: boolean; username:string}
> {
  constructor(props: props) {
    super(props);
    this.state = {
      personalData: false,
      leaveData: false,
      employeeData: false,
      username:this.props.username
    };
  }
  personalHandler = () => {
    this.setState({
      personalData: true,
      leaveData: false,
      employeeData: false,
      username:this.props.username
    });
  };
  leaveHandler = () => {
    this.setState({
      leaveData: true,
      personalData: false,
      employeeData: false,
    });
  };
  employeeHandler = () => {
    this.setState({
      employeeData: true,
      leaveData: false,
      personalData: false,
    });
  };
  logout() {
    Auth.signout();
  }
  render() {
    return (
      <div>
        <section style={{textAlign:"right", marginBottom:"10px"}}>
        <span style={{display:"inline-block"}}>Welcome {this.props.username}</span>
        <Link to="/logout" onClick={this.logout} style={{color:"cornflowerblue",fontSize:"15px",marginLeft:"5px"}}>
           Logout
        </Link>
        </section>
        <nav className="navback" >
          <h3 className="heading">
            <button className="buttons" style={{marginLeft:"250px"}} onClick={this.personalHandler}>
              Personal Details<AiFillCaretRight style={{color:"black"}}/>
            </button>
          </h3>
          <h3 className="heading">
            <button className="buttons" onClick={this.leaveHandler}>
              Leave Details<AiFillCaretRight style={{color:"black"}}/>
            </button>
          </h3>
          <h3 className="heading">
            <button className="buttons" onClick={this.employeeHandler}>
              Employee Details<AiFillCaretRight style={{color:"black"}}/>
            </button>
          </h3>
        </nav>
        <nav >
          {this.state.personalData && <section className="nestedpersonal">
          <h3>
            {this.state.personalData && <>
              <Link to="/personalinformation">
                <button className="buttons" >Personal Information</button>
              </Link>
              <hr className="hrtag"/>
            </>}
          </h3>
          <h3>
            {this.state.personalData && <>
              <Link to="/bankdetails">
                <button className="buttons">Bank Details</button>
              </Link>
              <hr className="hrtag"/>
              </>
            }
          </h3>
          <h3>
            {this.state.personalData && <>
              <Link to="/emergencycontact">
                <button className="buttons">Emergency Contact</button>
              </Link>
              <hr className="hrtag"/>
              </>
            }
          </h3>
          <h3>
            {this.state.personalData && <>
              <Link to="/infogen">
                <button className="buttons">Infogen Details</button>
              </Link>
              </>
            }
          </h3>
          </section>}
          {this.state.leaveData && <section className="nestedleave">
          <h3>
            {this.state.leaveData && (<>
              <Link to="/leave">
                <button className="buttons">Attendance Regularization</button>
              </Link>
              </>
            )}
          </h3>
          </section>}
          {this.state.employeeData && <section className="nestedemployee">
          <h3>
            {this.state.employeeData && (<>
              <Link to="/dailyattendance">
                <button className="buttons">Daily Attendance</button>
              </Link>
              <hr className="hrtag"/>
              </>
            )}
          </h3>
          <h3>
            {this.state.employeeData && (<>
              <Link to="/dailytask">
                <button className="buttons">Daily Task</button>
              </Link>
              <hr className="hrtag"/>
              </>
            )}
          </h3>
          <h3>
            {this.state.employeeData && (<>
              <Link to="/employeeappraisalform">
                <button className="buttons">Employee Appraisal Form</button>
              </Link>
              <hr className="hrtag"/>
              </>
            )}
          </h3>
          <h3>
            {this.state.employeeData && (<>
              <Link to="/leavedata">
                <button className="buttons">Leave Details</button>
              </Link>
              <hr className="hrtag"/>
              </>
            )}
          </h3>
          <h3>
            {this.state.employeeData && (<>
              <Link to="/monthlyattendance">
                <button className="buttons">Monthly Attendance</button>
              </Link>
              </>
            )}
          </h3>
          </section>}
        </nav>
      </div>
    );
  }
}
export default Navbar;
