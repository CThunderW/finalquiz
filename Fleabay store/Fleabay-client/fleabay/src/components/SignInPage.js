import React, { Component } from "react";
import { Session } from "../requests";

const fromFormData = formData => {
  const newObj = {};

  for (let [name, value] of formData) {
    newObj[name] = value;
  }

  // 👆 syntax sugar for 👇
  // for (let val of formData) {
  //   newObj[val[0]] = val[1]
  // }

  return newObj;
};

export default class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    this.createSession = this.createSession.bind(this);
  }

  createSession(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    Session.create(fromFormData(formData)).then(data => {
      console.log(data);
      if (data.status === "error") {
        // this.state <-- Never mutate this!

        // this.state.errors.push(data.message) // BAD!
        // `push` will mutate the errors in the state. Use
        // `concat` instead.

        this.setState({
          errors: [data.message]
        });

        return;
      } else {
        localStorage.setItem("token", data.token);
      }

      if (typeof this.props.onSignIn === "function") {
        this.props.onSignIn();
      }
      // The `history` prop is passed to components rendered by
      // the <Route> component. This `history` allows us to manipulate
      // the history browser including redirecting the user to another
      // page.
      this.props.history.push("/");
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <main className="SignInPage">
        <h1>Sign In</h1>
        <form onSubmit={this.createSession}>
          {errors.length > 0 ? (
            <p className="FormErrors">{errors.join(", ")}</p>
          ) : null}
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name="email" id="email" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="password" id="password" />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </main>
    );
  }
}

// export default SignInPage;
