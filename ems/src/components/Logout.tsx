import React from 'react'
import {Link} from "react-router-dom";
type props ={
  
}
class Logout extends React.Component<props> {
  constructor(props:props){
    super(props)
  }
  render(){
  return (
    <div style={{textAlign:"center"}}>
      <h3 style={{color:"red"}}>You have been Loggedout</h3>
      <Link to="/">Login Again</Link>
    </div>
  )
}
}
export default Logout;
