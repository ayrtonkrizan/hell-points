import React, { useContext } from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import rotas from "./routes";
import { AppContext } from "contexts/appContext";



const RouteFactory = ({ componenet: Component, isPrivate, isRestrict, ...props }) => {
    const store = useContext(AppContext);
    return (
        <Route
            key={props.path}
            {...props}
            render={props => {
                return isPrivate && !store.signed
                    ? <Redirect to={`/signin?redirect=${props.location.pathname}${props.location.search}`} />
                    : isRestrict && !store.isAdmin
                        ? <Redirect to={`/`} />
                        : <Component {...props} />
            }}
        />
    )
}

function Page() {
    return (
        <Switch>
            {
                rotas.map(r => <RouteFactory key={r.path} {...r} />)
            }
        </Switch>
    )
}
export default Page;
