import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './Home'
import Favorites from './Favorites'
import Login from './Login'
import Logout from './Logout'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo2 from './logo.png'
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {
    render() {
        const isAuthenticated = this.props.auth0.isAuthenticated
        return (
            <Router>
                <div>
                    <Navbar style={{ background: "#1FDEC2", marginBottom: "50px", height: '5.5rem' }} variant="dark">
                        <Container >
                            <Navbar.Brand style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }} href="#home"><img width="80px" src={logo2} alt="" /> Capturra</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link style={{ color: 'black', marginLeft: '10px', fontSize: '18px', marginBottom: '3px' }} href="/">Home</Nav.Link>
                                <Nav.Link style={{ color: 'black', fontSize: '18px', marginLeft: '10px' }} href="/favorites">Favorites</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                    <Switch>
                        <Route path="/favorites">
                            {isAuthenticated && <><Favorites /> <Logout /></>}
                            {!isAuthenticated && <Login />}
                        </Route>
                        <Route path="/">
                            {isAuthenticated && <><Home /> <Logout /></>}
                            {!isAuthenticated && <Login />}
                        </Route>
                    </Switch>
                </div>
            </Router >
        );
    }
}
export default withAuth0(App)