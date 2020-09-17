import React from 'react';
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from 'react-redux';
import { isLoggedSelector, isAuthCheckedSelector } from 'app/modules/auth/store/current-user/selectors';
import UDLoader from 'app/modules/ud-ui/loader/loader';

type Props = {
  children: any
} & RouteProps

const GuardedRoute = (props: Props): any => {
  const { children, ...rest } = props;
  const isLogged = useSelector(isLoggedSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  
  if (isAuthChecked) {
    let isRouteAllowed = isLogged;

    const render = ({ location }: any) => {
      return isRouteAllowed ? children : (
        <Redirect to={{
          pathname: "/sign-in",
          state: { from: location }
        }} />
      )
    }

    return (<Route {...rest} render={render} />)
  }
  return (<UDLoader />);
}

export default GuardedRoute;