import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Listing } from "../requests";

class ListingIndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      listings: []
    };

    // Use the `bind` method on functions to permanently set their
    // `this` to the first argument of the `bind` method.
    this.deleteListing = this.deleteListing.bind(this);
    // We often do this in React for methods that we pass as callbacks
    // to props or higher-order functions.
  }

  componentDidMount() {
    Listing.all().then(({ data }) => {
      this.setState({
        listings: data,
        loading: false
      });
    });
  }

  deleteListing(listingId) {
    console.log("Delete button clicked!");

    // To do ALL state changes in class-based component you
    // must the `setState` method.
    // - It takes an object as a first argument where its property-value
    //   pairs get merged with the current state at an optimal of
    //   react's choosing.
    // - Using `setState` is asynchronous operation.
    Listing.delete(listingId).then(res => {
      console.log(res);
      this.setState({
        listings: this.state.listings.filter(l => l.id !== listingId)
      });
    });
  }
  consoler = () => {
    console.log(this.state.listings);
  };

  render() {
    if (this.state.loading) {
      return (
        <main className="ListingIndexPage">
          <h1>Listing Index</h1>
          <h2>Loading...</h2>
        </main>
      );
    }

    return (
      <main className="ListingIndexPage">
        <h1>Listing Index</h1>
        <ul
          style={{
            listStyle: "none",
            paddingLeft: "0"
          }}>
          {this.state.listings.map(listing => (
            <li
              key={listing.id}
              style={{
                marginBottom: "10px"
              }}>
              <small>
                <em>{listing.id}</em>
              </small>{" "}
              <Link to={`/listings/${listing.id}`}>{listing.title}</Link>
              <br />
              <button onClick={() => this.deleteListing(listing.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default ListingIndexPage;
