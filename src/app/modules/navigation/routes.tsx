import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SignIn from "../auth/ui/pages/sign-in";
import Home from "../home/ui/pages";
import NavBar from "../layout/ui/components/navbar";
import GuardedRoute from "../permissions/ui/components/route-guard";
import Products from "../products/ui/pages/index";


const MainPagesRouter = () => {
    return (
        <GuardedRoute exact path="/profile">
            <Home />
        </GuardedRoute>
    )
}



const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/sign-in">
                    <SignIn />
                </Route>
                <Route path="/">
                    <NavBar />
                    <div style={{ paddingTop: "80px" }}>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/products">
                            <Products />
                        </Route>
                    </div>
                </Route>
                {/* <MainPagesRouter /> */}
            </Switch>
        </Router>
    )
};

export default AppRouter;
