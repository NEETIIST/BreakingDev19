import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <h2>MERN-Stack Todo App</h2>
                </div>
            </Router>
        );
    }
}

export default App;

/*
<Route path="/" exact component={TodosList} />
*/
