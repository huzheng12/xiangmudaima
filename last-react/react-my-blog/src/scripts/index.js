import React from 'react'
import { HashRouter as Hash, Route, Switch, Redirect } from "react-router-dom"
import Home from './views';
import { reducers } from './reducers';
import Login from './views/login';
import Register from './views/register';


export class Index extends React.Component {

    render() {
        return (
            <Hash basename="/">
                <div style={{ width: "100%", height: "100%" }}>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        {/* <Route render={() => {
                            <Redirect to="/home"></Redirect>
                        }}></Route> */}
                    </Switch>
                </div>
            </Hash>
        )
    }
}