import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";



import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "./store/actions";


const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});



class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let authorizedRoutes = [];

    if (this.props.isAuthenticated) {
      authorizedRoutes = [
        <Route key="/checkout" path="/checkout" component={asyncCheckout} />,
        <Route key="/orders" path="/orders" component={asyncOrders} />
      ]             
    }

    return (
      <div>
        <Layout>
          <Switch>
            {authorizedRoutes}
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
