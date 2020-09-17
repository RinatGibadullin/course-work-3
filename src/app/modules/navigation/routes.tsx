import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SignIn from "../auth/ui/pages/sign-in";
import Home from "../home/ui/pages";
import GuardedRoute from "../permissions/ui/components/route-guard";


const MainPagesRouter = () =>
    <GuardedRoute exact path="/dashboard">
        <Home />
    </GuardedRoute>


const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/sign-in">
                    <SignIn />
                </Route>
                <GuardedRoute path="/">
                    <MainPagesRouter />
                </GuardedRoute>
            </Switch>
        </Router>
    )
};
export default AppRouter;
