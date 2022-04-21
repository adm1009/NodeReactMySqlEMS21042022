import Logout from "./components/Logout";
import Home from "./components/Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PersonalInformation from "./components/personal/PersonalInformation";
import BankDetails from "./components/personal/BankDetails";
import EmergencyContact from "./components/personal/EmergencyContact";
import Infogen from "./components/personal/Infogen";
import LeaveDetails from "./components/leave/LeaveDetails";
import MyRegularize from "./components/leave/MyRegularize";
import ApplyRegularize from "./components/leave/ApplyRegularize";
import DailyAttendance from "./components/employee/DailyAttendance";
import DailyTask from "./components/employee/DailyTask";
import EmployeeAppraisalForm from "./components/employee/EmployeeAppraisalForm";
import LeaveData from "./components/employee/LeaveData";
import MonthlyAttendance from "./components/employee/MonthlyAttendance";
import PrivateRoute from "./components/PrivateRoute";
import logo from "./infogenlogo.png";
import Navbar from "./components/Navbar";
import "./App.css";
type props = {
  username: any;
};
class App extends React.Component<props, props> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: null,
    };
  }
  handleuser = (childData: any) => {
    this.setState({ username: childData });
  };
  render() {
    return (
      <div>
        <section style={{ display: "inline-block" }}>
          <img src={logo} style={{ height: "60px", width: "250px" }} />
        </section>
        <section
          style={{
            display: "inline-block",
            textAlign: "center",
            marginLeft: "220px",
          }}
        >
          <h1>Infogen Labs Pvt.Ltd</h1>
          <h1>Employee Management System</h1>
        </section>
        <section>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  username={this.handleuser}
                  password=""
                  show
                  showError
                  register
                  login
                  usernameReg=""
                  passwordReg=""
                  loginstatus=""
                  devshow
                  aspshow
                  qashow
                  phpcoshow
                  phplashow
                  reactshow
                  newpass=""
                  forgotshow
                />
              }
            />
            <Route
              path="/logout"
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />
            <Route
              path="/navbar"
              element={
                <PrivateRoute>
                  <Navbar
                    personalData
                    leaveData
                    employeeData
                    username={this.state.username}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/personalinformation"
              element={
                <PrivateRoute>
                  <PersonalInformation
                    employeecode=""
                    firstname=""
                    middlename=""
                    lastname=""
                    gender=""
                    dateofbirth=""
                    mobileno=""
                    emailid=""
                    address=""
                    passportno=""
                    bloodgroup=""
                    show
                    username={this.state.username}
                    personalinformationlist={[]}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/bankdetails"
              element={
                <PrivateRoute>
                  <BankDetails
                    pancardno=""
                    accountno=""
                    bankname=""
                    bank=""
                    show
                    username={this.state.username}
                    banklist={[]}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/emergencycontact"
              element={
                <PrivateRoute>
                  <EmergencyContact
                    firstpersonname=""
                    firstpersonno=""
                    secondpersoname=""
                    secondpersonno=""
                    show
                    username={this.state.username}
                    emergencycontactlist={[]}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/infogen"
              element={
                <PrivateRoute>
                  <Infogen
                    skillexp=""
                    skillknow=""
                    yearofexp=""
                    resume=""
                    certificate=""
                    show
                    username={this.state.username}
                    infogenlist={[]}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/leave"
              element={
                <PrivateRoute>
                  <LeaveDetails username={this.state.username} />
                </PrivateRoute>
              }
            />
            <Route
              path="/dailyattendance"
              element={
                <PrivateRoute>
                  <DailyAttendance
                    entry
                    exit
                    msg
                    datesData=""
                    indatesdata=""
                    outDatesData=""
                    username={this.state.username}
                    status=""
                    attendancelist={[]}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/dailytask"
              element={
                <PrivateRoute>
                  <DailyTask
                    project=""
                    task=""
                    time=""
                    status=""
                    blockingissue=""
                    responsibleperson=""
                    show
                    username={this.state.username}
                    dailytasklist={[]}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/employeeappraisalform"
              element={
                <PrivateRoute>
                  <EmployeeAppraisalForm
                    duration=""
                    goals=""
                    skills=""
                    show
                    username={this.state.username}
                    employeeappraisallist={[]}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/leavedata"
              element={
                <PrivateRoute>
                  <LeaveData
                    date=""
                    reason=""
                    show
                    username={this.state.username}
                    leavelist={[]}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/monthlyattendance"
              element={
                <PrivateRoute>
                  <MonthlyAttendance date username={this.state.username} />
                </PrivateRoute>
              }
            />
            <Route
              path="/leave/myregularize"
              element={
                <PrivateRoute>
                  <MyRegularize
                    username={this.state.username}
                    myregularizelist={[]}
                    show
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/leave/applyregularize"
              element={
                <PrivateRoute>
                  <ApplyRegularize
                    approver=""
                    reason=""
                    date=""
                    checkin=""
                    checkout=""
                    show
                    username={this.state.username}
                    appliedlist={[]}
                  />
                </PrivateRoute>
              }
            />
            <Route path="*" element={"404 Not Found"} />
          </Routes>
          <footer className="footer">
            <span>Copyright &copy; 2022</span>
          </footer>
        </section>
      </div>
    );
  }
}
export default App;
