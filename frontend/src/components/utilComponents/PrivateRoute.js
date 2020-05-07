import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { StoreContext } from '../../store';

const PrivateRoute = ({ path, component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(StoreContext);
  return (
    <Route
      {...rest}
      render={props => {
        // console.log(props);
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
