import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_pt from 'react-intl/locale-data/pt';
import messages_en from "./translations/en.json";
import messages_pt from "./translations/pt.json";

// Other components are imported in the Sidebar
import Sidebar from "./components/sidebar/sidebar";

import './styles/global.css';
import './styles/forms.css';
import './styles/effects.css';
import './styles/buttons.css';

addLocaleData([...locale_en, ...locale_pt]);

const messages = {
    'pt': messages_pt,
    'en': messages_en
};
const language = navigator.language.split(/[-_]/)[0];  // language without region code

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

class App extends Component {
    render() {
        return (
            <IntlProvider locale={language} messages={messages[language]}>
                <Provider store={store}>
                    <Sidebar/>
                </Provider>
            </IntlProvider>
        );
    }
}

export default App;


