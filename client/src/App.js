import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserEdit from "./UserEdit";
import Join from "./join/join";
import Login from "./join/Login";
import Authority from "./web3/authority";



function App() {
    return (
        <Router>
            {/*<Navigation />*/}
            <Route path="/edit"  exact={true} component={UserEdit} />
            <Route path="/join" exact={true} component={Join} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/authority" exact={true} component={Authority} />
            {/*<Route path="/emp/cm"   exact={true} component={EmpMain} />*/}
            {/*<Route path="/auth/cm"   exact={true} render={()=><AuthMain session={true} />} />*/}
            {/*<Route path="/test"   exact={true} component={Sidebar} />*/}
            {/*<Route path="/movie/:id" component={} />*/}
        </Router>
    );
}

export default App;
