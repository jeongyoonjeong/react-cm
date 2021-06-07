import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import UserEdit from "./UserEdit";
import Join from "./sign/signup/SignupContainer";
import Login from "./sign/signin/SigninContainer";
import Authority from "./web3/AuthorityContainer";

import './commonStyle/CommonStyle.css';



function App() {
    return (
        <Router>
            {/*<Navigation />*/}
            <Route path="/join" exact={true} component={Join} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/authority" exact={true} component={Authority} />
        </Router>
    );
}

export default App;
