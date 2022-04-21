import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Auth from "./Auth";

class PrivateRoute extends React.Component<{},{children:Component}>{
  isAuth = Auth.getAuth();
  render(){
  return this.isAuth ? this.props.children : <Navigate to="/" />;
  }
};

export default PrivateRoute;
