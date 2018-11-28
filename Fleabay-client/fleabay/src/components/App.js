import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./Navbar";
import ListingIndexPage from "./ListingIndexPage";
import ListingNewPage from "./ListingNewPage";
import ListingShowPage from "./ListingShowPage";
import WelcomePage from "./WelcomePage";
import SignInPage from "./SignInPage";
import AuthRoute from "./AuthRoute";
import NotFoundPage from "./NotFoundPage";
import NewBid from "./NewBid";

import { User, Session } from "../requests";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentUser: {}
    };
    this.getUser = this.getUser.bind(this);
    this.destroySession = this.destroySession.bind(this);
  }
  destroySession() {
    Session.destroy().then(() => this.setState({ currentUser: null }));
  }

  getUser() {
    User.current().then(currentUser => {
      console.log(currentUser);
      if (currentUser && currentUser.id) {
        this.setState({ currentUser });
      }
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { currentUser } = this.state;

    if (this.state.loading) {
      return (
        <div className="App">
          <main>
            <h1>Loading...</h1>
          </main>
        </div>
      );
    }

    return (
      <BrowserRouter>
        <div className="App">
          <NavBar currentUser={currentUser} onSignOut={this.destroySession} />
          <Switch>
            <Route path="/" exact component={WelcomePage} />
            <Route
              path="/session/new"
              exact
              render={routeProps => (
                <SignInPage {...routeProps} onSignIn={this.getUser} />
              )}
            />
            <AuthRoute
              isAuth={currentUser}
              path="/listings/new"
              exact
              component={ListingNewPage}
            />
            <Route
              path="/listings/:id"
              exact={true}
              component={ListingShowPage}
            />
            <Route path="/listings" exact component={ListingIndexPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
