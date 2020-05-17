import React from "react";
import { Router, Route, Switch, Redirect} from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import AddTiming from "../WorkingHours/AddTiming";
import ShowTiming from "../WorkingHours/ShowTiming";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";





class App extends React.Component {
  
  
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }
  

  render() {
    const { alert } = this.props;
    return (
      
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
         
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}


       
       <Router history={history}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => <AddTiming user={this.props.user.id} />}
                  />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route
                    exact
                    path="/add"
                    render={(props) => <AddTiming user={this.props.user.id} />}
                  />
                   <Route
                    exact
                    path="/show"
                    render={(props) => <ShowTiming user={this.props.user} />}
                  />
                  <Redirect from="*" to="/" />
                </Switch>
              </MuiPickersUtilsProvider>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  const { users, authentication } = state;
  const { user } = authentication;
  return { alert, user, users };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };

