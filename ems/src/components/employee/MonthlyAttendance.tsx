// import React from 'react';

// import { Calendar } from 'react-big-calendar';

// import moment from 'moment';

// class Calendar extends React.Component {

//    render() {

//        return (

//            <Calendar

//                startAccessor="start"

//                endAccessor="end"

//            />

//        )

//    }
// }
// export default Calendar;
import React, { Component } from "react";
import Calendar from "react-calendar";
import Navbar from "../Navbar";
import { Navigate} from "react-router-dom";
import "../Home.css";
type props = {
  date:any
  username:any
}

class MonthlyAttendance extends React.Component<props,props> {
  constructor(props: props) {
    super(props);
    this.state = {
      date: new Date(),
      username:this.props.username
    };
  }

  onChange = (date: any) => this.setState({ date });

  render() {
   
    return (
      <>
        <Navbar personalData leaveData employeeData username={this.props.username}/>
        <div style={{textAlign:"center"}}>
        <span style={{ textDecoration: "underline" }}>Monthly Attendance</span>
        <hr />
        <Calendar onChange={this.onChange} value={this.state.date} />
      </div>
      </>
    );
  }
}
export default MonthlyAttendance;
