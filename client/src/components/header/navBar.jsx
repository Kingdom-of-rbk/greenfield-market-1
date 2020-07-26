import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navcategories from "../header/navcategories"


export default class Navbart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" className="topnav">
          <Navbar.Brand >
            <Link to="/" >
                  Greenfield-market
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto">        
            {localStorage.loggedIn == 'true' ? <li className="nav-item" > <Link to="/login" className="nav-link">Login</Link></li> : <h5>Welcome to our Market</h5> }
            <li className="nav-item"><Link to="/register" className="nav-link">Register </Link></li>
            <li className="nav-item"><Link to="/" className="nav-link" onClick={localStorage.loggedIn === false}>Logout</Link></li>
            <li className="nav-item">
              <Link to="/Cart" className="nav-link"> Cart  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </Link>
            </li>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />         
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <Navbar bg="dark" variant="dark" className="categories-nav topnav">        
          <Navcategories />         
        </Navbar>
      </div>
    );
  }
}
